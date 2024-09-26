// trade-card.tsx

import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
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
        step.status === "Executed" || step.status === "Completed"
    ).length || 0
  const stepsTotal = trade.steps ? trade.steps.length : 0

  return (
    <Card
      onClick={onClick}
      className="relative transform cursor-pointer pb-0 transition duration-200 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10"
    >
      {/* Card Header */}
      <div className="flex w-full justify-between">
        <CardHeader className="relative mt-0 flex w-full flex-row items-center justify-between px-3 pb-2.5 pt-3 lg:px-3 lg:pb-2.5 lg:pt-3">
          <CardTitle className="font-bold">
            <div className="flex items-center space-x-2.5">
              <Avatar size="sm" className="bg-white p-1">
                <AvatarImage
                  src={trade.logo}
                  alt={trade.assetName}
                  className="rounded-full"
                />
                <AvatarFallback>{trade.assetName[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-0">
                <div className="flex items-center space-x-1.5">
                  <span className="ellipsis-1 line-clamp-1 max-w-fit text-sm leading-5 sm:max-w-64">
                    {trade.assetName}
                  </span>
                  <p className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
                    · {trade.ticker}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  {/* **Asset Class Icon with Tooltip** */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {trade.class === "Shares" ? (
                          <Icons.stock className="size-3.5" />
                        ) : trade.class === "Crypto" ? (
                          <Icons.crypto className="size-3.5" />
                        ) : trade.instrument === "Call Option" ? (
                          <Icons.call className="h-3.5" />
                        ) : trade.instrument === "Put Option" ? (
                          <Icons.put className="h-3.5" />
                        ) : trade.class === "Commodities" ? (
                          <Icons.commodities className="h-4" />
                        ) : (
                          trade.class === "Forex" && (
                            <Icons.forex className="h-3.5" />
                          )
                        )}
                        <p className="sr-only">{trade.instrument}</p>
                      </TooltipTrigger>
                      <TooltipContent className="z-50 mb-2 mr-4">
                        <div className="flex items-center space-x-2">
                          {/* Repeat Icon here for consistency */}
                          {trade.class === "Shares" ? (
                            <Icons.stock className="size-3.5" />
                          ) : trade.class === "Crypto" ? (
                            <Icons.crypto className="size-3.5" />
                          ) : trade.instrument === "Call Option" ? (
                            <Icons.call className="h-3.5" />
                          ) : trade.instrument === "Put Option" ? (
                            <Icons.put className="h-3.5" />
                          ) : trade.class === "Commodities" ? (
                            <Icons.commodities className="h-4" />
                          ) : (
                            trade.class === "Forex" && (
                              <Icons.forex className="h-3.5" />
                            )
                          )}
                          <p className="text-semibold text-sm">{trade.class}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Current Price and Price Change for Asset */}
                  <span className="text-sm font-semibold">
                    {formatCurrency(trade.currentPrice)}
                  </span>
                  {aggregatedStatus !== "Staged" &&
                    aggregatedStatus !== "Completed" && (
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
          </CardTitle>

          <div className="flex items-center space-x-3">
            {/* **Status Badge** */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant={
                      aggregatedStatus === "Staged"
                        ? "default"
                        : aggregatedStatus === "Active"
                          ? "green"
                          : aggregatedStatus === "Partial"
                            ? "blue"
                            : "outline"
                    }
                    animate={aggregatedStatus === "Active"}
                    className={cn(
                      aggregatedStatus === "Completed" ? "h-6" : "h-5",
                      "px-2 text-[10px]"
                    )}
                  >
                    {aggregatedStatus.toUpperCase()}
                    {aggregatedStatus === "Partial" &&
                      " (" + trade.fulfilled + ")"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="z-50 mb-2 mr-4">
                  <p className="text-semibold text-sm">
                    {aggregatedStatus === "Active"
                      ? "This trade has an open position or has had a leg executed"
                      : aggregatedStatus === "Staged"
                        ? "This trade is staged and ready to be executed at market open"
                        : aggregatedStatus === "Partial"
                          ? "This trade has been partially executed"
                          : "This trade is completed"}
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
            />
          </div>
        </CardHeader>
      </div>

      {/* Card Content */}
      <CardContent className="space-y-3 pb-3 pt-0 lg:px-3 lg:pb-3 lg:pt-0">
        {/* **Analysis** */}
        <span className="line-clamp-2 text-sm text-black/80 dark:text-white/80">
          <div className="relative inline-flex items-center space-x-1.5 pr-1">
            <Icons.activity className="size-3 shrink-0 text-teal-700 dark:text-teal-400" />
          </div>
          <span className="font-bold">{trade.signal}</span>: {trade.analysis}
        </span>

        {/* Entry, Volume, Target, Stop Loss */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Buy Price</p>
            <p className="text-sm font-bold">
              {formatCurrency(averageBuyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="text-sm font-bold">
              {totalQty.toLocaleString()}{" "}
              <span className="text-xs font-normal">
                {trade.instrument === "Shares"
                  ? "Shares"
                  : trade.instrument === "Crypto"
                    ? "Tokens"
                    : "Contracts"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Target Price</p>
            <p className="text-sm font-bold">
              {targetPrice !== null ? formatCurrency(targetPrice) : "Varies"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Stop Loss */}
          <div>
            <p className="text-sm text-muted-foreground">Stop Loss</p>
            <p
              className={cn(
                stopLoss > trade.sellPrice && "text-red-700 dark:text-red-400",
                "text-sm font-bold"
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
            <p className="text-sm font-bold">
              {formatCurrency(targetProfit)}{" "}
              <span className="pt-0.5 text-xs font-semibold">
                ({formatPercentage(targetProfit / totalBuyAmount)})
              </span>
            </p>
          </div>

          {/* Sell Price */}
          {trade.sellPrice && (
            <div>
              <p className="text-sm text-muted-foreground">Sell Price</p>

              <div className="-space-y-1.5">
                <p
                  className={cn(
                    trade.sellPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-sm font-bold"
                  )}
                >
                  {formatCurrency(trade.sellPrice)}
                </p>
                <p
                  className={cn(
                    trade.sellPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold"
                  )}
                >
                  {trade.sellPrice - averageBuyPrice > 0 && "+"}
                  {formatCurrency(trade.sellPrice - averageBuyPrice)} (
                  {formatPercentage(
                    (trade.sellPrice - averageBuyPrice) / averageBuyPrice
                  )}
                  )
                </p>
              </div>
            </div>
          )}
          {/* Current Price */}
          {trade.status !== "Completed" && (
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>

              <div className="-space-y-1">
                <p
                  className={cn(
                    trade.currentPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-sm font-bold"
                  )}
                >
                  {formatCurrency(trade.currentPrice)}
                </p>

                <p
                  className={cn(
                    trade.currentPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold"
                  )}
                >
                  {trade.currentPrice > averageBuyPrice && "+"}
                  {formatCurrency(trade.currentPrice - averageBuyPrice)} (
                  {formatPercentage(
                    (trade.currentPrice - averageBuyPrice) / averageBuyPrice
                  )}
                  )
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex h-11 items-center justify-between rounded-b-lg border-t border-border bg-muted/30 px-3 py-2 lg:px-3 lg:py-2">
        {/* Current / Realised Profit */}
        {aggregatedStatus !== "Staged" ? (
          <div className="-my-0.5 -space-y-0.5">
            <div className="flex items-end space-x-1.5">
              <p className="text-xs font-bold text-black dark:text-white">
                {aggregatedStatus === "Completed" && realisedProfit > 0 ? (
                  <span>Realised Gains</span>
                ) : aggregatedStatus === "Completed" && realisedProfit < 0 ? (
                  <span>Total Losses</span>
                ) : (aggregatedStatus === "Active" ||
                    aggregatedStatus === "Partial") &&
                  (aggregatedStatus === "Active"
                    ? currentProfit
                    : realisedProfit) > 0 ? (
                  <span>Unrealised Gains</span>
                ) : (
                  <span>Unrealised Loss</span>
                )}{" "}
                <span className="text-xs font-medium opacity-70">(Net)</span>
              </p>
            </div>
            <div className="flex items-center space-x-0.5">
              <div className="flex items-center space-x-1">
                <p
                  className={cn(
                    (aggregatedStatus === "Completed"
                      ? realisedProfit
                      : currentProfit) > 0
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-sm font-bold"
                  )}
                >
                  {(aggregatedStatus === "Completed"
                    ? realisedProfit
                    : currentProfit) > 0 && "+"}
                  {formatCurrency(
                    aggregatedStatus === "Completed"
                      ? realisedProfit
                      : currentProfit
                  )}
                </p>
                <span
                  className={cn(
                    (aggregatedStatus === "Completed"
                      ? realisedProfit
                      : currentProfit) > 0
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold"
                  )}
                >
                  (
                  {formatPercentage(
                    (aggregatedStatus === "Completed"
                      ? realisedProfit
                      : currentProfit) / totalBuyAmount
                  )}
                  )
                </span>
              </div>
            </div>
          </div>
        ) : (
          <span></span>
        )}
        {/* Multi-leg Trade Badge */}
        {trade.steps && trade.steps.length > 1 && (
          <Badge
            variant="outline"
            size="sm"
            className="flex h-6 w-fit items-center space-x-1 py-0 pr-2"
          >
            <Icons.steps className="-ml-0.5 h-3 w-3 text-muted-foreground" />

            <p className="flex items-center gap-1 divide-x">
              <span className="pr-0.5">Multi-Leg</span>
              <span
                className={cn(
                  stepsCompleted === stepsTotal
                    ? "text-teal-700 dark:text-teal-500"
                    : "text-muted-foreground",
                  "flex items-center space-x-0.5 font-semibold"
                )}
              >
                <span className="pl-1.5">{stepsCompleted}</span>
                <span className="font-normal opacity-70">/</span>
                <span>{stepsTotal}</span>
              </span>
            </p>
            {stepsCompleted === stepsTotal && (
              <Icons.check className="-mx-1 h-3 w-3 text-teal-700 dark:text-teal-400" />
            )}
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}
