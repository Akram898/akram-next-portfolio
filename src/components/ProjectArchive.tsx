"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    title: "Next E-commerce",
    description: "Commerce experience with payments and AI-assisted product workflows.",
    image: "/projects/next-ecommerce.png",
    tags: ["Next.js", "OpenAI API"],
    source: "https://github.com/Akram898/next-shop",
    visit: "https://next-shop-wheat.vercel.app/",
  },
  {
    title: "AI Article Summarizer",
    description: "A focused reading tool that turns long articles into concise summaries.",
    image: "/projects/ai-article-summarizer.png",
    tags: ["React", "OpenAI", "RapidAPI"],
    source: "https://github.com/Akram898/ai-summarize",
    visit: "https://ai-article-summarizer-1.netlify.app/",
  },
  {
    title: "Amazon Clone",
    description: "Full commerce flow with authentication, basket state, and payments.",
    image: "/projects/amazon-clone.PNG",
    tags: ["React", "Next.js", "Tailwind"],
    source: "https://github.com/Akram898/new-amazon-clone",
    visit: "https://new-amazon-clone.vercel.app/",
  },
  {
    title: "Movies Explorer",
    description: "Search and discovery interface for current films and series.",
    image: "/projects/movies.PNG",
    tags: ["React", "Sass", "API"],
    source: "https://github.com/Akram898/react-movies-app",
    visit: "https://react-movies-tv.netlify.app/",
  },
  {
    title: "Food To Go",
    description: "A responsive ordering platform backed by Firebase.",
    image: "/projects/elakl.png",
    tags: ["JavaScript", "Firebase", "Sass"],
    source: "https://github.com/Akram898/",
    visit: "https://foodtogo-e1546.web.app/",
  },
  {
    title: "Tesla Experience",
    description: "A motion-led product site study with responsive storytelling.",
    image: "/projects/tesla.png",
    tags: ["React", "Next.js", "Sass"],
    source: "https://github.com/Akram898/tesla-clone",
    visit: "https://tesla-clone-22.netlify.app/",
  },
  {
    title: "Book The Chefs",
    description: "Chef discovery and food ordering interface.",
    image: "/projects/bookthechef-- - Copy.PNG",
    tags: ["JavaScript", "Firebase", "Sass"],
    source: "https://github.com/Akram898/bookTheChef",
    visit: "https://bookthechefs-10cb0.web.app/",
  },
  {
    title: "Yalla Parking",
    description: "Dubai parking discovery concept using map-based search.",
    image: "/projects/yalla2.PNG",
    tags: ["Maps API", "JavaScript", "CSS"],
    source: "https://github.com/Akram898/",
    visit: "https://dashop-7af56.firebaseapp.com/",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping: 22,
  });

  function handleMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.article
      className="archive-card"
      onPointerMove={handleMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
    >
      <a href={project.visit} target="_blank" rel="noreferrer" className="archive-image">
        <Image
          src={project.image}
          alt={`${project.title} project interface`}
          fill
          sizes="(min-width: 1100px) 32vw, (min-width: 700px) 48vw, 92vw"
        />
        <span>Open live project ↗</span>
      </a>
      <div className="archive-content">
        <p className="archive-index">ARCHIVE / {String(index + 1).padStart(2, "0")}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="archive-links">
          <a href={project.visit} target="_blank" rel="noreferrer">Live ↗</a>
          <a href={project.source} target="_blank" rel="noreferrer">Code ↗</a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectArchive({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <details className="shipped-work">
        <summary>
          <span>
            <small>Selected archive / 08 projects</small>
            <strong>Open shipped work</strong>
          </span>
          <i aria-hidden>+</i>
        </summary>
        <div className="shipped-work-list">
          {projects.map((project, index) => (
            <article key={project.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <ul>
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className="shipped-work-links">
                <a href={project.visit} target="_blank" rel="noreferrer">Live ↗</a>
                <a href={project.source} target="_blank" rel="noreferrer">Code ↗</a>
              </div>
            </article>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className="archive-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}
