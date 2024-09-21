import { unstable_noStore as noStore } from "next/cache"
import yahooFinance from "yahoo-finance2"
import type { SearchResult } from "@/node_modules/yahoo-finance2/dist/esm/src/modules/search"

export async function fetchStockSearch(ticker: string, newsCount: number = 1000) {
  noStore()

  const queryOptions = {
    quotesCount: 1,
    newsCount: newsCount,
    enableFuzzyQuery: true,
  }

  try {
    const response: SearchResult = await yahooFinance.search(
      ticker,
      queryOptions
    )

    const getLogoUrl = (link: string) => {
      // get root url from link
      const url = new URL(link) // https://www.bloomberg.com/news/articles/2022-03-25/... -> https://www.bloomberg.com
      return `https://logo.clearbit.com/${url.hostname}`

    }

    const newsItems = response.news.map((newsItem) => {
      return {
        id: newsItem.uuid,
        symbol: ticker,
        relatedTickers: newsItem.relatedTickers,
        title: newsItem.title,
        link: newsItem.link,
        publisher: newsItem.publisher,
        logo: getLogoUrl(newsItem.link),
        thumbnail: newsItem.thumbnail?.resolutions[0]?.url ?? "",
        publishTime: newsItem.providerPublishTime,
        sentiment: "neutral",
      }
    })

    console.log("newsItems", newsItems)

    return {
      ...response,
      news: newsItems,
    }

  } catch (error) {
    console.log("Failed to fetch stock search", error)
    throw new Error("Failed to fetch stock search.")
  }
}
