'use client';
import { useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ target, suffix = '', prefix = '', duration = 0.8, className }: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(0, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return controls.stop;
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
