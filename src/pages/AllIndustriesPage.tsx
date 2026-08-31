import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Briefcase, HeartPulse, Hotel, ShoppingBag, Warehouse, Factory, HardHat, Shield, Plane, TrainFront, Cpu, Ship } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

const industryMeta = [
  { icon: GraduationCap, name: 'Education', stat: '500+ institutions', desc: 'Schools, colleges, universities with premium educational furniture' },
  { icon: Building2, name: 'Government', stat: '100+ tenders', desc: 'Government institutions and public sector procurement' },
  { icon: Briefcase, name: 'Corporate', stat: '100+ clients', desc: 'Corporate offices and business centers' },
  { icon: HeartPulse, name: 'Healthcare', stat: '50+ hospitals', desc: 'Hospitals, clinics, and medical facilities' },
  { icon: Hotel, name: 'Hospitality', stat: '30+ hotels', desc: 'Hotels, resorts, and hospitality venues' },
  { icon: ShoppingBag, name: 'Retail', stat: '40+ chains', desc: 'Retail stores and commercial showrooms' },
  { icon: Warehouse, name: 'Warehouses', stat: '80+ facilities', desc: 'Storage and logistics facilities' },
  { icon: Factory, name: 'Factories', stat: '60+ plants', desc: 'Industrial plants and manufacturing units' },
  { icon: HardHat, name: 'Infrastructure', stat: '25+ projects', desc: 'Infrastructure projects and construction' },
  { icon: Shield, name: 'Defence', stat: '10+ bases', desc: 'Defence and military installations' },
  { icon: Plane, name: 'Airports', stat: '5+ terminals', desc: 'Airport terminals and aviation facilities' },
  { icon: TrainFront, name: 'Metro Rail', stat: '8+ stations', desc: 'Metro and railway stations' },
  { icon: Cpu, name: 'Smart Cities', stat: '15+ cities', desc: 'Smart city projects and urban development' },
  { icon: Ship, name: 'Exports', stat: '20+ countries', desc: 'International export and global markets' },
];

const industries = industryMeta.map((ind) => ({
  ...ind,
  img: IMG.industries[ind.name as keyof typeof IMG.industries],
}));

function IndustryCard({
  icon: Icon,
  name,
  stat,
  desc,
  img,
  i,
}: {
  icon: typeof Building2;
  name: string;
  stat: string;
  desc: string;
  img: string;
  i: number;
}) {
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
      className="group relative overflow-hidden rounded-lux bg-white border border-navy/10 shadow-sm hover:shadow-md"
      style={{ transform: `perspective(800px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: 'transform 0.2s', transformStyle: 'preserve-3d' }}
    >
      <Link to={`/industries/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt={`${name} furniture by OPCIEAS`}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
        </div>
        <div className="relative z-10 bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
            <Icon className="h-6 w-6" />
          </div>
          <div className="mt-4">
            <h3 className="font-heading text-lg font-bold text-navy">{name}</h3>
            <p className="mt-1 font-sub text-xs text-gold">{stat}</p>
            <p className="mt-3 font-body text-xs text-navy/70">{desc}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <PageMeta
        title="Industries We Serve | OPCIEAS"
        description="OPCIEAS serves 14+ industries including education, government, corporate, healthcare, hospitality, retail, and more with premium furniture solutions."
        keywords="industries, sectors, commercial furniture, education, government, healthcare, corporate"
      />
      <SectionBanner
        title="Industries We Serve"
        tagline="Trusted Across Every Sector"
        image={IMG.heroBg}
        crumb="Industries"
        crumbTo="/"
      />

      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <div className="container-x relative px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Comprehensive Coverage</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">
              All 14 Industries
            </h2>
            <p className="mt-4 font-body text-sm text-navy/70">
              From education and government to defence and export, OPCIEAS supplies premium furniture across every commercial sector.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industries.map((ind, i) => (
              <IndustryCard
                key={ind.name}
                icon={ind.icon}
                name={ind.name}
                stat={ind.stat}
                desc={ind.desc}
                img={ind.img}
                i={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
