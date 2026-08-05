
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function FurniturePage() {
  const services = [
    { title: 'Office Furniture', desc: 'Ergonomic desks, chairs, workstations' },
    { title: 'Educational Furniture', desc: 'Classroom chairs, tables, libraries' },
    { title: 'Hospital Furniture', desc: 'Medical beds, patient furniture, OT tables' },
    { title: 'Industrial Storage', desc: 'Warehouse racks, steel storage' },
  ];

  return (
    <>
      <PageMeta
        title="Furniture - OPCIEAS Pvt. Ltd."
        description="OPCIEAS delivers premium commercial furniture solutions for offices, education, healthcare and industrial facilities with 25+ years of manufacturing expertise."
        keywords="commercial furniture, office furniture, educational furniture, hospital furniture, industrial storage, custom furniture manufacturer"
      />
      <SectionBanner
        title="Furniture"
        tagline="Premium commercial furniture solutions"
        image={IMG.heroBg}
        crumb="Furniture"
        crumbTo="/"
      />
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-black text-navy">Overview</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">
                OPCIEAS is a leading manufacturer of premium commercial furniture, specializing in office, educational, hospital, and industrial furniture solutions. With 25+ years of experience, we deliver high-quality, durable furniture built for large-scale projects and bulk orders.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-black text-navy">Mission</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">
                To provide innovative, high-quality, and sustainable furniture solutions that enhance productivity, safety and well-being in workplaces, schools, hospitals, and industrial facilities.
              </p>
            </motion.div>
          </div>
          <div className="mt-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl font-black text-navy"
            >
              Our Services
            </motion.h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lux bg-navy/5 p-6"
                >
                  <h3 className="font-heading text-xl font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 font-body text-sm text-navy/60">{s.desc}</p>
                </motion.div>
              ))}
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
