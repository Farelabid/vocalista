// lib/animations.ts - Essential GSAP Utilities
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Default animation settings
const DEFAULT_DURATION = 0.8;
const DEFAULT_EASE = 'power3.out';
const DEFAULT_SCROLL_START = 'top 80%';

/**
 * Fade in animation with scroll trigger
 */
export const fadeInUp = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    duration: DEFAULT_DURATION,
    y: 60,
    opacity: 0,
    ease: DEFAULT_EASE,
    scrollTrigger: {
      trigger: element,
      start: DEFAULT_SCROLL_START,
      toggleActions: 'play none none reverse',
    },
    ...options,
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (elements: string | Element[], options = {}) => {
  return gsap.from(elements, {
    duration: 0.6,
    y: 40,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    ...options,
  });
};

/**
 * Animated number counter
 */
export const animateCounter = (element: Element, target: number) => {
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    duration: 2,
    ease: 'power2.out',
    value: target,
    scrollTrigger: {
      trigger: element,
      start: DEFAULT_SCROLL_START,
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};

/**
 * Parallax background effect
 */
export const parallax = (element: string | Element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

/**
 * Scale in animation
 */
export const scaleIn = (element: string | Element, options = {}) => {
  return gsap.from(element, {
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: DEFAULT_SCROLL_START,
      toggleActions: 'play none none reverse',
    },
    ...options,
  });
};

/**
 * Cleanup all ScrollTriggers
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * Refresh ScrollTriggers
 */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};