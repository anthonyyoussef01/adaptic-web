import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export function AIInsights() {
  const insights = [
    {
      type: "Rebalance",
      message: "Consider increasing allocation to technology sector by 2%",
      confidence: 0.85,
    },
    {
      type: "Risk",
      message: "Portfolio volatility is approaching upper threshold",
      confidence: 0.78,
    },
    {
      type: "Opportunity",
      message: "Emerging market bonds show potential for growth",
      confidence: 0.72,
    },
  ]

  const forecasts = [
    { period: "1 Month", return: 2.5, confidence: 0.7 },
    { period: "3 Months", return: 5.8, confidence: 0.65 },
  ]

  return (
    <Card className="rounded-3xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>AI Insights & Recommendations</CardTitle>
        <Button variant="outline" size="sm" className="text-xs">
          <Icons.refresh className="mr-1 h-3 w-3" /> Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Latest Insights</h3>
            {insights.map((insight, index) => (
              <div key={index} className="mb-2 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{insight.type}</span>
                  <span className="text-sm text-muted-foreground">
                    Confidence: {(insight.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="mt-1 text-sm">{insight.message}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Performance Forecast</h3>
            {forecasts.map((forecast, index) => (
              <div
                key={index}
                className="mb-2 flex items-center justify-between"
              >
                <span>{forecast.period}</span>
                <span className="font-semibold text-teal-600">
                  {forecast.return > 0 ? "+" : ""}
                  {forecast.return.toFixed(2)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  Confidence: {(forecast.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
