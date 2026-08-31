import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import About from '../components/About';
import QualityCommitment from '../components/QualityCommitment';
import { IMG } from '../lib/images';
import { ENTREPRENEURIAL_CONCLUSION } from '../components/HomepageIntro';

export default function CompanyAboutPage() {
  return (
    <>
      <PageMeta
        title="About OPCIEAS | Direct Manufacturer & Institutional Supply Partner"
        description="Learn about OPCIEAS, a professionally managed multi-divisional enterprise delivering premium commercial furniture, technology platforms, and social services with a commitment to excellence, quality, and sustainable prosperity."
        keywords="about OPCIEAS, company profile, direct manufacturer, institutional furniture, commercial quality"
      />
      <SectionBanner
        title="About OPCIEAS"
        tagline="Direct Manufacturer • Institutional Supply Partner • Premium Quality"
        image={IMG.heroBg}
        crumb="Company"
        crumbTo="/"
      />

      {/* Core About Section */}
      <About />

      {/* Entrepreneurial Conclusion */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />

        <div className="container-x relative z-10 px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lux border border-gold/30 bg-gradient-to-br from-gold/5 via-transparent to-navy/5 p-10 sm:p-14 luxury-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gold text-navy">
                  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Our Philosophy</p>
                  <h2 className="mt-2 font-heading text-2xl font-black text-navy sm:text-3xl">Entrepreneurial Conclusion</h2>
                  <p className="mt-5 font-body text-sm leading-[1.9] text-navy/85 sm:text-base sm:leading-[2]">
                    {ENTREPRENEURIAL_CONCLUSION}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <QualityCommitment />
    </>
  );
}
