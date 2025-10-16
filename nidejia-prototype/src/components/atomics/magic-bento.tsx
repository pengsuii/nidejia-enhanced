"use client";

import React, { useRef, useEffect, useState } from 'react';

interface MagicBentoProps {
  children: React.ReactNode;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  className?: string;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  children,
  textAutoHide = false,
  enableStars = false,
  enableSpotlight = false,
  enableBorderGlow = false,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = false,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255",
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generate particles
  useEffect(() => {
    if (!enableStars) return;
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, [enableStars, particleCount]);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      // Update spotlight position
      if (enableSpotlight && spotlight) {
        spotlight.style.left = `${x}px`;
        spotlight.style.top = `${y}px`;
      }

      // Update particles position
      if (enableStars && isHovered) {
        setParticles(prev => prev.map(particle => ({
          ...particle,
          x: x + (Math.random() - 0.5) * 50,
          y: y + (Math.random() - 0.5) * 50
        })));
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const handleClick = () => {
      if (clickEffect) {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, [enableSpotlight, enableStars, isHovered, clickEffect]);

  const getTransformStyle = () => {
    if (!enableTilt || !isHovered) {
      return {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)'
      };
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return {};

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;

    const rotateX = (deltaY / centerY) * 10;
    const rotateY = (deltaX / centerX) * -10;

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
      transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)'
    };
  };

  return (
    <div
      ref={containerRef}
      className={`magic-bento-container relative overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Spotlight Effect */}
      {enableSpotlight && (
        <div
          ref={spotlightRef}
          className="absolute pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            width: `${spotlightRadius}px`,
            height: `${spotlightRadius}px`,
            background: `radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            opacity: isHovered ? 1 : 0,
            zIndex: 1
          }}
        />
      )}

      {/* Border Glow Effect */}
      {enableBorderGlow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, rgba(${glowColor}, 0.3), transparent, rgba(${glowColor}, 0.3))`,
            borderRadius: 'inherit',
            opacity: isHovered ? 1 : 0,
            zIndex: 2
          }}
        />
      )}

      {/* Stars Effect */}
      {enableStars && isHovered && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-pulse"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                animationDelay: `${particle.delay}s`,
                opacity: isHovered ? 0.8 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div
        className="magic-bento-content relative z-0"
        style={{
          ...getTransformStyle(),
          transform: `${getTransformStyle().transform} ${isClicked ? 'scale(0.95)' : ''}`,
          transition: `${getTransformStyle().transition}, transform 150ms ease`
        }}
      >
        {children}
      </div>

      {/* Click Effect Ripple */}
      {clickEffect && isClicked && (
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, transparent 70%)`,
            borderRadius: 'inherit',
            animation: 'ripple 300ms ease-out'
          }}
        />
      )}

      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MagicBento;
