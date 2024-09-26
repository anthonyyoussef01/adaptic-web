import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Interval } from "@/types/yahoo-finance"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStartDate(interval: Interval) {
  const today = new Date()
  let subtractDays

  switch (interval) {
    case "1d":
    case "1m":
    case "2m":
    case "5m":
    case "15m":
    case "30m":
    case "60m":
    case "90m":
    case "1h":
      subtractDays = 1
      break
    case "5d":
      subtractDays = 5
      break
    case "1wk":
      subtractDays = 7
      break
    case "1mo":
      subtractDays = 30
      break
    case "3mo":
      subtractDays = 90
      break
    default:
      subtractDays = 0
  }

  today.setDate(today.getDate() - subtractDays)

  // Format the date in the 'YYYY-MM-DD' format
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function CalculateRange(range: string) {
  const currentDate = new Date()
  let from

  switch (range) {
    case "1d":
      currentDate.setDate(currentDate.getDate() - 1)
      break
    case "1w":
      currentDate.setDate(currentDate.getDate() - 7)
      break
    case "1m":
      currentDate.setMonth(currentDate.getMonth() - 1)
      break
    case "3m":
      currentDate.setMonth(currentDate.getMonth() - 3)
      break
    case "1y":
      currentDate.setFullYear(currentDate.getFullYear() - 1)
      break
    default:
      throw new Error(`Invalid range: ${range}`)
  }

  from = currentDate.toISOString().split("T")[0] // format date to 'YYYY-MM-DD'
  return from
}

export function calculateInterval(range: string) {
  let interval

  switch (range) {
    case "1d":
      interval = "15m" // 15 minutes
      break
    case "1w":
    case "1m":
      interval = "1h" // 1 hour
      break
    case "3m":
    case "1y":
      interval = "1d" // 1 day
      break
    default:
      throw new Error(`Invalid range: ${range}`)
  }

  return interval
}

// Format as US currency

export function formatCurrency(value: number) {
  if (isNaN(value)) {
    return "$0.00"
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

// Format as percentage

export function formatPercentage(value: number) {
  if (isNaN(value)) {
    return "0%"
  }
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value)
}

export function getTimeAgo(dateString: string) {
  // if format is like this: '20240919T102005', then first convert to '2024-09-19T10:20:05' format

  let dateValue = dateString as string

  if (dateString && dateString.length === 15) {
    dateValue = dateString.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
      "$1-$2-$3T$4:$5:$6"
    )
  }

  const date = new Date(
    dateValue
  )

  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`
  } else if (hours > 0) {
    return hours === 1 ? "1 hr ago" : `${hours} hrs ago`
  } else if (minutes > 0) {
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`
  } else {
    return "A few seconds ago"
  }
}

// utils/fees.ts

export const FEE_CONFIG = {
  SHARES_COMMISSION_PERCENTAGE: parseFloat(
    process.env.SHARES_COMMISSION_PERCENTAGE || "0.1"
  ), // 0.1% default
  OPTIONS_PER_CONTRACT_FEE: parseFloat(
    process.env.OPTIONS_PER_CONTRACT_FEE || "0.65"
  ), // $0.65 per contract default
  OPTIONS_BASE_COMMISSION: parseFloat(
    process.env.OPTIONS_BASE_COMMISSION || "1.00"
  ), // $1.00 per trade default
  CRYPTO_TRANSACTION_PERCENTAGE: parseFloat(
    process.env.CRYPTO_TRANSACTION_PERCENTAGE || "0.2"
  ), // 0.2% default
  REGULATORY_FEES_PERCENTAGE: parseFloat(
    process.env.REGULATORY_FEES_PERCENTAGE || "0.00221"
  ), // 0.00221% default

}

