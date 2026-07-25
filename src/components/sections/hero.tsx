"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-cta">
          {profile.role}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {profile.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className={cn(buttonVariants({ size: "lg" }), "cursor-pointer bg-cta text-cta-foreground hover:bg-[color-mix(in_oklab,var(--cta)_90%,transparent)]")}
          >
            View Projects
            <ArrowRight data-icon="inline-end" />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cursor-pointer")}
          >
            <Download data-icon="inline-start" />
            Download Resume
          </a>
          <a
            href="#contact"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "cursor-pointer")}
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
}
