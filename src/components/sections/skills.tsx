"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border bg-[color-mix(in_oklab,var(--muted)_40%,transparent)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills"
          description="Languages, frameworks, and tools I use to build products end-to-end."
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, ease: "easeOut", delay: (i % 2) * 0.05 }}
            >
              <h3 className="text-sm font-semibold text-foreground">{category.category}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <Badge key={item} variant="outline" className="font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
