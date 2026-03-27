'use client';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
}

export function Marquee({ items, speed = 30, separator = '\u25C6' }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full py-6 bg-[#0d0d0d] border-y border-white/[0.04]">
      <div
        className="flex whitespace-nowrap marquee-track"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="mx-6 text-sm tracking-[0.15em] uppercase text-[#C9A84C]/60 font-medium">
            {item}
            <span className="mx-6 text-[#C9A84C]/20">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
