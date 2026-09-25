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
import HomepageHostelSequence from '../components/HomepageHostelSequence';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBusinessVerticalImages, type BusinessVerticalKey } from '../lib/businessVerticalImages';

function BusinessVerticalImage({ title, category }: { title: string; category: BusinessVerticalKey }) {
  const images = getBusinessVerticalImages(category);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [images.length, paused]);

  return (
    <div
      className="relative h-52 overflow-hidden rounded-t-lux bg-light-grey"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`${title} ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
          {images.map((image, index) => (
            <span key={image} className={`h-1.5 w-1.5 rounded-full ${index === activeIndex ? 'bg-gold' : 'bg-white/75'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd. | Institutional Furniture & Business Promotion"
        description="OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd. delivers institutional furniture, educational products, storage systems, special-order fiberglass, and business promotion services."
        keywords="OPCIEAS, institutional furniture, educational furniture, storage solutions, fiberglass, KG furniture, writing pad chairs, stainless steel racks, corporate furniture"
      />
      {/* 1. HERO */}
      <Hero />

      {/* 2. HOSTEL FURNITURE STORY */}
      <HomepageHostelSequence />

      <nav
        aria-label="In-page homepage navigation"
        className="sticky top-[82px] z-40 border-y border-navy/10 bg-white/95 backdrop-blur lg:top-[92px]"
      >
        <div className="container-x mx-auto flex w-full items-center gap-2 overflow-x-auto px-6 py-2">
          <span className="mr-1 shrink-0 font-sub text-xs font-semibold text-navy/50">On this page</span>
          {[
            ['Tech Business Promotion', 'division-tech'],
            ['Furniture & Textiles', 'division-furniture'],
            ['Social Services', 'division-social'],
            ['Products', 'products'],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 rounded-full px-3 py-2 font-sub text-xs text-navy/70 transition hover:bg-gold/10 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* 3. SHORT OPCIEAS INTRODUCTION */}
      <HomepageIntro />

      <section className="bg-white py-18 sm:py-24">
        <div className="container-x px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">About OPCIEAS</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">A multi-division business focused on trusted institutional growth</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lux border border-navy/10 bg-light-grey p-6">
              <p className="font-body text-base leading-relaxed text-navy/75">
                OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd. operates across business promotion, institutional furniture, and social initiatives with a professional and compliance-first approach.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-navy/75">
                The company supports buyers, institutions, suppliers, and government-linked projects with durable furniture systems, high-use storage products, and custom manufacturing engagements.
              </p>
            </div>

            <div className="rounded-lux border border-gold/30 bg-gold/5 p-6">
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Core business focus</p>
              <ul className="mt-4 space-y-3 font-body text-sm text-navy/75">
                <li>• Educational furniture and classroom systems</li>
                <li>• Commercial furniture for institutions and bulk supply</li>
                <li>• Storage solutions and steel/rack systems</li>
                <li>• Special-order fiberglass and custom project requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-18 sm:py-24">
        <div className="container-x px-6">
          <div className="rounded-lux border border-navy/10 bg-light-grey p-8 shadow-sm lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Social Service / Social Impact</p>
                <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Heavenly Earth – A Vision for Rural Prosperity</h2>
                <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-navy/75">
                  Rural Development is rooted in self-reliance, unity, and responsible stewardship of land, water, education, and community life. The goal is to strengthen villages through shared effort, practical leadership, and a vision that protects the vulnerable while creating lasting dignity.
                </p>
              </div>
              <div className="flex justify-start">
                <Link to="/social-service" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
                  Explore Social Service <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-grey py-18 sm:py-24">
        <div className="container-x px-6">
          <div className="mb-8 text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Business verticals</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Structured product and business categories</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: 'Educational Furniture', text: 'Classroom, learning, and school furniture systems.', category: 'educational' as const, link: '/products/vertical/educational-furniture' },
              { title: 'Institutional Furniture', text: 'Workstations, chairs, tables, and institutional setups.', category: 'institutional' as const, link: '/products/vertical/institutional-furniture' },
              { title: 'Storage Solutions', text: 'Steel racks, lockers, cabinets, and warehouse systems.', category: 'storage' as const, link: '/products/vertical/storage-solutions' },
              { title: 'Fiberglass / Special Order', text: 'Custom fiberglass and project-specific manufacturing.', category: 'fiberglass' as const, link: '/products/vertical/fiberglass-special-order' },
            ].map((item) => (
              <Link key={item.title} to={item.link} className="group overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <BusinessVerticalImage title={item.title} category={item.category} />
                <div className="flex min-h-40 flex-col p-6">
                  <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">{item.text}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-2 font-sub text-sm text-gold">Explore category <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-grey py-18 sm:py-24">
        <div className="container-x px-6">
          <div className="flex flex-col gap-6 rounded-lux border border-navy/10 bg-white p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Catalogue</p>
              <h3 className="mt-3 font-heading text-3xl font-black text-navy">Browse the official OPCIEAS product material</h3>
            </div>
            <Link to="/catalogue" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Request Full Catalogue <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

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

      <section className="bg-white py-18 sm:py-24">
        <div className="container-x px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">International Buyer / Export Supply</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Global procurement support with clearly defined export workflows</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-navy/75">
              OPCIEAS supports international bulk procurement through documented product information, export-ready communication, and procurement coordination. Where final details require client confirmation, the information is clearly marked as pending approval rather than assumed.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: 'Export Supply', text: 'Bulk furniture supply coordination for institutional and commercial projects with product-specific approval steps.' },
              { title: 'Countries Served', text: 'Countries served — to be finalized by OPCIEAS based on active export project records and buyer approval.' },
              { title: 'Compliance Standards', text: 'Product documentation, manufacturing records, and export readiness reviewed case by case with client approval.' },
              { title: 'Lead Times & Logistics', text: 'Lead times and logistics support are confirmed per order, shipment scope, and destination requirements.' },
            ].map((item) => (
              <div key={item.title} className="rounded-lux border border-navy/10 bg-light-grey p-6 shadow-sm">
                <p className="font-sub text-xs uppercase tracking-[0.22em] text-gold">{item.title}</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-navy/75">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-lux border border-gold/30 bg-gold/5 p-8 text-center">
            <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Request Information</p>
            <h3 className="font-heading text-2xl font-black text-navy">Request International Bulk Supply Information</h3>
            <Link to="/rfq" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Request Export Information <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

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
              <Link to="/membership" className="btn-ghost flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm">
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
