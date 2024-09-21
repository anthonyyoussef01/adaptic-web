import type { Metadata } from "next"
import { Noto_Sans } from "next/font/google"
import "./globals.css"
import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Navigation from "@/components/ui/navigation"
import Footer from "@/components/ui/footer"

const redHatDisplay = Noto_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adaptic.ai: Stock Quotes, Market News, & Analysis",
  description:
    "Adaptic.ai is a source of free stock quotes, business and finance news, portfolio management tools, and international market data.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${redHatDisplay.className} min-h-screen bg-background pb-6 antialiased selection:bg-black selection:text-white dark:selection:bg-muted dark:selection:text-black`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <main className="max-w-9xl m-auto pt-2 sm:px-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
