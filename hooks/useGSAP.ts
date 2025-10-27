// hooks/useGSAP.ts - Essential React hooks for GSAP
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in up animation on scroll
 */
export function useFadeInUp(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.from(element, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    });

    // Store trigger reference for efficient cleanup
    triggerRef.current = animation.scrollTrigger || null;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      animation.kill();
    };
  }, []); // Empty dependency - animation runs once

  return ref;
}

/**
 * Stagger animations on children elements
 */
export function useStaggerChildren(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !element.children.length) return;

    const animation = gsap.from(element.children, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    });

    // Store trigger reference for efficient cleanup
    triggerRef.current = animation.scrollTrigger || null;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      animation.kill();
    };
  }, []); // Empty dependency - animation runs once

  return ref;
}

/**
 * Animated number counter
 */
export function useCounter(target: number, options = {}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const obj = { value: 0 };

    const animation = gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (element && element.isConnected) {
          element.textContent = Math.round(obj.value).toLocaleString();
        }
      },
      ...options,
    });

    // Store trigger reference for efficient cleanup
    triggerRef.current = animation.scrollTrigger || null;

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      animation.kill();
    };
  }, [target]); // Only re-run if target changes

  return ref;
}

/**
 * Cleanup on unmount
 */
export function useScrollTriggerCleanup() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}