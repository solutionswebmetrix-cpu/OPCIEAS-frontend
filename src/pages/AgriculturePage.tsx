
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function AgriculturePage() {
  const services = [
    { title: 'Agricultural Equipment', desc: 'Modern farming machinery' },
    { title: 'Fisheries Solutions', desc: 'Aquaculture and fisheries equipment' },
    { title: 'Agro Products', desc: 'Quality agricultural products' },
    { title: 'Sustainable Farming', desc: 'Eco-friendly farming practices' },
  ];

  return (
    <>
      <PageMeta
        title="Agriculture & Fisheries - OPCIEAS Pvt. Ltd."
        description="OPCIEAS provides sustainable agriculture and fisheries solutions to support rural development, agro productivity and aquaculture growth."
        keywords="agriculture solutions, fisheries equipment, sustainable farming, aquaculture services, OPCIEAS agro"
      />
      <SectionBanner
        title="Agriculture & Fisheries"
        tagline="Sustainable solutions for agriculture and fisheries"
        image={IMG.heroBg}
        crumb="Agriculture"
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
                OPCIEAS Agriculture & Fisheries division provides sustainable, high-quality solutions for farmers and fisheries, supporting food security, rural development and aquaculture growth.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-black text-navy">Mission</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">
                To support farmers and fisheries with innovative, sustainable, and affordable solutions that enhance productivity and livelihoods.
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
