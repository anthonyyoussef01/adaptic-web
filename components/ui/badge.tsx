import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-muted-foreground text-secondary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
        green: "bg-teal-600 hover:bg-teal-500 border-transparent text-white",
        blue: "bg-blue-600 hover:bg-blue-500 border-transparent text-white",
        yellow:
          "bg-yellow-600 hover:bg-yellow-500 border-transparent text-white",
        outline: "text-foreground",
      },
      size: {
        xs: "text-xs px-1 py-0.5",
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  animate?: boolean
}

function Badge({ className, variant, animate, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {animate && (
        <span className="relative -ml-1 mr-1 flex h-3 w-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
        </span>
      )}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
