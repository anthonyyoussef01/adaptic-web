import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      className={cn(
        className && className,
        "flex items-center justify-start space-x-2"
      )}
      href="/"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M881.737 335.411C894.576 350.201 894.302 372.264 881.099 386.731L544.759 755.255C522.88 779.227 486.179 782.174 460.757 761.999L254.693 598.472C249.341 594.225 242.086 593.268 235.816 595.982L73.9416 666.065C54.3798 674.534 31.6562 665.542 23.1869 645.98C14.7177 626.419 23.71 603.695 43.2718 595.226L223.817 517.059C244.717 508.011 268.901 511.2 286.741 525.357L483.911 681.826C491.537 687.878 502.548 686.995 509.111 679.803L824.081 334.693C839.646 317.639 866.602 317.975 881.737 335.411Z"
          fill="currentFill"
        />
        <path
          d="M100.031 682.857L46.9528 767.802C14.3786 819.839 30.1563 888.433 82.1932 921.007C134.23 953.581 202.821 937.803 235.395 885.766L346.5 708.499L252.049 630.228C243.5 623.5 234 622.999 224.5 628.228L100.031 682.857Z"
          fill="currentColor"
        />
        <path
          d="M600.913 216.018C552.082 139.579 440.267 140.093 392.139 216.976L217 495.708L236.908 488.059C236.908 488.059 257.5 479 289.832 496.356L417.451 594.902L497.678 467.376L765.803 887.085C798.854 938.82 867.586 953.968 919.322 920.917C971.058 887.867 986.205 819.134 953.154 767.398L600.913 216.018Z"
          fill="currentColor"
        />
      </svg>

      <span className="hidden text-lg font-extrabold text-primary sm:block">
        adaptic.ai
      </span>
    </Link>
  )
}
