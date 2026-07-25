import type { Project } from "@/lib/types";

// Add repoUrl / liveUrl (see the Project type in src/lib/types.ts) once these are pushed to GitHub / deployed.
export const projects: Project[] = [
  {
    slug: "multimodal-pdf-summarizer",
    title: "Multimodal PDF Summarizer with XAI Attribution",
    tech: ["Python", "HuggingFace Transformers", "PyTorch", "FAISS", "BLIP-2", "Gemini API", "Groq API", "Gradio", "pytest"],
    description: [
      "Designed an end-to-end multimodal AI pipeline that extracts and processes text, tables, figures, and charts from scientific PDFs, generating sentence-level XAI explainability scores with per-modality contribution ratios — enabling transparent, auditable summarisation across all content types.",
      "Integrated five interchangeable LLM backends (Gemini, Groq, BART, extractive, hybrid) behind a unified interface with FAISS-backed semantic retrieval; evaluated throughput and output quality against ROUGE, BERTScore, and BLEU benchmarks, exposing backend switching without code changes.",
      "Deployed the pipeline as a Gradio web application with full pytest test coverage, reducing upload-to-summary latency through asynchronous chunk indexing and lazy model loading.",
    ],
  },
  {
    slug: "personalized-news-emailer",
    title: "Personalized News Emailer",
    subtitle: "Production-Grade Full-Stack Platform",
    tech: ["React 18", "Vite", "Express.js", "Node.js", "Firebase Auth", "Firestore", "Playwright", "Jest", "Vitest"],
    description: [
      "Built a full-stack personalised news platform with Firebase Auth, 12-category RSS aggregation, a 15-minute in-memory caching layer to reduce redundant upstream fetches, and automated Handlebars-templated email delivery with per-user preference routing.",
      "Enforced 75%+ test coverage via GitHub Actions CI across 415 Playwright E2E tests and Jest/Vitest unit suites; eliminated unnecessary re-renders by applying memo, useMemo, and useCallback across critical render paths.",
      "Implemented WCAG 2.1 AA accessibility compliance, session-timeout handling, dark-mode theming via CSS variables, and an Express monitoring middleware layer.",
    ],
  },
  {
    slug: "airbnb-price-prediction",
    title: "Airbnb Price Prediction",
    subtitle: "End-to-End ML Pipeline",
    tech: ["Python", "XGBoost", "LightGBM", "scikit-learn", "pandas", "NumPy", "Jupyter"],
    description: [
      "Developed a complete ML pipeline on 26,000 Airbnb listings — data cleaning, feature engineering (10+ custom features), log-normalised targets, and early stopping — training an XGBoost regression model achieving R² = 0.82 and MAE = $66.59.",
      "Constructed a companion 3-class price-tier classifier with quantile-based labelling and a full scikit-learn preprocessing pipeline (RobustScaler + OneHotEncoder), reaching 97.54% accuracy and F1 = 0.975.",
      "Packaged the final model as a reusable pipeline artifact ready for REST API serving via a single predict() call.",
    ],
  },
  {
    slug: "sae-addc-drone",
    title: "SAE ADDC Autonomous Drone",
    subtitle: "Vision-Guided Navigation System",
    tech: ["Python", "DroneKit", "MAVLink", "OpenCV", "ArUco", "pyzbar", "NumPy"],
    description: [
      "Developed a competition-grade autonomous UAV for SAE ADDC integrating real-time QR-code target tracking, ArUco-marker precision landing, and MAVLink/DroneKit flight control with a servo-actuated payload delivery mechanism.",
      "Eliminated targeting error caused by lens distortion by performing full intrinsic camera calibration (cv2.calibrateCamera) on a 20-image checkerboard dataset, enabling sub-pixel-accurate visual servoing at competition altitude.",
    ],
  },
  {
    slug: "film-production-database",
    title: "Film Production Database",
    subtitle: "Relational Schema & RBAC Engine",
    tech: ["MySQL", "SQL DDL/DML", "Stored Procedures", "Triggers", "Window Functions", "draw.io"],
    description: [
      "Implemented a 20+ entity normalised relational database in MySQL, centralising data integrity across 14 audit triggers and 12 CHECK constraints, shifting business-rule enforcement to the database layer.",
      "Provisioned a 3-tier role-based access control (RBAC) system granting real MySQL user privileges (admin/manager/viewer via GRANT); encoded profit, ROI, payroll, and box-office analytics as 15+ stored procedures and 8 views, documented via ER and relational schema diagrams.",
    ],
  },
  {
    slug: "portfolio-website",
    title: "Personal Portfolio Website",
    subtitle: "Next.js Portfolio with Dark Mode & Blog",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui", "framer-motion"],
    description: [
      "Built a single-page, anchor-linked portfolio covering education, skills, projects, achievements, and leadership, paired with a markdown-driven blog section, all statically generated with the Next.js App Router.",
      "Implemented a custom project showcase with spotlight cursor glows and hover-expanding previews, plus dark/light/system theming and scroll-reveal animation for a polished, distinctive browsing experience.",
    ],
    // TODO: add once pushed/deployed
  },
];
