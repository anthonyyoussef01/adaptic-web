import React from "react"
import { Modal } from "@/components/ui/modal"
import { useMediaQuery } from "@/hooks/use-media-query"
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
import { Separator } from "@/components/ui/separator"
import {
  cn,
  formatCurrency,
  formatPercentage,
  determineTradeStatus,
  calculateAggregatedTradeData,
  calculateRealisedProfit,
  calculateCurrentProfit,
  calculateTargetProfit,
  calculateTotalFees,
} from "@/lib/utils"
import { TradeMenu } from "./trade-menu"

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
  const { isDesktop } = useMediaQuery()

  if (!trade) return null

  // **Determine Trade Status**
  const aggregatedStatus = determineTradeStatus(trade)

  // Calculate Total Fees
  const { totalFees, individualFees } = calculateTotalFees(trade)

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
    <Modal
      className="w-full max-w-5xl px-0 pb-6 focus:outline-none"
      showModal={open}
      setShowModal={onClose}
    >
      {/* **Header** */}
      <div className="mt-0 flex w-full flex-row items-start justify-between px-3 md:-mt-1 lg:px-4">
        <div>
          <div className="flex items-start space-x-1.5 font-bold">
            <Avatar
              size={isDesktop ? "md" : "sm"}
              className="mt-1 bg-white p-1"
            >
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
      </div>

      <Separator className="my-6 md:my-2" />

      {/* **Analysis** */}
      <div className="space-y-2 px-3 lg:px-4">
        <div className="flex items-center space-x-1.5">
          <Icons.activity className="size-3 text-muted-foreground" />
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Signal
          </span>
        </div>
        <span className="ellipsis-4 line-clamp-4 text-base text-black/80 dark:text-white/80">
          {trade.analysis}
        </span>
      </div>

      <Separator className="my-6 md:my-2" />

      <div className="mt-2 space-y-4 px-3 lg:px-4">
        <div className="flex items-center space-x-1.5">
          <Icons.candlestickChart className="size-3 text-muted-foreground" />
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Trade Overview
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Entry</p>
            <p className="text-base font-bold">
              {formatCurrency(averageBuyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-base font-bold">
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
            <p className="text-sm text-muted-foreground">Take Profit</p>
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
          <div>
            <p className="text-sm text-muted-foreground">Strategy</p>
            <p className="text-base font-bold">{trade.strategy}</p>
          </div>

          {/* Fees */}
          <div>
            <p className="text-sm text-muted-foreground">Total Fees</p>
            <p
              className={cn(
                totalFees !== 0 && "text-red-700 dark:text-red-400",

                "text-base font-bold"
              )}
            >
              {" "}
              {formatCurrency(-+totalFees)}
            </p>
          </div>

          {/* Target Profit */}
          <div>
            <div className="flex items-center space-x-1.5">
              <p className="text-sm text-muted-foreground">
                Target <span className="text-xs">(Net Profit)</span>
              </p>
            </div>
            <p className="text-base font-bold">
              {formatCurrency(targetProfit)}{" "}
              <span className="pt-0.5 text-xs font-semibold">
                ({formatPercentage(targetProfit / totalBuyAmount)} )
              </span>
            </p>
          </div>

          {/* Current Profit */}

          {aggregatedStatus !== "Pending" && (
            <div className="shrink-0">
              <div className="flex items-end space-x-1.5">
                <p className="text-sm text-muted-foreground">
                  {aggregatedStatus === "Closed" ? "" : "Current"} P/L{" "}
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
                    "text-base font-bold"
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
      </div>

      <Separator className="my-6 md:my-2" />

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
            defaultValue={isDesktop ? `step-${stepsCompleted}` : undefined}
            className="mt-4 space-y-4"
          >
            {trade.steps.map((step: any, idx: number) => {
              // get stepFees from individualFees object (find individualFees object where object.sequence === step.sequence)
              const stepFee = individualFees.find(
                (fee) => fee.sequence === step.sequence
              )
              return (
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
                          step.status === "Pending"
                            ? "outline"
                            : step.status === "Open"
                              ? "green"
                              : step.status === "Partial"
                                ? "blue"
                                : "default"
                        }
                        animate={step.status === "Open"}
                        className="h-5 px-2 text-[10px]"
                      >
                        {step.status.toUpperCase()}
                        {step.status === "Partial" &&
                          " (" + step.fulfilled + ")"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Display step details */}
                    <p className="-mt-1">{step.note}</p>
                    {/* Additional step information */}
                    <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-4">
                      {step.action === "hedge" ? (
                        <>
                          {step.hedgeType && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Hedge Type
                              </p>
                              <p className="text-base font-bold">
                                {step.hedgeType.charAt(0).toUpperCase() +
                                  step.hedgeType.slice(1)}
                              </p>
                            </div>
                          )}
                          {step.hedgePrice && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Hedge Price
                              </p>
                              <p className="text-base font-bold">
                                {formatCurrency(step.hedgePrice)}
                              </p>
                            </div>
                          )}
                          {step.qty && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Quantity
                              </p>
                              <p className="text-base font-bold">
                                {step.qty.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {step.executionTime && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Execution Time
                              </p>
                              <p className="text-base font-bold">
                                {new Date(step.executionTime).toLocaleString()}
                              </p>
                            </div>
                          )}
                          {stepFee && stepFee?.fee > 0 && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Fees
                              </p>
                              <p
                                className={cn(
                                  stepFee && stepFee?.fee > 0
                                    ? "text-red-700 dark:text-red-400"
                                    : "text-green-700 dark:text-green-400",
                                  "text-base font-bold"
                                )}
                              >
                                {formatCurrency(-+stepFee.fee)}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {step.buyPrice && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Buy Price
                              </p>
                              <p className="text-base font-bold">
                                {formatCurrency(step.buyPrice)}
                              </p>
                            </div>
                          )}
                          {step.takeProfitPrice && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Sell Price
                              </p>
                              <p className="text-base font-bold">
                                {formatCurrency(step.takeProfitPrice)}
                              </p>
                            </div>
                          )}
                          {step.targetPrice && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Take Profit Price
                              </p>
                              <p className="text-base font-bold">
                                {formatCurrency(step.targetPrice)}
                              </p>
                            </div>
                          )}
                          {step.stopLoss && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Stop Loss
                              </p>
                              <p className="text-base font-bold">
                                {formatCurrency(step.stopLoss)}
                              </p>
                            </div>
                          )}
                          {step.qty && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Quantity
                              </p>
                              <p className="text-base font-bold">
                                {step.qty.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {step.side && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Side
                              </p>
                              <p className="text-base font-bold">
                                {step.side.charAt(0).toUpperCase() +
                                  step.side.slice(1)}
                              </p>
                            </div>
                          )}
                          {step.type && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Order Type
                              </p>
                              <p className="text-base font-bold">
                                {step.type.charAt(0).toUpperCase() +
                                  step.type.slice(1)}
                              </p>
                            </div>
                          )}
                          {step.executionTime && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Execution Time
                              </p>
                              <p className="text-base font-bold">
                                {new Date(step.executionTime).toLocaleString()}
                              </p>
                            </div>
                          )}
                          {stepFee && stepFee?.fee > 0 && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Fees
                              </p>
                              <p
                                className={cn(
                                  stepFee && stepFee?.fee > 0
                                    ? "text-red-700 dark:text-red-400"
                                    : "text-green-700 dark:text-green-400",
                                  "text-base font-bold"
                                )}
                              >
                                {formatCurrency(-+stepFee.fee)}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      )}
    </Modal>
  )
}
