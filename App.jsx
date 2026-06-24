import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { routes } from './routes.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Loader from './components/common/Loader.jsx';
import useLenis from './hooks/useLenis.js';

function CursorSpotlight() {
  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return <div className="cursor-spotlight" aria-hidden="true" />;
}

function AuroraBackground() {
  return (
    <div className="aurora-layer" aria-hidden="true">
      <div className="absolute -top-1/4 -left-1/4 w-[120%] h-[120%] bg-aurora-1 animate-aurora-drift" />
      <div className="absolute -top-1/3 -right-1/4 w-[110%] h-[110%] bg-aurora-2 animate-aurora-drift [animation-delay:2s]" />
      <div className="absolute -bottom-1/3 left-0 w-[100%] h-[100%] bg-aurora-3 animate-aurora-drift [animation-delay:4s]" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [booting, setBooting] = useState(true);

  // Initialize Lenis smooth scroll once for the whole app lifecycle.
  useLenis();

  // Lock scroll while the boot loader is visible.
  useEffect(() => {
    document.body.style.overflow = booting ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [booting]);

  return (
    <>
      {booting && <Loader fullscreen onComplete={() => setBooting(false)} />}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent-violet focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <AuroraBackground />
      <div className="noise-overlay" />
      <CursorSpotlight />

      <Navbar />

      <main id="main-content">
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader fullscreen={false} />}>
            <Routes location={location} key={location.pathname}>
              {routes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
