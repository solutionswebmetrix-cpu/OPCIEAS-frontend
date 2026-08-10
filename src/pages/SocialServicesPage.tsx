
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { SOCIAL_EXACT_NARRATION } from '../components/ThreeDivisions';
import { IMG } from '../lib/images';

export default function SocialServicesPage() {
  const focusAreas = [
    'Self Help',
    'Village Development',
    'Solar Adoption',
    'Aquaculture',
    'Fisheries',
    'Elder Lifestyle',
    'Sustainable Prosperity',
  ];

  return (
    <>
      <PageMeta
        title="Social Services - OPCIEAS Pvt. Ltd."
        description="OPCIEAS Social Services division supports self help, village development, solar adoption, aquaculture, fisheries, elder lifestyle and sustainable prosperity."
        keywords="social services, self help, village development, solar adoption, aquaculture, fisheries, elder lifestyle, sustainable prosperity"
      />
      <SectionBanner
        title="Social Services"
        tagline="Self Help • Village Development • Solar Adoption • Aquaculture • Fisheries • Elder Lifestyle • Sustainable Prosperity"
        image={IMG.heroBg}
        crumb="Social Services"
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
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Exact Narration</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Community-led development with measurable social and environmental value</h2>
              <p className="mt-6 whitespace-pre-line font-body text-sm leading-relaxed text-navy/70">
                {SOCIAL_EXACT_NARRATION}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lux bg-navy p-8 text-white luxury-shadow"
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Highlighted Areas</p>
              <div className="mt-6 grid gap-3">
                {focusAreas.map((area) => (
                  <div key={area} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
                    {area}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lux border border-navy/10 bg-navy/5 p-8">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Community Impact</p>
              <h3 className="mt-3 font-heading text-2xl font-black text-navy">A development philosophy rooted in dignity, participation and sustainability</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/65">
                OPCIEAS brings the same discipline to social programming that it brings to governance and manufacturing — practical, accountable, and designed to strengthen livelihoods for generations to come.
              </p>
            </div>
            <img src={IMG.gallery[4]?.src || IMG.heroBg} alt="Community development and social service outreach" className="h-full min-h-[260px] w-full rounded-lux object-cover" loading="lazy" />
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
