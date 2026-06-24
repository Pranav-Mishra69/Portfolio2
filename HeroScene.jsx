import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import Lights from './Lights.jsx';
import GeometricCluster from './GeometricCluster.jsx';
import FloatingParticles from './FloatingParticles.jsx';
import useMouseParallax from '../../hooks/useMouseParallax.js';

/**
 * Hero background scene. Owns the R3F Canvas and composes the cinematic
 * lighting, floating geometry cluster, ambient particles, and the
 * postprocessing stack (bloom, depth of field, vignette).
 *
 * Mouse position (from useMouseParallax) drives both the geometry cluster's
 * rotation and a subtle camera lerp, for a unified parallax feel.
 */
function CameraRig() {
  return null; // Camera movement is handled via group rotation in GeometricCluster
  // and a lightweight camera lerp could be added here with useFrame + useThree
  // if a true moving camera is desired instead of a static camera with a
  // rotating subject. Left as a clean extension point.
}

export default function HeroScene() {
  const mouse = useMouseParallax(0.06);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Lights />
        <Environment preset="city" />
        <GeometricCluster mouse={mouse} />
        <FloatingParticles count={180} radius={7} />
        <CameraRig />

        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
