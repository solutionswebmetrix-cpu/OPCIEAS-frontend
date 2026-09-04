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
import { useEffect, useState } from 'react';
import { getBusinessVerticalImages, type BusinessVerticalKey, findLocalProductImage } from '../lib/businessVerticalImages';
import { fetchFeaturedProducts, type Product } from '../lib/data';

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

function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void fetchFeaturedProducts().then((featured) => {
      setProducts(featured.filter((product) => product.slug && findLocalProductImage(product.name)));
    });
  }, []);

  const visibleProducts = products.slice(0, 4);
  if (visibleProducts.length === 0) return null;

  return (
    <section className="bg-white py-18 sm:py-24">
      <div className="container-x px-6">
        <div className="mb-8 text-center">
          <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Featured products</p>
          <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Product categories already in the catalogue</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {visibleProducts.map((product) => {
            const image = findLocalProductImage(product.name);
            if (!image) return null;
            return (
              <Link key={product.id} to={`/product/${product.slug}`} className="group overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-56 overflow-hidden rounded-t-lux bg-light-grey">
                  <img src={image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex min-h-40 flex-col p-5">
                  <h3 className="font-heading text-xl font-bold text-navy">{product.name}</h3>
                  {product.short_desc && <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-navy/70">{product.short_desc}</p>}
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-sub text-sm text-gold">View details <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
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

      {/* 2. SHORT OPCIEAS INTRODUCTION */}
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
                <li>• Institutional furniture and play equipment</li>
                <li>• Storage solutions and steel/rack systems</li>
                <li>• Special-order fiberglass and custom project requirements</li>
              </ul>
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

      <FeaturedProductsSection />

      <section className="bg-light-grey py-18 sm:py-24">
        <div className="container-x px-6">
          <div className="flex flex-col gap-6 rounded-lux border border-navy/10 bg-white p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Catalogue</p>
              <h3 className="mt-3 font-heading text-3xl font-black text-navy">Browse the official OPCIEAS product material</h3>
            </div>
            <Link to="/catalogue" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Open catalogue <ArrowRight className="h-4 w-4" /></Link>
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
