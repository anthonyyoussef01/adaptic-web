import Dashboard from "@/components/dashboard"
import { NewsArticle } from "@/components/markets/market-sentiment"

async function getArticles(tickers: string[]) {
  const response = await fetch(`${process.env.BASE_URL}/api/news/by-ticker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tickers: tickers }),
  })

  const data = await response.json()

  // filter out to only show articles where tickerSentiment includes tickers in the portfolio with relevance_score > 0.5
  const filteredData = data.filter((article: NewsArticle) => {
    const relevantTickers =
      Array.isArray(article.tickerSentiment) &&
      article.tickerSentiment.length > 0
        ? article.tickerSentiment.filter(
            (sentiment: any) => sentiment.relevance_score > 0.5
          )
        : []
    return relevantTickers.length > 0 ? true : false
  })
  return filteredData as NewsArticle[]
}

async function getMarketSentiment() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/markets/sentiment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const data = await response.json()

  // Logic for determining sentiment styles based on the response
  const marketSentiment = data.sentiment

  const sentimentColor =
    marketSentiment === "bullish"
      ? "text-teal-500"
      : marketSentiment === "bearish"
        ? "text-red-500"
        : marketSentiment === "somewhat bullish"
          ? "text-teal-400"
          : marketSentiment === "somewhat bearish"
            ? "text-red-400"
            : "text-neutral-500"

  const sentimentBackground =
    marketSentiment === "bullish"
      ? "bg-teal-500/10"
      : marketSentiment === "bearish"
        ? "bg-red-300/50 dark:bg-red-950/50"
        : marketSentiment === "somewhat bullish"
          ? "bg-teal-300/50 dark:bg-teal-950/50"
          : marketSentiment === "somewhat bearish"
            ? "bg-red-300/50 dark:bg-red-700/50"
            : "bg-neutral-500/10"

  return {
    marketSentiment,
    sentimentColor,
    sentimentBackground,
  }
}

const portfolioTickers = [
  { symbol: "AAPL", shortName: "Apple Inc." },
  { symbol: "MSFT", shortName: "Microsoft Corporation" },
  { symbol: "GOOGL", shortName: "Alphabet Inc." },
  { symbol: "AMZN", shortName: "Amazon.com Inc." },
  { symbol: "TSLA", shortName: "Tesla Inc." },
  { symbol: "NFLX", shortName: "Netflix Inc." },
  { symbol: "FB", shortName: "Meta Platforms Inc." },
  { symbol: "NVDA", shortName: "NVIDIA Corporation" },
  { symbol: "PYPL", shortName: "PayPal Holdings Inc." },
  { symbol: "SQ", shortName: "Square Inc." },
]

export default async function DashboardPage() {
  const news = await getArticles(portfolioTickers.map(({ symbol }) => symbol))

  const { marketSentiment, sentimentColor, sentimentBackground } =
    await getMarketSentiment()

  return (
    <div className="flex flex-col gap-4 py-2">
      <Dashboard
        news={news as NewsArticle[]}
        marketSentiment={marketSentiment}
        sentimentColor={sentimentColor}
        sentimentBackground={sentimentBackground}
      />
    </div>
  )
}
