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
      instrument: "Equity",
      signal: "Breakout",
      status: "Staged",
      exchange: "NASDAQ",
      buyPrice: 178.0,
      currentPrice: 180.0,
      qty: 500,
      targetPrice: 190.0,
      stopLoss: 170.0,
      analysis:
        "Apple's stock is showing a strong breakout pattern after recent product launches.",
      projectedProfit: 6000.0,
      confidence: "75%",
      strategy: "Momentum Trading",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 178.0,
          qty: 300,
          side: "buy",
          type: "market",
          stopLoss: 170.0,
          targetPrice: 190.0,
          note: "Buying 300 shares of AAPL following a breakout signal. Stop loss at $170, target price at $190.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 2,
          action: "enter",
          buyPrice: 175.0,
          qty: 200,
          side: "buy",
          type: "limit",
          stopLoss: 170.0,
          targetPrice: 190.0,
          note: "Buying an additional 200 shares of AAPL if it dips to $175 to average down.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 3,
          action: "exit",
          targetPrice: 190.0,
          qty: 500,
          side: "sell",
          type: "limit",
          note: "Selling 500 shares of AAPL at target price of $190.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Bitcoin",
      ticker: "BTC",
      logo: "https://logo.clearbit.com/bitcoin.org",
      class: "Crypto",
      instrument: "Cryptocurrency",
      signal: "Bullish Divergence",
      status: "Open",
      executedAt: "2024-09-20T12:30:00Z",
      buyPrice: 26500.0,
      currentPrice: 28000.0,
      qty: 1.5,
      targetPrice: 30000.0,
      stopLoss: 24000.0,
      analysis:
        "Institutional buying has led to a bullish divergence on the Bitcoin chart.",
      projectedProfit: 5250.0,
      confidence: "65%",
      strategy: "Long Position",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 26500.0,
          currentPrice: 28000.0,
          qty: 1.5,
          side: "buy",
          type: "market",
          stopLoss: 24000.0,
          targetPrice: 30000.0,
          sellPrice: 29394.0,
          note: "Entered a long position on BTC following a bullish divergence. Stop loss at $24000, take profit at $30000.",
          executionTime: "2024-09-20T12:30:00Z",
          status: "Executed",
        },
        {
          sequence: 2,
          action: "hedge",
          hedgeType: "put",
          hedgePrice: 24000.0,
          qty: 1,
          note: "Hedging with a put option in case of price drop.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 3,
          action: "exit",
          targetPrice: 30000.0,
          qty: 1.5,
          side: "sell",
          type: "limit",
          note: "Exiting the long position at $30000.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Tesla Inc.",
      ticker: "TSLA",
      logo: "https://logo.clearbit.com/tesla.com",
      class: "Options",
      instrument: "Put Option",
      signal: "Overbought",
      status: "Open",
      executedAt: "2024-09-18T10:00:00Z",
      buyPrice: 245.0,
      currentPrice: 240.0,
      qty: 50,
      targetPrice: 230.0,
      stopLoss: 255.0,
      analysis:
        "Tesla's stock shows overbought conditions after a recent rally. Potential for a correction.",
      projectedProfit: 3000.0,
      confidence: "70%",
      strategy: "Protective Put",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 245.0,
          qty: 50,
          side: "buy",
          type: "market",
          stopLoss: 255.0,
          targetPrice: 230.0,
          note: "Entering 50 Tesla put options to profit from a potential price drop. Stop loss at $255, target at $230.",
          executionTime: "2024-09-18T10:00:00Z",
          status: "Open",
        },
        {
          sequence: 2,
          action: "hedge",
          hedgeType: "call",
          hedgePrice: 255.0,
          qty: 2,
          note: "Hedging with 2 call options in case Tesla price rises.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Microsoft Corporation",
      ticker: "MSFT",
      logo: "https://logo.clearbit.com/microsoft.com",
      class: "Shares",
      instrument: "Equity",
      signal: "Reversal",
      status: "Staged",
      buyPrice: 210.0,
      currentPrice: 215.0,
      qty: 100,
      targetPrice: 220.0,
      stopLoss: 200.0,
      analysis:
        "Microsoft shows a reversal pattern after a period of consolidation. Expected upward movement.",
      projectedProfit: 1000.0,
      confidence: "85%",
      strategy: "Swing Trading",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 210.0,
          qty: 100,
          side: "buy",
          type: "limit",
          stopLoss: 200.0,
          targetPrice: 220.0,
          note: "Entering a swing trade with 100 MSFT shares. Stop loss at $200, target at $220.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 220.0,
          qty: 100,
          side: "sell",
          type: "limit",
          note: "Exiting the trade at $220.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Nvidia, Inc.",
      ticker: "NVDA",
      logo: "https://logo.clearbit.com/nvidia.com",
      class: "Options",
      instrument: "Call Option",
      signal: "Volatility",
      status: "Completed",
      executedAt: "2024-09-24T10:40:05Z",
      buyPrice: 485.0,
      currentPrice: 500.0,
      qty: 2,
      targetPrice: 510.0,
      sellPrice: 460.0,
      stopLoss: 460.0,
      analysis:
        "High implied volatility made Nvidia a candidate for an iron butterfly strategy.",
      projectedProfit: 5000.0,
      confidence: "90%",
      strategy: "Iron Butterfly",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 485.0,
          qty: 2,
          side: "buy",
          type: "market",
          stopLoss: 460.0,
          targetPrice: 510.0,
          note: "Buying options to form an iron butterfly around Nvidia. Stop loss at $460.",
          executionTime: "2024-09-24T10:40:05Z",
          status: "Completed",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 510.0,
          qty: 2,
          side: "sell",
          type: "limit",
          note: "Exiting the iron butterfly at $510.",
          executionTime: null,
          status: "Completed",
        },
      ],
    },
    {
      assetName: "Amazon.com Inc.",
      ticker: "AMZN",
      logo: "https://logo.clearbit.com/amazon.com",
      class: "Shares",
      instrument: "Equity",
      signal: "Uptrend",
      status: "Open",
      executedAt: "2024-09-25T09:00:00Z",
      buyPrice: 135.0,
      currentPrice: 140.0,
      qty: 50,
      targetPrice: 150.0,
      stopLoss: 125.0,
      analysis:
        "Amazon is in a confirmed uptrend following positive earnings and expansion in cloud services.",
      projectedProfit: 7500.0,
      confidence: "85%",
      strategy: "Trend Following",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 135.0,
          qty: 50,
          side: "buy",
          type: "market",
          stopLoss: 125.0,
          targetPrice: 150.0,
          note: "Buying 50 shares of AMZN as part of a trend-following strategy. Stop loss at $125, target at $150.",
          executionTime: "2024-09-25T09:00:00Z",
          status: "Open",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 150.0,
          qty: 50,
          side: "sell",
          type: "limit",
          note: "Exiting the trade at $150.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Gold",
      ticker: "XAUUSD",
      logo: "https://logo.clearbit.com/gold.org",
      class: "Commodities",
      instrument: "Futures",
      signal: "Flight to Safety",
      status: "Staged",
      buyPrice: 1950.0,
      currentPrice: 1925.0,
      qty: 10,
      targetPrice: 2000.0,
      stopLoss: 1900.0,
      analysis:
        "With rising geopolitical tensions, investors are flocking to gold as a safe-haven asset.",
      projectedProfit: 5000.0,
      confidence: "80%",
      strategy: "Long Futures",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 1950.0,
          qty: 10,
          side: "buy",
          type: "market",
          stopLoss: 1900.0,
          targetPrice: 2000.0,
          note: "Buying 10 gold futures contracts as a safe-haven play. Stop loss at $1900, target at $2000.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 2000.0,
          qty: 10,
          side: "sell",
          type: "limit",
          note: "Selling 10 gold futures at the target price of $2000.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Euro vs US Dollar",
      ticker: "EURUSD",
      logo: "https://logo.clearbit.com/euro.com",
      class: "Forex",
      instrument: "Currency Pair",
      signal: "Interest Rate Divergence",
      status: "Open",
      buyPrice: 1.1,
      currentPrice: 1.12,
      qty: 100000,
      targetPrice: 1.15,
      stopLoss: 1.08,
      analysis:
        "Diverging monetary policies between the ECB and the Federal Reserve could push the Euro higher against the Dollar.",
      projectedProfit: 5000.0,
      confidence: "70%",
      strategy: "Carry Trade",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 1.1,
          qty: 100000,
          side: "buy",
          type: "market",
          stopLoss: 1.08,
          targetPrice: 1.15,
          note: "Entered a carry trade position on EUR/USD, aiming for appreciation. Stop loss at 1.08, target at 1.15.",
          executionTime: "2024-09-20T12:00:00Z",
          status: "Executed",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 1.15,
          qty: 100000,
          side: "sell",
          type: "limit",
          note: "Exiting the carry trade position at 1.15.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Coca-Cola Co.",
      ticker: "KO",
      logo: "https://logo.clearbit.com/coca-cola.com",
      class: "Shares",
      instrument: "Equity",
      signal: "Support Bounce",
      status: "Open",
      buyPrice: 60.0,
      currentPrice: 62.5,
      qty: 200,
      targetPrice: 65.0,
      stopLoss: 58.0,
      analysis:
        "Coca-Cola has bounced off a key support level, with technicals suggesting further upside.",
      projectedProfit: 1000.0,
      confidence: "75%",
      strategy: "Swing Trading",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 60.0,
          qty: 200,
          side: "buy",
          type: "market",
          stopLoss: 58.0,
          targetPrice: 65.0,
          note: "Buying 200 shares of Coca-Cola following a support bounce. Stop loss at $58, target at $65.",
          executionTime: "2024-09-22T14:30:00Z",
          status: "Executed",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 65.0,
          qty: 200,
          side: "sell",
          type: "limit",
          note: "Exiting the swing trade at $65.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Tesla Inc.",
      ticker: "TSLA",
      logo: "https://logo.clearbit.com/tesla.com",
      class: "Options",
      instrument: "Call Option",
      signal: "Earnings Volatility",
      status: "Staged",
      buyPrice: 240.0,
      currentPrice: 245.0,
      qty: 10,
      targetPrice: 280.0,
      stopLoss: 220.0,
      analysis:
        "Tesla's upcoming earnings report is expected to bring significant volatility, making it a candidate for a straddle strategy.",
      projectedProfit: 4000.0,
      confidence: "65%",
      strategy: "Long Straddle",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 240.0,
          qty: 10,
          side: "buy",
          type: "market",
          stopLoss: 220.0,
          targetPrice: 280.0,
          note: "Entering a long straddle on Tesla with 10 options, expecting significant volatility. Stop loss at $220.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 280.0,
          qty: 10,
          side: "sell",
          type: "limit",
          note: "Exiting the straddle at $280.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Crude Oil",
      ticker: "CL",
      logo: "https://logo.clearbit.com/oil.com",
      class: "Commodities",
      instrument: "Futures",
      signal: "Supply Shock",
      status: "Open",
      buyPrice: 70.0,
      currentPrice: 75.0,
      qty: 50,
      targetPrice: 80.0,
      stopLoss: 65.0,
      analysis:
        "Recent geopolitical events have caused a supply shock, pushing crude oil prices higher.",
      projectedProfit: 5000.0,
      confidence: "85%",
      strategy: "Long Futures",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 70.0,
          qty: 50,
          side: "buy",
          type: "market",
          stopLoss: 65.0,
          targetPrice: 80.0,
          note: "Entering 50 crude oil futures contracts to take advantage of a supply shock. Stop loss at $65, target at $80.",
          executionTime: "2024-09-18T10:00:00Z",
          status: "Executed",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 80.0,
          qty: 50,
          side: "sell",
          type: "limit",
          note: "Exiting the long futures position at $80.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "S&P 500 Index",
      ticker: "SPX",
      logo: "https://logo.clearbit.com/sp500.com",
      class: "Index",
      instrument: "Put Option",
      signal: "Market Correction",
      status: "Staged",
      buyPrice: 4200.0,
      currentPrice: 4300.0,
      qty: 100,
      targetPrice: 4000.0,
      stopLoss: 4400.0,
      analysis:
        "With economic data suggesting a slowdown, the S&P 500 is poised for a potential market correction.",
      projectedProfit: 20000.0,
      confidence: "70%",
      strategy: "Protective Put",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 4200.0,
          qty: 100,
          side: "buy",
          type: "market",
          stopLoss: 4400.0,
          targetPrice: 4000.0,
          note: "Entering 100 put options on the S&P 500 to hedge against a market correction. Stop loss at 4400, target at 4000.",
          executionTime: null,
          status: "Staged",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 4000.0,
          qty: 100,
          side: "sell",
          type: "limit",
          note: "Exiting the put option position at 4000.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "Ethereum",
      ticker: "ETH",
      logo: "https://logo.clearbit.com/ethereum.org",
      class: "Crypto",
      instrument: "Cryptocurrency",
      signal: "DeFi Boom",
      status: "Partial",
      executedAt: "2024-09-23T11:00:00Z",
      buyPrice: 3200.0,
      currentPrice: 3500.0,
      qty: 5.0,
      targetPrice: 4000.0,
      stopLoss: 3000.0,
      analysis:
        "Ethereum is benefiting from the rise of decentralized finance applications, with strong network activity and adoption.",
      projectedProfit: 4000.0,
      confidence: "80%",
      fulfilled: "50%",
      strategy: "HODL",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 3200.0,
          qty: 5.0,
          side: "buy",
          type: "market",
          stopLoss: 3000.0,
          targetPrice: 4000.0,
          note: "Bought 5 ETH at $3200 following a DeFi boom signal. Stop loss at $3000, target at $4000.",
          executionTime: "2024-09-23T11:00:00Z",
          status: "Partial",
          fulfilled: "50%",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 4000.0,
          qty: 5.0,
          side: "sell",
          type: "limit",
          note: "Selling 5 ETH at $4000.",
          executionTime: null,
          status: "Staged",
        },
      ],
    },
    {
      assetName: "USD/JPY",
      ticker: "USDJPY",
      logo: "https://logo.clearbit.com/usdjpy.com",
      class: "Forex",
      instrument: "Currency Pair",
      signal: "Risk-Off Sentiment",
      status: "Completed",
      executedAt: "2024-09-22T12:00:00Z",
      buyPrice: 110.0,
      currentPrice: 108.0,
      qty: 100000.0,
      targetPrice: 105.0,
      stopLoss: 112.0,
      analysis:
        "Investors are flocking to the safe-haven Japanese Yen amid rising geopolitical tensions.",
      projectedProfit: 200000.0,
      confidence: "75%",
      strategy: "Carry Trade",
      steps: [
        {
          sequence: 1,
          action: "enter",
          buyPrice: 110.0,
          qty: 100000.0,
          side: "buy",
          type: "market",
          stopLoss: 112.0,
          targetPrice: 105.0,
          note: "Entered a carry trade position on USD/JPY, aiming for appreciation. Stop loss at 112, target at 105.",
          executionTime: "2024-09-22T12:00:00Z",
          status: "Executed",
        },
        {
          sequence: 2,
          action: "exit",
          targetPrice: 105.0,
          qty: 100000.0,
          side: "sell",
          type: "limit",
          note: "Exiting the carry trade position at 105.",
          executionTime: null,
          status: "Executed",
        },
      ],
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
            <TabsTrigger value="partial" className="font-semibold">
              Partial
            </TabsTrigger>
            <TabsTrigger value="open" className="font-semibold">
              Open
            </TabsTrigger>
            <TabsTrigger value="completed" className="font-semibold">
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Grid of Trade Cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
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
                    <PaginationLink onClick={() => setCurrentPage(1)}>
                      1
                    </PaginationLink>
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
                    <PaginationLink onClick={() => setCurrentPage(2)}>
                      2
                    </PaginationLink>
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
                    <PaginationLink onClick={() => setCurrentPage(3)}>
                      3
                    </PaginationLink>
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
