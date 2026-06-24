import { Suspense, lazy } from 'react';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import Loader from '../components/common/Loader.jsx';
import { skillCategories } from '../data/skills.js';

const SkillSphere = lazy(() => import('../components/three/SkillSphere.jsx'));

function SkillCategoryCard({ category }) {
  return (
    <GlassCard className="p-6 flex flex-col" glow>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-lg font-semibold text-white">{category.label}</h3>
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: category.color, boxShadow: `0 0 12px ${category.color}` }}
          aria-hidden="true"
        />
      </div>

      <div className="h-64 md:h-72 -mx-2">
        <Suspense fallback={<Loader fullscreen={false} />}>
          <SkillSphere skills={category.skills} color={category.color} />
        </Suspense>
      </div>

      <p className="text-xs text-muted mt-2">Hover a node to see it up close.</p>
    </GlassCard>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative" aria-label="Skills">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Capabilities"
          title="A toolkit built for shipping immersive products."
          description="Each sphere is an orbit of the tools I reach for most — hover any node for a closer look."
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
