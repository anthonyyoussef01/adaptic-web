import React from "react"

import { Modal } from "@/components/ui/modal"

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/ui/icons"
import { Progress } from "@/components/ui/progress"
import {
  cn,
  formatCurrency,
  formatPercentage,
  determineTradeStatus,
} from "@/lib/utils"
import { TradeMenu } from "./trade-menu"
import { Separator } from "@/components/ui/separator"
interface TradeDetailModalProps {
  trade: any // Replace 'any' with your Trade type/interface
  open: boolean
  onClose: () => void
}

export function TradeDetailModal({
  trade,
  open,
  onClose,
}: TradeDetailModalProps) {
  if (!trade) return null

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
    <Modal
      className="w-full max-w-5xl px-0 pb-6 focus:outline-none"
      showModal={open}
      setShowModal={onClose}
    >
      {/* **Header** */}
      <div className="-mt-0.5 flex w-full flex-row items-start justify-between px-3 lg:px-4">
        <div>
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
                        (trade.currentPrice - averageBuyPrice) / averageBuyPrice
                      )}
                      )
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* **Asset Class Icon with Tooltip** */}
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
              <TooltipContent className="mb-2 mr-4">
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
          {/* **Status Badge** */}
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
      </div>

      <Separator className="my-6 lg:my-2" />

      {/* **Analysis** */}
      <div className="px-3 lg:px-4">
        <div className="flex items-center space-x-1.5">
          <Icons.activity className="size-3 text-muted-foreground" />
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Signal
          </span>
        </div>
        <span className="ellipsis-2 line-clamp-2 text-base text-black/80 dark:text-white/80">
          {trade.analysis}
        </span>
      </div>

      <Separator className="my-6 lg:my-2" />

      <div className="mt-2 space-y-4 px-3 lg:px-4">
        <div className="flex items-center space-x-1.5">
          <Icons.candlestickChart className="size-3 text-muted-foreground" />
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Trade Overview
          </span>
        </div>
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
      </div>

      <Separator className="my-6 lg:my-2" />

      {/* **Trade Steps Section** */}
      {trade.steps && (
        <div className="mt-2 px-3 lg:px-4">
          {/* **Section Title with Icon and Label** */}
          <div className="flex items-center space-x-1.5">
            <Icons.steps className="size-3 text-muted-foreground" />
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Multi-Leg Trade Steps ({stepsCompleted}/{stepsTotal})
            </span>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue={`step-${stepsCompleted}`}
            className="mt-4 space-y-4"
          >
            {trade.steps.map((step: any, idx: number) => (
              <AccordionItem
                key={idx}
                value={`step-${idx}`}
                className="rounded-lg border border-border  px-3 shadow-md shadow-black/10 transition duration-200 ease-in-out hover:scale-[1.01] hover:no-underline hover:shadow-xl lg:px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="-my-2 flex w-full items-center justify-between pr-2">
                    <span className="text-sm font-bold">
                      {step.sequence}.{" "}
                      {step.action.charAt(0).toUpperCase() +
                        step.action.slice(1)}
                    </span>
                    {/* **Status Badge** */}
                    <Badge
                      variant={
                        step.status === "Staged"
                          ? "outline"
                          : step.status === "Open"
                            ? "green"
                            : step.status === "Pending"
                              ? "yellow"
                              : step.status === "Cancelled"
                                ? "destructive"
                                : step.status === "Partial"
                                  ? "blue"
                                  : "default"
                      }
                      animate={step.status === "Open"}
                      className="h-5 px-2 text-[10px]"
                    >
                      {step.status.toUpperCase()}{" "}
                      {step.status === "Partial" && "(" + step.fulfilled + ")"}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* Display step details */}
                  <p className="-mt-1">{step.details.note}</p>
                  {/* Additional step information */}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {step.details.buyPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Buy Price
                        </p>
                        <p className="text-base font-bold">
                          {formatCurrency(step.details.buyPrice)}
                        </p>
                      </div>
                    )}
                    {step.details.targetPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Target Price
                        </p>
                        <p className="text-base font-bold">
                          {formatCurrency(step.details.targetPrice)}
                        </p>
                      </div>
                    )}
                    {step.details.stopLoss && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Stop Loss
                        </p>
                        <p className="text-base font-bold">
                          {formatCurrency(step.details.stopLoss)}
                        </p>
                      </div>
                    )}
                    {step.details.qty && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Quantity
                        </p>
                        <p className="text-base font-bold">
                          {step.details.qty}
                        </p>
                      </div>
                    )}
                    {step.details.side && (
                      <div>
                        <p className="text-sm text-muted-foreground">Side</p>
                        <p className="text-base font-bold">
                          {step.details.side.charAt(0).toUpperCase() +
                            step.details.side.slice(1)}
                        </p>
                      </div>
                    )}
                    {step.details.type && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Order Type
                        </p>
                        <p className="text-base font-bold">
                          {step.details.type.charAt(0).toUpperCase() +
                            step.details.type.slice(1)}
                        </p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </Modal>
  )
}
