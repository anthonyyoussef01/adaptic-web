import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TradeCard } from "@/components/trades/trade-card"
import { TradeDetailModal } from "@/components/trades/trade-detail"
import { exec } from "child_process"
// ... other imports

export function Trades() {
  const [activeTab, setActiveTab] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [selectedTrade, setSelectedTrade] = React.useState(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }

  // Handle card click to open modal
  const handleCardClick = (trade: any) => {
    setSelectedTrade(trade)
    setIsModalOpen(true)
  }

  const trades = [
    {
      assetName: "Apple Inc.",
      ticker: "AAPL",
      logo: "https://logo.clearbit.com/apple.com",
      class: "Shares",
      status: "Staged",
      buyPrice: 178.0,
      currentPrice: 180.0,
      qty: 500,
      targetPrice: 190.0,
      stopLoss: 170.0,
      analysis:
        "With recent product launches and a strategic shift toward India, Apple is set for solid growth.",
      projectedProfit: 6000.0,
      confidence: "75%",
      strategy: "Growth",
      steps: [
        {
          sequence: 1,
          action: "enter",
          details: {
            buyPrice: 178.0,
            qty: 300,
            side: "buy",
            type: "market",
            stopLoss: 170.0,
            targetPrice: 190.0,
            note: "Buying 300 shares of AAPL as part of a growth strategy. Stop loss at $170, target price at $190.",
            executionTime: null,
          },
          status: "Planned",
        },
        {
          sequence: 2,
          action: "enter",
          details: {
            buyPrice: 175.0,
            qty: 200,
            side: "buy",
            type: "limit", // Placing another limit order for scaling in
            stopLoss: 170.0,
            targetPrice: 190.0,
            note: "Buying an additional 200 shares of AAPL if it dips to $175.",
            executionTime: null,
          },
          status: "Planned",
        },
        {
          sequence: 3,
          action: "exit",
          details: {
            targetPrice: 190.0,
            qty: 500,
            side: "sell",
            type: "limit",
            note: "Selling 500 shares of AAPL at target price of $190.",
            executionTime: null,
          },
          status: "Planned",
        },
      ],
    },
    {
      assetName: "Bitcoin",
      ticker: "BTC",
      logo: "https://logo.clearbit.com/bitcoin.org",
      class: "Crypto",
      status: "Open",
      executedAt: "20240920T123000",
      buyPrice: 26500.0,
      currentPrice: 28000.0,
      qty: 1.5,
      targetPrice: 30000.0,
      stopLoss: 24000.0,
      analysis:
        "Institutional interest in Bitcoin has been growing, with the potential approval of Bitcoin ETFs driving demand.",
      projectedProfit: 5250.0,
      confidence: "65%",
      strategy: "Volatility",
      steps: [
        {
          sequence: 1,
          action: "enter",
          details: {
            buyPrice: 26500.0,
            currentPrice: 28000.0,
            qty: 1.5,
            side: "buy",
            type: "bracket",
            stopLoss: 24000.0,
            targetPrice: 30000.0,
            note: "Buying 1.5 BTC. Stop loss set at $24000, take profit at $30000.",
            executionTime: "2024-09-20T12:30:00Z",
          },
          status: "Completed",
        },
        {
          sequence: 2,
          action: "hedge",
          details: {
            hedgeType: "put",
            hedgePrice: 24000.0,
            qty: 1,
            note: "Hedging with a put option in case of a price drop.",
            executionTime: null,
          },
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Microsoft Corporation",
      ticker: "MSFT",
      logo: "https://logo.clearbit.com/microsoft.com",
      class: "Shares",
      status: "Pending",
      buyPrice: 210.0,
      currentPrice: 215.0,
      qty: 100,
      targetPrice: 220.0,
      stopLoss: 200.0,
      analysis:
        "Microsoft's strong cloud services growth and recent acquisitions make it a solid choice for long-term investors.",
      projectedProfit: 1000.0,
      confidence: "85%",
    },
    {
      assetName: "Nvidia, Inc.",
      ticker: "NVDA",
      logo: "https://logo.clearbit.com/nvidia.com",
      class: "Call Option",
      status: "Closed",
      executedAt: "20240924T104005",
      buyPrice: 485.0,
      currentPrice: 500.0,
      qty: 2,
      targetPrice: 510.0,
      stopLoss: 460.0,
      analysis:
        "Nvidia’s dominance in the AI hardware space and strong earnings growth have made it a tech stock favorite this year.",
      projectedProfit: 5000.0,
      confidence: "90%",
    },
    {
      assetName: "Tesla Inc.",
      ticker: "TSLA",
      logo: "https://logo.clearbit.com/tesla.com",
      class: "Put Option",
      status: "Open",
      executedAt: "20240918T100000",
      buyPrice: 245.0,
      currentPrice: 240.0,
      qty: 50,
      targetPrice: 230.0,
      stopLoss: 255.0,
      analysis:
        "Recent competition in the EV market and production slowdowns suggest a potential near-term price drop for Tesla.",
      projectedProfit: 3000.0,
      confidence: "70%",
      strategy: "Hedging",
      steps: [
        {
          sequence: 1,
          action: "enter",
          details: {
            buyPrice: 245.0,
            qty: 50,
            side: "buy",
            type: "market",
            stopLoss: 255.0,
            targetPrice: 230.0,
            note: "Buying 4 Tesla put options to profit from a potential price drop.",
            executionTime: "2024-09-18T10:00:00Z",
          },
          status: "Open",
        },
        {
          sequence: 2,
          action: "hedge",
          details: {
            hedgeType: "call",
            hedgePrice: 255.0,
            qty: 2,
            note: "Hedging with 2 call options in case the Tesla price rises.",
            executionTime: null,
          },
          status: "Planned",
        },
      ],
    },
    {
      assetName: "Palantir Technologies",
      ticker: "PLTR",
      logo: "https://logo.clearbit.com/palantir.com",
      class: "Call Option",
      status: "Staged",
      buyPrice: 16.5,
      currentPrice: 18.0,
      qty: 100,
      targetPrice: 22.0,
      stopLoss: 15.0,
      analysis:
        "Palantir's strong positioning in the AI space and inclusion in the S&P 500 make it a compelling buy, despite market sensitivity.",
      projectedProfit: 5500.0,
      confidence: "80%",
    },
    {
      assetName: "Amazon.com Inc.",
      ticker: "AMZN",
      logo: "https://logo.clearbit.com/amazon.com",
      class: "Shares",
      status: "Open",
      executedAt: "20240925T090000",
      buyPrice: 135.0,
      currentPrice: 140.0,
      qty: 50,
      targetPrice: 150.0,
      stopLoss: 125.0,
      analysis:
        "Amazon's push into AI-driven cloud services and continued e-commerce dominance are expected to drive long-term growth.",
      projectedProfit: 7500.0,
      confidence: "85%",
    },
    {
      assetName: "Ethereum",
      ticker: "ETH",
      logo: "https://logo.clearbit.com/ethereum.org",
      class: "Crypto",
      status: "Closed",
      executedAt: "20240922T110000",
      buyPrice: 1600.0,
      currentPrice: 1800.0,
      qty: 100,
      targetPrice: 2000.0,
      stopLoss: 1500.0,
      analysis:
        "Ethereum’s upcoming protocol upgrades and growing DeFi applications make it a solid choice for long-term investors.",
      projectedProfit: 40000.0,
      confidence: "78%",
    },
    {
      assetName: "Alphabet Inc.",
      ticker: "GOOGL",
      logo: "https://logo.clearbit.com/abc.xyz/",
      class: "Shares",
      status: "Partial",
      executedAt: "20240921T100000",
      buyPrice: 1800.0,
      currentPrice: 1900.0,
      qty: 25,
      fulfilled: "67%",
      targetPrice: 2000.0,
      stopLoss: 1600.0,
      analysis:
        "Google's strong ad revenue growth and cloud services expansion make it a solid choice for long-term investors.",
      projectedProfit: 5000.0,
      confidence: "90%",
    },
    {
      assetName: "Facebook, Inc.",
      ticker: "FB",
      logo: "https://logo.clearbit.com/facebook.com",
      class: "Shares",
      status: "Cancelled",
      executedAt: "20240919T093000",
      buyPrice: 250.0,
      currentPrice: 260.0,
      qty: 1000,
      targetPrice: 300.0,
      stopLoss: 200.0,
      analysis:
        "Facebook's strong user growth and expansion into new markets make it a solid choice for long-term investors.",
      projectedProfit: 5000.0,
      confidence: "85%",
    },
  ]

  // Reset currentPage when activeTab changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  return (
    <Card className="relative z-10 rounded-none border-none shadow-2xl shadow-black/10 sm:rounded-3xl sm:border-solid ">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Trades</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Tabs for filtering trades */}
        <Tabs defaultValue="all" onValueChange={(e) => setActiveTab(e)}>
          <TabsList className="-ml-1 bg-transparent">
            <TabsTrigger value="all" className="font-semibold">
              All
            </TabsTrigger>
            <TabsTrigger value="staged" className="font-semibold">
              Staged
            </TabsTrigger>
            <TabsTrigger value="pending" className="font-semibold">
              Pending
            </TabsTrigger>
            <TabsTrigger value="partial" className="font-semibold">
              Partial
            </TabsTrigger>
            <TabsTrigger value="open" className="font-semibold">
              Open
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="font-semibold">
              Cancelled
            </TabsTrigger>
            <TabsTrigger value="closed" className="font-semibold">
              Closed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Grid of Trade Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {trades
            .filter((trade) => {
              if (activeTab === "all") return true
              return trade.status.toLowerCase().replace(" ", "-") === activeTab
            })
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((trade, index) => (
              <TradeCard
                key={index}
                trade={trade}
                onClick={() => handleCardClick(trade)}
              />
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePrevious()} />
                </PaginationItem>
              )}
              {trades &&
                trades.filter((trade) => {
                  if (activeTab === "all") return true
                  return (
                    trade.status.toLowerCase().replace(" ", "-") === activeTab
                  )
                }).length > 6 && (
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                )}
              {trades &&
                trades.filter((trade) => {
                  if (activeTab === "all") return true
                  return (
                    trade.status.toLowerCase().replace(" ", "-") === activeTab
                  )
                }).length > 12 && (
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                )}
              {trades &&
                trades.filter((trade) => {
                  if (activeTab === "all") return true
                  return (
                    trade.status.toLowerCase().replace(" ", "-") === activeTab
                  )
                }).length > 18 && (
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                )}
              {trades &&
                trades.filter((trade) => {
                  if (activeTab === "all") return true
                  return (
                    trade.status.toLowerCase().replace(" ", "-") === activeTab
                  )
                }).length > 18 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              {/* If currentPage*6 is greater than trades.length, hide next button */}
              {currentPage * 6 <
                trades.filter((trade) => {
                  if (activeTab === "all") return true
                  return (
                    trade.status.toLowerCase().replace(" ", "-") === activeTab
                  )
                }).length && (
                <PaginationItem>
                  <PaginationNext onClick={() => handleNext()} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>

      {/* Trade Detail Modal */}
      <TradeDetailModal
        trade={selectedTrade}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  )
}
