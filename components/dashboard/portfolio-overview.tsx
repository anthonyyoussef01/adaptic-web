import React from "react"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"
import { PortfolioChart } from "@/components/chart/PortfolioChart"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

const dayData = [
  { time: "2023-10-19", value: 229340.19 },
  { time: "2023-10-22", value: 235000.87 },
  { time: "2023-10-23", value: 245600.83 },
  { time: "2023-10-24", value: 254900.78 },
  { time: "2023-10-25", value: 256090.82 },
  { time: "2023-10-26", value: 250000.81 },
  { time: "2023-10-29", value: 250000.82 },
  { time: "2023-10-30", value: 250000.71 },
  { time: "2023-10-31", value: 250000.82 },
  { time: "2023-11-01", value: 250000.72 },
  { time: "2023-11-02", value: 250000.74 },
  { time: "2023-11-05", value: 250000.81 },
  { time: "2023-11-06", value: 250000.75 },
  { time: "2023-11-07", value: 250000.73 },
  { time: "2023-11-08", value: 250000.75 },
  { time: "2023-11-09", value: 250000.75 },
  { time: "2023-11-12", value: 250000.76 },
  { time: "2023-11-13", value: 250000.8 },
  { time: "2023-11-14", value: 250000.77 },
  { time: "2023-11-15", value: 250000.75 },
  { time: "2023-11-16", value: 250000.75 },
  { time: "2023-11-19", value: 250000.75 },
  { time: "2023-11-20", value: 250000.72 },
  { time: "2023-11-21", value: 250000.78 },
  { time: "2023-11-23", value: 250000.72 },
  { time: "2023-11-26", value: 250000.78 },
  { time: "2023-11-27", value: 250000.85 },
  { time: "2023-11-28", value: 250000.85 },
  { time: "2023-11-29", value: 250000.55 },
  { time: "2023-11-30", value: 250000.41 },
  { time: "2023-12-03", value: 250000.41 },
  { time: "2023-12-04", value: 250000.42 },
  { time: "2023-12-06", value: 250000.33 },
  { time: "2023-12-07", value: 250000.39 },
  { time: "2023-12-10", value: 250000.32 },
  { time: "2023-12-11", value: 250000.48 },
  { time: "2023-12-12", value: 250000.39 },
  { time: "2023-12-13", value: 250000.45 },
  { time: "2023-12-14", value: 250000.52 },
  { time: "2023-12-17", value: 250000.38 },
  { time: "2023-12-18", value: 250000.36 },
  { time: "2023-12-19", value: 250000.65 },
  { time: "2023-12-20", value: 250000.7 },
  { time: "2023-12-21", value: 250000.66 },
  { time: "2023-12-24", value: 250000.66 },
  { time: "2023-12-26", value: 250000.65 },
  { time: "2023-12-27", value: 250000.66 },
  { time: "2023-12-28", value: 250000.68 },
  { time: "2023-12-31", value: 250000.77 },
  { time: "2024-09-19", value: 250000.72 },
  { time: "2024-01-04", value: 250000.71 },
  { time: "2024-01-07", value: 250000.72 },
  { time: "2024-01-08", value: 250000.72 },
  { time: "2024-01-09", value: 250000.66 },
  { time: "2024-01-10", value: 250000.85 },
  { time: "2024-01-11", value: 250000.92 },
  { time: "2024-01-14", value: 250000.94 },
  { time: "2024-01-15", value: 250000.95 },
  { time: "2024-01-16", value: 263940.0 },
  { time: "2024-01-17", value: 250000.99 },
  { time: "2024-01-18", value: 250000.6 },
  { time: "2024-01-22", value: 250000.81 },
  { time: "2024-01-23", value: 250000.7 },
  { time: "2024-01-24", value: 250000.74 },
  { time: "2024-01-25", value: 250000.8 },
  { time: "2024-01-28", value: 250000.83 },
  { time: "2024-01-29", value: 250000.7 },
  { time: "2024-01-30", value: 250000.78 },
  { time: "2024-01-31", value: 250000.35 },
  { time: "2024-02-01", value: 250000.6 },
  { time: "2024-02-04", value: 250000.65 },
  { time: "2024-02-05", value: 250000.73 },
  { time: "2024-02-06", value: 250000.71 },
  { time: "2024-02-07", value: 250000.71 },
  { time: "2024-02-08", value: 250000.72 },
  { time: "2024-02-11", value: 250000.76 },
  { time: "2024-02-12", value: 250000.84 },
  { time: "2024-02-13", value: 250000.85 },
  { time: "2024-02-14", value: 250000.87 },
  { time: "2024-02-15", value: 250000.89 },
  { time: "2024-02-19", value: 250000.9 },
  { time: "2024-02-20", value: 250000.92 },
  { time: "2024-02-21", value: 250000.96 },
  { time: "2024-02-22", value: 259440.4 },
  { time: "2024-02-25", value: 250000.93 },
  { time: "2024-02-26", value: 250000.92 },
  { time: "2024-02-27", value: 250000.67 },
  { time: "2024-02-28", value: 250000.79 },
  { time: "2024-03-01", value: 250000.86 },
  { time: "2024-03-04", value: 250000.94 },
  { time: "2024-03-05", value: 263940.02 },
  { time: "2024-03-06", value: 250000.95 },
  { time: "2024-03-07", value: 250000.89 },
  { time: "2024-03-08", value: 250000.94 },
  { time: "2024-03-11", value: 250000.91 },
  { time: "2024-03-12", value: 250000.92 },
  { time: "2024-03-13", value: 263940.0 },
  { time: "2024-03-14", value: 263940.05 },
  { time: "2024-03-15", value: 263940.11 },
  { time: "2024-03-18", value: 263940.1 },
  { time: "2024-03-19", value: 250000.98 },
  { time: "2024-03-20", value: 263940.11 },
  { time: "2024-03-21", value: 263940.12 },
  { time: "2024-03-22", value: 250000.88 },
  { time: "2024-03-25", value: 250000.85 },
  { time: "2024-03-26", value: 250000.72 },
  { time: "2024-03-27", value: 250000.73 },
  { time: "2024-03-28", value: 250000.8 },
  { time: "2024-03-29", value: 250000.77 },
  { time: "2024-04-01", value: 263940.06 },
  { time: "2024-04-02", value: 250000.93 },
  { time: "2024-04-03", value: 250000.95 },
  { time: "2024-04-04", value: 263940.06 },
  { time: "2024-04-05", value: 263940.16 },
  { time: "2024-04-08", value: 263940.12 },
  { time: "2024-04-09", value: 263940.07 },
  { time: "2024-04-10", value: 263940.13 },
  { time: "2024-04-11", value: 263940.04 },
  { time: "2024-04-12", value: 263940.04 },
  { time: "2024-04-15", value: 263940.05 },
  { time: "2024-04-16", value: 263940.01 },
  { time: "2024-04-17", value: 263940.09 },
  { time: "2024-04-18", value: 263940.0 },
  { time: "2024-04-22", value: 263940.0 },
  { time: "2024-04-23", value: 263940.06 },
  { time: "2024-04-24", value: 263940.0 },
  { time: "2024-04-25", value: 250000.81 },
  { time: "2024-04-26", value: 250000.88 },
  { time: "2024-04-29", value: 250000.91 },
  { time: "2024-04-30", value: 250000.9 },
  { time: "2024-05-01", value: 263940.02 },
  { time: "2024-05-02", value: 250000.97 },
  { time: "2024-05-03", value: 263940.02 },
  { time: "2024-05-06", value: 263940.03 },
  { time: "2024-05-07", value: 263940.04 },
  { time: "2024-05-08", value: 263940.05 },
  { time: "2024-05-09", value: 263940.05 },
  { time: "2024-05-10", value: 263940.08 },
  { time: "2024-05-13", value: 263940.05 },
  { time: "2024-05-14", value: 263940.01 },
  { time: "2024-05-15", value: 263940.03 },
  { time: "2024-05-16", value: 263940.14 },
  { time: "2024-05-17", value: 263940.09 },
  { time: "2024-05-20", value: 263940.01 },
  { time: "2024-05-21", value: 263940.12 },
  { time: "2024-05-22", value: 263940.15 },
  { time: "2024-05-23", value: 263940.18 },
  { time: "2024-05-24", value: 263940.16 },
  { time: "2024-05-28", value: 263940.23 },
]

