import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit3, Eye, LogOut, X } from "lucide-react"

interface Trade {
  status: string
  executedAt?: Date
  // other trade properties
}

interface TradeMenuProps {
  trade: Trade
  onEdit?: () => void
  onCancel?: () => void
  onCloseOut?: () => void
  onViewDetails?: () => void
}

export const TradeMenu: React.FC<TradeMenuProps> = ({
  trade,
  onEdit,
  onCancel,
  onCloseOut,
  onViewDetails,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="xs"
          className="flex -ml-1 h-6 w-6 items-center justify-center rounded-full px-1"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {trade.status === "Open" && (
          <DropdownMenuItem onClick={onCloseOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Close out
          </DropdownMenuItem>
        )}
        {trade.status === "Staged" && (
          <>
            <DropdownMenuItem onClick={onEdit}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          </>
        )}
        {(trade.status === "Pending" || trade.status === "Partial") && (
          <DropdownMenuItem onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
        )}
        {(trade.status === "Closed" || trade.status === "Cancelled") && (
          <DropdownMenuItem onClick={onViewDetails}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
