import type { SkillCategory } from "@/lib/types";

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Java", "C", "C++", "Python", "Go", "JavaScript", "TypeScript", "SQL", "Zig", "Verilog"],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Express.js",
      "Gin",
      "Node.js",
      "FastAPI",
      "Astro",
      "Tailwind CSS",
      "shadcn/ui",
      "GSAP",
    ],
  },
  {
    category: "AI / ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "HuggingFace Transformers",
      "LangChain",
      "LangGraph",
      "Ollama",
      "FAISS",
      "OpenCV",
      "Gemini API",
      "Groq API",
      "Reinforcement Learning",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "Redis", "Firebase Firestore"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "GitHub Actions", "CI/CD Pipelines", "Nginx", "Vercel", "Railway", "Render", "Git", "Linux", "Bash"],
  },
  {
    category: "Testing & Tools",
    items: ["Playwright", "Jest", "Vitest", "pytest", "Postman", "Figma"],
  },
];