const checkForDuplicates = (arr: any) => {
  const values = new Set()
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i].value
    if (values.has(value)) {
      return true
    }
    values.add(value)
  }
  return false
}

const hasDuplicates = checkForDuplicates(dayData)
console.log(hasDuplicates)

const weekData = [
  { time: "2021-07-18", value: 263940.1 },
  { time: "2021-07-25", value: 263940.19 },
  { time: "2021-08-01", value: 263940.24 },
  { time: "2021-08-08", value: 263940.22 },
  { time: "2021-08-15", value: 250000.98 },
  { time: "2021-08-22", value: 250000.85 },
  { time: "2021-08-29", value: 250000.98 },
  { time: "2021-09-05", value: 250000.71 },
  { time: "2021-09-12", value: 250000.84 },
  { time: "2021-09-19", value: 250000.89 },
  { time: "2021-09-26", value: 250000.65 },
  { time: "2021-10-03", value: 250000.69 },
  { time: "2021-10-10", value: 250000.67 },
  { time: "2021-10-17", value: 263940.11 },
  { time: "2021-10-24", value: 250000.8 },
  { time: "2021-10-31", value: 250000.7 },
  { time: "2021-11-07", value: 250000.4 },
  { time: "2021-11-14", value: 250000.32 },
  { time: "2021-11-21", value: 250000.48 },
  { time: "2021-11-28", value: 250000.08 },
  { time: "2021-12-05", value: 250000.06 },
  { time: "2021-12-12", value: 250000.11 },
  { time: "2021-12-19", value: 250000.34 },
  { time: "2021-12-26", value: 250000.2 },
  { time: "2022-09-19", value: 250000.33 },
  { time: "2022-01-09", value: 250000.56 },
  { time: "2022-01-16", value: 250000.32 },
  { time: "2022-01-23", value: 250000.71 },
  { time: "2022-01-30", value: 250000.85 },
  { time: "2022-02-06", value: 250000.77 },
  { time: "2022-02-13", value: 250000.94 },
  { time: "2022-02-20", value: 250000.67 },
  { time: "2022-02-27", value: 250000.6 },
  { time: "2022-03-06", value: 250000.54 },
  { time: "2022-03-13", value: 250000.84 },
  { time: "2022-03-20", value: 250000.96 },
  { time: "2022-03-27", value: 250000.9 },
  { time: "2022-04-03", value: 250000.97 },
  { time: "2022-04-10", value: 263940.0 },
  { time: "2022-04-17", value: 263940.13 },
  { time: "2022-04-24", value: 263940.02 },
  { time: "2022-05-01", value: 263940.3 },
  { time: "2022-05-08", value: 263940.27 },
  { time: "2022-05-15", value: 263940.24 },
  { time: "2022-05-22", value: 263940.02 },
  { time: "2022-05-29", value: 263940.2 },
  { time: "2022-06-05", value: 263940.12 },
  { time: "2022-06-12", value: 263940.2 },
  { time: "2022-06-19", value: 263940.46 },
  { time: "2022-06-26", value: 263940.39 },
  { time: "2022-07-03", value: 263940.52 },
  { time: "2022-07-10", value: 263940.57 },
  { time: "2022-07-17", value: 263940.65 },
  { time: "2022-07-24", value: 263940.45 },
  { time: "2022-07-31", value: 263940.37 },
  { time: "2022-08-07", value: 263940.13 },
  { time: "2022-08-14", value: 263940.21 },
  { time: "2022-08-21", value: 263940.31 },
  { time: "2022-08-28", value: 263940.33 },
  { time: "2022-09-04", value: 263940.38 },
  { time: "2022-09-11", value: 263940.38 },
  { time: "2022-09-18", value: 263940.5 },
  { time: "2022-09-25", value: 263940.39 },
  { time: "2022-10-02", value: 250000.95 },
  { time: "2022-10-09", value: 263940.15 },
  { time: "2022-10-16", value: 263940.43 },
  { time: "2022-10-23", value: 263940.22 },
  { time: "2022-10-30", value: 263940.14 },
  { time: "2022-11-06", value: 263940.08 },
  { time: "2022-11-13", value: 263940.27 },
  { time: "2022-11-20", value: 263940.3 },
  { time: "2022-11-27", value: 250000.92 },
  { time: "2022-12-04", value: 263940.1 },
  { time: "2022-12-11", value: 250000.88 },
  { time: "2022-12-18", value: 250000.82 },
  { time: "2022-12-25", value: 250000.82 },
  { time: "2023-09-19", value: 250000.81 },
  { time: "2023-01-08", value: 250000.95 },
  { time: "2023-01-15", value: 263940.03 },
  { time: "2023-01-22", value: 263940.04 },
  { time: "2023-01-29", value: 250000.96 },
  { time: "2023-02-05", value: 250000.99 },
  { time: "2023-02-12", value: 263940.0 },
  { time: "2023-02-19", value: 263940.06 },
  { time: "2023-02-26", value: 250000.77 },
  { time: "2023-03-05", value: 250000.81 },
  { time: "2023-03-12", value: 250000.88 },
  { time: "2023-03-19", value: 250000.72 },
  { time: "2023-03-26", value: 250000.75 },
  { time: "2023-04-02", value: 250000.7 },
  { time: "2023-04-09", value: 250000.73 },
  { time: "2023-04-16", value: 250000.74 },
  { time: "2023-04-23", value: 250000.69 },
  { time: "2023-04-30", value: 250000.76 },
  { time: "2023-05-07", value: 250000.89 },
  { time: "2023-05-14", value: 250000.89 },
  { time: "2023-05-21", value: 263940.0 },
  { time: "2023-05-28", value: 250000.79 },
  { time: "2023-06-04", value: 263940.11 },
  { time: "2023-06-11", value: 263940.43 },
  { time: "2023-06-18", value: 263940.3 },
  { time: "2023-06-25", value: 263940.58 },
  { time: "2023-07-02", value: 263940.33 },
  { time: "2023-07-09", value: 263940.33 },
  { time: "2023-07-16", value: 263940.32 },
  { time: "2023-07-23", value: 263940.2 },
  { time: "2023-07-30", value: 263940.03 },
  { time: "2023-08-06", value: 263940.15 },
  { time: "2023-08-13", value: 263940.17 },
  { time: "2023-08-20", value: 263940.28 },
  { time: "2023-08-27", value: 250000.86 },
  { time: "2023-09-03", value: 250000.69 },
  { time: "2023-09-10", value: 250000.69 },
  { time: "2023-09-17", value: 250000.64 },
  { time: "2023-09-24", value: 250000.67 },
  { time: "2023-10-01", value: 250000.55 },
  { time: "2023-10-08", value: 250000.59 },
  { time: "2023-10-15", value: 263940.19 },
  { time: "2023-10-22", value: 250000.81 },
  { time: "2023-10-29", value: 250000.74 },
  { time: "2023-11-05", value: 250000.75 },
  { time: "2023-11-12", value: 250000.75 },
  { time: "2023-11-19", value: 250000.72 },
  { time: "2023-11-26", value: 250000.41 },
  { time: "2023-12-03", value: 250000.39 },
  { time: "2023-12-10", value: 250000.52 },
  { time: "2023-12-17", value: 250000.66 },
  { time: "2023-12-24", value: 250000.68 },
  { time: "2023-12-31", value: 250000.71 },
  { time: "2024-01-07", value: 250000.92 },
  { time: "2024-01-14", value: 250000.6 },
  { time: "2024-01-21", value: 250000.8 },
  { time: "2024-01-28", value: 250000.6 },
  { time: "2024-02-04", value: 250000.72 },
  { time: "2024-02-11", value: 250000.89 },
  { time: "2024-02-18", value: 263940.0 },
  { time: "2024-02-25", value: 250000.86 },
  { time: "2024-03-04", value: 250000.94 },
  { time: "2024-03-11", value: 263940.11 },
  { time: "2024-03-18", value: 250000.88 },
  { time: "2024-03-25", value: 250000.77 },
  { time: "2024-04-01", value: 263940.16 },
  { time: "2024-04-08", value: 263940.04 },
  { time: "2024-04-15", value: 263940.0 },
  { time: "2024-04-22", value: 250000.88 },
  { time: "2024-04-29", value: 263940.02 },
  { time: "2024-05-06", value: 263940.08 },
  { time: "2024-05-13", value: 263940.09 },
  { time: "2024-05-20", value: 263940.16 },
  { time: "2024-05-27", value: 263940.23 },
]

