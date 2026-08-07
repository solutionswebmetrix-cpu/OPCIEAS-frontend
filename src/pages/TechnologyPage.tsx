
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function TechnologyPage() {
  const pillars = [
    'Portal Governance',
    'Industrial Promotion',
    'Transparency',
    'Trust',
    'Compliance',
    'Business Networking',
    'Export Promotion',
    'Quality Standards',
  ];

  const offerings = [
    { title: 'Governance-led digital platforms', desc: 'Rule-based portals, documented workflows, and accountable approval systems for institutions and enterprises.' },
    { title: 'Industrial promotion ecosystems', desc: 'Verified buyer-seller connections, procurement visibility, and export-ready business promotion channels.' },
    { title: 'Compliance-first operations', desc: 'MCA aligned governance, statutory adherence, and transparent reporting standards.' },
  ];

  return (
    <>
      <PageMeta
        title="Technology Business Promotion - OPCIEAS Pvt. Ltd."
        description="OPCIEAS offers dedicated tech business promotion services with portal governance, industrial promotion, transparency, trust, compliance, networking, export promotion and quality standards."
        keywords="technology business promotion, portal governance, industrial promotion, export promotion, compliance, OPCIEAS technology"
      />
      <SectionBanner
        title="Tech Business Promotion"
        tagline="Portal Governance • Industrial Promotion • Transparency • Trust • Compliance • Business Networking • Export Promotion • Quality Standards"
        image={IMG.heroBg}
        crumb="Technology"
        crumbTo="/"
      />
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Introduction</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">A professional bridge between governance, industry and global opportunity</h2>
              <p className="mt-6 font-body text-sm leading-relaxed text-navy/70">
                OPCIEAS Tech Business Promotion division builds the connective tissue between industry, governance and markets. We create trusted digital platforms and institutional frameworks that support portal governance, industrial promotion, transparency, trust, compliance, business networking, export promotion and quality standards — all within a disciplined corporate structure.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lux bg-navy p-8 text-white luxury-shadow"
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Core Focus Areas</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {pillars.map((pillar) => (
                  <div key={pillar} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {pillar}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lux border border-navy/10 bg-navy/5 p-8">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Products & Offerings</p>
              <div className="mt-6 space-y-5">
                {offerings.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                    <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-navy/65">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <img src={IMG.gallery[0]?.src || IMG.heroBg} alt="Technology promotion infrastructure" className="h-full min-h-[220px] w-full rounded-lux object-cover" loading="lazy" />
              <img src={IMG.gallery[1]?.src || IMG.heroBg} alt="Business promotion dashboard and portal" className="h-full min-h-[220px] w-full rounded-lux object-cover" loading="lazy" />
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link to="/company/contact" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              <FileText className="h-4 w-4" /> Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
