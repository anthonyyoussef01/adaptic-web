import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import Image from "next/image" // Import Image for optimized images

type ArticleCardProps = {
  id: string | number
  title: string
  timePublished: string
  bannerImage: string
  summary: string
  topics: { topic: string; relevancy_score: number }[] // Improved typing
  logo: string
  url: string
  source: string
  sentiment: string
  mini?: boolean
}

function convertStringToTimeAgo(dateString: string) {
  // Convert '20240919T102005' to '2024-09-19T10:20:05' format
  const date = new Date(
    dateString.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
      "$1-$2-$3T$4:$5:$6"
    )
  )
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`
  } else if (hours > 0) {
    return hours === 1 ? "1 hr ago" : `${hours} hrs ago`
  } else if (minutes > 0) {
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`
  } else {
    return "A few seconds ago"
  }
}

function handleRedirectToLink(
  e:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  url: string,
  target?: string,
  preventDefault?: boolean
) {
  if (preventDefault) e.preventDefault()
  e.stopPropagation()
  window.open(url, target || "_self")
}

export function ArticleCard({
  id,
  title,
  timePublished,
  bannerImage,
  summary,
  topics,
  logo,
  source,
  url,
  sentiment,
  mini,
}: ArticleCardProps) {
  return (
    <Card
      key={id}
      className="transform cursor-pointer rounded-2xl transition duration-200 ease-in-out hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10"
      onClick={(e) => handleRedirectToLink(e, url, "_blank", false)}
    >
      <CardHeader className="space-y-1 font-semibold lg:px-3 lg:pt-3">
        <CardTitle className="line-clamp-2 leading-6">
          {title}{" "}
          <span className="pl-1 text-xs text-muted-foreground">
            {convertStringToTimeAgo(timePublished)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 lg:px-3">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt={title}
            width={400}
            height={128}
            className="h-32 w-full rounded-lg object-cover"
            loader={({ src }) => src}
          />
        )}
        <span className="line-clamp-3 text-sm text-muted-foreground">
          {summary}
        </span>

        <span className="flex items-center space-x-1.5">
          <Avatar className="bg-white p-[1px]" size="xs">
            <AvatarImage src={logo} alt={source} className="rounded-full" />
            <AvatarFallback>{source.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {source}
          </span>
        </span>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm lg:px-3 lg:pb-3">
        <span className="ellipsis-1 line-clamp-1 flex overflow-hidden whitespace-nowrap">
          {topics &&
            topics.length > 0 &&
            topics
              .filter(
                // filter our 'earnings' and 'earnings call' topics
                (topic) =>
                  ![
                    "earnings",
                    "earnings call",
                    "financial markets",
                    "finance",
                  ].includes(topic.topic.toLowerCase()) // Improved typing
              )
              .slice(0, 3)
              .map((topic, index) => (
                <div
                  key={index}
                  onClick={(e) =>
                    handleRedirectToLink(
                      e,
                      `/news/topics/${topic.topic.toLowerCase().replace(" ", "-")}`,
                      undefined,
                      true
                    )
                  }
                  className="inline-flex cursor-pointer pr-2 text-[10.5px] font-semibold uppercase tracking-wider text-teal-500 underline dark:text-teal-400"
                >
                  #{topic.topic}
                </div>
              ))}
        </span>
        <Badge variant="outline" className="w-fit shrink-0" size="xs">
          <span className="flex items-center space-x-1">
            {sentiment === "Bullish" ? (
              <span className="flex items-center -space-x-0.5">
                <Icons.arrowUp className="h-2.5 w-2.5 text-green-600" />
                <Icons.arrowUp className="h-2.5 w-2.5 text-green-600" />
              </span>
            ) : sentiment === "Somewhat_Bullish" ||
              sentiment === "Somewhat-Bullish" ? (
              <Icons.arrowUp className="h-3 w-3 text-green-600" />
            ) : sentiment === "Bearish" ? (
              <span className="flex items-center -space-x-0.5">
                <Icons.arrowDown className="h-2.5 w-2.5 text-red-600" />
                <Icons.arrowDown className="h-2.5 w-2.5 text-red-600" />
              </span>
            ) : sentiment === "Somewhat-Bearish" ||
              sentiment === "Somewhat_Bearish" ? (
              <Icons.arrowDown className="h-3 w-3 text-red-600" />
            ) : (
              ""
            )}
            <span
              className={cn(
                sentiment === "Bullish" ||
                  sentiment === "Somewhat_Bullish" ||
                  sentiment === "Somewhat-Bullish"
                  ? "text-green-600"
                  : sentiment === "Bearish" ||
                      sentiment === "Somewhat-Bearish" ||
                      sentiment === "Somewhat_Bearish"
                    ? "text-red-600"
                    : "text-neutral-500",
                "text-[10px] font-semibold uppercase tracking-wider"
              )}
            >
              {sentiment.replace(/_/g, " ").replace("-", " ")}
            </span>
          </span>
        </Badge>
      </CardFooter>
    </Card>
  )
}