const monthData = [
  { time: "2011-12-01", value: 250000.4 },
  { time: "2012-09-19", value: 250000.5 },
  { time: "2012-02-01", value: 250000.11 },
  { time: "2012-03-01", value: 250000.24 },
  { time: "2012-04-02", value: 250000.34 },
  { time: "2012-05-01", value: 249999.82 },
  { time: "2012-06-01", value: 249990.85 },
  { time: "2012-07-02", value: 249990.24 },
  { time: "2012-08-01", value: 249990.05 },
  { time: "2012-09-03", value: 22.26 },
  { time: "2012-10-01", value: 22.52 },
  { time: "2012-11-01", value: 20.84 },
  { time: "2012-12-03", value: 20.37 },
  { time: "2013-09-19", value: 249990.9 },
  { time: "2013-02-01", value: 22.58 },
  { time: "2013-03-03", value: 21.74 },
  { time: "2013-04-01", value: 22.5 },
  { time: "2013-05-01", value: 22.38 },
  { time: "2013-06-02", value: 20.58 },
  { time: "2013-07-01", value: 20.6 },
  { time: "2013-08-01", value: 20.82 },
  { time: "2013-09-01", value: 17.5 },
  { time: "2013-10-01", value: 17.7 },
  { time: "2013-11-03", value: 15.52 },
  { time: "2013-12-01", value: 18.58 },
  { time: "2014-09-19", value: 15.4 },
  { time: "2014-02-02", value: 11.68 },
  { time: "2014-03-02", value: 14.89 },
  { time: "2014-04-01", value: 16.24 },
  { time: "2014-05-01", value: 18.33 },
  { time: "2014-06-01", value: 18.08 },
  { time: "2014-07-01", value: 20.07 },
  { time: "2014-08-03", value: 20.35 },
  { time: "2014-09-01", value: 21.53 },
  { time: "2014-10-01", value: 21.48 },
  { time: "2014-11-02", value: 20.28 },
  { time: "2014-12-01", value: 21.39 },
  { time: "2015-09-19", value: 22.0 },
  { time: "2015-02-01", value: 22.31 },
  { time: "2015-03-01", value: 22.82 },
  { time: "2015-04-01", value: 22.58 },
  { time: "2015-05-03", value: 21.02 },
  { time: "2015-06-01", value: 21.45 },
  { time: "2015-07-01", value: 22.42 },
  { time: "2015-08-02", value: 249990.61 },
  { time: "2015-09-01", value: 249999.4 },
  { time: "2015-10-01", value: 249999.46 },
  { time: "2015-11-01", value: 249990.64 },
  { time: "2015-12-01", value: 22.9 },
  { time: "2016-09-19", value: 249990.73 },
  { time: "2016-02-01", value: 249990.52 },
  { time: "2016-03-01", value: 249999.15 },
  { time: "2016-04-01", value: 249999.37 },
  { time: "2016-05-02", value: 249999.4 },
  { time: "2016-06-01", value: 249999.45 },
  { time: "2016-07-01", value: 249999.24 },
  { time: "2016-08-01", value: 249999.0 },
  { time: "2016-09-01", value: 22.77 },
  { time: "2016-10-03", value: 249999.21 },
  { time: "2016-11-01", value: 249990.4 },
  { time: "2016-12-01", value: 249990.9 },
  { time: "2017-09-19", value: 249999.84 },
  { time: "2017-02-01", value: 250000.04 },
  { time: "2017-03-01", value: 249999.9 },
  { time: "2017-04-02", value: 250000.06 },
  { time: "2017-05-01", value: 249999.63 },
  { time: "2017-06-01", value: 250000.07 },
  { time: "2017-07-02", value: 250000.3 },
  { time: "2017-08-01", value: 250000.08 },
  { time: "2017-09-03", value: 250000.27 },
  { time: "2017-10-01", value: 250000.39 },
  { time: "2017-11-01", value: 250000.06 },
  { time: "2017-12-03", value: 250000.03 },
  { time: "2018-09-19", value: 250000.26 },
  { time: "2018-02-01", value: 250000.2 },
  { time: "2018-03-01", value: 250000.3 },
  { time: "2018-04-01", value: 250000.38 },
  { time: "2018-05-01", value: 250000.22 },
  { time: "2018-06-03", value: 249999.88 },
  { time: "2018-07-01", value: 249999.98 },
  { time: "2018-08-01", value: 249999.6 },
  { time: "2018-09-02", value: 249999.65 },
  { time: "2018-10-01", value: 249999.62 },
  { time: "2018-11-01", value: 249999.65 },
  { time: "2018-12-02", value: 249999.7 },
  { time: "2019-09-19", value: 249999.98 },
  { time: "2019-02-03", value: 249999.95 },
  { time: "2019-03-03", value: 250000.45 },
  { time: "2019-04-01", value: 250000.4 },
  { time: "2019-05-01", value: 250000.51 },
  { time: "2019-06-02", value: 250000.34 },
  { time: "2019-07-01", value: 250000.3 },
  { time: "2019-08-01", value: 250000.36 },
  { time: "2019-09-01", value: 250000.16 },
  { time: "2019-10-01", value: 250000.53 },
  { time: "2019-11-03", value: 250000.4 },
  { time: "2019-12-01", value: 250000.7 },
  { time: "2020-09-19", value: 250000.95 },
  { time: "2020-02-02", value: 250000.81 },
  { time: "2020-03-02", value: 250000.63 },
  { time: "2020-04-01", value: 250000.39 },
  { time: "2020-05-01", value: 250000.62 },
  { time: "2020-06-01", value: 250000.23 },
  { time: "2020-07-01", value: 250000.47 },
  { time: "2020-08-03", value: 250000.18 },
  { time: "2020-09-01", value: 250000.3 },
  { time: "2020-10-01", value: 250000.68 },
  { time: "2020-11-02", value: 250000.63 },
  { time: "2020-12-01", value: 250000.57 },
  { time: "2021-09-19", value: 250000.55 },
  { time: "2021-02-01", value: 250000.05 },
  { time: "2021-03-01", value: 250000.61 },
  { time: "2021-04-01", value: 250000.91 },
  { time: "2021-05-02", value: 250000.84 },
  { time: "2021-06-01", value: 250000.94 },
  { time: "2021-07-01", value: 263940.19 },
  { time: "2021-08-01", value: 263940.06 },
  { time: "2021-09-01", value: 250000.65 },
  { time: "2021-10-03", value: 250000.8 },
  { time: "2021-11-01", value: 250000.06 },
  { time: "2021-12-01", value: 250000.2 },
  { time: "2022-09-19", value: 250000.7 },
  { time: "2022-02-01", value: 250000.78 },
  { time: "2022-03-01", value: 250000.9 },
  { time: "2022-04-03", value: 263940.02 },
  { time: "2022-05-01", value: 263940.02 },
  { time: "2022-06-01", value: 263940.39 },
  { time: "2022-07-03", value: 263940.3 },
  { time: "2022-08-01", value: 263940.14 },
  { time: "2022-09-01", value: 263940.39 },
  { time: "2022-10-02", value: 263940.12 },
  { time: "2022-11-01", value: 250000.81 },
  { time: "2022-12-01", value: 250000.82 },
  { time: "2023-09-19", value: 263940.06 },
  { time: "2023-02-01", value: 250000.78 },
  { time: "2023-03-01", value: 250000.75 },
  { time: "2023-04-02", value: 250000.72 },
  { time: "2023-05-01", value: 250000.75 },
  { time: "2023-06-01", value: 263940.58 },
  { time: "2023-07-02", value: 263940.14 },
  { time: "2023-08-01", value: 250000.86 },
  { time: "2023-09-03", value: 250000.67 },
  { time: "2023-10-01", value: 250000.82 },
  { time: "2023-11-01", value: 250000.41 },
  { time: "2023-12-03", value: 250000.77 },
  { time: "2024-09-19", value: 250000.35 },
  { time: "2024-02-01", value: 250000.79 },
  { time: "2024-03-01", value: 250000.77 },
  { time: "2024-04-01", value: 250000.9 },
  { time: "2024-05-01", value: 263940.23 },
]

