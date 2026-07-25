# Portfolio Site

Personal portfolio for Akshat Navlani, built from `Resume.pdf`. Single-page Next.js site with anchor-linked sections (Hero, Education, Skills, Projects, Achievements, Leadership, Contact).

## Stack

- **Next.js 16** (App Router, TypeScript), **Tailwind CSS v3.4**, **shadcn/ui** (base-ui primitives, `style: "base-nova"`, adapted to v3 — see quirk below), **framer-motion** for scroll-reveal animation, **lucide-react** for icons.
- No backend/API/database — fully static content, SSG output, Vercel-ready.

## Environment quirk (read before touching build config or Tailwind classes)

This machine enforces a Windows Application Control policy that blocks unsigned native `.node` binaries.
- **Turbopack** (native-only) — `dev`/`build` scripts pin `--webpack` in `package.json` instead. Harmless no-op on other machines (CI, Vercel, another dev machine).
- **Tailwind CSS is pinned to v3.4**, not v4. This project originally used v4, but v4's content scanner is a Rust binary (`@tailwindcss/oxide`); blocked here, it falls back to a WASM build, and **that WASM fallback's directory-scanning is silently broken on Windows** (confirmed upstream: Node's WASI implementation doesn't properly support Windows). The build succeeds and produces CSS, but `@layer utilities` compiles completely empty — zero Tailwind classes, just custom properties. There is no config fix for this; `@tailwindcss/postcss` has no non-native fallback path for file discovery. Downgrading to v3 (whose scanner is pure JS, no native/WASM dependency) was the fix, and it's why:
  - `tailwind.config.ts` exists (v4 didn't need one) — colors/radii map to the `:root`/`.dark` CSS variables in `globals.css` via `var(--x)`, plus `aria.invalid`, `ringWidth["3"]`, and `borderRadius["4xl"]` extensions that v3's defaults don't include but shadcn's classes assume.
  - shadcn's `base-nova` style is v4-native under the hood (its own `shadcn/tailwind.css` import uses `@custom-variant`/`@utility`, v4-only at-rules with no v3 equivalent). Only `button.tsx`, `card.tsx`, `badge.tsx`, `sheet.tsx`, and `navbar.tsx` needed hand-porting to v3 syntax; `navigation-menu.tsx` and `separator.tsx` were deleted outright since nothing in this site imports them and they leaned on the custom-variant layer this project doesn't carry.
  - **Opacity-modified custom colors** (`bg-primary/80`, `ring-ring/50`, etc.) don't work through v3's normal `<alpha-value>` mechanism here, because the CSS variables hold full color values (hex/rgba), not bare channel triples. Each such usage was rewritten as an arbitrary value, e.g. `bg-[color-mix(in_oklab,var(--primary)_80%,transparent)]`. **Follow this same pattern for any new opacity-modified custom-color utility** — plain `bg-primary/80`-style classes on these tokens will silently produce no CSS.
  - If shadcn's CLI is ever re-run to add/update a component, assume its output is v4 syntax and needs the same treatment: bare `-(--var)` arbitrary-property shorthand → `[var(--var)]`, `has-<variant>-[...]` compound shorthand → `has-[[<variant>-...]]`, trailing `!important` → leading `!`, bare `data-word:`/`supports-word:` → bracketed `data-[word]:`/`supports-[word]:`, and opacity-modified custom colors → `color-mix()` arbitrary values as above. Verify by checking the compiled CSS (`.next/static/css/*.css` after `npm run build`) for the literal class, not just by watching the build succeed — v3 silently drops unrecognized candidates instead of erroring.

## Structure

```
src/
  app/            # layout.tsx (fonts/metadata), page.tsx (composes sections), globals.css (theme tokens)
  components/
    layout/       # Navbar, Footer
    sections/     # One component per page section (Hero, Education, Skills, Projects, Achievements, Leadership, Contact)
    ui/           # shadcn primitives + custom presentational pieces (ProjectCard, TimelineItem, SectionHeading)
    icons.tsx     # Hand-rolled Github/Linkedin SVGs — lucide-react v1 dropped brand icons, don't re-add them from lucide
  data/           # Typed content: profile, education, skills, projects, achievements, leadership
  lib/types.ts    # Shared interfaces for the data/ modules
public/resume.pdf # Linked from the Navbar/Hero download buttons
design-system/    # Persisted design-system output from the ui-ux-pro-max skill (MASTER.md has the color/type rationale)
```

## Adding content

- **New project:** add an entry to `src/data/projects.ts` (matches the `Project` type in `src/lib/types.ts`). It automatically appears in the Projects grid.
- **Updated resume:** replace `public/resume.pdf` and update the corresponding `src/data/*.ts` file(s) to keep the on-page content in sync — the PDF is linked for download, not parsed at runtime.
- **Design changes:** this project's colors/typography/spacing came from the `ui-ux-pro-max` skill (installed globally at `~/.claude/skills/ui-ux-pro-max`). Check `design-system/akshat-navlani-portfolio/MASTER.md` before changing the palette — re-run the skill's `search.py --design-system` rather than picking colors ad hoc, so the whole site stays coherent.

## Commands

- `npm run dev` — dev server (webpack, per the note above)
- `npm run build` — production build
- `npm run lint` — ESLint

No test suite — this is a static personal site, kept intentionally simple.
