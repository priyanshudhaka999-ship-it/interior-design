import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_EDITORIAL = [0.22, 1, 0.36, 1];

/**
 * Unified, restrained motion system with differentiated variants:
 * - 'heading': subtle opacity + 14px vertical lift (650ms)
 * - 'image': calm opacity + gentle scale settle from 1.02 to 1.0 (850ms)
 * - 'text': pure gentle opacity + 8px drift (550ms)
 * - 'stagger': delayed metadata reveal after photography (600ms)
 * Triggers once per page visit (`once: true`) for a calm, non-repetitive editorial feel.
 */
const RevealOnScroll = ({
  children,
  variant = 'heading',
  delay = 0,
  className = '',
  amount = 0.15,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variantsMap = {
    heading: {
      hidden: { opacity: 0, y: 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: EASE_EDITORIAL },
      },
    },
    image: {
      hidden: { opacity: 0, scale: 1.018 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.85, delay, ease: EASE_EDITORIAL },
      },
    },
    text: {
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay, ease: EASE_EDITORIAL },
      },
    },
    stagger: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: delay + 0.12, ease: EASE_EDITORIAL },
      },
    },
  };

  const chosen = variantsMap[variant] || variantsMap.heading;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={chosen}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
