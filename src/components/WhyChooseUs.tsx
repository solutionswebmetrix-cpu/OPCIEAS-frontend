import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Layers, Truck, Sparkles, BadgeCheck, ShieldCheck } from 'lucide-react';

const cards = [
  { icon: Sparkles, title: 'Innovation', desc: 'Forward-thinking furniture solutions with design-led manufacturing and product engineering.' },
  { icon: ShieldCheck, title: 'High Quality', desc: 'Premium materials, certified processes and rigorous inspection for every product.' },
  { icon: Award, title: 'Client Satisfaction', desc: 'Trusted by corporate, hospitality, government and educational clients for repeat partnerships.' },
  { icon: BadgeCheck, title: 'Competitive Pricing', desc: 'Value-driven pricing for bulk orders, tenders and institutional projects.' },
  { icon: Truck, title: 'Timely Delivery', desc: 'Reliable scheduling, logistics and supply chain support for every order.' },
  { icon: Layers, title: 'Customization', desc: 'Tailored furniture systems and finishes matched to project requirements.' },
  { icon: Globe, title: 'High Resale Value', desc: 'Durable, premium finishes that retain asset value over years of use.' },
];

function TiltCard({ icon: Icon, title, desc, i }: { icon: typeof Award; title: string; desc: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 12, ry: px * 12 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
      className="group relative rounded-lux glass p-6 transition-shadow duration-500 hover:glow-gold"
      style={{ transform: `perspective(800px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.2s' }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy" style={{ transform: 'translateZ(30px)' }}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-heading text-lg font-bold text-white" style={{ transform: 'translateZ(20px)' }}>{title}</h3>
      <p className="mt-2 font-body text-sm text-white/60" style={{ transform: 'translateZ(15px)' }}>{desc}</p>
      <div className="absolute inset-0 rounded-lux opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12), transparent 70%)' }} />
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" style={{ scrollMarginTop: '100px' }} className="relative overflow-hidden bg-dark py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Why Choose OPCIEAS</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            The Edge That Powers Enterprise Projects
          </motion.h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <TiltCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
