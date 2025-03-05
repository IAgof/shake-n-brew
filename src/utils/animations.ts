
// Animation timings
export const TIMING = {
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 800
};

// Animation easings
export const EASING = {
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
};

// Different animation presets
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: TIMING.normal / 1000, ease: EASING.easeOutQuart }
  },
  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: TIMING.normal / 1000, ease: EASING.easeOutQuart }
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { duration: TIMING.normal / 1000, ease: EASING.easeOutQuart }
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: TIMING.normal / 1000, ease: EASING.easeOutQuart }
  },
  slideInLeft: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: TIMING.normal / 1000, ease: EASING.easeOutQuart }
  },
  slideInRight: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: TIMING.normal / 1000, ease: EASING.easeOutQuart }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Staggered animations for lists
export const stagger = (delay: number = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

// Animation variants for list items
export const listItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Helper to apply CSS transitions
export const applyTransition = (
  properties: string[] = ['all'], 
  duration: number = TIMING.normal, 
  easing: string = EASING.easeOutQuart
): string => {
  return properties
    .map(prop => `${prop} ${duration}ms ${easing}`)
    .join(', ');
};
