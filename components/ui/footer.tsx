"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="container py-6 md:px-8 md:py-0">
      <div className="flex flex-col items-start justify-between md:h-24 md:flex-row">
        <p className="text-balance text-sm leading-loose text-muted-foreground md:text-left">
          &copy; 2024 Adaptic.ai, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
