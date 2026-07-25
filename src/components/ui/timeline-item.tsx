"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period?: string;
  children: React.ReactNode;
}

export function TimelineItem({ title, subtitle, period, children }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative border-l border-border pl-6"
    >
      <span className="absolute top-1.5 left-[-4.5px] size-2 rounded-full bg-cta" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-semibold">{title}</h3>
        {period && <span className="text-sm text-muted-foreground">{period}</span>}
      </div>
      <p className="text-sm font-medium text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">{subtitle}</p>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </motion.div>
  );
}
