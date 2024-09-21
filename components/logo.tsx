import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      className={cn(className && className, "flex items-center space-x-2")}
      href="/"
    >
      <svg
        viewBox="0 0 3235 2923"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-9"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2976.23 1162.87L2791.93 1364.81L2423.33 1768.69L1811.96 2438.56C1741.1 2516.2 1622.24 2525.74 1539.91 2460.4L844.394 1908.46L172.455 2199.37L73.1282 1969.95L882.494 1619.54L1658.76 2235.56L2317.32 1513.99L2646.6 1153.2L2811.24 972.802L2976.23 1162.87Z"
          fill="#4338CA"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1347.98 536.599C1503.84 287.605 1865.97 285.942 2024.11 533.494L3164.88 2319.19C3271.92 2486.74 3222.86 2709.34 3055.31 2816.38C2887.76 2923.42 2665.16 2874.36 2558.12 2706.81L1689.77 1347.54L840.645 2704.02C735.15 2872.54 513.012 2923.64 344.485 2818.14C175.958 2712.65 124.861 2490.51 230.356 2321.98L1347.98 536.599Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M772.553 1667.14C840.241 1637.83 918.563 1648.16 976.339 1694.01L1848.06 2385.79L1816.98 2424.95C1748.32 2511.48 1622.51 2525.95 1535.99 2457.29L844.395 1908.46L287.167 2149.71C223.814 2177.14 150.221 2148.02 122.793 2084.66V2084.66C95.3641 2021.31 124.487 1947.72 187.84 1920.29L772.553 1667.14Z"
          fill="#4338CA"
        />
      </svg>

      <span className="hidden text-lg font-extrabold text-primary sm:block">
        adaptic.ai
      </span>
    </Link>
  )
}
