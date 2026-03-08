"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/contexts/LangContext";

type ProjectItem = {
  category: string;
  title: string;
  summary: string;
  image?: string;
};

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ProjectBlock({
  project,
  index,
  base,
  viewProjectLabel,
}: {
  project: ProjectItem;
  index: number;
  base: string;
  viewProjectLabel: string;
}) {
  const imageLeft = index % 2 === 0;

  return (
    <motion.article
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:gap-y-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={revealVariants}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zyra-neutral/50 to-zyra-neutral/30 shadow-xl ring-1 ring-black/5 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zyra-neutral/60 to-zyra-neutral/40" />
          )}
        </div>
      </div>

      <div className={`flex flex-col justify-center ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zyra-primary">
          {project.category}
        </p>
        <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
          {project.title}
        </h3>
        <p className="mb-8 max-w-prose text-lg leading-relaxed text-gray-600">
          {project.summary}
        </p>
        <Link
          href={`${base}/projects`}
          className="group/link inline-flex items-center text-sm font-medium text-zyra-primary transition-colors hover:text-zyra-deep"
        >
          <span className="relative">
            {viewProjectLabel}
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-zyra-primary transition-transform duration-300 group-hover/link:scale-x-100" aria-hidden />
          </span>
          <span className="ml-1.5 transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { lang, t } = useLang();
  const base = `/${lang}`;
  const projects = t.home.projects.list as unknown as ProjectItem[];

  return (
    <motion.section
      id="projects"
      className="section-padding"
      aria-labelledby="projects-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Container>
        <div className="section-intro">
          <h2 id="projects-heading" className="section-heading mb-5">
            {t.home.projects.heading}
          </h2>
          <p className="section-subtext mt-4">
            {t.home.projects.subtext}
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-24 md:gap-28 lg:gap-32">
          {projects.map((project, index) => (
            <ProjectBlock
              key={project.title}
              project={project}
              index={index}
              base={base}
              viewProjectLabel={t.home.projects.viewProject}
            />
          ))}
        </div>
      </Container>
    </motion.section>
  );
}
