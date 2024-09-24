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
  else if (stepStatuses.includes("Executed") || stepStatuses.includes("Completed") || stepStatuses.includes("Open")) {
    return "Open"
  }

  // else if there is only one step, and it is cancelled, then trade is cancelled
  else if (stepStatuses.length === 1 && stepStatuses[0] === "Cancelled") {
    return "Cancelled"
  }

  // else if there is only one step and it is pending, then trade is pending
  else if (stepStatuses.length === 1 && stepStatuses[0] === "Pending") {
    return "Pending"
  }

  // else if there is only one step and it is partial, then trade is partial
  else if (stepStatuses.length === 1 && stepStatuses[0] === "Partial") {
    return "Partial"
  }

  // else status is staged
  return "Staged"
}
