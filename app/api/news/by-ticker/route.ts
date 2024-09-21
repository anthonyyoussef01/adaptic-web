import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY

const getLogoUrl = (link: string) => {
  // get root url from link
  return `https://logo.clearbit.com/${link}`
}

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

  if (!request.body) {
    return NextResponse.json({ error: "Body is required" }, { status: 400, headers });
  }

  const { tickers } = await request.json();


  try {
    const strinfiedTickers = tickers.join('&&')

    const get24hAgo = () => {
      // Get the current time and subtract 24 hours (1 day)
      const now = new Date()
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)

      // Format the date as YYYYMMDD
      const date = yesterday.toISOString().split('T')[0].replace(/-/g, '')

      // Format the time as HHMM, removing seconds and milliseconds
      const time = yesterday.toISOString().split('T')[1].split(':').slice(0, 2).join('')

      // Return formatted string: YYYYMMDDTHHMM
      return `${date}T${time}`
    }

    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${strinfiedTickers}&time_from=${get24hAgo()}&apikey=${API_KEY}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch news sentiment data' }, { status: 500, headers })
      }

      const data = await response.json()

      const newsArticles = data.feed.map((article: any) => {
        return {
          id: article.id || "",
          title: article.title || "",
          url: article.url || "",
          timePublished: article.time_published || "",
          authors: article.authors || [],
          summary: article.summary || "",
          bannerImage: article.banner_image || "",
          source: article.source || "",
          category: article.category_within_source || "",
          sourceDomain: article.source_domain || "",
          topics: article.topics || [],
          overallSentimentScore: article.overall_sentiment_score || "",
          sentiment: article.overall_sentiment_label || "",
          tickerSentiment: article.ticker_sentiment || "",
          logo: getLogoUrl(article.source_domain) || "",
        }
      })

      return NextResponse.json(newsArticles, { status: 200, headers })
    } catch (error) {
      console.error("Failed to fetch news sentiment data", error)
      return NextResponse.json({ error: "Failed to fetch news sentiment data" }, { status: 500, headers })
    }
  } catch (error) {
    console.error("Failed to fetch news sentiment data", error)
    return NextResponse.json({ error: "Failed to fetch news sentiment data" }, { status: 500, headers })
  }
}
