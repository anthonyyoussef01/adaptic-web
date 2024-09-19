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
      class: "Buy Shares",
      status: "Proposed",
      buyPrice: "$178.00",
      volume: "500",
      targetPrice: "$190.00",
      stopLoss: "$170.00",
      summary:
        "With recent product launches and a strategic shift toward India, Apple is set for solid growth. Analysts are optimistic despite short-term volatility.",
      projectedProfit: "$6000.00",
      confidence: "75%",
    },
    {
      assetName: "Bitcoin",
      ticker: "BTC",
      logo: "https://logo.clearbit.com/bitcoin.org",
      class: "Crypto",
      status: "Active",
      buyPrice: "$26,500.00",
      volume: "1.5",
      targetPrice: "$30,000.00",
      stopLoss: "$24,000.00",
      summary:
        "Institutional interest in Bitcoin has been growing, with the potential approval of Bitcoin ETFs driving demand. However, market volatility remains high.",
      projectedProfit: "$5250.00",
      confidence: "65%",
    },
    {
      assetName: "Microsoft Corporation",
      ticker: "MSFT",
      logo: "https://logo.clearbit.com/microsoft.com",
      class: "Buy Shares",
      status: "Open",
      buyPrice: "$210.00",
      volume: "100",
      targetPrice: "$220.00",
      stopLoss: "$200.00",
      summary:
        "Microsoft's strong cloud services growth and recent acquisitions make it a solid choice for long-term investors.",
      projectedProfit: "$1000.00",
      confidence: "85%",
    },
    {
      assetName: "Nvidia, Inc.",
      ticker: "NVDA",
      logo: "https://logo.clearbit.com/nvidia.com",
      class: "Call Option",
      status: "Completed",
      buyPrice: "$485.00",
      volume: "2",
      targetPrice: "$510.00",
      stopLoss: "$460.00",
      summary:
        "Nvidia’s dominance in the AI hardware space and strong earnings growth have made it a tech stock favorite this year.",
      projectedProfit: "$5000.00",
      confidence: "90%",
    },
    {
      assetName: "Tesla Inc.",
      ticker: "TSLA",
      logo: "https://logo.clearbit.com/tesla.com",
      class: "Put Option",
      status: "Active",
      buyPrice: "$245.00",
      volume: "4",
      targetPrice: "$230.00",
      stopLoss: "$255.00",
      summary:
        "Recent competition in the EV market and production slowdowns suggest a potential near-term price drop for Tesla.",
      projectedProfit: "$3000.00",
      confidence: "70%",
    },
    {
      assetName: "Palantir Technologies",
      ticker: "PLTR",
      logo: "https://logo.clearbit.com/palantir.com",
      class: "Call Option",
      status: "Proposed",
      buyPrice: "$16.50.00",
      volume: "100",
      targetPrice: "$22.00",
      stopLoss: "$15.00",
      summary:
        "Palantir's strong positioning in the AI space and inclusion in the S&P 500 make it a compelling buy, despite market sensitivity.",
      projectedProfit: "$5500.00",
      confidence: "80%",
    },
    {
      assetName: "Amazon.com Inc.",
      ticker: "AMZN",
      logo: "https://logo.clearbit.com/amazon.com",
      class: "Buy Shares",
      status: "Active",
      buyPrice: "$135.00",
      volume: "50",
      targetPrice: "$150.00",
      stopLoss: "$125.00",
      summary:
        "Amazon's push into AI-driven cloud services and continued e-commerce dominance are expected to drive long-term growth.",
      projectedProfit: "$7500.00",
      confidence: "85%",
    },
    {
      assetName: "Ethereum",
      ticker: "ETH",
      logo: "https://logo.clearbit.com/ethereum.org",
      class: "Crypto",
      status: "Completed",
      buyPrice: "$1,600.00",
      volume: "100",
      targetPrice: "$2,000.00",
      stopLoss: "$1,500.00",
      summary:
        "Ethereum’s upcoming protocol upgrades and growing DeFi applications make it a solid choice for long-term investors.",
      projectedProfit: "$40,000.00",
      confidence: "78%",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Trades</CardTitle>
        <Button
          variant="link"
          size="xs"
          className="mt-1 flex items-center space-x-1"
        >
          <span>View All</span>
          <Icons.arrowRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={(e) => setActiveTab(e)}>
          <TabsList className="bg-transparent -ml-1">
            <TabsTrigger value="all" className="font-semibold">
              All
            </TabsTrigger>
            <TabsTrigger value="proposed" className="font-semibold">
              Proposed
            </TabsTrigger>
            <TabsTrigger value="open" className="font-semibold">
              Open Orders
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
              <Card key={index} className="relative pb-14 shadow-sm">
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
                            {trade.class === "Buy Shares" ? (
                              <Icons.stock className="size-3" />
                            ) : trade.class === "Crypto" ? (
                              <Icons.crypto className="size-3" />
                            ) : (
                              <Icons.options className="size-3" />
                            )}
                            <p className="sr-only">{trade.class}</p>
                          </TooltipTrigger>
                          <TooltipContent className="mb-2 mr-4">
                            <div className="flex items-center space-x-2">
                              {trade.class === "Buy Shares" ? (
                                <Icons.stock className="size-3" />
                              ) : trade.class === "Crypto" ? (
                                <Icons.crypto className="size-3" />
                              ) : (
                                <Icons.options className="size-3" />
                              )}
                              <p className="text-semibold text-sm">
                                {trade.class}
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
                              : trade.status === "Open"
                                ? "blue"
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
                      <p className="text-lg font-bold">
                        {trade.projectedProfit}
                      </p>
                      <span className="text-sm font-bold text-green-500">
                        +3.4%
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
