import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Environment } from '@react-three/drei';
import Lights from './Lights.jsx';

/**
 * A single orbiting skill node: a glowing sphere with an HTML label that
 * enlarges and glows brighter on hover.
 */
function SkillNode({ name, color, radius, angleOffset, speed }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angleOffset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.3) * 0.6;
    }
  });

  return (
    <group ref={ref}>
      <Float speed={2} floatIntensity={hovered ? 1.5 : 0.5}>
        <mesh
          scale={hovered ? 1.4 : 1}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.2 : 0.5}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
        <Html distanceFactor={8} center>
          <span
            className={`text-xs font-mono whitespace-nowrap px-2 py-1 rounded-full transition-all ${
              hovered ? 'bg-white/10 text-white scale-110' : 'text-muted/80'
            }`}
            style={{ pointerEvents: 'none' }}
          >
            {name}
          </span>
        </Html>
      </Float>
    </group>
  );
}

/**
 * Renders one orbiting ring of skill nodes around a central glowing core
 * for a given category. Intended to be rendered inside its own small Canvas
 * per category card in the Skills section.
 */
export default function SkillSphere({ skills, color }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4.5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!h-full !w-full"
    >
      <Suspense fallback={null}>
        <Lights />
        <Environment preset="city" />

        {/* Core sphere representing the category */}
        <mesh>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {skills.map((skill, i) => (
          <SkillNode
            key={skill.name}
            name={skill.name}
            color={color}
            radius={1.6 + (i % 2) * 0.3}
            angleOffset={(i / skills.length) * Math.PI * 2}
            speed={0.3 + i * 0.05}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}
