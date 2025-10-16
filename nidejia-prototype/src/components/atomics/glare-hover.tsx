"use client";

import React, { useRef, useEffect, useState } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const glare = glareRef.current;

    if (!container || !glare) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (playOnce && hasPlayed) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = x - centerX;
      const deltaY = y - centerY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

      const normalizedDistance = Math.min(distance / maxDistance, 1);
      const intensity = 1 - normalizedDistance;

      glare.style.transform = `translate(${x - glareSize / 2}px, ${y - glareSize / 2}px) rotate(${angle + glareAngle}deg)`;
      glare.style.opacity = (intensity * glareOpacity).toString();
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (playOnce && !hasPlayed) {
        setHasPlayed(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (!playOnce) {
        glare.style.opacity = '0';
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glareColor, glareOpacity, glareAngle, glareSize, playOnce, hasPlayed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ position: 'relative' }}
    >
      {children}
      <div
        ref={glareRef}
        className="pointer-events-none absolute"
        style={{
          width: `${glareSize}px`,
          height: `${glareSize}px`,
          background: `linear-gradient(${glareAngle}deg, transparent 0%, ${glareColor} 50%, transparent 100%)`,
          opacity: 0,
          transition: `opacity ${transitionDuration}ms ease-out`,
          transformOrigin: 'center',
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default GlareHover;

