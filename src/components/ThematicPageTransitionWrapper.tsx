import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';

interface ThematicPageTransitionWrapperProps {
  children: React.ReactNode;
  // Optional: could add a prop to customize animation type if needed in the future
  // animationKey?: string; // The key for AnimatePresence would be passed by the parent
}

// Define variants for a "swoosh" effect
const swooshVariants: Variants = {
  initial: {
    x: '100vw', // Start off-screen to the right (effectively a full viewport width slide)
    opacity: 0,
  },
  in: {
    x: 0, // Slide into view
    opacity: 1,
  },
  out: {
    x: '-100vw', // Slide off-screen to the left
    opacity: 0,
  },
};

// Define the transition properties
const swooshTransition: Transition = {
  type: 'tween', // Using tween for a more controlled, less "springy" feel for page slides
  ease: [0.34, 0.69, 0.16, 1], // Custom bezier for a smooth and slightly anticipatory feel
  duration: 0.5, // Duration of the transition in seconds
};

const ThematicPageTransitionWrapper: React.FC<ThematicPageTransitionWrapperProps> = ({ children }) => {
  console.log('ThematicPageTransitionWrapper loaded');

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={swooshVariants}
      transition={swooshTransition}
      style={{
        width: '100%', // Ensure the wrapper takes full width
        // position: 'absolute', // If using AnimatePresence with mode="wait", absolute positioning
                               // on exiting/entering elements can prevent content reflow.
                               // However, this depends on the parent layout structure.
                               // For simplicity, starting without it.
                               // The parent using AnimatePresence typically handles layout.
      }}
    >
      {children}
    </motion.div>
  );
};

export default ThematicPageTransitionWrapper;