import React from "react"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface KPICardProps {
  label: string
  value: string
  change?: string
}

function KPICard({ label, value, change }: KPICardProps) {
  const { isDesktop } = useMediaQuery()

  return (
    <Card className="p-3 shadow-sm lg:border-indigo-400/5 lg:bg-indigo-500/30">
      <p
        className={cn(
          isDesktop ? "text-white/80" : "text-muted-foreground",
          "text-xs font-bold uppercase tracking-wider"
        )}
      >
        {label}
      </p>
      <p className={cn(isDesktop && "text-white", "text-xl font-bold")}>
        {value}
      </p>
      {change && (
        <p
          className={`text-sm ${
            change.startsWith("+") ? "text-green-400" : "text-red-400"
          }`}
        >
          {change}
        </p>
      )}
    </Card>
  )
}

const PerformanceMetrics: React.FC = () => {
  const { isDesktop } = useMediaQuery()

  const metric = [
    { label: "Sharpe Ratio", value: "1.8" },
    { label: "Volatility", value: "12.5%" },
    { label: "Max Drawdown", value: "8.3%" },
    { label: "Win Rate", value: "68%" },
    { label: "Avg. Return/Trade", value: "1.34%" },
    { label: "Avg. Execution Time", value: "2m 42s" },
  ]

  return (
    <Card className="relative rounded-none border-none shadow-2xl shadow-black/10 sm:mx-0 sm:rounded-3xl sm:border-solid lg:bg-indigo-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={cn(isDesktop && "text-white/60")}>
          Performance
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mt-1 space-y-6 md:space-y-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {metric.map((metric, index) => (
              <KPICard key={index} label={metric.label} value={metric.value} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PerformanceMetrics
