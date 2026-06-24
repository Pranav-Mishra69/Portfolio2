import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { projects } from '../data/projects.js';

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <GlassCard
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        glow
        className="group p-0 h-full flex flex-col cursor-default"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="relative h-48 md:h-56 overflow-hidden border-b border-glass-border">
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent-violet/30 via-base to-accent-cyan/20 group-hover:scale-105 transition-transform duration-700"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl text-white/20 tracking-widest uppercase">
              {project.id.replace(/-/g, ' ')}
            </span>
          </div>
          <span className="absolute top-4 right-4 text-xs font-mono text-white/60 glass px-2 py-1 rounded-full">
            {project.year}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1 gap-4">
          <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-muted leading-relaxed flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-muted border border-glass-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent-cyan transition-colors"
            >
              Live demo <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors ml-auto"
            >
              <Github size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative" aria-label="Projects">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects that shipped, and shipped well."
          description="A mix of client engagements and product work spanning fintech, e-commerce, and immersive 3D."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
