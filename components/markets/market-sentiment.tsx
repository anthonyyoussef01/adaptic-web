import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "./ArticleCard"
import { NewsArticle } from "@/types/news"

interface MarketSentimentProps {
  sentimentColor: string
  sentimentBackground: string
  marketSentiment: string
  newsData: NewsArticle[]
}

export function MarketSentiment({
  sentimentColor,
  sentimentBackground,
  marketSentiment,
  newsData,
}: MarketSentimentProps) {
  return (
    <Card className="relative flex flex-col justify-between overflow-hidden rounded-none border-none sm:border-solid border-muted-foreground/20 shadow-2xl shadow-black/10 sm:rounded-3xl">
      <CardHeader className="z-10 flex flex-row items-start justify-between">
        <div>
          <CardTitle>
            The markets are{" "}
            <strong className={sentimentColor}>{marketSentiment}</strong>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Recent sentiment on assets within your portfolio.
          </CardDescription>
        </div>
        <Button variant="link" size="xs">
          View All
        </Button>
      </CardHeader>
      <CardContent
        className="relative z-10"
        onClick={(e) => {
          if (e.target instanceof HTMLAnchorElement) {
            e.preventDefault()
            window.open(e.target.href, "_blank")
          }
        }}
      >
        <div className="space-y-4">
          {newsData &&
            newsData.length > 0 &&
            newsData.map((news: NewsArticle) => (
              <ArticleCard
                key={news.id}
                id={news.id}
                title={news.title}
                url={news.url}
                timePublished={news.timePublished}
                summary={news.summary}
                bannerImage={news.bannerImage}
                source={news.source}
                topics={news.topics as unknown as any}
                sentiment={news.sentiment}
                logo={news.logo}
              />
            ))}
        </div>
      </CardContent>
      <div
        className={`pointer-events-none absolute inset-0 z-0 h-[65%] w-[65%] -translate-x-[10%] -translate-y-[30%] rounded-full blur-3xl ${sentimentBackground}`}
      />
    </Card>
  )
}
