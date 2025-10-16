"use client";

import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  from?: number;
  to: number;
  separator?: string;
  direction?: 'up' | 'down';
  duration?: number;
  className?: string;
  onComplete?: () => void;
  startOnMount?: boolean;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  from = 0,
  to,
  separator = '',
  direction = 'up',
  duration = 1,
  className = '',
  onComplete,
  startOnMount = true,
  delay = 0
}) => {
  const [currentValue, setCurrentValue] = useState(from);
  const [isAnimating, setIsAnimating] = useState(false);
  // Store requestAnimationFrame id for proper cleanup in browser
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatNumber = (num: number): string => {
    if (separator) {
      return num.toLocaleString('en-US');
    }
    return num.toString();
  };

  const animate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    const startTime = Date.now();
    const startValue = from;
    const endValue = to;
    const totalDuration = duration * 1000; // Convert to milliseconds

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const current = startValue + (endValue - startValue) * easeOut;
      setCurrentValue(Math.round(current));
      
      if (progress < 1) {
        intervalRef.current = requestAnimationFrame(updateValue);
      } else {
        setCurrentValue(endValue);
        setIsAnimating(false);
        onComplete?.();
      }
    };

    updateValue();
  };

  useEffect(() => {
    if (startOnMount) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          animate();
        }, delay);
      } else {
        animate();
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        cancelAnimationFrame(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [from, to, duration, startOnMount, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        cancelAnimationFrame(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span className={className}>
      {formatNumber(currentValue)}
    </span>
  );
};

export default CountUp;