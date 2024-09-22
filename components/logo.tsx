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
        className="h-full w-auto"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M647.5 690.5L576.39 758.432C568.268 766.191 561.329 775.361 552.123 781.796C527.862 798.753 491.03 794.487 469.396 773.437L278.402 612.05C269 603.5 254.676 605.61 248.348 608.969L80.1279 689.674L24 599L248.348 503.5C276.611 491.208 299.5 498.5 318.75 514.561L510.767 663.212C518.465 670.703 529.579 669.609 536.204 660.709L590 602.033L647.5 690.5Z"
          fill="currentFill"
        />
        <path
          d="M917.664 245L974 334.162L836.007 485L779 395.838L917.664 245Z"
          fill="currentFill"
        />
        <path
          d="M158.407 672.668C132.687 684.795 110.943 703.983 95.7116 727.995L68.9528 770.179C36.3786 822.216 52.1563 890.81 104.193 923.384C156.23 955.958 224.821 940.18 257.395 888.143L353.6 734.128C361.56 721.386 358.866 704.722 347.298 695.136L273.049 633.605C264.5 626.877 255 626.376 245.5 631.605L158.407 672.668Z"
          fill="currentColor"
        />
        <path
          d="M630.913 207.394C527.678 41.377 527.678 41.3752 422.139 208.353L258.347 469.026C254.714 474.807 260.535 481.884 266.908 479.435V479.435C266.908 479.435 287.5 470.376 319.832 487.733L421.31 566.092C435.323 576.913 455.61 573.309 465.038 558.323L527.678 458.752L795.803 878.462C828.854 930.197 897.586 945.345 949.322 912.294C1001.06 879.243 1016.21 810.51 983.154 758.775L630.913 207.394Z"
          fill="currentColor"
        />
      </svg>

      <span className="hidden text-lg font-extrabold text-primary sm:block">
        adaptic.ai
      </span>
    </Link>
  )
}
