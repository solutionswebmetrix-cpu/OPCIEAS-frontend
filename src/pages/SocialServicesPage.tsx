
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function SocialServicesPage() {
  const services = [
    { title: 'Community Development', desc: 'Grassroots community initiatives' },
    { title: 'Education Support', desc: 'Scholarships and educational programs' },
    { title: 'Healthcare Outreach', desc: 'Medical camps and health services' },
    { title: 'Environmental Initiatives', desc: 'Go green and sustainability projects' },
  ];

  return (
    <>
      <PageMeta
        title="Social Services - OPCIEAS Pvt. Ltd."
        description="OPCIEAS social services and CSR initiatives support community development, education, healthcare outreach and sustainability programs."
        keywords="social services, CSR initiatives, community development, education support, healthcare outreach, sustainability"
      />
      <SectionBanner
        title="Social Services"
        tagline="Giving back to the community"
        image={IMG.heroBg}
        crumb="Social Services"
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
                OPCIEAS Social Services division is committed to making a positive impact through various CSR initiatives, focusing on community development, education, healthcare, and environmental sustainability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-black text-navy">Vision</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">
                To create a sustainable and inclusive society through meaningful social initiatives that empower communities and protect the environment.
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