export function calculateFees(step: any, assetClass: string) {
  let fee = 0
  let tradeValue = 0
  let perContractFee = 0
  let baseCommission = 0
  let commissionFee = 0
  let exchangeFee = 0
  let nfaFee = 0
  let cmeFee = 0
  let clearingFee = 0
  let otherFees = 0
  let regulatoryFee = 0

  // Normalize assetClass for options
  if (assetClass === "Call Option" || assetClass === "Put Option") {
    assetClass = "Options"
  }

  if (assetClass === "Equity") {
    assetClass = "Shares"
  }

  if (assetClass === "Stock" || assetClass === "ETF") {
    assetClass = "Shares"
  }

  if (assetClass === "Future") {
    assetClass = "Futures"
  }

  if (assetClass === "Forex") {
    assetClass = "Forex"
  }

  if (assetClass === "Crypto") {
    assetClass = "Crypto"
  }

  if (assetClass === "Commodity") {
    assetClass = "Commodities"
  }

  if (assetClass === "Bond") {
    assetClass = "Bonds"
  }

  if (assetClass === "Index") {
    assetClass = "Indices"
  }

  if (assetClass === "Mutual Fund") {
    assetClass = "Mutual Funds"
  }

  if (assetClass === "Future Option") {
    assetClass = "Future Options"
  }

  if (assetClass === "Crypto Option") {
    assetClass = "Crypto Options"
  }

  if (assetClass === "Commodity Option") {
    assetClass = "Commodity Options"
  }

  // Adjust tradeValue based on the action
  if (step.action === "enter" || step.action === "adjust" || step.action === "hedge") {
    tradeValue = (step.buyPrice || step.hedgePrice || 0) * (step.qty || 0)
  } else if (step.action === "exit" || step.action === "take_profit" || step.action === "stop_loss") {
    tradeValue = (step.sellPrice || 0) * (step.qty || 0)
  }

  switch (assetClass) {
    case "Shares":
      // Commission Fee
      commissionFee =
        (tradeValue * FEE_CONFIG.SHARES_COMMISSION_PERCENTAGE) / 100

      // Regulatory Fees
      regulatoryFee =
        (tradeValue * FEE_CONFIG.REGULATORY_FEES_PERCENTAGE) / 100

      fee = commissionFee + regulatoryFee
      break

    case "Options":
      // Per Contract Fee
      perContractFee =
        (step.qty || 0) * FEE_CONFIG.OPTIONS_PER_CONTRACT_FEE

      // Base Commission
      baseCommission = FEE_CONFIG.OPTIONS_BASE_COMMISSION

      fee = perContractFee + baseCommission
      break

    case "Crypto":
      // Transaction Fee
      const transactionFee =
        (tradeValue * FEE_CONFIG.CRYPTO_TRANSACTION_PERCENTAGE) / 100

      fee = transactionFee
      break

    case "Futures":
      // Per Contract Fee
      perContractFee = 0.85

      // Base Commission
      baseCommission = 0.85

      // Exchange Fee
      exchangeFee = 0.25

      // NFA Fee
      nfaFee = 0.02

      // CME Fee
      cmeFee = 0.01

      // Clearing Fee
      clearingFee = 0.30

      // Other Fees
      otherFees = 0.01

      fee = perContractFee + baseCommission + exchangeFee + nfaFee + cmeFee + clearingFee + otherFees

      break

    case "Forex":
      // Commission Fee
      commissionFee =
        (tradeValue * FEE_CONFIG.SHARES_COMMISSION_PERCENTAGE) / 100

      // Regulatory Fees
      regulatoryFee =
        (tradeValue * FEE_CONFIG.REGULATORY_FEES_PERCENTAGE) / 100

      fee = commissionFee + regulatoryFee
      break

    case "Indices":
      // Commission Fee
      commissionFee =
        (tradeValue * FEE_CONFIG.SHARES_COMMISSION_PERCENTAGE) / 100

      // Regulatory Fees
      regulatoryFee =
        (tradeValue * FEE_CONFIG.REGULATORY_FEES_PERCENTAGE) / 100

      fee = commissionFee + regulatoryFee
      break

    case "Commodities":
      // Per Contract Fee
      perContractFee = 0.85

      // Base Commission
      baseCommission = 0.85

      // Exchange Fee
      exchangeFee = 0.25

      // NFA Fee
      nfaFee = 0.02

      // CME Fee
      cmeFee = 0.01

      // Clearing Fee
      clearingFee = 0.30

      // Other Fees
      otherFees = 0.01

    default:
      // Default fee calculation
      fee = 0
      break
  }

  return fee
}


export function calculateTotalFees(trade: any) {
  let totalFees = 0
  const individualFees = []

  if (trade.steps && trade.steps.length > 0) {
    for (const step of trade.steps) {
      const fee = calculateFees(step, trade.instrument)
      totalFees += fee
      individualFees.push({ sequence: step.sequence, fee: fee })
    }
  } else {
    // Create 'step' instances for the buy and sell actions
    const buyStep = {
      action: "enter",
      buyPrice: trade.buyPrice,
      qty: trade.qty,
      class: trade.instrument,
      sequence: 1, // Assign sequence numbers
    }

    const buyFee = calculateFees(buyStep, trade.instrument)
    totalFees += buyFee
    individualFees.push({ sequence: buyStep.sequence, fee: buyFee })

    const sellStep = {
      action: "exit",
      sellPrice: trade.sellPrice || trade.sellPrice || trade.currentPrice,
      qty: trade.qty,
      class: trade.instrument,
      sequence: 2, // Assign sequence numbers
    }

    const sellFee = calculateFees(sellStep, trade.instrument)
    totalFees += sellFee
    individualFees.push({ sequence: sellStep.sequence, fee: sellFee })
  }

  return {
    totalFees,
    individualFees,
  }
}



