import { motion } from 'framer-motion';
import { Building2, Cpu, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ENTREPRENEURIAL_CONCLUSION = `OPCIEAS Pvt. Ltd. is a professionally managed, multi-divisional enterprise committed to excellence across every domain we serve. Established with a vision to deliver dependable, value-driven solutions, OPCIEAS operates through three integrated divisions — Tech Business Promotion, Furniture & Textiles, and Social Services — each reinforcing the other with shared values of trust, quality, transparency, and sustainable prosperity. Every undertaking at OPCIEAS is anchored in compliance, accountability, and long-term relationships. Whether empowering businesses through our technology platforms, furnishing institutions with export-ready premium products, or uplifting communities through social initiatives, we bring the same disciplined approach, the same insistence on quality, and the same commitment to outcomes that stand the test of time. Our entrepreneurial philosophy is simple: build enduring value for every stakeholder through integrated operations, ethical governance, and a relentless focus on delivering real, measurable impact.`;

const divisions = [
  {
    icon: Cpu,
    name: 'Tech Business Promotion',
    tagline: 'Portal Governance • Industrial Promotion • Export Connectivity',
    narration:
      'Digital portals, governance frameworks, and industrial promotion platforms connecting manufacturers, buyers, and regulators.',
    accent: 'from-[#4A90E2] via-[#2563EB] to-[#1E40AF]',
    to: '/technology',
  },
  {
    icon: Building2,
    name: 'Furniture & Textiles',
    tagline: 'Institutional • FRP • Steel • Textiles • Bundled Solutions',
    narration:
      'Premium institutional furniture and bundled furnishing solutions — engineered for quality, certified for export.',
    accent: 'from-[#D4AF37] via-[#B8932B] to-[#8B6F1E]',
    to: '/furniture',
  },
  {
    icon: Heart,
    name: 'Social Services',
    tagline: 'Self Help • Village Development • Solar • Aquaculture • Fisheries',
    narration:
      'Community partnerships for rural development, solar adoption, aquaculture, and sustainable prosperity.',
    accent: 'from-[#34D399] via-[#059669] to-[#047857]',
    to: '/social-services',
  },
];

export default function HomepageIntro() {
  return (
    <section
      id="introduction"
      style={{ scrollMarginTop: '100px' }}
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute -top-24 right-10 h-80 w-80 rounded-full bg-gold/5 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-96 w-96 rounded-full bg-navy/5 blur-[130px] animate-float" />

      <div className="container-x relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sub text-xs uppercase tracking-[0.4em] text-gold"
          >
            OPCIEAS — Direct Manufacturer & Institutional Supply Partner
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 font-heading text-2xl font-black leading-tight text-navy sm:text-3xl"
          >
            Three Divisions. One Standard. Dependable Delivered.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-body text-sm leading-relaxed text-navy/70"
          >
            OPCIEAS operates through Tech Business Promotion, Furniture & Textiles, and Social Services — delivering excellence across every domain with shared values of trust, quality, and sustainable prosperity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Link to="/company/about" className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 font-sub text-xs font-semibold text-navy transition hover:bg-gold hover:text-navy">
              Learn More About OPCIEAS <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="group relative overflow-hidden rounded-lux border border-navy/10 bg-white p-6 luxury-shadow hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${d.accent}`} />
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${d.accent} text-white shadow-lg`}>
                  <d.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h4 className="font-heading text-base font-bold text-navy">{d.name}</h4>
                <p className="mt-1.5 font-sub text-[10px] uppercase tracking-[0.15em] text-gold">{d.tagline}</p>
                <p className="mt-3 font-body text-xs leading-relaxed text-navy/65">{d.narration}</p>
                <Link
                  to={d.to}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/5 px-3 py-1.5 font-sub text-[11px] font-semibold text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                >
                  Explore <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { ENTREPRENEURIAL_CONCLUSION, divisions as THREE_DIVISIONS };
