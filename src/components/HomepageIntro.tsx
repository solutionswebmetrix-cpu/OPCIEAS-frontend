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
      'Our technology division enables transparent business ecosystems through digital portals, governance frameworks, and industrial promotion platforms. We connect manufacturers, buyers, and regulators with trust, compliance, and quality at every touchpoint.',
    accent: 'from-[#4A90E2] via-[#2563EB] to-[#1E40AF]',
    to: '/technology',
  },
  {
    icon: Building2,
    name: 'Furniture & Textiles',
    tagline: 'Institutional • FRP • Steel • Textiles • Bundled Solutions',
    narration:
      'Our manufacturing division delivers premium institutional furniture, FRP products, steel furniture and bundled furnishing textiles — engineered to eliminate substandard products, certified for quality, and fully export-ready for global markets.',
    accent: 'from-[#D4AF37] via-[#B8932B] to-[#8B6F1E]',
    to: '/furniture',
  },
  {
    icon: Heart,
    name: 'Social Services',
    tagline: 'Self Help • Village Development • Solar • Aquaculture • Fisheries',
    narration:
      'Our social services division partners with communities for rural development, solar adoption, aquaculture, fisheries, self-help groups and elder lifestyle programs — advancing sustainable prosperity and dignified living for every beneficiary.',
    accent: 'from-[#34D399] via-[#059669] to-[#047857]',
    to: '/social-services',
  },
];

export default function HomepageIntro() {
  return (
    <section
      id="introduction"
      style={{ scrollMarginTop: '100px' }}
      className="relative overflow-hidden bg-white py-28"
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sub text-xs uppercase tracking-[0.4em] text-gold"
          >
            Introducing OPCIEAS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 font-heading text-3xl font-black leading-tight text-navy sm:text-4xl xl:text-5xl"
          >
            OPCIEAS operates through{' '}
            <span className="gold-text">three integrated divisions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 font-body text-sm leading-relaxed text-navy/65 sm:text-base"
          >
            Tech Business Promotion, Furniture & Textiles, and Social Services work together to deliver trusted governance, premium products, and sustainable community impact.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-gold via-gold-2 to-gold origin-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mt-16 max-w-6xl"
        >
          <div className="rounded-lux border border-gold/30 bg-gradient-to-br from-gold/5 via-white to-navy/5 p-10 sm:p-14 luxury-shadow">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Entrepreneurial Conclusion</p>
                <p className="mt-3 font-body text-[15px] leading-[1.9] text-navy/80 sm:text-base sm:leading-[2]">
                  {ENTREPRENEURIAL_CONCLUSION}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/opcieas-presentation.html" className="rounded-full border border-navy/10 bg-white px-4 py-2 font-sub text-xs font-semibold text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy">
                    View Presentation
                  </Link>
                  <Link to="/opcieas-catalogue.html" className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 font-sub text-xs font-semibold text-navy transition-all duration-300 hover:bg-gold hover:text-navy">
                    Open Catalogue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Our Structure</p>
            <h3 className="mt-4 font-heading text-2xl font-black text-navy sm:text-3xl">
              Three Divisions. One Company. One Standard.
            </h3>
            <p className="mt-3 font-body text-sm text-navy/60">
              Every division shares one quality benchmark, one compliance culture, and one commitment to lasting value.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="group relative overflow-hidden rounded-lux border border-navy/10 bg-white p-8 luxury-shadow hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${d.accent}`} />
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${d.accent} text-white shadow-lg`}>
                  <d.icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h4 className="font-heading text-xl font-black text-navy">{d.name}</h4>
                <p className="mt-2 font-sub text-xs uppercase tracking-[0.18em] text-gold">{d.tagline}</p>
                <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">{d.narration}</p>
                <Link
                  to={d.to}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/5 px-4 py-2 font-sub text-xs font-semibold text-navy transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                >
                  Explore Division <ArrowRight className="h-3.5 w-3.5" />
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
