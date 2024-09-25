import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit2, LogOut, X } from "lucide-react"

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
}

export const TradeMenu: React.FC<TradeMenuProps> = ({
  trade,
  onEdit,
  onCancel,
  onCloseOut,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="xs"
          className="-ml-1 flex h-6 w-6 items-center justify-center rounded-full px-1"
        >
          <MoreHorizontal className="h-4 w-4" />
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
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
