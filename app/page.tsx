import Dashboard from "@/components/dashboard"
import { NewsArticle } from "@/types/news"
import { getNewsByTicker } from "@/lib/getNewsByTicker"
import { getMarketSentiment } from "@/lib/getMarketSentiment"
import { MarketSentimentData } from "@/types/markets"

async function getArticles(tickers: string[]) {
  const response = await getNewsByTicker(tickers)

  // filter out to only show articles where tickerSentiment includes tickers in the portfolio with relevance_score > 0.5
  const filteredData = response.filter((article: NewsArticle) => {
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

  const marketSentimentData: MarketSentimentData = await getMarketSentiment()
  const { marketSentiment, sentimentColor, sentimentBackground } =
    marketSentimentData

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
