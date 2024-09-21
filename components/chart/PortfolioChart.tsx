import React, { useEffect, useRef, useState } from "react"
import { createChart, IChartApi, ColorType } from "lightweight-charts"
import { useTheme } from "next-themes"

interface DataPoint {
  time: string
  value: number
}

interface PortfolioChartProps {
  data: DataPoint[]
  isDesktop?: boolean
}

export function PortfolioChart({ data, isDesktop }: PortfolioChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<any>(null)
  const { theme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  useEffect(() => {
    setSelectedTheme(theme as string)
  }, [theme])

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          attributionLogo: false,
          textColor: isDesktop
            ? "white"
            : selectedTheme === "dark"
              ? "white"
              : "black",
          background: {
            type: ColorType.Solid,
            color: "transparent",
          },
          fontSize: 12,
          fontFamily: "Inter",
        },
        grid: {
          vertLines: { color: "rgba(42, 46, 57, 0.0)" },
          horzLines: { color: "rgba(42, 46, 57, 0.0)" },
        },
        height: 300,
        width: chartContainerRef.current.offsetWidth,
      })
      chartRef.current = chart

      const areaSeries = chart.addAreaSeries()
      areaSeriesRef.current = areaSeries
      areaSeries.setData(data)
      chart.timeScale().fitContent()

      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.offsetWidth,
          })
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (chartRef.current) {
          chartRef.current.remove()
          chartRef.current = null
        }
        areaSeriesRef.current = null
      }
    }
  }, [isDesktop])

  useEffect(() => {
    if (areaSeriesRef.current) {
      // Ensure data is sorted in ascending order
      const sortedData = [...data].sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      )

      areaSeriesRef.current.setData(sortedData)
      chartRef.current?.timeScale().fitContent()
    }
  }, [data])

  return (
    <div>
      <div ref={chartContainerRef} style={{ width: "100%", height: "300" }} />
    </div>
  )
}
