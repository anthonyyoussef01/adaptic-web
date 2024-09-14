"use client"

import { useState, useEffect, SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

import { Icons } from "@/components/ui/icons"

const portfolioData = [
  { name: "Jan", value: 100000 },
  { name: "Feb", value: 120000 },
  { name: "Mar", value: 115000 },
  { name: "Apr", value: 130000 },
  { name: "May", value: 145000 },
  { name: "Jun", value: 160000 },
]

const assetData = [
  {
    name: "AAPL",
    type: "Stock",
    value: 150.25,
    change: 1.32,
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    name: "BTC",
    type: "Crypto",
    value: 35000,
    change: -2.5,
    logo: "https://logo.clearbit.com/bitcoin.org",
  },
  {
    name: "TSLA 700C",
    type: "Option",
    value: 15.5,
    change: 5.2,
    logo: "https://logo.clearbit.com/tesla.com",
  },
  {
    name: "ETH",
    type: "Crypto",
    value: 2250,
    change: 3.1,
    logo: "https://logo.clearbit.com/ethereum.org",
  },
  {
    name: "GOOGL",
    type: "Stock",
    value: 2800,
    change: -0.5,
    logo: "https://logo.clearbit.com/google.com",
  },
]

const getBackgroundColor = (url: string) => {
  // get the color of the edge pixels of the image
  const img = new Image()
  img.src = url
  img.crossOrigin = "Anonymous"
  img.onload = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    ctx.drawImage(img, 0, 0)
    const color = ctx.getImageData(0, 0, 1, 1).data
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`
  }
}

const aiRecommendations = [
  {
    asset: "AAPL",
    action: "Buy",
    confidence: 0.85,
    logo: "https://logo.clearbit.com/apple.com",
    backgroundColor: getBackgroundColor("https://logo.clearbit.com/apple.com"),
  },
  {
    asset: "BTC",
    action: "Hold",
    confidence: 0.72,
    logo: "https://logo.clearbit.com/bitcoin.org",
    backgroundColor: getBackgroundColor(
      "https://logo.clearbit.com/bitcoin.org"
    ),
  },
  {
    asset: "TSLA 700C",
    action: "Sell",
    confidence: 0.68,
    logo: "https://logo.clearbit.com/tesla.com",
    backgroundColor: getBackgroundColor("https://logo.clearbit.com/tesla.com"),
  },
]

const kpiData = [
  { label: "Total Returns", value: "$60,000", change: 15 },
  { label: "Win Rate", value: "65%", change: 5 },
  { label: "Average Return", value: "8%", change: 2 },
  { label: "Max Drawdown", value: "5%", change: -1 },
]

const positionData = [
  {
    symbol: "AAPL",
    quantity: 100,
    entryPrice: 140,
    currentPrice: 150,
    logo: "https://logo.clearbit.com/apple.com",
    backgroundColor: getBackgroundColor("https://logo.clearbit.com/apple.com"),
  },
  {
    symbol: "TSLA 700C",
    quantity: 10,
    entryPrice: 12,
    currentPrice: 15.5,
    logo: "https://logo.clearbit.com/tesla.com",
    backgroundColor: getBackgroundColor("https://logo.clearbit.com/tesla.com"),
  },
  {
    symbol: "ETH",
    quantity: 50,
    entryPrice: 2000,
    currentPrice: 2250,
    logo: "https://logo.clearbit.com/ethereum.org",
    backgroundColor: getBackgroundColor(
      "https://logo.clearbit.com/ethereum.org"
    ),
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
    title: "AAPL announces new product line.",
    sentiment: "Positive",
    source: "Bloomberg",
  },
  {
    id: 2,
    title: "Discussion on TSLA options strategies.",
    sentiment: "Neutral",
    source: "Reddit",
  },
  {
    id: 3,
    title: "Market volatility expected due to economic data.",
    sentiment: "Negative",
    source: "CNBC",
  },
]

const initialRiskAllocation = {
  Stocks: 50,
  Options: 30,
  Crypto: 20,
}

const calendarData = [
  { date: "2023-09-20", event: "Fed Interest Rate Decision" },
  { date: "2023-09-25", event: "AAPL Earnings Report" },
  { date: "2023-10-01", event: "Employment Data Release" },
]

const timeframes = ["1D", "1W", "1M", "3M", "1Y", "All"]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export default function Dashboard() {
  const [isAutomatedTrading, setIsAutomatedTrading] = useState(true)
  const [riskLevel, setRiskLevel] = useState(50)
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

  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")
  const [riskAllocation, setRiskAllocation] = useState(initialRiskAllocation)

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

  const totalRiskAllocation = Object.values(riskAllocation).reduce(
    (acc, val) => acc + val,
    0
  )

  const handleRiskChange = (assetType: string, value: number) => {
    setRiskAllocation((prev) => ({
      ...prev,
      [assetType]: value,
    }))
  }

  const riskData = Object.keys(riskAllocation).map(
    (key: "Stocks" | "Options" | "Crypto") => ({
      name: key,
      value: riskAllocation[key],
    })
  )

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column (Main Content) */}
        <div className="space-y-6 lg:col-span-3">
          {/* Portfolio Overview */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <CardTitle>Portfolio Overview</CardTitle>
                {/* Timeframe Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {selectedTimeframe}{" "}
                      <Icons.chevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {timeframes.map((timeframe) => (
                      <DropdownMenuItem
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                      >
                        {timeframe}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button
                variant="link"
                size="sm"
                className="flex items-center space-x-1 px-0"
              >
                <span>Go to Portfolio </span>
                <Icons.arrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Account Balance
                  </div>
                  <div className="text-xl font-bold">$200,000</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Buying Power
                  </div>
                  <div className="text-xl font-bold">$50,000</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Portfolio Value
                  </div>
                  <div className="text-xl font-bold">$160,000</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Open Orders
                  </div>
                  <div className="text-xl font-bold">3</div>
                </div>
              </div>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Key Performance Indicators */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Key Performance Indicators</CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {kpiData.map((kpi, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-muted p-3 shadow-lg shadow-black/10"
                  >
                    <div>
                      <div className="text-sm text-accent-foreground">
                        {kpi.label}
                      </div>
                      <div className="text-xl font-bold">{kpi.value}</div>
                    </div>
                    <div
                      className={
                        kpi.change >= 0
                          ? "font-bold text-teal-600"
                          : "font-bold text-red-600"
                      }
                    >
                      {kpi.change >= 0 ? "+" : ""}
                      {kpi.change}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Positions */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Positions</CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {positionData.map((position, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-white p-3 dark:bg-black"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="size-9 bg-neutral-50 shadow-md">
                        <AvatarImage
                          className="rounded-full border border-neutral-50 p-0.5"
                          src={position.logo}
                          alt={position.symbol}
                        />
                        <AvatarFallback>
                          <Icons.activity className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{position.symbol}</div>
                        <div className="text-sm text-muted-foreground">
                          Qty: {position.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${position.currentPrice}
                      </div>
                      <div
                        className={
                          position.currentPrice - position.entryPrice >= 0
                            ? "text-teal-600"
                            : "text-red-600"
                        }
                      >
                        {position.currentPrice - position.entryPrice >= 0
                          ? "+"
                          : ""}
                        {(
                          ((position.currentPrice - position.entryPrice) /
                            position.entryPrice) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI Recommendations</CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-muted p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="size-9 bg-neutral-50 shadow-md">
                        <AvatarImage
                          className="rounded-full border border-neutral-50 p-0.5"
                          src={rec.logo}
                          alt={rec.asset}
                        />
                        <AvatarFallback>
                          <Icons.activity className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-semibold">{rec.asset}</span>
                        <Badge
                          className="ml-2"
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
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Confidence: {(rec.confidence * 100).toFixed(1)}%
                      </span>
                      <Button size="sm">Execute</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-1">
          {/* Trading Activity */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trading Activity</CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="max-h-[300px] space-y-2 overflow-y-auto">
                {tradeFeed.slice(0, 5).map((trade) => (
                  <li
                    key={trade.id}
                    className="flex items-center justify-between rounded-lg border p-2 text-sm shadow-2xl shadow-black/10 lg:text-xs"
                  >
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center space-x-2">
                        {trade.action === "Buy" ? (
                          <Icons.arrowUp className="h-4 w-4 text-teal-600" />
                        ) : (
                          <Icons.arrowDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className="font-extrabold">{trade.asset}</span>
                      </div>
                      <div>
                        {trade.action} {trade.amount} @ ${trade.price}
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(trade.timestamp).toLocaleTimeString()}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Alerts and Notifications */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                <div className="flex items-center space-x-2">
                  <Icons.bell className="h-4 w-4" />
                  <span>Notifications</span>
                </div>
              </CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {alertsData.map((alert) => (
                  <li
                    key={alert.id}
                    className={`flex items-center space-x-2 rounded-lg border p-2 ${
                      alert.type === "success"
                        ? "border-l-4 border-teal-600"
                        : alert.type === "warning"
                          ? "border-l-4 border-yellow-600"
                          : "border-l-4 border-red-600"
                    }`}
                  >
                    <Icons.alertTriangle
                      className={`h-4 w-4 shrink-0 lg:h-3.5 lg:w-3.5 ${
                        alert.type === "success"
                          ? "text-teal-600"
                          : alert.type === "warning"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    />
                    <span className="text-sm lg:text-xs">{alert.message}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent News and Sentiment */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Market Sentiment</CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {newsData.map((news) => (
                  <li
                    key={news.id}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-semibold leading-4">
                        {news.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {news.source}
                      </div>
                    </div>
                    <Badge
                      variant={
                        news.sentiment === "Positive"
                          ? "green"
                          : news.sentiment === "Negative"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {news.sentiment}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Major Events */}
          <Card className="shadow-black/10 rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                <div className="flex items-center space-x-2">
                  <Icons.calendar className="h-4 w-4" />
                  <span>Major Events</span>
                </div>
              </CardTitle>
              <Button variant="link" size="sm" className="px-0">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {calendarData.map((event, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-semibold leading-4">
                        {event.event}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                    <Button size="sm" variant="secondary">
                      Details
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
