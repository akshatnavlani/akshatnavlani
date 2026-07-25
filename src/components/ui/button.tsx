import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none hover:-translate-y-0.5 hover:shadow-md active:translate-y-px active:shadow-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-[color-mix(in_oklab,var(--ring)_50%,transparent)] disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:aria-invalid:border-[color-mix(in_oklab,var(--destructive)_50%,transparent)] dark:aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_80%,transparent)]",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-[color-mix(in_oklab,var(--input)_30%,transparent)] dark:hover:bg-[color-mix(in_oklab,var(--input)_50%,transparent)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-[color-mix(in_oklab,var(--muted)_50%,transparent)]",
        destructive:
          "bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] text-destructive hover:bg-[color-mix(in_oklab,var(--destructive)_20%,transparent)] focus-visible:border-[color-mix(in_oklab,var(--destructive)_40%,transparent)] focus-visible:ring-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:bg-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:hover:bg-[color-mix(in_oklab,var(--destructive)_30%,transparent)] dark:focus-visible:ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)]",
        link: "text-primary underline-offset-4 hover:translate-y-0 hover:shadow-none hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-[[data-icon=inline-end]]:pr-2 has-[[data-icon=inline-start]]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)]",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
