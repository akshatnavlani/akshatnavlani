import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_oklab,var(--ring)_50%,transparent)] has-[[data-icon=inline-end]]:pr-1.5 has-[[data-icon=inline-start]]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:aria-invalid:ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)] [&>svg]:pointer-events-none [&>svg]:!size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [&:is(a)]:hover:bg-[color-mix(in_oklab,var(--primary)_80%,transparent)]",
        secondary:
          "bg-secondary text-secondary-foreground [&:is(a)]:hover:bg-[color-mix(in_oklab,var(--secondary)_80%,transparent)]",
        destructive:
          "bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] text-destructive focus-visible:ring-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:bg-[color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:focus-visible:ring-[color-mix(in_oklab,var(--destructive)_40%,transparent)] [&:is(a)]:hover:bg-[color-mix(in_oklab,var(--destructive)_20%,transparent)]",
        outline:
          "border-border text-foreground [&:is(a)]:hover:bg-muted [&:is(a)]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-[color-mix(in_oklab,var(--muted)_50%,transparent)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