const threeMonthData = [
  { time: "2024-02-25", value: 250000.86 },
  { time: "2024-02-26", value: 250000.72 },
  { time: "2024-02-27", value: 250000.73 },
  { time: "2024-02-28", value: 250000.8 },
  { time: "2024-03-01", value: 250000.77 },
  { time: "2024-03-04", value: 250000.94 },
  { time: "2024-03-05", value: 250000.67 },
  { time: "2024-03-06", value: 250000.6 },
  { time: "2024-03-07", value: 250000.54 },
]

const yearData = [
  { time: "2016-09-19", value: 249999.89 },
  { time: "2017-09-19", value: 250000.5 },
  { time: "2018-09-19", value: 249990.9 },
  { time: "2019-09-19", value: 242040.9 },
  { time: "2020-09-19", value: 222002.0 },
  { time: "2021-09-19", value: 249990.73 },
  { time: "2022-09-19", value: 249999.84 },
  { time: "2023-09-19", value: 250000.26 },
  { time: "2024-09-19", value: 249999.98 },
]

// Map timeframes to data arrays
const dataMap: { [key: string]: { time: string; value: number }[] } = {
  "1d": dayData,
  "1w": weekData,
  "1m": monthData,
  "3m": threeMonthData,
  YTD: yearData,
}

