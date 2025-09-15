"use client"

import { cn } from "@/lib/utils"

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        "flex items-center justify-center border-t px-4 py-2 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <p>&copy; {new Date().getFullYear()} TaskEase. All rights reserved.</p>
    </footer>
  )
}
