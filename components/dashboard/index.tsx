"use client"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AssetAllocation } from "./allocation"
import PortfolioOverview from "./portfolio-overview"
import { Trades } from "@/components/dashboard/trades"
import { MarketSentiment } from "@/components/markets/market-sentiment"
import { NewsArticle } from "@/types/news"
import PerformanceMetrics from "@/components/dashboard/performance-metrics"

const calendarData = [
  { date: "2023-09-20", event: "Fed Interest Rate Decision" },
  { date: "2023-09-25", event: "AAPL Earnings Report" },
  { date: "2023-10-01", event: "Employment Data Release" },
]

interface DashboardProps {
  news: NewsArticle[]
  marketSentiment: string
  sentimentColor: string
  sentimentBackground: string
}

export default function Dashboard({
  news,
  marketSentiment,
  sentimentColor,
  sentimentBackground,
}: DashboardProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Portfolio Overview */}
            <PortfolioOverview />

            {/* Metrics */}
            <PerformanceMetrics />

            {/* Trades */}
            <div className="w-full">
              <Trades />
            </div>

            {/* Asset Allocation */}
            <AssetAllocation />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Market Sentiment */}
            <MarketSentiment
              sentimentColor={sentimentColor}
              sentimentBackground={sentimentBackground}
              newsData={news as any}
              marketSentiment={marketSentiment}
            />

            {/* Major Events */}
            <Card className="rounded-none border-none sm:border-solid shadow-2xl shadow-black/10 sm:rounded-3xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Major Events</CardTitle>
                <Button variant="link" size="xs">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calendarData.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <div>
                        <p className="font-semibold">{event.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
