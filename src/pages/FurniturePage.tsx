
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function FurniturePage() {
  const focusAreas = [
    { title: 'Institutional Furniture', desc: 'Premium desks, benches, seating, storage and interiors for offices, schools, hospitals, hostels and public buildings.' },
    { title: 'FRP Furniture', desc: 'Corrosion-resistant and weather-ready furniture developed for humid, coastal and outdoor environments.' },
    { title: 'Steel Furniture', desc: 'Heavy-duty racks, cabinets, lockers and workstations engineered for long service life and tough use.' },
    { title: 'Textiles', desc: 'Integrated furnishing textiles, upholstery and soft interior solutions for complete project delivery.' },
  ];

  const deliverables = [
    'Bundled Furnishing Solutions',
    'Eliminating Substandard Products',
    'Export Ready Products',
  ];

  return (
    <>
      <PageMeta
        title="Furniture & Textiles - OPCIEAS Pvt. Ltd."
        description="OPCIEAS delivers premium institutional furniture, FRP furniture, steel furniture, textiles and bundled furnishing solutions built for quality and export readiness."
        keywords="commercial furniture, institutional furniture, FRP furniture, steel furniture, textiles, export ready furniture"
      />
      <SectionBanner
        title="Furniture & Textiles"
        tagline="Institutional Furniture • FRP • Steel • Textiles • Bundled Furnishing Solutions • Export Ready"
        image={IMG.heroBg}
        crumb="Furniture"
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
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Narration</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Premium furnishing systems for institutions, exporters and project-led buyers</h2>
              <p className="mt-6 font-body text-sm leading-relaxed text-navy/70">
                OPCIEAS Furniture & Textiles division is a premium manufacturing force built on institutional-grade quality, certified materials and turnkey delivery. We serve demanding environments with Institutional Furniture, FRP Furniture, Steel Furniture, Textiles and Bundled Furnishing Solutions that eliminate substandard products and remain export-ready for complex global projects.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lux bg-navy p-8 text-white luxury-shadow"
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Key Deliverables</p>
              <div className="mt-6 space-y-3">
                {deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {focusAreas.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lux border border-navy/10 bg-navy/5 p-6"
              >
                <h3 className="font-heading text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-navy/65">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6 md:grid-cols-2">
              <img src={IMG.products['Office Furniture'].img} alt="Office furniture by OPCIEAS" className="h-full min-h-[240px] w-full rounded-lux object-cover" loading="lazy" />
              <img src={IMG.products['Industrial Storage'].img} alt="Industrial storage furniture by OPCIEAS" className="h-full min-h-[240px] w-full rounded-lux object-cover" loading="lazy" />
            </div>
            <div className="rounded-lux border border-navy/10 bg-white p-8 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Featured Category</p>
              <h3 className="mt-3 font-heading text-2xl font-black text-navy">Built for institutional scale and export compliance</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/65">
                Every product is designed to support large projects, strict tender specifications and long-distance logistics without compromising finish, durability or compliance.
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link to="/products" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              <FileText className="h-4 w-4" /> Request Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
