export interface NewsArticle {
  id: string | number
  title: string
  url: string
  timePublished: string
  authors: string[]
  summary: string
  bannerImage: string
  source: string
  category: string
  sourceDomain: string
  topics: string[]
  sentiment: string
  tickerSentiment: {
    ticker: string
    relevance_score: string
    ticker_sentiment_score: string
    ticker_sentiment_label: string
  }
  logo: string
}
