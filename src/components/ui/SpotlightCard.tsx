'use client';
import { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0f0f0f] p-8 transition-colors duration-300 hover:border-[#C9A84C]/20 ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(201,168,76,0.06), transparent 60%), #0f0f0f`
          : '#0f0f0f',
      }}
    >
      {children}
    </div>
  );
}
