import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklab,var(--ring)_50%,transparent)] focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:border-input dark:bg-[color-mix(in_oklab,var(--input)_30%,transparent)] dark:aria-invalid:border-[color-mix(in_oklab,var(--destructive)_50%,transparent)] dark:aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
