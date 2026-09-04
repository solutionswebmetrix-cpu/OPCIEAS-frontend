import { motion } from 'framer-motion';
import { ArrowRight, Building2, FileText, ShieldCheck, Ship, Sofa, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

const pillars = [
  { icon: Building2, title: 'Educational Furniture', desc: 'Classroom, library and learning space products built for daily institutional use.' },
  { icon: Sofa, title: 'Institutional Furniture', desc: 'Office, hospital, hostel and public-sector solutions designed for durability and scale.' },
  { icon: Warehouse, title: 'Institutional Play Equipment', desc: 'Outdoor and play space products engineered for safety, resilience and child-friendly use.' },
  { icon: FileText, title: 'Textiles', desc: 'Upholstery, furnishing fabrics, curtains and soft furnishings for complete interiors.' },
  { icon: ShieldCheck, title: 'Storage Solutions', desc: 'Heavy-duty metal and steel systems for institutions, warehouses and campuses.' },
  { icon: Ship, title: 'Special Order Fiberglass', desc: 'Corrosion-resistant, weather-ready applications for challenging environments.' },
  { icon: Warehouse, title: 'Steel Furniture', desc: 'Powder-coated, precision-fabricated components and storage products.' },
  { icon: Building2, title: 'FRP Furniture', desc: 'Long-life solutions for humid, high-exposure and outdoor spaces.' },
  { icon: Sofa, title: 'Writing Pad Chairs', desc: 'Ergonomic chair solutions ideal for classrooms, training rooms and institutional spaces.' },
  { icon: Ship, title: 'Export Ready Products', desc: 'Products prepared for longer logistics cycles and international procurement needs.' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Multi-point checks, documentation and controlled manufacturing procedures.' },
  { icon: FileText, title: 'Eliminating Substandard Products', desc: 'A disciplined materials and finish policy designed to remove weak supply chains.' },
];

export default function FurnitureTextilesPage() {
  return (
    <>
      <PageMeta
        title="Furniture & Textiles | OPCIEAS"
        description="OPCIEAS Furniture & Textiles features educational furniture, institutional furniture, play equipment, textiles, steel furniture, FRP solutions and export-ready quality products."
        keywords="furniture and textiles, educational furniture, institutional furniture, institutional play equipment, textiles, storage solutions, FRP furniture, steel furniture"
      />
      <SectionBanner
        title="Furniture & Textiles"
        tagline="Educational Furniture • Institutional Furniture • Institutional Play Equipment • Textiles • Storage Solutions • Special Order Fiberglass • Steel Furniture • FRP Furniture • Writing Pad Chairs • Export Ready Products • Quality Assurance"
        image={IMG.heroBg}
        crumb="Furniture & Textiles"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Overview</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Institutional-grade furniture and textile solutions for high-use environments</h2>
              <p className="mt-6 font-body text-base leading-relaxed text-navy/70">
                OPCIEAS Furniture & Textiles division combines manufacturing discipline with institutional understanding. We serve schools, campuses, hostels, offices, healthcare spaces and public projects with purpose-built, durable and compliant solutions.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-lux border border-navy/10 bg-navy/5 p-8 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Highlights</p>
              <ul className="mt-6 space-y-3 text-sm text-navy/75">
                <li>• Educational and institutional seating systems</li>
                <li>• Heavy-duty storage and steel furniture</li>
                <li>• FRP and specialized fiberglass applications</li>
                <li>• Export ready and bulk supply capability</li>
                <li>• Quality assurance at every stage</li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pillars.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm"
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
            <Link to="/products" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
