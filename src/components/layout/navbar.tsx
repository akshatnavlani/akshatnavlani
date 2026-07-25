"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
];

const blogLink = { href: "/blog", label: "Blog" };

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklab,var(--background)_80%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_60%,transparent)]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-semibold tracking-tight">
          {profile.name}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={blogLink.href}
            className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {blogLink.label}
          </Link>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            download
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "cursor-pointer bg-cta text-cta-foreground hover:bg-[color-mix(in_oklab,var(--cta)_90%,transparent)]")}
          >
            <Download data-icon="inline-start" />
            Resume
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="cursor-pointer rounded-lg p-2 text-foreground"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{profile.name}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={blogLink.href}
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-lg px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {blogLink.label}
            </Link>
            <a
              href={profile.resumeUrl}
              download
              onClick={() => setOpen(false)}
              className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg bg-cta px-2 py-2.5 text-sm font-medium text-cta-foreground"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
