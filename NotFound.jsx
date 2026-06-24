import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <Helmet>
        <title>Page not found — Alex Morgan</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <span className="font-display text-7xl md:text-9xl text-gradient mb-4">404</span>
      <h1 className="font-display text-2xl md:text-3xl text-white mb-3">
        This page drifted off into the void.
      </h1>
      <p className="text-muted max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm tracking-wide bg-gradient-to-r from-accent-violet to-accent-cyan text-black shadow-glow hover:shadow-glow-cyan transition-shadow"
      >
        Back to home
      </Link>
    </div>
  );
}
