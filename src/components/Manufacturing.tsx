import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PenTool, Layers, Scissors, Boxes, Flame, Sparkles, Wrench, Search, Package, Truck } from 'lucide-react';
import { IMG } from '../lib/images';

const steps = [
  { icon: PenTool, label: 'Design' },
  { icon: Layers, label: 'Material Selection' },
  { icon: Scissors, label: 'Laser Cutting' },
  { icon: Boxes, label: 'Fabrication' },
  { icon: Flame, label: 'Welding' },
  { icon: Sparkles, label: 'Powder Coating' },
  { icon: Wrench, label: 'Assembly' },
  { icon: Search, label: 'Inspection' },
  { icon: Package, label: 'Packaging' },
  { icon: Truck, label: 'Dispatch' },
];

const counters = [
  { value: 25, suffix: '+', label: 'Years' },
  { value: 1000, suffix: '+', label: 'Products' },
  { value: 500, suffix: '+', label: 'Projects' },
  { value: 100, suffix: '+', label: 'Corporate Clients' },
  { value: 20, suffix: '+', label: 'Export Countries' },
  { value: 95, suffix: '%', label: 'Repeat Customers' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / 1800, 1);
          setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export default function Manufacturing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="manufacturing" ref={ref} style={{ scrollMarginTop: '100px' }} className="relative overflow-hidden bg-navy py-32">
      {/* Video-like background image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={IMG.manufacturingBg}
          alt="OPCIEAS factory manufacturing floor"
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" />
      </div>
      <div className="pointer-events-none absolute inset-0 blueprint-bg opacity-30" />

      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Our Manufacturing</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Engineering Excellence at Every Stage
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 font-body text-sm text-white/60">
            Modern machinery, rigorous quality control, skilled workforce and export-grade packaging — all under one roof.
          </motion.p>
        </div>

        {/* Process timeline */}
        <div className="relative mb-20 overflow-x-auto pb-4 no-scrollbar">
          <div className="relative flex min-w-[900px] items-start justify-between px-4">
            <div className="absolute left-4 right-4 top-7 h-0.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-gold-2 to-gold" style={{ scaleX: lineScale, transformOrigin: 'left' }} />
            </div>
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative z-10 flex w-20 flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-navy-2 text-gold">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 font-sub text-xs font-medium text-white/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Factory numbers */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {counters.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-lux glass-navy p-6 text-center"
            >
              <p className="font-heading text-3xl font-black gold-text sm:text-4xl">
                <Counter value={c.value} suffix={c.suffix} />
              </p>
              <p className="mt-2 font-sub text-xs uppercase tracking-wider text-white/50">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
