// trade-card.tsx

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/ui/icons"
import {
  cn,
  formatCurrency,
  formatPercentage,
  determineTradeStatus,
  calculateAggregatedTradeData,
  calculateTargetProfit,
  calculateCurrentProfit,
  calculateRealisedProfit,
  calculateTotalFees,
} from "@/lib/utils"
import { TradeMenu } from "./trade-menu"

interface TradeCardProps {
  trade: any // Replace 'any' with your Trade type/interface
  onClick: () => void
}

export function TradeCard({ trade, onClick }: TradeCardProps) {
  // Calculate Total Fees
  const { totalFees, individualFees } = calculateTotalFees(trade)

  // **Determine Trade Status**
  const aggregatedStatus = determineTradeStatus(trade)

  // **Aggregate Calculations for Multi-Step Trades**
  const aggregatedData = calculateAggregatedTradeData(trade)
  const { totalQty, averageBuyPrice, targetPrice, stopLoss, totalBuyAmount } =
    aggregatedData

  // **Calculations**
  const targetProfit = calculateTargetProfit(trade, aggregatedData)
  const currentProfit = calculateCurrentProfit(trade, aggregatedData)
  const realisedProfit = calculateRealisedProfit(trade, aggregatedData)

  // **Multi-leg trade progress**
  const stepsCompleted =
    trade.steps?.filter(
      (step: { status: string }) =>
        step.status === "Executed" || step.status === "Closed"
    ).length || 0
  const stepsTotal = trade.steps ? trade.steps.length : 0

  return (
    <Card
      onClick={onClick}
      className="relative transform cursor-pointer pb-0 transition duration-200 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10"
    >
      {/* Card Header */}
      <div className="flex w-full justify-between">
        <CardHeader className="mt-0 flex w-full flex-row items-start justify-between px-3 md:-mt-1 lg:px-4">
          <div>
            <div className="flex items-start space-x-1.5 font-bold">
              <Avatar size="sm" className="mt-1 bg-white p-1">
                <AvatarImage
                  src={trade.logo}
                  alt={trade.assetName}
                  className="rounded-full"
                />
                <AvatarFallback>{trade.assetName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="ellipsis-1 line-clamp-1 max-w-fit text-sm leading-5 sm:max-w-64 sm:text-base">
                    {trade.assetName}
                  </span>
                  <p className="whitespace-nowrap text-sm font-semibold text-muted-foreground sm:text-base">
                    · {trade.ticker}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  {/* **Asset Class Icon with Tooltip** */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {trade.class === "Shares" ? (
                          <Icons.stock className="size-3" />
                        ) : trade.class === "Crypto" ? (
                          <Icons.crypto className="size-3" />
                        ) : trade.class === "Call Option" ? (
                          <Icons.call className="h-3" />
                        ) : (
                          trade.class === "Put Option" && (
                            <Icons.put className="h-3" />
                          )
                        )}
                        <p className="sr-only">{trade.class}</p>
                      </TooltipTrigger>
                      <TooltipContent className="z-50 mb-2 mr-4">
                        <div className="flex items-center space-x-2">
                          {/* Repeat Icon here for consistency */}
                          {trade.class === "Shares" ? (
                            <Icons.stock className="size-3" />
                          ) : trade.class === "Crypto" ? (
                            <Icons.crypto className="size-3" />
                          ) : trade.class === "Call Option" ? (
                            <Icons.call className="h-3" />
                          ) : (
                            trade.class === "Put Option" && (
                              <Icons.put className="h-3" />
                            )
                          )}
                          <p className="text-semibold text-sm">{trade.class}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-sm font-semibold">
                    {formatCurrency(trade.currentPrice)}
                  </span>
                  {aggregatedStatus !== "Pending" &&
                    aggregatedStatus !== "Closed" && (
                      <div
                        className={cn(
                          trade.currentPrice > averageBuyPrice
                            ? "text-teal-700 dark:text-teal-400"
                            : "text-red-700 dark:text-red-400",
                          "pt-0.5 text-xs"
                        )}
                      >
                        {trade.currentPrice > averageBuyPrice ? "+" : ""}
                        {formatCurrency(trade.currentPrice - averageBuyPrice)} (
                        {formatPercentage(
                          (trade.currentPrice - averageBuyPrice) /
                            averageBuyPrice
                        )}
                        )
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* **Status Badge** */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant={
                      aggregatedStatus === "Pending"
                        ? "outline"
                        : aggregatedStatus === "Open"
                          ? "green"
                          : aggregatedStatus === "Partial"
                            ? "blue"
                            : "default"
                    }
                    animate={aggregatedStatus === "Open"}
                    className="h-5 px-2 text-[10px]"
                  >
                    {aggregatedStatus.toUpperCase()}
                    {aggregatedStatus === "Partial" &&
                      "(" + trade.fulfilled + ")"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="z-50 mb-2 mr-4">
                  <p className="text-semibold text-sm">
                    {aggregatedStatus === "Open"
                      ? "This trade has an open position or has had a leg executed"
                      : aggregatedStatus === "Pending"
                        ? "This trade is pending and ready to be executed at market open"
                        : aggregatedStatus === "Partial"
                          ? "This trade has been partially executed"
                          : "This trade is closed"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Trade Menu */}
            <TradeMenu
              trade={trade}
              onEdit={() => console.log("Edit clicked")}
              onCancel={() => console.log("Cancel clicked")}
              onCloseOut={() => console.log("Close out clicked")}
              onViewDetails={() => console.log("View Details clicked")}
            />
          </div>
        </CardHeader>
      </div>

      {/* Card Content */}
      <CardContent className="-mt-1 space-y-3 lg:px-3">
        <p className="ellipsis-2 line-clamp-2 text-sm">
          <span className="font-bold">Signal:</span> {trade.analysis}
        </p>

        {/* Multi-leg Trade Badge */}
        {trade.steps && trade.steps.length > 1 && (
          <Badge
            variant="outline"
            size="sm"
            className="my-2 flex w-fit items-center space-x-1 py-1"
          >
            <Icons.steps className="-ml-0.5 h-3 w-3 text-muted-foreground" />

            <p className="">
              Multi-leg Trade:{" "}
              <span
                className={cn(
                  stepsCompleted === stepsTotal
                    ? "text-teal-500"
                    : "text-muted-foreground",
                  "font-bold"
                )}
              >
                {stepsCompleted}/{stepsTotal}
              </span>
            </p>
            {stepsCompleted === stepsTotal && (
              <Icons.check className="-ml-1 h-3 w-3 text-teal-500" />
            )}
          </Badge>
        )}

        {/* Entry, Volume, Target, Stop Loss */}
        <div className="grid grid-cols-4 gap-4">
          <div className="">
            <p className="text-sm text-muted-foreground">Strategy</p>
            <p className="text-sm font-bold sm:text-base">{trade.strategy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entry</p>
            <p className="text-sm font-bold sm:text-base">
              {formatCurrency(averageBuyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-sm font-bold sm:text-base">
              {totalQty.toLocaleString()}{" "}
              <span className="text-xs font-normal">
                {trade.class === "Shares"
                  ? "shares"
                  : trade.class === "Crypto"
                    ? "tokens"
                    : "contracts"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Target Price</p>
            <p className="text-sm font-bold sm:text-base">
              {targetPrice !== null ? formatCurrency(targetPrice) : "Varies"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Stop Loss */}
          <div>
            <p className="text-sm text-muted-foreground">Stop Loss</p>
            <p
              className={cn(
                stopLoss > trade.strikePrice &&
                  "text-red-700 dark:text-red-400",
                "text-sm font-bold sm:text-base"
              )}
            >
              {stopLoss !== null ? formatCurrency(stopLoss) : "Varies"}
            </p>
          </div>
          {/* Target Profit */}
          <div>
            <div className="flex items-center space-x-1.5">
              <p className="text-sm text-muted-foreground">
                Target <span className="text-xs">(Net Profit)</span>
              </p>
            </div>
            <p className="text-sm font-bold sm:text-base">
              {formatCurrency(targetProfit)}{" "}
              <span className="pt-0.5 text-xs font-semibold">
                ({formatPercentage(targetProfit / totalBuyAmount)})
              </span>
            </p>
          </div>

          {/* Strike Price */}
          {trade.strikePrice && (
            <div>
              <p className="text-sm text-muted-foreground">Strike Price</p>
              <p
                className={cn(
                  trade.strikePrice > averageBuyPrice
                    ? "text-teal-700 dark:text-teal-400"
                    : "text-red-700 dark:text-red-400",
                  "text-sm font-bold sm:text-base"
                )}
              >
                {formatCurrency(trade.strikePrice)}
              </p>
            </div>
          )}

          {/* Current / Realised Profit */}
          {aggregatedStatus !== "Pending" && (
            <div className="shrink-0">
              <div className="flex items-end space-x-1.5">
                <p className="text-sm text-muted-foreground">
                  {aggregatedStatus === "Closed" ? "" : "Current"} P/L{" "}
                  {aggregatedStatus === "Closed" ? "Outcome" : ""}{" "}
                  <span className="text-xs">(Net)</span>
                </p>
              </div>
              <div className="flex items-center space-x-1.5">
                <p
                  className={cn(
                    (aggregatedStatus === "Closed"
                      ? realisedProfit
                      : currentProfit) > 0
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-sm font-bold sm:text-base"
                  )}
                >
                  {formatCurrency(
                    aggregatedStatus === "Closed"
                      ? realisedProfit
                      : currentProfit
                  )}
                </p>
                <span
                  className={cn(
                    (aggregatedStatus === "Closed"
                      ? realisedProfit
                      : currentProfit) > 0
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold"
                  )}
                >
                  (
                  {formatPercentage(
                    (aggregatedStatus === "Closed"
                      ? realisedProfit
                      : currentProfit) / totalBuyAmount
                  )}
                  )
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
