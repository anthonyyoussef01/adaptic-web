import React from "react"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import AreaClosedChart from "@/components/chart/AreaClosedChart"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`
}

const PortfolioOverview: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("1m")

  const chartQuotes = [
    { date: "2024-10-25", close: 490000000 },
    { date: "2024-11-01", close: 500000000 },
    { date: "2024-11-05", close: 510000000 },
    { date: "2024-11-10", close: 495000000 },
    { date: "2024-11-15", close: 505000000 },
    { date: "2024-11-20", close: 500000000 },
  ]

  const timeframes = [
    { label: "Last 24 hours", value: "1d" },
    { label: "Last 7 days", value: "1w" },
    { label: "Last 30 days", value: "1m" },
    { label: "Last 3 months", value: "3m" },
    { label: "YTD", value: "ytd" },
    { label: "All time", value: "all" },
  ]

  const performanceMetrics = [
    { label: "Total AUM", value: formatCurrency(500000000), change: "+3.05%" },
    { label: "YTD Return", value: "15.81%", change: "+6,801,190" },
    { label: "Net Return (After Fees)", value: "14.22%", change: "+6,120,000" },
  ]

  const riskMetrics = [
    { label: "Sharpe Ratio", value: "1.8" },
    { label: "Volatility", value: "12.5%" },
    { label: "Max Drawdown", value: "8.3%" },
  ]

  const executionMetrics = [
    { label: "Win Rate", value: "68%" },
    { label: "Avg. Return/Trade", value: "1.34%" },
    { label: "Avg. Execution Time", value: "0.42s" },
  ]

  return (
    <Card className="rounded-2xl shadow-2xl shadow-black/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio Overview</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center space-x-1 pr-2"
            >
              <span>
                {timeframes.find((tf) => tf.value === selectedTimeframe)?.label}
              </span>
              <Icons.chevronDown className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {timeframes.map((timeframe) => (
              <DropdownMenuItem
                key={timeframe.value}
                onSelect={() => setSelectedTimeframe(timeframe.value)}
              >
                {timeframe.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="mb-6 grid grid-cols-3 gap-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index}>
              <p className="text-gray-500">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
              <p
                className={`text-sm ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {metric.change}
              </p>
            </div>
          ))}
        </div>

        <AreaClosedChart
          chartQuotes={chartQuotes}
          range={selectedTimeframe}
          hideTimePicker
        />

        <div className="mt-6 grid grid-cols-3 gap-4">
          {riskMetrics.map((metric, index) => (
            <div key={index}>
              <p className="text-gray-500">{metric.label}</p>
              <p className="text-xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {executionMetrics.map((metric, index) => (
            <div key={index}>
              <p className="text-gray-500">{metric.label}</p>
              <p className="text-xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PortfolioOverview
