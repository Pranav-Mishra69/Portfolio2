import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/layout/PageTransition.jsx';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Projects from '../sections/Projects.jsx';
import Experience from '../sections/Experience.jsx';
import Skills from '../sections/Skills.jsx';
import Contact from '../sections/Contact.jsx';

const SITE_URL = 'https://alexmorgan.dev';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Alex Morgan — Creative Frontend Engineer & 3D Web Developer</title>
        <meta
          name="description"
          content="Alex Morgan is a creative frontend engineer building immersive digital experiences through WebGL, Three.js, and modern frontend technologies."
        />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Alex Morgan — Creative Frontend Engineer & 3D Web Developer" />
        <meta
          property="og:description"
          content="Building immersive digital experiences through WebGL, Three.js, and modern frontend technologies."
        />
        <meta property="og:image" content={OG_IMAGE} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alex Morgan — Creative Frontend Engineer & 3D Web Developer" />
        <meta
          name="twitter:description"
          content="Building immersive digital experiences through WebGL, Three.js, and modern frontend technologies."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </PageTransition>
  );
}
