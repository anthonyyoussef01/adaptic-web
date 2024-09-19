import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import React from "react"
import { Icons } from "@/components/ui/icons"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function Trades() {
  const [activeTab, setActiveTab] = React.useState("all")
  const trades = [
    {
      assetName: "Apple Inc.",
      ticker: "AAPL",
      logo: "https://logo.clearbit.com/apple.com",
      type: "Stocks",
      status: "Proposed",
      buyPrice: "$178",
      volume: "500",
      targetPrice: "$190",
      stopLoss: "$170",
      summary:
        "With recent product launches and a strategic shift toward India, Apple is set for solid growth. Analysts are optimistic despite short-term volatility.",
      projectedProfit: "$6000",
      confidence: "75%",
    },
    {
      assetName: "Bitcoin",
      ticker: "BTC",
      logo: "https://logo.clearbit.com/bitcoin.org",
      type: "Crypto",
      status: "Active",
      buyPrice: "$26,500",
      volume: "1.5",
      targetPrice: "$30,000",
      stopLoss: "$24,000",
      summary:
        "Institutional interest in Bitcoin has been growing, with the potential approval of Bitcoin ETFs driving demand. However, market volatility remains high.",
      projectedProfit: "$5250",
      confidence: "65%",
    },
    {
      assetName: "Nvidia, Inc.",
      ticker: "NVDA",
      logo: "https://logo.clearbit.com/nvidia.com",
      type: "Call Option",
      status: "Completed",
      buyPrice: "$485",
      volume: "2",
      targetPrice: "$510",
      stopLoss: "$460",
      summary:
        "Nvidia’s dominance in the AI hardware space and strong earnings growth have made it a tech stock favorite this year.",
      projectedProfit: "$5000",
      confidence: "90%",
    },
    {
      assetName: "Tesla Inc.",
      ticker: "TSLA",
      logo: "https://logo.clearbit.com/tesla.com",
      type: "Put Option",
      status: "Active",
      buyPrice: "$245",
      volume: "4",
      targetPrice: "$230",
      stopLoss: "$255",
      summary:
        "Recent competition in the EV market and production slowdowns suggest a potential near-term price drop for Tesla.",
      projectedProfit: "$3000",
      confidence: "70%",
    },
    {
      assetName: "Palantir Technologies",
      ticker: "PLTR",
      logo: "https://logo.clearbit.com/palantir.com",
      type: "Call Option",
      status: "Proposed",
      buyPrice: "$16.50",
      volume: "100",
      targetPrice: "$22",
      stopLoss: "$15",
      summary:
        "Palantir's strong positioning in the AI space and inclusion in the S&P 500 make it a compelling buy, despite market sensitivity.",
      projectedProfit: "$5500",
      confidence: "80%",
    },
    {
      assetName: "Amazon.com Inc.",
      ticker: "AMZN",
      logo: "https://logo.clearbit.com/amazon.com",
      type: "Stocks",
      status: "Active",
      buyPrice: "$135",
      volume: "50",
      targetPrice: "$150",
      stopLoss: "$125",
      summary:
        "Amazon's push into AI-driven cloud services and continued e-commerce dominance are expected to drive long-term growth.",
      projectedProfit: "$7500",
      confidence: "85%",
    },
    {
      assetName: "Ethereum",
      ticker: "ETH",
      logo: "https://logo.clearbit.com/ethereum.org",
      type: "Crypto",
      status: "Completed",
      buyPrice: "$1,600",
      volume: "100",
      targetPrice: "$2,000",
      stopLoss: "$1,500",
      summary:
        "Ethereum’s upcoming protocol upgrades and growing DeFi applications make it a solid choice for long-term investors.",
      projectedProfit: "$40,000",
      confidence: "78%",
    },
  ]

  return (
    <div className="pt-4">
      <div className="mb-6 flex items-center space-x-4">
        <h2 className="text-2xl font-semibold">Trades</h2>
        <Button variant="link" size="xs" className="mt-1">
          View All
        </Button>
      </div>
      <Tabs defaultValue="all" onValueChange={(e) => setActiveTab(e)}>
        <TabsList className="bg-transparent">
          <TabsTrigger value="all" className="font-semibold">
            All
          </TabsTrigger>
          <TabsTrigger value="proposed" className="font-semibold">
            Proposed
          </TabsTrigger>
          <TabsTrigger value="active" className="font-semibold">
            Active
          </TabsTrigger>
          <TabsTrigger value="completed" className="font-semibold">
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {trades
          .filter((trade) => {
            if (activeTab === "all") return true
            return trade.status.toLowerCase() === activeTab
          })
          .slice(0, 6)
          .map((trade, index) => (
            <Card key={index} className="relative pb-14">
              <div className="flex justify-between">
                <CardHeader className="flex w-full flex-row items-start justify-between">
                  <CardTitle className="-mt-1 text-xl">
                    <div className="flex items-center space-x-1.5 text-xl font-bold">
                      <Avatar size="xs" className="bg-white p-0.5">
                        <AvatarImage
                          src={trade.logo}
                          alt={trade.assetName}
                          className="rounded-full"
                        />
                        <AvatarFallback>{trade.assetName[0]}</AvatarFallback>
                      </Avatar>
                      <span>{trade.assetName}</span>
                      <p className="pt-1 text-sm font-semibold text-gray-500">
                        {trade.ticker}
                      </p>
                    </div>
                  </CardTitle>

                  <div className="flex items-center space-x-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {trade.type === "Stocks" ? (
                            <Icons.stock className="size-3" />
                          ) : trade.type === "Crypto" ? (
                            <Icons.crypto className="size-3" />
                          ) : (
                            <Icons.options className="size-3" />
                          )}
                          <p className="sr-only">{trade.type}</p>
                        </TooltipTrigger>
                        <TooltipContent className="mb-2 mr-4">
                          <div className="flex items-center space-x-2">
                            {trade.type === "Stocks" ? (
                              <Icons.stock className="size-3" />
                            ) : trade.type === "Crypto" ? (
                              <Icons.crypto className="size-3" />
                            ) : (
                              <Icons.options className="size-3" />
                            )}
                            <p className="text-semibold text-sm">
                              {trade.type}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Badge
                      variant={
                        trade.status === "Proposed"
                          ? "outline"
                          : trade.status === "Active"
                            ? "green"
                            : "default"
                      }
                      animate={trade.status === "Active"}
                      className="h-5 px-2 text-[10px]"
                    >
                      {trade.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
              </div>

              <CardContent className="-mt-1">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Buy</p>
                    <p className="text-base font-bold">{trade.buyPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="text-base font-bold">{trade.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target</p>
                    <p className="text-base font-bold">{trade.targetPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stop Loss</p>
                    <p className="text-base font-bold">{trade.stopLoss}</p>
                  </div>
                </div>

                <div className="mt-2.5">
                  <p className="text-sm text-muted-foreground">Rationale</p>
                  <p className="ellipsis-2 line-clamp-2 text-sm">
                    {trade.summary}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="absolute bottom-0 ">
                <div>
                  <p className="text-sm font-semibold">Projected Profit</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold">{trade.projectedProfit}</p>
                    <span className="text-sm font-bold text-green-500">
                      +3.4%
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
