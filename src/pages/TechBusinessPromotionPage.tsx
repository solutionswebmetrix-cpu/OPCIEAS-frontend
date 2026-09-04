import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, Factory, Globe2, Network, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

const pillars = [
  { icon: ShieldCheck, title: 'Portal Governance', desc: 'Structured, rule-based digital systems with accountability and transparent workflows.' },
  { icon: Factory, title: 'Industrial Promotion', desc: 'Verified promotion of manufacturing capacity, supplier capability and buyer pathways.' },
  { icon: CheckCircle2, title: 'Transparency', desc: 'Clear processes and documented approvals across stakeholder touchpoints.' },
  { icon: Sparkles, title: 'Trust', desc: 'Reliable engagement built on verified identities, compliance and delivery discipline.' },
  { icon: Building2, title: 'Compliance', desc: 'Alignment with governance norms, documentation standards and business integrity.' },
  { icon: Network, title: 'Business Networking', desc: 'Connections between buyers, sellers, institutions and strategic partners.' },
  { icon: Globe2, title: 'Export Promotion', desc: 'Global growth channels with export-ready documentation and buyer outreach.' },
  { icon: CheckCircle2, title: 'Quality Standards', desc: 'Benchmarking through ISO, BIS, NSIC and industry quality expectations.' },
];

export default function TechBusinessPromotionPage() {
  return (
    <>
      <PageMeta
        title="Tech Business Promotion | OPCIEAS"
        description="OPCIEAS Tech Business Promotion connects governance, industrial promotion, transparency, trust, compliance, business networking, export promotion and quality standards."
        keywords="tech business promotion, portal governance, industrial promotion, transparency, trust, compliance, export promotion, quality standards"
      />
      <SectionBanner
        title="Tech Business Promotion"
        tagline="Portal Governance • Industrial Promotion • Transparency • Trust • Compliance • Business Networking • Export Promotion • Quality Standards"
        image={IMG.heroBg}
        crumb="Tech Business Promotion"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Introduction</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">A professional bridge between industry, governance and opportunity</h2>
              <p className="mt-6 font-body text-base leading-relaxed text-navy/70">
                OPCIEAS Tech Business Promotion division builds the connective tissue between industry, governance and markets. We engineer digital systems and institutional frameworks around Portal Governance, Industrial Promotion, Transparency, Trust, Compliance and Business Networking.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-navy/70">
                The model is designed to strengthen participation, build supplier confidence and support export-ready growth with a clear quality-first and governance-led approach.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-lux border border-navy/10 bg-white p-8 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Core Focus</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {pillars.map(({ title }) => (
                  <div key={title} className="rounded-2xl border border-navy/10 bg-navy/5 px-4 py-3 text-sm font-medium text-navy/80">
                    {title}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lux border border-navy/10 bg-light-grey p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