export function determineTradeStatus(trade: any): string {
  if (!trade.steps || trade.steps.length === 0) {
    return trade.status
  }

  // Get the statuses of all steps where step.action is either 'enter', 'exit', 'adjust, 'stop_loss', or 'take_profit'

  const stepStatuses = trade.steps.map((step: any) => {
    if (
      step.action === "enter" ||
      step.action === "exit" ||
      step.action === "adjust" ||
      step.action === "stop_loss" ||
      step.action === "take_profit"
    ) {
      return step.status
    }
    return null
  })

  // if last step is executed or completed, then trade is completed
  if (stepStatuses[stepStatuses.length - 1] === "Executed" || stepStatuses[stepStatuses.length - 1] === "Completed") {
    return "Completed"
  }

  // if any step is executed, completed, or open, then trade is open
  else if (stepStatuses.includes("Executed") || stepStatuses.includes("Completed") || stepStatuses.includes("Active")) {
    return "Active"
  }

  // else if there is only one step and it is partial, then trade is partial
  else if (stepStatuses.length === 1 && stepStatuses[0] === "Partial") {
    return "Partial"
  }

  // if there is any 'partial' step, then trade is partial
  else if (stepStatuses.includes("Partial")) {
    return "Partial"
  }

  // else status is staged
  return "Staged"
}

// Calculate total quantity, average buy price, target price, stop loss, and total buy amount
export function calculateAggregatedTradeData(trade: any) {
  let totalQty = trade.qty || 0
  let averageBuyPrice = trade.buyPrice || 0
  let targetPrice = trade.targetPrice || 0
  let stopLoss = trade.stopLoss || 0

  if (trade.steps && trade.steps.length > 0) {
    // Filter out steps without necessary details
    const validSteps = trade.steps.filter(
      (step: any) => step.qty && step.buyPrice
    )

    // Calculate total quantity
    totalQty = validSteps.reduce((sum: number, step: any) => sum + step.qty, 0)

    // Calculate weighted average buy price
    const totalCost = validSteps.reduce(
      (sum: number, step: any) => sum + step.buyPrice * step.qty,
      0
    )

    averageBuyPrice = totalQty ? totalCost / totalQty : 0

    // Determine if targetPrice and stopLoss are consistent
    const targetPrices = new Set(
      validSteps
        .map((step: any) => step.targetPrice)
        .filter((price: number) => price !== undefined && price !== null)
    )
    targetPrice = targetPrices.size === 1 ? Array.from(targetPrices)[0] : null

    const stopLosses = new Set(
      validSteps
        .map((step: any) => step.stopLoss)
        .filter((price: number) => price !== undefined && price !== null)
    )
    stopLoss = stopLosses.size === 1 ? Array.from(stopLosses)[0] : null
  }

  // Compute total buy amount
  const totalBuyAmount = averageBuyPrice * totalQty

  return {
    totalQty,
    averageBuyPrice,
    targetPrice,
    stopLoss,
    totalBuyAmount,
  }
}

// Calculate target profit

export function calculateTargetProfit(trade: any, aggregatedData: any) {
  const { averageBuyPrice, totalQty, targetPrice } = aggregatedData

  if (!targetPrice || !totalQty) return 0

  const totalFees = calculateTotalFees(trade).totalFees

  if (trade.instrument === "Put Option") {
    return (averageBuyPrice - targetPrice) * totalQty - totalFees
  } else {
    return (targetPrice - averageBuyPrice) * totalQty - totalFees
  }
}

// Calculate current profit
export function calculateCurrentProfit(trade: any, aggregatedData: any) {
  const { averageBuyPrice, totalQty } = aggregatedData
  const currentPrice = trade.currentPrice

  if (!currentPrice || !totalQty) return 0

  const totalFees = calculateTotalFees(trade).totalFees

  if (trade.instrument === "Put Option") {
    return (averageBuyPrice - currentPrice) * totalQty - totalFees
  } else {
    return (currentPrice - averageBuyPrice) * totalQty - totalFees
  }
}

// Calculate realised profit
export function calculateRealisedProfit(trade: any, aggregatedData: any) {
  const { averageBuyPrice, totalQty } = aggregatedData

  if (trade.status !== "Completed") return 0

  let realisedProfit = 0
  const totalFees = calculateTotalFees(trade).totalFees

  if (trade.steps && trade.steps.length > 0) {
    // For multi-leg trades
    const exitSteps = trade.steps.filter(
      (step: any) => step.action === "exit" && step.status === "Completed"
    )

    realisedProfit = exitSteps.reduce((sum: number, step: any) => {
      const sellPrice = step.executionPrice || step.sellPrice || trade.currentPrice
      if (!sellPrice || !step.qty) return sum

      if (trade.instrument === "Put Option") {
        return sum + (averageBuyPrice - sellPrice) * step.qty
      } else {
        return sum + (sellPrice - averageBuyPrice) * step.qty
      }
    }, 0)

    realisedProfit -= totalFees
  } else {
    // Single-leg trade
    const sellPrice = trade.sellPrice || trade.currentPrice
    if (!sellPrice || !totalQty) return 0

    if (trade.instrument === "Put Option") {
      realisedProfit = (averageBuyPrice - sellPrice) * totalQty - totalFees
    } else {
      realisedProfit = (sellPrice - averageBuyPrice) * totalQty - totalFees
    }
  }

  return realisedProfit
}


// Calculate total exit amount
export function calculateTotalExitAmount(trade: any, aggregatedData: any) {
  const { totalQty } = aggregatedData

  if (trade.status !== "Completed") return 0

  const sellPrice = trade.sellPrice || trade.currentPrice
  if (!sellPrice || !totalQty) return 0

  return sellPrice * totalQty
}

