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
import { PortfolioChart } from "@/components/chart/PortfolioChart"

// Generate a larger array of dummy data (timestamps and prices)
const generateDummyData = () => {
  const data = []
  const startDate = new Date("2024-01-01").getTime()
  const endDate = new Date("2024-12-31").getTime()

  for (
    let timestamp = startDate;
    timestamp <= endDate;
    timestamp += 60 * 60 * 1000
  ) {
    const price = 490000000 + Math.random() * 50000000 - 4900000
    data.push({ date: new Date(timestamp).toISOString(), close: price })
  }

  return data
}

const PortfolioOverview: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("1m")
  const [selectedInterval, setSelectedInterval] = React.useState("1d")
  const [filteredData, setFilteredData] = React.useState<
    { date: string; close: number }[]
  >([])

  const dummyData = generateDummyData()

  // Define timeframes and intervals
  const timeframes = [
    { label: "Last 24 hours", value: "1d" },
    { label: "Last 7 days", value: "1w" },
    { label: "Last 30 days", value: "1m" },
    { label: "Last 3 months", value: "3m" },
    { label: "YTD", value: "ytd" },
    { label: "All time", value: "all" },
  ]

  const getIntervalsForTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case "1d":
        return [
          { label: "1 min", value: "1min" },
          { label: "3 min", value: "3min" },
          { label: "5 min", value: "5min" },
          { label: "15 min", value: "15min" },
          { label: "30 min", value: "30min" },
          { label: "1 hour", value: "1h" },
        ]
      case "1m":
      case "3m":
        return [
          { label: "1 hour", value: "1h" },
          { label: "3 hours", value: "3h" },
          { label: "1 day", value: "1d" },
          { label: "3 days", value: "3d" },
        ]
      case "ytd":
      case "all":
        return [
          { label: "1 day", value: "1d" },
          { label: "1 week", value: "1w" },
          { label: "1 month", value: "1m" },
        ]
      default:
        return [{ label: "1 day", value: "1d" }]
    }
  }

  // Helper function to filter data based on selected timeframe and interval
  const filterData = (timeframe: string, interval: string) => {
    const now = new Date().getTime()
    let startTime

    switch (timeframe) {
      case "1d":
        startTime = now - 24 * 60 * 60 * 1000
        break
      case "1w":
        startTime = now - 7 * 24 * 60 * 60 * 1000
        break
      case "1m":
        startTime = now - 30 * 24 * 60 * 60 * 1000
        break
      case "3m":
        startTime = now - 3 * 30 * 24 * 60 * 60 * 1000
        break
      case "ytd":
        startTime = new Date(new Date().getFullYear(), 0, 1).getTime()
        break
      default:
        startTime = new Date("2024-01-01").getTime()
    }

    const filtered = dummyData.filter((dataPoint) => {
      const timestamp = new Date(dataPoint.date).getTime()
      return timestamp >= startTime && timestamp <= now
    })

    // Adjust data based on interval (e.g., 1h, 1d, etc.)
    const intervalMilliseconds: { [key: string]: number } = {
      "1min": 60 * 1000,
      "3min": 3 * 60 * 1000,
      "5min": 5 * 60 * 1000,
      "15min": 15 * 60 * 1000,
      "30min": 30 * 60 * 1000,
      "1h": 60 * 60 * 1000,
      "3h": 3 * 60 * 60 * 1000,
      "1d": 24 * 60 * 60 * 1000,
      "3d": 3 * 24 * 60 * 60 * 1000,
    }

    const filteredByInterval = filtered.filter((_, index) => {
      return (
        index %
          Math.floor(intervalMilliseconds[interval] / (60 * 60 * 1000)) ===
        0
      )
    })

    return filteredByInterval
  }

  React.useEffect(() => {
    const newData = filterData(selectedTimeframe, selectedInterval)
    setFilteredData(newData.length > 0 ? newData : dummyData)
  }, [selectedTimeframe, selectedInterval])

  const intervalOptions = getIntervalsForTimeframe(selectedTimeframe)

  const performanceMetrics = [
    { label: "Total AUM", value: "$500,000,000", change: "+3.05%" },
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
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center space-x-1 pr-2"
              >
                <span>
                  {
                    timeframes.find((tf) => tf.value === selectedTimeframe)
                      ?.label
                  }
                </span>
                <Icons.chevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {timeframes.map((timeframe) => (
                <DropdownMenuItem
                  key={timeframe.value}
                  onSelect={() => {
                    setSelectedTimeframe(timeframe.value)
                    setSelectedInterval(
                      getIntervalsForTimeframe(timeframe.value)[0].value
                    ) // Reset interval based on new timeframe
                  }}
                >
                  {timeframe.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center space-x-1 pr-2"
              >
                <span>
                  {
                    intervalOptions.find(
                      (intv) => intv.value === selectedInterval
                    )?.label
                  }
                </span>
                <Icons.chevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {intervalOptions.map((interval) => (
                <DropdownMenuItem
                  key={interval.value}
                  onSelect={() => setSelectedInterval(interval.value)}
                >
                  {interval.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

        <div className="-mr-3">
          <PortfolioChart />
        </div>

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
