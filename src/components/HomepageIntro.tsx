import { motion } from 'framer-motion';
import { Building2, Cpu, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ENTREPRENEURIAL_CONCLUSION = `OPCIEAS Pvt. Ltd. is a professionally managed multi-division enterprise committed to quality, accountability and long-term value creation across furniture manufacturing, institutional supply, and social development initiatives. Since 1999, we have supported education, government, hospitality and commercial clients with durable, export-oriented products and dependable manufacturing partnerships.`;

const divisions = [
  {
    icon: Cpu,
    name: 'Tech Business Promotion',
    tagline: 'Portal Governance • Industrial Promotion • Export Connectivity',
    narration:
      'Digital platforms, governance frameworks, and industrial promotion pathways connecting manufacturers, buyers, and regulators.',
    accent: 'from-[#4A90E2] via-[#2563EB] to-[#1E40AF]',
    to: '/technology',
  },
  {
    icon: Building2,
    name: 'Furniture',
    tagline: 'Institutional • Commercial • Educational • Storage',
    narration:
      'Premium furniture solutions for schools, colleges, hostels, institutions and bulk commercial projects.',
    accent: 'from-[#D4AF37] via-[#B8932B] to-[#8B6F1E]',
    to: '/furniture',
  },
  {
    icon: Heart,
    name: 'Rural Development / Agriculture & Fisheries',
    tagline: 'Community Growth • Sustainability • Aquaculture',
    narration:
      'Community-led initiatives that strengthen rural livelihoods, agriculture, and social infrastructure.',
    accent: 'from-[#34D399] via-[#059669] to-[#047857]',
    to: '/social-service',
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
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sub text-xs uppercase tracking-[0.35em] text-gold"
          >
            OPCIEAS Pvt. Ltd.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 font-heading text-3xl font-black leading-tight text-navy sm:text-4xl"
          >
            Premium Commercial Furniture Manufacturer Since 1999
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-body text-base leading-relaxed text-navy/70"
          >
            Dedicated to educational, institutional and government furniture solutions with a strong export-ready manufacturing focus.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-4 font-sub text-xs uppercase tracking-[0.25em] text-gold"
          >
            Educational • Institutional • Government • Export
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Link to="/company/about" className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-xs font-semibold">
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
                className="group relative flex h-full flex-col overflow-hidden rounded-lux border border-navy/10 bg-white p-6 luxury-shadow transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${d.accent}`} />
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${d.accent} text-white shadow-lg`}>
                  <d.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-base font-bold text-navy">{d.name}</h3>
                <p className="mt-1.5 font-sub text-xs text-gold">{d.tagline}</p>
                <p className="mt-3 font-body text-xs leading-relaxed text-navy/65">{d.narration}</p>
                <Link
                  to={d.to}
                  className="btn-ghost mt-auto inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 font-sub text-xs font-semibold"
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
