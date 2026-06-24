import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable glassmorphic container. `glow` adds a soft gradient border glow
 * on hover. Forwards refs so callers (e.g. tilt-effect project cards) can
 * read bounding rects directly off the underlying DOM node.
 */
const GlassCard = forwardRef(function GlassCard(
  { children, className = '', glow = false, as: Component = motion.div, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={`glass rounded-xl2 shadow-glass-inset relative overflow-hidden ${
        glow ? 'hover:shadow-glow transition-shadow duration-500' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default GlassCard;
