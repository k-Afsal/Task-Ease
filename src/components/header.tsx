"use client"

import { cn } from "@/lib/utils"

export function Header({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6",
        className
      )}
      {...props}
    />
  )
}
