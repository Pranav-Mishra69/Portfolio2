import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { experience } from '../data/experience.js';

const ExperienceScene = lazy(() => import('../components/three/ExperienceScene.jsx'));

function TimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      className="relative pl-12 md:pl-16 pb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Node */}
      <span className="absolute left-0 top-1 w-6 h-6 rounded-full glass-strong flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />
      </span>

      {/* Connecting line, drawn via scaleY on scroll */}
      {!isLast && (
        <motion.span
          className="absolute left-3 top-7 w-px bg-gradient-to-b from-accent-violet/60 to-transparent origin-top"
          style={{ height: 'calc(100% - 1.75rem)' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      )}

      <GlassCard className="p-6 md:p-8" glow>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
          <h3 className="font-display text-xl font-semibold text-white">{item.role}</h3>
          <span className="text-xs font-mono text-accent-cyan uppercase tracking-wide">
            {item.period}
          </span>
        </div>
        <p className="text-sm font-medium text-muted mb-4">{item.company}</p>
        <p className="text-sm text-white/80 leading-relaxed mb-5">{item.description}</p>

        <ul className="space-y-2">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm text-muted">
              <span className="text-accent-violet mt-1">›</span>
              {highlight}
            </li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative" aria-label="Experience">
      <Suspense fallback={null}>
        <ExperienceScene />
      </Suspense>

      <div className="container-custom relative">
        <SectionTitle
          eyebrow="Career"
          title="Six years, three teams, one obsession with craft."
        />

        <div className="max-w-2xl">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
