"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="border-t border-border bg-[color-mix(in_oklab,var(--muted)_40%,transparent)]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow="Recognition" title="Achievements & Certifications" />
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, ease: "easeOut", delay: (i % 2) * 0.05 }}
            >
              <Card>
                <CardContent className="flex gap-3">
                  <Trophy className="mt-0.5 size-4 shrink-0 text-cta" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    {item.org && (
                      <p className="text-sm text-muted-foreground">{item.org}</p>
                    )}
                    {item.detail && (
                      <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