interface KPICardProps {
  label: string
  value: string
  change?: string
}

const PortfolioOverview: React.FC = () => {
  const { isDesktop } = useMediaQuery()
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("1d")
  const [selectedInterval, setSelectedInterval] = React.useState("5min")
  const [filteredData, setFilteredData] = React.useState<
    { time: string; value: number }[]
  >([])

  // Define timeframes and intervals
  const timeframes = [
    { label: "Last 24 hours", value: "1d" },
    { label: "Last 7 days", value: "1w" },
    { label: "Last 30 days", value: "1m" },
    { label: "Last 3 months", value: "3m" },
    { label: "YTD", value: "YTD" },
    // { label: "YTD", value: "ytd" },
    // { label: "All time", value: "all" },
  ]

  const getIntervalsForTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case "1d":
        return [
          { label: "1 min", value: "1min" },
          { label: "5 min", value: "5min" },
          { label: "15 min", value: "15min" },
          { label: "30 min", value: "30min" },
          { label: "1 hour", value: "1h" },
        ]
      case "1w":
        return [
          { label: "1 hour", value: "1h" },
          { label: "3 hours", value: "3h" },
          { label: "6 hours", value: "6h" },
          { label: "12 hours", value: "12h" },
          { label: "1 day", value: "1d" },
        ]
      case "1m":
      case "3m":
        return [
          { label: "1 day", value: "1d" },
          { label: "3 days", value: "3d" },
          { label: "1 week", value: "1w" },
        ]
      case "YTD":
        return [
          { label: "1 week", value: "1w" },
          { label: "2 weeks", value: "2w" },
          { label: "1 month", value: "1m" },
        ]
      default:
        return [{ label: "1 day", value: "1d" }]
    }
  }

  // Helper function to filter data based on selected timeframe and interval
  const filterData = (timeframe: string, interval: string) => {
    let data = dataMap[timeframe] || []

    // Implement interval-based data sampling
    const intervalMapping: { [key: string]: number } = {
      "1min": 1,
      "5min": 5,
      "15min": 15,
      "30min": 30,
      "1h": 60,
      "3h": 180,
      "6h": 360,
      "12h": 720,
      "1d": 1440,
      "3d": 4320,
      "1w": 10080,
      "2w": 20160,
      "1m": 43200,
    }

    const intervalMinutes = intervalMapping[interval] || 1

    // Sample data based on the interval
    const totalPoints = data.length
    const desiredPoints = Math.floor(
      (totalPoints * intervalMinutes) / (intervalMapping["1d"] || 1440)
    )

    if (desiredPoints > 0) {
      data = data.filter((_, index) => index % desiredPoints === 0)
    }

    // **Sort data in ascending order of time**
    data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

    return data
  }

  React.useEffect(() => {
    const newData = filterData(selectedTimeframe, selectedInterval)
    setFilteredData(newData)
  }, [selectedTimeframe, selectedInterval])

  const intervalOptions = getIntervalsForTimeframe(selectedTimeframe)

  return (
    <Card className="relative mx-3 rounded-3xl bg-indigo-700 shadow-2xl shadow-black/10 sm:mx-0">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="pt-1.5 text-white/60 sm:pt-1">
          <span className="sm:hidden">AUM</span>
          <span className="hidden sm:block">Assets Under Management (AUM)</span>
        </CardTitle>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="flex items-center space-x-1 bg-indigo-800 pr-2 text-white/80 hover:bg-indigo-800/50 hover:text-white focus:bg-indigo-800/50 focus:text-white focus-visible:ring-white"
              >
                <span>
                  {
                    timeframes.find((tf) => tf.value === selectedTimeframe)
                      ?.label
                  }
                </span>
                <Icons.chevronDown className="-mr-1 size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {timeframes.map((timeframe) => (
                <DropdownMenuItem
                  key={timeframe.value}
                  onSelect={() => {
                    setSelectedTimeframe(timeframe.value)
                    setSelectedInterval(
                      getIntervalsForTimeframe(timeframe.value)[0].value
                    ) // Reset interval based on new timeframe
                  }}
                >
                  {timeframe.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="flex items-center space-x-1 bg-indigo-800 pr-2 text-white/80 hover:bg-indigo-800/50 hover:text-white focus:bg-indigo-800/50 focus:text-white focus-visible:ring-white"
              >
                <span>
                  {
                    intervalOptions.find(
                      (intv) => intv.value === selectedInterval
                    )?.label
                  }
                </span>
                <Icons.chevronDown className="-mr-1 size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {intervalOptions.map((interval) => (
                <DropdownMenuItem
                  key={interval.value}
                  onSelect={() => setSelectedInterval(interval.value)}
                >
                  {interval.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <div className="absolute left-3 top-14 z-10 flex flex-col sm:left-4 sm:top-10 sm:flex-row sm:items-center sm:space-x-2">
        <span className="text-xl font-bold text-white lg:text-3xl">
          $7,839,940.00
        </span>

        <span
          className={cn(
            "flex items-end space-x-1.5 text-xs font-semibold text-green-600 sm:pt-1 lg:pt-2 lg:text-sm",
            isDesktop ? "text-green-300" : "text-green-600 dark:text-green-400"
          )}
        >
          <span className="text-sm font-bold lg:text-lg">+$548,795.80</span>
          <span className="relative pb-0.5 lg:pb-1">
            (7.4% in the{" "}
            {timeframes.find((tf) => tf.value === selectedTimeframe)?.label})
          </span>
        </span>
      </div>
      <CardContent>
        <div className="font-satoshi -ml-3 -mr-2 mt-6 lg:-ml-4 lg:-ml-5">
          {filteredData && filteredData.length > 0 ? (
            <PortfolioChart data={filteredData} isDesktop={isDesktop} />
          ) : (
            <span className="block min-h-6 min-w-3" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PortfolioOverview
