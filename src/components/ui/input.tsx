import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklab,var(--ring)_50%,transparent)] focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:border-input dark:bg-[color-mix(in_oklab,var(--input)_30%,transparent)] dark:aria-invalid:border-[color-mix(in_oklab,var(--destructive)_50%,transparent)] dark:aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
