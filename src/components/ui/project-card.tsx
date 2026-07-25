"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PreviewCard } from "@base-ui/react/preview-card";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { useSpotlight } from "@/hooks/use-spotlight";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const emptySubscribe = () => () => {};

/**
 * True when the device has no hover capability (touch). Mirrors the
 * `useSyncExternalStore` pattern from `useHasMounted` (src/hooks/use-mounted.ts)
 * so the `react-hooks/set-state-in-effect` lint rule stays satisfied — no
 * `useState`/`useEffect` pair is involved. Returns `false` on the server and
 * on first client paint, then the real value once hydrated.
 */
function useIsTouchDevice() {
  return useSyncExternalStore(
    emptySubscribe,
    () => window.matchMedia("(hover: none)").matches,
    () => false
  );
}

function ProjectDescriptionList({ project }: { project: Project }) {
  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      {project.description.map((line, i) => (
        <li key={i} className="leading-relaxed">
          {line}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.repoUrl && !project.liveUrl) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <GithubIcon />
          GitHub
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <ExternalLink />
          Live Demo
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();
  const isTouchDevice = useIsTouchDevice();
  const summary = project.description.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group h-full"
    >
      <Card
        ref={ref}
        onPointerMove={onPointerMove}
        className="relative h-full ring-border transition-shadow duration-200 hover:shadow-lg"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, var(--cta) 15%, transparent), transparent 70%)",
          }}
        />
        <CardHeader className="relative z-10">
          <CardTitle className="text-base font-semibold">{project.title}</CardTitle>
          {project.subtitle && (
            <CardDescription className="font-medium text-[color-mix(in_oklab,var(--foreground)_70%,transparent)]">
              {project.subtitle}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col gap-4">
          {isTouchDevice ? (
            <ProjectDescriptionList project={project} />
          ) : (
            <PreviewCard.Root>
              <PreviewCard.Trigger
                render={<div tabIndex={0} />}
                className="cursor-default rounded-sm text-left text-sm leading-relaxed text-muted-foreground line-clamp-2 outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--ring)_50%,transparent)]"
              >
                {summary}
              </PreviewCard.Trigger>
              <PreviewCard.Portal>
                <PreviewCard.Positioner
                  sideOffset={8}
                  className="z-50 w-[var(--anchor-width)] max-w-[var(--available-width)]"
                >
                  <PreviewCard.Popup
                    render={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    }
                    className="w-full origin-[var(--transform-origin)] rounded-lg bg-card p-4 shadow-lg ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)]"
                  >
                    <ProjectDescriptionList project={project} />
                  </PreviewCard.Popup>
                </PreviewCard.Positioner>
              </PreviewCard.Portal>
            </PreviewCard.Root>
          )}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="outline" className="font-normal">
                {t}
              </Badge>
            ))}
          </div>
          <ProjectLinks project={project} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
