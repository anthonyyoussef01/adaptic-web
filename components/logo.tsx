import { Icons } from "@/components/ui/icons"

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Icons.zap className="h-5 w-5" />
      <span className="text-primary-500 text-lg font-extrabold">
        Adaptic.ai
      </span>
    </div>
  )
}
