"use client";

import React, { useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollFloatProps {
  children: React.ReactNode;
  // General
  className?: string;
  // List mode (animate multiple items inside container)
  animationDuration?: number; // seconds
  ease?: string; // gsap ease string
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number; // seconds
  yFrom?: number; // px
  yTo?: number; // px
  opacityFrom?: number;
  opacityTo?: number;
  // Text mode (when children is string)
  containerClassName?: string;
  textClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | Window>;
  scrub?: boolean;
  requireScroll?: boolean;
  // IntersectionObserver gate
  ioThreshold?: number; // 0..1
  ioRootMargin?: string; // e.g., '0px 0px -10% 0px'
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  className = '',
  // list defaults
  animationDuration = 1,
  ease = 'power3.out',
  scrollStart = 'top 85%',
  scrollEnd = 'bottom 20%',
  stagger = 0.03,
  yFrom = 30,
  yTo = 0,
  opacityFrom = 0,
  opacityTo = 1,
  // text defaults
  containerClassName = '',
  textClassName = '',
  scrollContainerRef,
  scrub = false,
  // jika true, tunda inisialisasi sampai user melakukan scroll pertama
  requireScroll = false,
  ioThreshold = 0.1,
  ioRootMargin = '0px 0px -10% 0px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isText = typeof children === 'string';

  const splitText = useMemo(() => {
    if (!isText) return null;
    const text = children as string;
    return text.split('').map((char, index) => (
      <span key={index} className="rb-sf-char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children, isText]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const initText = () => {
        const scroller = scrollContainerRef?.current ?? window;
        const chars = el.querySelectorAll('.rb-sf-char');

        gsap.fromTo(
          chars,
          {
            willChange: 'opacity, transform',
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: '50% 0%'
          },
          {
            duration: animationDuration,
            ease,
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger,
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: scrollStart,
              end: scrollEnd,
              scrub,
              once: false,
              immediateRender: false,
            },
          }
        );
      };

      const initList = () => {
        const targets = el.querySelectorAll(':scope > [data-scroll-float="item"]');
        if (!targets.length) return;

        gsap.set(targets, { y: yFrom, opacity: opacityFrom });
        gsap.fromTo(
          targets,
          { y: yFrom, opacity: opacityFrom },
          {
            y: yTo,
            opacity: opacityTo,
            ease,
            duration: animationDuration,
            stagger,
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: scrollStart,
              end: scrollEnd,
              scrub: false,
              once: true,
              immediateRender: false,
            },
            willChange: 'transform, opacity',
            force3D: true,
          }
        );
      };

      const bootstrap = () => (isText ? initText() : initList());

      // IntersectionObserver gate to avoid early run when element is on screen at first paint
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            if (requireScroll) {
              const triggerAfterScroll = () => {
                bootstrap();
                window.removeEventListener('scroll', triggerAfterScroll);
              };
              window.addEventListener('scroll', triggerAfterScroll, { once: true, passive: true });
            } else {
              bootstrap();
            }
            obs.disconnect();
          }
        }, { threshold: ioThreshold, rootMargin: ioRootMargin });
        observer.observe(el);
      } else {
        // Fallback if IO not available
        bootstrap();
      }
    },
    {
      scope: containerRef,
      dependencies: [
        children,
        className,
        animationDuration,
        ease,
        scrollStart,
        scrollEnd,
        stagger,
        yFrom,
        yTo,
        opacityFrom,
        opacityTo,
        scrollContainerRef,
        scrub,
        requireScroll,
        ioThreshold,
        ioRootMargin,
      ],
    }
  );

  if (isText) {
    return (
      <h2 ref={containerRef} className={`scroll-float ${containerClassName}`} style={{ overflow: 'hidden' }}>
        <span className={`scroll-float-text ${textClassName}`} style={{ display: 'inline-block', lineHeight: 1.5 }}>
          {splitText}
        </span>
      </h2>
    );
  }

  // List mode wrapper
  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as any, { 'data-scroll-float': 'item' });
      })}
    </div>
  );
};

export default ScrollFloat;
