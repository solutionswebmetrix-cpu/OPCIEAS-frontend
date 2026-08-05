
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function TechnologyPage() {
  const services = [
    { title: 'IT Solutions', desc: 'Software development, IT infrastructure' },
    { title: 'Technology Consulting', desc: 'Digital transformation advisory' },
    { title: 'Business Promotion', desc: 'Marketing and growth solutions' },
    { title: 'Tech Support', desc: '24/7 technical assistance' },
  ];

  return (
    <>
      <PageMeta
        title="Technology Business Promotion - OPCIEAS Pvt. Ltd."
        description="OPCIEAS offers complementary technology and business promotion services that support client growth alongside premium manufacturing solutions."
        keywords="technology business promotion, business growth services, IT consulting, digital transformation, OPCIEAS technology"
      />
      <SectionBanner
        title="Technology Business Promotion"
        tagline="Innovative tech solutions for business growth"
        image={IMG.heroBg}
        crumb="Technology"
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
                OPCIEAS Technology Business Promotion division provides complementary IT solutions and growth services to help manufacturing, trading and institutional clients thrive in the digital age.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-black text-navy">Vision</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">
                To empower businesses with innovative technology solutions that drive growth, efficiency, and sustainability.
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
