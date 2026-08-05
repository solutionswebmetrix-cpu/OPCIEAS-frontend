import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Briefcase, HeartPulse, Hotel, ShoppingBag, Warehouse, Factory, HardHat, Shield, Plane, TrainFront, Cpu, Ship } from 'lucide-react';
import { IMG } from '../lib/images';

const industryMeta = [
  { icon: GraduationCap, name: 'Education', stat: '500+ institutions' },
  { icon: Building2, name: 'Government', stat: '100+ tenders' },
  { icon: Briefcase, name: 'Corporate', stat: '100+ clients' },
  { icon: HeartPulse, name: 'Healthcare', stat: '50+ hospitals' },
  { icon: Hotel, name: 'Hospitality', stat: '30+ hotels' },
  { icon: ShoppingBag, name: 'Retail', stat: '40+ chains' },
  { icon: Warehouse, name: 'Warehouses', stat: '80+ facilities' },
  { icon: Factory, name: 'Factories', stat: '60+ plants' },
  { icon: HardHat, name: 'Infrastructure', stat: '25+ projects' },
  { icon: Shield, name: 'Defence', stat: '10+ bases' },
  { icon: Plane, name: 'Airports', stat: '5+ terminals' },
  { icon: TrainFront, name: 'Metro Rail', stat: '8+ stations' },
  { icon: Cpu, name: 'Smart Cities', stat: '15+ cities' },
  { icon: Ship, name: 'Exports', stat: '20+ countries' },
];

const industries = industryMeta.map((ind) => ({ ...ind, img: IMG.industries[ind.name as keyof typeof IMG.industries] }));

function IndustryCard({ icon: Icon, name, stat, img, i }: { icon: typeof Building2; name: string; stat: string; img: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setT({ rx: -((e.clientY - r.top) / r.height - 0.5) * 14, ry: ((e.clientX - r.left) / r.width - 0.5) * 14 });
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
      className="group relative aspect-square overflow-hidden rounded-lux border border-white/10"
      style={{ transform: `perspective(800px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: 'transform 0.2s', transformStyle: 'preserve-3d' }}
    >
      <Link to={`/industries/${name.toLowerCase().replace(/\s+/g, '-').replace('warehouses', 'export').replace('factories', 'export').replace('infrastructure', 'government').replace('defence', 'government').replace('airports', 'government').replace('metro-rail', 'government').replace('smart-cities', 'government').replace('exports', 'export')}`} className="block">
      <img src={img} alt={`${name} furniture by OPCIEAS`} className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-700 group-hover:opacity-60 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-heading text-base font-bold text-white">{name}</h3>
        <p className="mt-1 font-sub text-xs text-gold">{stat}</p>
      </div>
      </Link>
    </motion.div>
  );
}

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-dark py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Industries We Serve</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Trusted Across Every Sector
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {industries.map((ind, i) => (
            <IndustryCard key={ind.name} icon={ind.icon} name={ind.name} stat={ind.stat} img={ind.img} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
