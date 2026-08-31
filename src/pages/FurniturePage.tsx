
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function FurniturePage() {
  const categories = [
    { title: 'Educational & Classroom Desks', desc: 'Single-seat and dual-seat desk systems for kindergarten through higher secondary. Ergonomic, vibrant, and safety-focused designs for dynamic learning environments.' },
    { title: 'Kid\'s Safety Series', desc: 'Non-toxic fiberglass/metal hybrid construction with anti-skid floor caps, rounded profiles, and vibrant colors (Red, Blue, Yellow, Green) for child safety and appeal.' },
    { title: 'Office & Corporate Administrative Systems', desc: 'Executive desks, ergonomic mesh chairs, heavy-duty steel storage, and conference solutions with professional finishes for corporate workspaces.' },
    { title: 'Hostel & Institutional Solutions', desc: 'Heavy-duty steel cots, bunker beds, storage lockers, and dormitory furniture engineered for educational dormitories, hospitals, military camps, and government institutions.' },
    { title: 'Hostel Bedding & Accessories', desc: 'Rubberized coir and high-density foam mattresses, natural latex options, washable cushion pillows, and 100% cotton bedsheets (200-600 TC) in plain and satin stripe variants.' },
  ];

  const deliverables = [
    'Safety-Focused Design & Durability',
    'Educational & Institutional Excellence',
    'Complete Category Coverage',
  ];

  return (
    <>
      <PageMeta
        title="Furniture & Textiles - OPCIEAS Pvt. Ltd."
        description="OPCIEAS delivers premium institutional furniture, FRP furniture, steel furniture, textiles and bundled furnishing solutions built for quality and export readiness."
        keywords="commercial furniture, institutional furniture, FRP furniture, steel furniture, textiles, export ready furniture"
      />
      <SectionBanner
        title="Furniture Solutions"
        tagline="Educational • Kid's Safety • Office & Corporate • Hostel & Institutional • Bedding & Accessories"
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
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Furniture Categories</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Engineering Superior Furniture Solutions for Education, Workspaces, and High-Occupancy Institutional Environments</h2>
              <p className="mt-6 font-body text-sm leading-relaxed text-navy/70">
                OPCIEAS delivers comprehensive furniture solutions across five core categories: Educational & Classroom Desks, Kid's Safety Series, Office & Corporate Systems, Hostel & Institutional Solutions, and Hostel Bedding & Accessories. Every product is engineered for safety, comfort, durability, and institutional-grade performance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lux border border-navy/10 bg-white p-8 text-navy luxury-shadow"
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Key Deliverables</p>
              <div className="mt-6 space-y-3">
                {deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-navy/10 bg-navy/5 px-4 py-3 text-sm text-navy/90">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lux border border-navy/10 bg-navy/5 p-6"
              >
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
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
