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
        step.status === "Executed" || step.status === "Completed"
    ).length || 0
  const stepsTotal = trade.steps ? trade.steps.length : 0

  return (
    <Modal
      className="w-full max-w-5xl px-0 pb-6 focus:outline-none"
      showModal={open}
      setShowModal={onClose}
    >
      {/* **Header** */}
      <div className="flex w-full flex-row items-center justify-between px-3 lg:px-4">
        <div>
          <div className="flex items-start space-x-1.5 font-bold lg:space-x-3">
            <Avatar
              size={isDesktop ? "md" : "sm"}
              className={cn(isDesktop ? "p-1" : "p-0.5", "mt-1 bg-white")}
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
                        <Icons.stock className="size-4" />
                      ) : trade.class === "Crypto" ? (
                        <Icons.crypto className="size-4" />
                      ) : trade.instrument === "Call Option" ? (
                        <Icons.call className="h-4" />
                      ) : trade.instrument === "Put Option" ? (
                        <Icons.put className="h-4" />
                      ) : trade.class === "Commodities" ? (
                        <Icons.commodities className="h-5" />
                      ) : (
                        trade.class === "Forex" && (
                          <Icons.forex className="h-4" />
                        )
                      )}
                      <p className="sr-only">{trade.instrument}</p>
                    </TooltipTrigger>
                    <TooltipContent className="z-50 mb-2 mr-4">
                      <div className="flex items-center space-x-2">
                        {/* Repeat Icon here for consistency */}
                        {trade.class === "Shares" ? (
                          <Icons.stock className="size-4" />
                        ) : trade.class === "Crypto" ? (
                          <Icons.crypto className="size-4" />
                        ) : trade.instrument === "Call Option" ? (
                          <Icons.call className="h-4" />
                        ) : trade.instrument === "Put Option" ? (
                          <Icons.put className="h-4" />
                        ) : trade.class === "Commodities" ? (
                          <Icons.commodities className="h-5" />
                        ) : (
                          trade.class === "Forex" && (
                            <Icons.forex className="h-4" />
                          )
                        )}
                        <p className="text-semibold text-sm">{trade.class}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/** Current Price and Price Change for Asset */}
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
                    aggregatedStatus === "Staged"
                      ? "outline"
                      : aggregatedStatus === "Active"
                        ? "green"
                        : aggregatedStatus === "Partial"
                          ? "blue"
                          : "default"
                  }
                  animate={aggregatedStatus === "Active"}
                  className={cn(
                    aggregatedStatus === "Completed" ? "h-6" : "h-5",
                    "whitespace-nowrap px-2 text-[10px]"
                  )}
                >
                  {aggregatedStatus.toUpperCase()}
                  {aggregatedStatus === "Partial" &&
                    trade.fulfilled &&
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
      </div>

      <Separator className="my-6 md:my-1" />

      {/* **Analysis** */}
      <span className="line-clamp-4 px-3 text-base text-black/80 dark:text-white/80 lg:px-4">
        <div className="relative inline-flex items-center space-x-1.5 pr-1">
          <Icons.activity className="size-3 shrink-0 text-teal-700 dark:text-teal-400" />
        </div>
        <span className="font-bold">{trade.signal}</span>: {trade.analysis}
      </span>

      <Separator className="my-6 md:my-1" />

      <div className="space-y-3 px-3 lg:px-4">
        <div className="flex items-center space-x-1.5">
          <Icons.candlestickChart className="size-3 text-muted-foreground" />
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Summary
          </span>
        </div>
        {/* Strategy, Instrument, Class */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Strategy
            </p>
            <p className="text-sm font-bold sm:text-base">{trade.strategy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Instrument
            </p>
            <p className="text-sm font-bold sm:text-base">{trade.instrument}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Risk Management
            </p>
            <p className="text-sm font-bold sm:text-base">
              {trade.riskManagement || "N/A"}
            </p>
          </div>
        </div>

        {/* Entry, Volume, Target, Stop Loss */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Buy Price
            </p>
            <p className="text-sm font-bold sm:text-base">
              {formatCurrency(averageBuyPrice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">Volume</p>
            <p className="text-sm font-bold sm:text-base">
              {totalQty.toLocaleString()}{" "}
              <span className="text-xs font-normal sm:text-sm">
                {trade.instrument === "Shares"
                  ? "Shares"
                  : trade.instrument === "Crypto"
                    ? "Tokens"
                    : "Contracts"}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Target Price
            </p>
            <p className="text-sm font-bold sm:text-base">
              {targetPrice !== null ? formatCurrency(targetPrice) : "Varies"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Stop Loss */}
          <div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Stop Loss
            </p>
            <p
              className={cn(
                stopLoss > trade.sellPrice && "text-red-700 dark:text-red-400",
                "text-sm font-bold sm:text-base"
              )}
            >
              {stopLoss !== null ? formatCurrency(stopLoss) : "Varies"}
            </p>
          </div>
          {/* Target Profit */}
          <div>
            <div className="flex items-center space-x-1.5">
              <p className="text-sm text-muted-foreground sm:text-base">
                Target <span className="text-xs">(Net Profit)</span>
              </p>
            </div>
            <p className="text-sm font-bold sm:text-base">
              {formatCurrency(targetProfit)}{" "}
              <span className="pt-0.5 text-xs font-semibold  sm:text-sm">
                ({formatPercentage(targetProfit / totalBuyAmount)})
              </span>
            </p>
          </div>

          {/* Sell Price */}
          {trade.sellPrice && (
            <div>
              <p className="text-sm text-muted-foreground sm:text-base">
                Sell Price
              </p>

              <div className="-space-y-1.5">
                <p
                  className={cn(
                    trade.sellPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-sm font-bold sm:text-base"
                  )}
                >
                  {formatCurrency(trade.sellPrice)}
                </p>
                <p
                  className={cn(
                    trade.sellPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold  sm:text-sm"
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
              <p className="text-sm text-muted-foreground sm:text-base">
                Current Price
              </p>

              <div className="-space-y-1 sm:flex sm:items-center sm:space-x-1 sm:space-y-0">
                <p
                  className={cn(
                    trade.currentPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "text-sm font-bold sm:text-base"
                  )}
                >
                  {formatCurrency(trade.currentPrice)}
                </p>

                <p
                  className={cn(
                    trade.currentPrice > averageBuyPrice
                      ? "text-teal-700 dark:text-teal-400"
                      : "text-red-700 dark:text-red-400",
                    "pt-0.5 text-xs font-semibold  sm:text-sm"
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
          {/* Fees */}
          <div>
            <p className="text-sm text-muted-foreground">Total Fees</p>
            <p
              className={cn(
                totalFees !== 0 && "text-red-700 dark:text-red-400",

                "text-sm font-bold sm:text-base"
              )}
            >
              {" "}
              {formatCurrency(-+totalFees)}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-6 md:my-1" />

      {/* **Trade Steps Section** */}
      {trade.steps && (
        <div className="space-y-2 px-3 lg:px-4">
          {/* **Section Title with Icon and Label** */}
          <div className="flex items-center space-x-1.5">
            <Icons.steps className="size-3 text-muted-foreground" />
            <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Legs{" "}
              <span className="text-xs font-semibold">
                (
                {stepsCompleted === stepsTotal && (
                  <Icons.check className="inline-flex h-3 w-3 shrink-0 text-teal-700 dark:text-teal-400" />
                )}{" "}
                <span
                  className={cn(
                    stepsCompleted === stepsTotal
                      ? "text-teal-700 dark:text-teal-500"
                      : "text-muted-foreground",
                    "text-xs font-semibold"
                  )}
                >
                  {stepsCompleted} / {stepsTotal}{" "}
                </span>
                Completed)
              </span>
            </span>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue={isDesktop ? `step-${stepsCompleted}` : undefined}
            className="space-y-4 pt-2"
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
                  className="rounded-lg border border-border px-3 shadow-md shadow-black/10 transition duration-200 ease-in-out hover:scale-[1.01] hover:no-underline hover:shadow-xl lg:px-4"
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
                            ? "default"
                            : step.status === "Active"
                              ? "green"
                              : step.status === "Partial"
                                ? "blue"
                                : "outline"
                        }
                        animate={step.status === "Active"}
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
                              <p className="text-sm font-bold sm:text-base">
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
                              <p className="text-sm font-bold sm:text-base">
                                {formatCurrency(step.hedgePrice)}
                              </p>
                            </div>
                          )}
                          {step.qty && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Volume
                              </p>
                              <p className="text-sm font-bold sm:text-base">
                                {step.qty.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {step.executionTime && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Execution Time
                              </p>
                              <p className="text-sm font-bold sm:text-base">
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
                                    : "text-teal-700 dark:text-teal-400",
                                  "text-sm font-bold sm:text-base"
                                )}
                              >
                                {formatCurrency(stepFee.fee)}
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
                              <p className="text-sm font-bold sm:text-base">
                                {formatCurrency(step.buyPrice)}
                              </p>
                            </div>
                          )}

                          {step.targetPrice && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Target Price
                              </p>
                              <p className="text-sm font-bold sm:text-base">
                                {formatCurrency(step.targetPrice)}
                              </p>
                            </div>
                          )}
                          {(step.status === "Completed" ||
                            step.status === "Executed") &&
                            step.sellPrice && (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Sell Price
                                </p>
                                <p className="text-sm font-bold sm:text-base">
                                  {formatCurrency(step.sellPrice)}
                                </p>
                              </div>
                            )}
                          {step.stopLoss && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Stop Loss
                              </p>
                              <p className="text-sm font-bold sm:text-base">
                                {formatCurrency(step.stopLoss)}
                              </p>
                            </div>
                          )}
                          {step.qty && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Volume
                              </p>
                              <p className="text-sm font-bold sm:text-base">
                                {step.qty.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {step.side && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Side
                              </p>
                              <p className="text-sm font-bold sm:text-base">
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
                              <p className="text-sm font-bold sm:text-base">
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
                              <p className="text-sm font-bold sm:text-base">
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
                                    : "text-teal-700 dark:text-teal-400",
                                  "text-sm font-bold sm:text-base"
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
