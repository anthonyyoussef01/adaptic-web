import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
export function AssetAllocation() {
  const [activeTab, setActiveTab] = React.useState("asset")

  const allocationData = [
    {
      name: "Apple Inc.",
      symbol: "AAPL",
      type: "Stock",
      amount: "$1,769,000",
      geography: "USA",
      exchange: "NASDAQ",
      sector: "Technology",
      color: "#0071BC",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      type: "Crypto",
      amount: "$724,000",
      geography: "Decentralized",
      exchange: "Alpaca",
      sector: "Cryptocurrency",
      color: "#F7931A",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      type: "Crypto",
      amount: "$533,000",
      geography: "Decentralized",
      exchange: "Alpaca",
      sector: "Cryptocurrency",
      color: "#627EEA",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      type: "Crypto",
      amount: "$56,000",
      geography: "Decentralized",
      exchange: "Alpaca",
      sector: "Cryptocurrency",
      color: "#0033AD",
    },
    {
      name: "Tesla Inc.",
      symbol: "TSLA",
      type: "Stock",
      amount: "$864,000",
      geography: "USA",
      exchange: "NASDAQ",
      sector: "Technology",
      color: "#CC0000",
    },
    {
      name: "Amazon.com Inc.",
      symbol: "AMZN",
      type: "Stock",
      amount: "$1,461,000",
      geography: "USA",
      exchange: "NASDAQ",
      sector: "Technology",
      color: "#FF9900",
    },
    {
      name: "Microsoft Corporation",
      symbol: "MSFT",
      type: "Stock",
      amount: "$1,159,000",
      geography: "USA",
      exchange: "NASDAQ",
      sector: "Technology",
      color: "#F35325",
    },
    {
      name: "Nvidia Corporation",
      symbol: "NVDA",
      type: "Stock",
      amount: "$1,659,000",
      geography: "USA",
      exchange: "NASDAQ",
      sector: "Technology",
      color: "#76B900",
    },
    {
      name: "Palantir Technologies Inc.",
      symbol: "PLTR",
      type: "Stock",
      amount: "$495,000",
      geography: "USA",
      exchange: "NYSE",
      sector: "Technology",
      color: "#222222",
    },
    {
      name: "Coca-Cola Company",
      symbol: "KO",
      type: "Stock",
      amount: "$80,000",
      geography: "USA",
      exchange: "NYSE",
      sector: "FMCG",
      color: "#FF0000",
    },
  ]

  // Helper function to parse amount strings to numbers
  const parseAmount = (amountStr: string) => {
    return parseFloat(amountStr.replace(/[$,]/g, ""))
  }

  // Calculate total amount
  const totalAmount = allocationData.reduce(
    (total, asset) => total + parseAmount(asset.amount),
    0
  )

  // Compute percentages for each asset
  const allocationDataWithComputedPercentages = allocationData.map((asset) => {
    const amount = parseAmount(asset.amount)
    const percentage = (amount / totalAmount) * 100
    return { ...asset, amount, percentage }
  })

  // Sort allocation data by percentage in descending order
  const sortedAllocationData = [...allocationDataWithComputedPercentages].sort(
    (a, b) => b.percentage - a.percentage
  )

  // Function to group data by a key (type, sector, geography)
  function getGroupedData(allocationData: any[], groupByKey: string) {
    const groups: { [key: string]: any } = {}
    allocationData.forEach((asset) => {
      const groupKey = asset[groupByKey]
      if (!groups[groupKey]) {
        groups[groupKey] = { groupKey, assets: [], totalAmount: 0 }
      }
      const amount = asset.amount // amount is already a number
      groups[groupKey].assets.push(asset)
      groups[groupKey].totalAmount += amount
    })

    // Compute percentages
    Object.values(groups).forEach((group: any) => {
      group.percentage = (group.totalAmount / totalAmount) * 100
    })

    // Convert groups object to array
    const groupedDataArray = Object.values(groups)

    // Sort by percentage descending
    groupedDataArray.sort((a, b) => b.percentage - a.percentage)

    return groupedDataArray
  }

  const classData = getGroupedData(
    allocationDataWithComputedPercentages,
    "type"
  )
  const sectorData = getGroupedData(
    allocationDataWithComputedPercentages,
    "sector"
  )
  const geographyData = getGroupedData(
    allocationDataWithComputedPercentages,
    "geography"
  )

  // Create a reusable component for allocation items
  const AllocationItem = ({
    title,
    subtitle,
    percentage,
    icon,
    color,
    maxPercentage,
    className,
  }: {
    title: string
    subtitle: string
    percentage: number
    icon: React.ReactNode
    color: string
    maxPercentage: number
    className?: string
  }) => {
    // Normalize percentage for grid width sizing
    const minSpanWidth = 8
    const maxSpanWidth = 24 // adjust as needed
    const gridSpanWidth = Math.max(
      minSpanWidth,
      Math.round((percentage / maxPercentage) * maxSpanWidth)
    )

    // Normalize percentage for grid sizing
    const minSpanHeight = 1
    const maxSpanHeight = 8 // adjust as needed
    const gridSpanHeight = Math.max(
      minSpanHeight,
      Math.round((percentage / maxPercentage) * maxSpanHeight)
    )

    return (
      <div
        className={cn(
          className && className,
          "flex max-w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-3 transition-all duration-300 ease-in-out hover:scale-105"
        )}
        style={{
          backgroundColor: color + "20", // Add 20% opacity to the color
          borderLeft: `4px solid ${color}`,
          gridColumn: `span ${gridSpanWidth}`,
          gridRow: `span ${gridSpanHeight}`,
        }}
      >
        <div className="">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="shrink-1 line-clamp-1 pr-2 font-semibold">
              {title}
            </span>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            {subtitle}
          </span>
        </div>
        {/* <div className="mt-2 text-lg font-bold">${amount.toLocaleString()}</div> */}
        <div className="mt-1 text-lg font-bold">{percentage.toFixed(2)}%</div>
      </div>
    )
  }

  // Function to render grid content
  const renderGridContent = (
    data: any[],
    getIcon: Function,
    getColor: Function,
    getSubtitle: Function
  ) => {
    // Find the maximum percentage in the data set for normalization
    const maxPercentage = Math.max(...data.map((item) => item.percentage))

    return (
      <div className="mt-4 grid w-full gap-2.5 md:gap-3 lg:gap-3.5">
        {data.map((item) => (
          <AllocationItem
            key={item.groupKey || item.symbol}
            title={item.groupKey || item.name}
            subtitle={getSubtitle(item)}
            percentage={item.percentage}
            icon={getIcon(item.groupKey || item.type)}
            color={getColor(item)}
            maxPercentage={maxPercentage}
          />
        ))}
      </div>
    )
  }

  // Define functions to get icons and colors for different tabs
  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case "Crypto":
        return <Icons.crypto className="h-4 w-4" />
      case "Stock":
        return <Icons.lineChart className="h-4 w-4" />
      case "Forex":
        return <Icons.currencyDollar className="h-4 w-4" />
      case "Option":
        return <Icons.options className="h-4 w-4" />
      default:
        return <Icons.help className="h-4 w-4" />
    }
  }

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "Technology":
        return <Icons.cpu className="h-4 w-4" />
      case "Cryptocurrency":
        return <Icons.crypto className="h-4 w-4" />
      case "FMCG":
        return <Icons.shoppingCart className="h-4 w-4" />
      default:
        return <Icons.help className="h-4 w-4" />
    }
  }

  const getGeographyIcon = (geography: string) => {
    switch (geography) {
      case "USA":
        return <Icons.usa className="h-4 w-4" />
      case "Decentralized":
        return <Icons.globe className="h-4 w-4" />
      default:
        return <Icons.help className="h-4 w-4" />
    }
  }

  const sectorColors: { [key: string]: string } = {
    Technology: "#0071BC",
    Cryptocurrency: "#F7931A",
    FMCG: "#FF0000",
  }

  const geographyColors: { [key: string]: string } = {
    USA: "#3C3B6E",
    Decentralized: "#00BFFF",
  }

  const getSubtitleForItem = (item: any) => {
    if (activeTab === "asset") {
      return item.symbol
    } else {
      return `${item.assets.length} ${
        item.assets.length === 1 ? "asset" : "assets"
      }`
    }
  }

  const getIconForItem = (key: string) => {
    if (activeTab === "asset") {
      return getAssetTypeIcon(key)
    } else if (activeTab === "class") {
      return getAssetTypeIcon(key)
    } else if (activeTab === "sector") {
      return getSectorIcon(key)
    } else if (activeTab === "geography") {
      return getGeographyIcon(key)
    } else {
      return <Icons.help className="h-4 w-4" />
    }
  }

  const getDataForActiveTab = () => {
    switch (activeTab) {
      case "asset":
        return sortedAllocationData
      case "class":
        return classData
      case "sector":
        return sectorData
      case "geography":
        return geographyData
      default:
        return []
    }
  }

  const getColor = (item: any) => {
    if (activeTab === "asset") {
      return item.color
    } else if (activeTab === "class") {
      return item.assets[0].color
    } else if (activeTab === "sector") {
      return sectorColors[item.groupKey] || "#cccccc"
    } else if (activeTab === "geography") {
      return geographyColors[item.groupKey] || "#cccccc"
    } else {
      return "#cccccc"
    }
  }

  return (
    <Card className="relative z-10 rounded-none border-none sm:border-solid shadow-2xl shadow-black/10 sm:rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="pb-1">Allocation</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          <Icons.refresh className="mr-1 h-3 w-3" /> Rebalance
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(e) => setActiveTab(e)}>
          <TabsList className="-ml-1 bg-transparent">
            <TabsTrigger value="asset" className="font-semibold">
              By Asset
            </TabsTrigger>
            <TabsTrigger value="class" className="font-semibold">
              By Class
            </TabsTrigger>
            <TabsTrigger value="sector" className="font-semibold">
              By Sector
            </TabsTrigger>
            <TabsTrigger value="geography" className="font-semibold">
              By Geography
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {renderGridContent(
          getDataForActiveTab(),
          getIconForItem,
          getColor,
          getSubtitleForItem
        )}
      </CardContent>
    </Card>
  )
}
