import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const SYMBOL = "VXX"; // Using VXX as the volatility index proxy

// A function to classify sentiment based on recent price movement
const classifySentiment = (priceChanges: number[]): string => {
  const averageChange = priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length;

  if (averageChange > 1.5) return "bullish";
  if (averageChange > 0.5) return "somewhat bullish";
  if (averageChange < -1.5) return "bearish";
  if (averageChange < -0.5) return "somewhat bearish";
  return "neutral";
};

export const POST = async (request: NextRequest) => {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (request.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405, headers });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "API_KEY is required" }, { status: 500, headers });
  }

  // Fetch data from Alpha Vantage API
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&entitlement=realtime&symbol=${SYMBOL}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch VXX data" }, { status: 500, headers });
    }

    const data = await response.json();

    if (!data["Time Series (Daily)"]) {
      return NextResponse.json({ error: "Invalid data format received" }, { status: 500, headers });
    }

    const timeSeries = data["Time Series (Daily)"];
    const dates = Object.keys(timeSeries).slice(0, 5); // Take the last 5 days of data
    const priceChanges = dates.map((date, index) => {
      const open = parseFloat(timeSeries[date]["1. open"]);
      const close = parseFloat(timeSeries[date]["4. close"]);
      return ((close - open) / open) * 100; // Calculate daily % change
    });

    const sentiment = classifySentiment(priceChanges);

    return NextResponse.json({ sentiment }, { status: 200, headers });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500, headers });
  }
};
