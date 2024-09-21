
import { MarketSentimentData } from '@/types/markets';

// Define the symbol for the volatility index proxy
const SYMBOL = 'VXX'; // Using VXX as the volatility index proxy

// A function to classify sentiment based on recent price movement
const classifySentiment = (priceChanges: number[]): string => {
  const averageChange =
    priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length;

  if (averageChange > 1.5) return 'bullish';
  if (averageChange > 0.5) return 'somewhat bullish';
  if (averageChange < -1.5) return 'bearish';
  if (averageChange < -0.5) return 'somewhat bearish';
  return 'neutral';
};

// Helper function to get the sentiment styles based on sentiment label
const getSentimentStyles = (sentiment: string): { sentimentColor: string; sentimentBackground: string } => {
  const sentimentColor =
    sentiment === 'bullish'
      ? 'text-teal-500'
      : sentiment === 'bearish'
        ? 'text-red-500'
        : sentiment === 'somewhat bullish'
          ? 'text-teal-400'
          : sentiment === 'somewhat bearish'
            ? 'text-red-400'
            : 'text-neutral-500';

  const sentimentBackground =
    sentiment === 'bullish'
      ? 'bg-teal-500/10'
      : sentiment === 'bearish'
        ? 'bg-red-300/50 dark:bg-red-950/50'
        : sentiment === 'somewhat bullish'
          ? 'bg-teal-300/50 dark:bg-teal-950/50'
          : sentiment === 'somewhat bearish'
            ? 'bg-red-300/50 dark:bg-red-700/50'
            : 'bg-neutral-500/10';

  return { sentimentColor, sentimentBackground };
};

// Main function to fetch and process market sentiment
export const getMarketSentiment = async (): Promise<MarketSentimentData> => {
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

  if (!API_KEY) {
    throw new Error('ALPHA_VANTAGE_API_KEY is not defined in environment variables.');
  }

  // Function to get the time from 24 hours ago
  const get24hAgo = (): string => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const date = yesterday.toISOString().split('T')[0].replace(/-/g, '');
    const time = yesterday.toISOString().split('T')[1].split(':').slice(0, 2).join('');

    return `${date}T${time}`;
  };

  const timeFrom = get24hAgo();

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch VXX data from Alpha Vantage.');
    }

    const data = await response.json();

    if (!data['Time Series (Daily)']) {
      throw new Error('Invalid data format received from Alpha Vantage.');
    }

    const timeSeries = data['Time Series (Daily)'];
    const dates = Object.keys(timeSeries).slice(0, 5); // Take the last 5 days of data
    const priceChanges = dates.map((date) => {
      const open = parseFloat(timeSeries[date]['1. open']);
      const close = parseFloat(timeSeries[date]['4. close']);
      return ((close - open) / open) * 100; // Calculate daily % change
    });

    const sentiment = classifySentiment(priceChanges);
    const { sentimentColor, sentimentBackground } = getSentimentStyles(sentiment);

    return {
      marketSentiment: sentiment,
      sentimentColor,
      sentimentBackground,
    };
  } catch (error) {
    console.error('Error in getMarketSentiment:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
