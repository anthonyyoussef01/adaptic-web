"use client"
import { Suspense } from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { AssetAllocation } from "./allocation"
import PortfolioOverview from "./portfolio-overview"
import { AIInsights } from "./ai-insights"
import { Trades } from "@/components/dashboard/trades"
import { CardDescription } from "../ui/card copy"
import {
  MarketSentiment,
  NewsArticle,
} from "@/components/markets/market-sentiment"
import PerformanceMetrics from "@/components/dashboard/performance-metrics"

// Utility functions
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value)
}

const getBackgroundColor = (url: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      // Server-side, return null
      resolve(null)
      return
    }

    const img = new Image()
    img.crossOrigin = "Anonymous"
    img.src = url
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
      ctx.drawImage(img, 0, 0)
      const color = ctx.getImageData(0, 0, 1, 1).data
      resolve(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`)
    }
    img.onerror = () => {
      resolve(null)
    }
  })
}

const initialPositionData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 50,
    entryPrice: 140,
    currentPrice: 150,
    logo: "https://logo.clearbit.com/apple.com",
    allocation: "19.62%",
    value: 7500,
  },
  {
    symbol: "TSLA 700C",
    name: "Tesla Call Option",
    quantity: 5,
    entryPrice: 12,
    currentPrice: 15.5,
    logo: "https://logo.clearbit.com/tesla.com",
    allocation: "11.24%",
    value: 77.5,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    quantity: 3.05,
    entryPrice: 2000,
    currentPrice: 2250,
    logo: "https://logo.clearbit.com/ethereum.org",
    allocation: "8.52%",
    value: 6862.5,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    quantity: 0.264,
    entryPrice: 35000,
    currentPrice: 37500,
    logo: "https://logo.clearbit.com/bitcoin.org",
    allocation: "12.28%",
    value: 9900,
  },
  {
    symbol: "EUR/USD",
    name: "EUR/USD",
    quantity: 10000,
    entryPrice: 1.12,
    currentPrice: 1.13,
    logo: "https://logo.clearbit.com/forex.com",
    allocation: "16.10%",
    value: 11300,
  },
  {
    symbol: "SPY",
    name: "S&P 500 ETF",
    quantity: 20,
    entryPrice: 400,
    currentPrice: 410,
    logo: "https://logo.clearbit.com/spdrs.com",
    allocation: "11.66%",
    value: 8200,
  },
  {
    symbol: "GC",
    name: "Gold Futures",
    quantity: 1,
    entryPrice: 1800,
    currentPrice: 1850,
    logo: "https://logo.clearbit.com/cmegroup.com",
    allocation: "10.97%",
    value: 1850,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    quantity: 30,
    entryPrice: 280,
    currentPrice: 290,
    logo: "https://logo.clearbit.com/microsoft.com",
    allocation: "9.61%",
    value: 8700,
  },
]

const initialAiRecommendations = [
  {
    asset: "AAPL",
    action: "Buy",
    confidence: 0.85,
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    asset: "BTC",
    action: "Hold",
    confidence: 0.72,
    logo: "https://logo.clearbit.com/bitcoin.org",
  },
  {
    asset: "TSLA 700C",
    action: "Sell",
    confidence: 0.68,
    logo: "https://logo.clearbit.com/tesla.com",
  },
]

const alertsData = [
  { id: 1, message: "AAPL reached your target price.", type: "success" },
  { id: 2, message: "TSLA option is expiring soon.", type: "warning" },
  { id: 3, message: "Account balance low for upcoming trades.", type: "error" },
]

const newsData = [
  {
    id: 1,
    title: "AAPL announces new product line",
    sentiment: "Positive",
    source: "Bloomberg",
    logo: "https://logo.clearbit.com/bloomberg.com",
  },
  {
    id: 2,
    title: "Discussion on TSLA options strategies",
    sentiment: "Neutral",
    source: "Reddit",
    logo: "https://logo.clearbit.com/reddit.com",
  },
  {
    id: 3,
    title: "Market volatility expected due to economic data",
    sentiment: "Negative",
    source: "CNBC",
    logo: "https://logo.clearbit.com/cnbc.com",
  },
]

const calendarData = [
  { date: "2023-09-20", event: "Fed Interest Rate Decision" },
  { date: "2023-09-25", event: "AAPL Earnings Report" },
  { date: "2023-10-01", event: "Employment Data Release" },
]

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
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
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")
  const [aiRecommendations, setAiRecommendations] = useState(
    initialAiRecommendations
  )
  const [positionData, setPositionData] = useState(initialPositionData)
  const [tradeFeed, setTradeFeed] = useState([
    {
      id: 1,
      asset: "AAPL",
      action: "Buy",
      amount: 10,
      price: 150.25,
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      asset: "BTC",
      action: "Sell",
      amount: 0.5,
      price: 35000,
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    },
  ])

  useEffect(() => {
    let isMounted = true

    const fetchBackgroundColors = async () => {
      const updatedRecommendations = await Promise.all(
        aiRecommendations.map(async (rec) => {
          const bgColor = await getBackgroundColor(rec.logo)
          return { ...rec, backgroundColor: bgColor || "transparent" }
        })
      )

      const updatedPositions = await Promise.all(
        positionData.map(async (position) => {
          const bgColor = await getBackgroundColor(position.logo)
          return { ...position, backgroundColor: bgColor || "transparent" }
        })
      )

      if (isMounted) {
        setAiRecommendations(updatedRecommendations)
        setPositionData(updatedPositions)
      }
    }

    fetchBackgroundColors()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade = generateRandomTrade()
      setTradeFeed((prevFeed) => [newTrade, ...prevFeed.slice(0, 9)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const generateRandomTrade = () => {
    const assets = ["AAPL", "GOOGL", "TSLA", "BTC", "ETH"]
    const actions = ["Buy", "Sell"]
    const asset = assets[Math.floor(Math.random() * assets.length)]
    const action = actions[Math.floor(Math.random() * actions.length)]
    const amount = Math.floor(Math.random() * 100) + 1
    const price = Math.random() * 1000 + 100
    return {
      id: Date.now(),
      asset,
      action,
      amount,
      price: Number(price.toFixed(2)),
      timestamp: new Date().toISOString(),
    }
  }

  const totalAssets = positionData.reduce(
    (sum, position) => sum + position.value,
    0
  )

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

            {/* Current Positions */}
            {/* <Card className="rounded-3xl shadow-2xl shadow-black/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Positions</CardTitle>
              <Button variant="link" size="xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positionData.slice(0, 5).map((position) => (
                  <div
                    key={position.symbol}
                    className="flex items-center justify-between rounded-lg border bg-card p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={position.logo} alt={position.name} />
                        <AvatarFallback>{position.symbol}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{position.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {position.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(position.value)}
                      </p>
                      <p
                        className={`text-sm ${position.currentPrice > position.entryPrice ? "text-green-600" : "text-red-600"}`}
                      >
                        {(
                          ((position.currentPrice - position.entryPrice) /
                            position.entryPrice) *
                          100
                        ).toFixed(2)}
                        %
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

            {/* AI Recommendations */}
            {/* <Card className="rounded-3xl shadow-2xl shadow-black/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI Recommendations</CardTitle>
              <Button variant="link" size="xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div
                    key={rec.asset}
                    className="flex items-center justify-between rounded-lg border bg-card p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={rec.logo} alt={rec.asset} />
                        <AvatarFallback>{rec.asset}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{rec.asset}</p>
                        <Badge
                          variant={
                            rec.action === "Buy"
                              ? "default"
                              : rec.action === "Sell"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {rec.action}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        Confidence: {(rec.confidence * 100).toFixed(0)}%
                      </p>
                      <Button size="sm">Execute</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
            {/* <AIInsights /> */}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Trading Activity */}
            {/* <Card className="rounded-3xl shadow-2xl shadow-black/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trading Activity</CardTitle>
              <Button variant="link" size="xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tradeFeed.slice(0, 5).map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      {trade.action === "Buy" ? (
                        <Icons.arrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <Icons.arrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-semibold">{trade.asset}</span>
                    </div>
                    <div>
                      {trade.action} {trade.amount} @{" "}
                      {formatCurrency(trade.price)}
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(trade.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

            {/* Alerts and Notifications */}
            {/* <Card className="rounded-3xl shadow-2xl shadow-black/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Button variant="link" size="xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsData.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center space-x-2 rounded-lg p-2 text-sm ${
                      alert.type === "success"
                        ? "border border-green-500 bg-green-100 text-green-800 dark:border-green-600 dark:bg-green-600/10 dark:text-green-100"
                        : alert.type === "warning"
                          ? "border border-yellow-500 bg-yellow-100 text-yellow-800 dark:border-yellow-600 dark:bg-yellow-600/10 dark:text-yellow-100"
                          : "border border-red-500 bg-red-100 text-red-800 dark:border-red-600 dark:bg-red-600/10 dark:text-red-100"
                    }`}
                  >
                    <Icons.alertTriangle className="h-5 w-5" />
                    <span>{alert.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

            <MarketSentiment
              sentimentColor={sentimentColor}
              sentimentBackground={sentimentBackground}
              newsData={news as any}
              marketSentiment={marketSentiment}
            />

            {/* Major Events */}
            <Card className="rounded-none shadow-2xl shadow-black/10 sm:rounded-3xl">
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
