import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AssetAllocation() {
  const [activeTab, setActiveTab] = React.useState("all")

  const allocationData = [
    {
      name: "Apple Inc.",
      symbol: "AAPL",
      type: "Stock",
      amount: "$53,293",
      percentage: 19.62,
      color: "#0071BC",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      type: "Crypto",
      amount: 0.264,
      percentage: 19.62,
      color: "#F7931A",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      type: "Crypto",
      amount: 3.05,
      percentage: 12.28,
      color: "#627EEA",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      type: "Crypto",
      amount: 21390,
      percentage: 16.1,
      color: "#0033AD",
    },
    {
      name: "Algorand",
      symbol: "ALGO",
      type: "Crypto",
      amount: 44351,
      percentage: 11.66,
      color: "#222222",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      type: "Crypto",
      amount: 1096,
      percentage: 11.24,
      color: "#E6007A",
    },
    {
      name: "Power Ledger",
      symbol: "POWR",
      type: "Crypto",
      amount: 21017,
      percentage: 10.97,
      color: "#05BCAA",
    },
    {
      name: "SolarCoin",
      symbol: "SLR",
      type: "Crypto",
      amount: 104080,
      percentage: 9.61,
      color: "#FDB933",
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      type: "Crypto",
      amount: 304,
      percentage: 8.52,
      color: "#2A5ADA",
    },
  ]

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

  // Sort allocation data by percentage in descending order
  const sortedAllocationData = [...allocationData].sort(
    (a, b) => b.percentage - a.percentage
  )

  return (
    <Card className="rounded-3xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="pb-1">Current Allocation</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          <Icons.refresh className="mr-1 h-3 w-3" /> Rebalance
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="asset" onValueChange={(e) => setActiveTab(e)}>
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
        <div
          className="mt-4 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gridAutoRows: "minmax(40px, auto)",
          }}
        >
          {sortedAllocationData.map((asset) => (
            <div
              key={asset.symbol}
              className="flex flex-col justify-between rounded-xl p-3 transition-all duration-300 ease-in-out hover:scale-105"
              style={{
                backgroundColor: asset.color + "20", // Add 20% opacity to the color
                borderLeft: `4px solid ${asset.color}`,
                gridColumn: `span ${Math.max(1, Math.round(asset.percentage / 5))}`,
                gridRow: `span ${Math.max(1, Math.round(asset.percentage / 5))}`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getAssetTypeIcon(asset.type)}
                  <span className="font-semibold">{asset.name}</span>
                </div>
                <span className="text-xs text-gray-500">{asset.symbol}</span>
              </div>
              <div className="mt-2 text-lg font-bold">
                {asset.amount.toLocaleString()}
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {asset.percentage.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
