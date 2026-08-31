import PageMeta from '../components/PageMeta';
import Hero from '../components/Hero';
import HomepageIntro from '../components/HomepageIntro';
import ThreeDivisions from '../components/ThreeDivisions';
import WhyChooseUs from '../components/WhyChooseUs';
import Manufacturing from '../components/Manufacturing';
import Products from '../components/Products';
import Industries from '../components/Industries';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="OPCIEAS | Direct Manufacturing & Institutional Furniture Solutions"
        description="OPCIEAS is a direct manufacturer of premium commercial furniture for educational institutions, government, corporate, and hospitality sectors. Heavy-duty, custom manufacturing with export-ready quality."
        keywords="commercial furniture manufacturer, educational furniture, institutional furniture, custom manufacturing, export furniture, government furniture, direct manufacturer"
      />
      {/* 1. HERO */}
      <Hero />

      {/* 2. SHORT OPCIEAS INTRODUCTION */}
      <HomepageIntro />

      {/* 3. THREE BUSINESS DIVISIONS */}
      <ThreeDivisions />

      {/* 4. DIRECT MANUFACTURING */}
      <Manufacturing />

      {/* 5. PRODUCT CATEGORIES */}
      <Products />

      {/* 6. WHY OPCIEAS */}
      <WhyChooseUs />

      {/* 7. INDUSTRIES WE SERVE */}
      <Industries />

      {/* 8. TRUSTED BY / CLIENTS */}
      <Clients />

      {/* 9. TESTIMONIALS (compact - only 2-3) */}
      <Testimonials />

      {/* 10. FINAL B2B CTA */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-navy-3/40 blur-[120px] animate-float" />
        </div>

        <div className="container-x relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
              Have an Institutional Project?
            </h2>
            <p className="mt-4 font-body text-lg text-navy/85">
              Tell us your requirement and request a customized B2B quotation. We deliver on time, every time.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/rfq" className="btn-gold flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm">
                Request Bulk Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm">
                <FileText className="h-4 w-4" /> Request Custom Manufacturing
              </Link>
              <Link to="/contact" className="btn-ghost flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
