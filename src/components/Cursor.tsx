import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
    if (!isDesktop) return;

    let raf = 0;
    let tx = -100, ty = -100;

    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      setPos({ x: tx, y: ty });
      setVisible(true);
      const el = e.target as HTMLElement;
      if (el.closest('button, a, .magnetic, [role="button"], input, select, textarea, label')) setVariant('hover');
      else if (el.closest('h1, h2, h3, h4, h5, p, span')) setVariant('text');
      else setVariant('default');
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const loop = () => {
      setTrail((p) => ({ x: p.x + (tx - p.x) * 0.15, y: p.y + (ty - p.y) * 0.15 }));
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  const size = variant === 'hover' ? 48 : variant === 'text' ? 6 : 14;
  const trailSize = variant === 'hover' ? 72 : 40;

  return (
    <>
      {/* Main dot — always visible, never blocks clicks */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: pos.x, top: pos.y,
          width: size, height: size,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background 0.2s, border 0.2s',
          borderRadius: '50%',
          background: variant === 'hover' ? 'rgba(212,175,55,0.25)' : variant === 'text' ? '#D4AF37' : '#D4AF37',
          border: variant === 'hover' ? '1.5px solid #D4AF37' : 'none',
          boxShadow: '0 0 12px rgba(212,175,55,0.4)',
        }}
      />
      {/* Trailing ring */}
      <div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: trail.x, top: trail.y,
          width: trailSize, height: trailSize,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 55, 0.5)',
          opacity: variant === 'hover' ? 0.9 : 0.4,
        }}
      />
    </>
  );
}
