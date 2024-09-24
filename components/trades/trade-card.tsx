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
} from "@/lib/utils"
import { TradeMenu } from "./trade-menu"

interface TradeCardProps {
  trade: any // Replace 'any' with your Trade type/interface
  onClick: () => void
}

export function TradeCard({ trade, onClick }: TradeCardProps) {
  // **Determine Trade Status**
  const aggregatedStatus = determineTradeStatus(trade)

  // **Aggregate Calculations for Multi-Step Trades**
  let totalQty = trade.qty || 0
  let averageBuyPrice = trade.buyPrice || 0
  let targetPrice = trade.targetPrice || 0
  let stopLoss = trade.stopLoss || 0

  if (trade.steps && trade.steps.length > 1) {
    // Filter out steps without necessary details
    const validSteps = trade.steps.filter(
      (step: any) => step.details.qty && step.details.buyPrice
    )

    // Calculate total quantity
    totalQty = validSteps.reduce(
      (sum: number, step: any) => sum + step.details.qty,
      0
    )

    // Calculate weighted average buy price
    const totalCost = validSteps.reduce(
      (sum: number, step: any) =>
        sum + step.details.buyPrice * step.details.qty,
      0
    )

    averageBuyPrice = totalQty ? totalCost / totalQty : 0

    // Determine if targetPrice and stopLoss are consistent
    const targetPrices = new Set(
      validSteps
        .map((step: any) => step.details.targetPrice)
        .filter((price: number) => price !== undefined && price !== null)
    )
    targetPrice = targetPrices.size === 1 ? Array.from(targetPrices)[0] : null

    const stopLosses = new Set(
      validSteps
        .map((step: any) => step.details.stopLoss)
        .filter((price: number) => price !== undefined && price !== null)
    )
    stopLoss = stopLosses.size === 1 ? Array.from(stopLosses)[0] : null
  }

  // **Calculations**
  const targetProfit =
    trade.class === "Put Option"
      ? averageBuyPrice * totalQty - (targetPrice || 0) * totalQty
      : (targetPrice || 0) * totalQty - averageBuyPrice * totalQty
  const totalBuyAmount = averageBuyPrice * totalQty
  const totalCurrentAmount = trade.currentPrice * totalQty
  const currentProfit =
    trade.class === "Put Option"
      ? totalBuyAmount - totalCurrentAmount
      : totalCurrentAmount - totalBuyAmount

  // **Multi-leg trade progress**
  const stepsCompleted =
    trade.steps?.filter(
      (step: { status: string }) =>
        step.status === "Executed" ||
        step.status === "Cancelled" ||
        step.status === "Completed"
    ).length || 0
  const stepsTotal = trade.steps ? trade.steps.length : 0

  return (
    <Card
      onClick={onClick}
      className="relative transform cursor-pointer pb-0 transition duration-200 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10"
    >
      {/* Card Header */}
      <div className="flex justify-between">
        <CardHeader className="flex w-full flex-row items-start justify-between lg:px-3">
          <CardTitle className="-mt-1">
            <div className="flex items-center space-x-1.5 font-bold">
              <Avatar size="sm" className="bg-white p-1">
                <AvatarImage
                  src={trade.logo}
                  alt={trade.assetName}
                  className="rounded-full"
                />
                <AvatarFallback>{trade.assetName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span>{trade.ticker}</span>
                  <p className="text-sm font-semibold text-muted-foreground">
                    · {trade.assetName}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 ">
                  <span className="text-sm font-semibold">
                    {formatCurrency(trade.currentPrice)}
                  </span>
                  {trade.status !== "Staged" &&
                    trade.status !== "Pending" &&
                    trade.status !== "Cancelled" &&
                    trade.status !== "Closed" && (
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

          <div className="flex items-center space-x-2">
            {/* Asset Class Icon with Tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {trade.class === "Shares" ? (
                    <Icons.stock className="mr-1 size-3" />
                  ) : trade.class === "Crypto" ? (
                    <Icons.crypto className="mr-1 size-3" />
                  ) : trade.class === "Call Option" ? (
                    <Icons.call className="mr-1 size-3 text-teal-700 dark:text-teal-400" />
                  ) : (
                    trade.class === "Put Option" && (
                      <Icons.put className="mr-1 size-3 text-red-700 dark:text-red-400" />
                    )
                  )}
                  <p className="sr-only">{trade.class}</p>
                </TooltipTrigger>
                <TooltipContent className="z-10 mb-2 mr-4">
                  <div className="flex items-center space-x-2">
                    {/* Repeat Icon here for consistency */}
                    {trade.class === "Shares" ? (
                      <Icons.stock className="size-3" />
                    ) : trade.class === "Crypto" ? (
                      <Icons.crypto className="size-3" />
                    ) : trade.class === "Call Option" ? (
                      <Icons.call className="size-3 text-teal-700 dark:text-teal-400" />
                    ) : (
                      trade.class === "Put Option" && (
                        <Icons.put className="size-3 text-red-700 dark:text-red-400" />
                      )
                    )}
                    <p className="text-semibold text-sm">{trade.class}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Status Badge */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant={
                      aggregatedStatus === "Staged"
                        ? "outline"
                        : aggregatedStatus === "Open"
                          ? "green"
                          : aggregatedStatus === "Pending"
                            ? "yellow"
                            : aggregatedStatus === "Cancelled"
                              ? "destructive"
                              : aggregatedStatus === "Partial"
                                ? "blue"
                                : "default"
                    }
                    animate={trade.status === "Open"}
                    className="h-5 px-2 text-[10px]"
                  >
                    {trade.status.toUpperCase()}{" "}
                    {trade.status === "Partial" && "(" + trade.fulfilled + ")"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="z-10 mb-2 mr-4">
                  <p className="text-semibold text-sm">
                    {trade.status === "Open"
                      ? "This trade has an open position or has had a leg executed"
                      : trade.status === "Staged"
                        ? "This trade is staged and ready to be executed"
                        : trade.status === "Pending"
                          ? "This trade is pending execution"
                          : trade.status === "Cancelled"
                            ? "This trade has been cancelled"
                            : trade.status === "Partial"
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
      <CardContent className="-mt-1 space-y-2 lg:px-3">
        <p className="ellipsis-2 line-clamp-2 text-sm">
          <span className="font-bold">Signal:</span> {trade.analysis}
        </p>

        {/* Multi-leg Trade Badge */}
        {trade.steps && trade.steps.length > 1 && (
          <Badge
            variant="outline"
            size="sm"
            className="mt-2 flex w-fit items-center space-x-1"
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
          <div>
            <p className="text-sm text-muted-foreground">Entry</p>
            <p className="text-base font-bold">
              {formatCurrency(averageBuyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="text-base font-bold">
              {/* Format qty with comma separator */}
              {totalQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
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
            <p className="text-sm text-muted-foreground">Target</p>
            <p className="text-base font-bold">
              {targetPrice !== null ? formatCurrency(targetPrice) : "Varies"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stop Loss</p>
            <p className="text-base font-bold">
              {stopLoss !== null ? formatCurrency(stopLoss) : "Varies"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Target Profit, Current P/L, including % and $ values for each */}
          <div>
            <div className="flex items-center space-x-1.5">
              <p className="text-sm text-muted-foreground">
                Target <span className="text-xs">(Net Profit, Incl. Fees)</span>
              </p>
            </div>
            <p className="text-base font-bold">
              {formatCurrency(targetProfit)}{" "}
              <span className="pt-0.5 text-xs font-semibold">
                ({formatPercentage(targetProfit / totalBuyAmount)} )
              </span>
            </p>
          </div>

          {trade.status !== "Staged" && trade.status !== "Pending" && (
            <div>
              <div className="flex items-end space-x-1.5">
                <p className="text-sm text-muted-foreground">
                  Current P/L <span className="text-xs">(Incl. Fees)</span>
                </p>
              </div>
              <div className="flex items-center space-x-1.5">
                <p
                  className={cn(
                    // if targetProfit is positive, show teal, else red
                    currentProfit > 0
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-base font-bold"
                  )}
                >
                  {formatPercentage(
                    (totalCurrentAmount - totalBuyAmount) / totalBuyAmount
                  )}
                </p>
                <span
                  className={cn(
                    currentProfit > 0
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold"
                  )}
                >
                  ({formatCurrency(totalCurrentAmount - totalBuyAmount)})
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
