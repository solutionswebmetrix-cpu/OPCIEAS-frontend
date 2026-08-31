import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import GovernmentTender from '../components/GovernmentTender';
import { IMG } from '../lib/images';

export default function GovernmentTendersPage() {
  return (
    <>
      <PageMeta
        title="Government Tenders & Institutional Supply | OPCIEAS"
        description="OPCIEAS government tender services: 100+ completed tenders, end-to-end tender documentation, compliance, and institutional furniture supply."
        keywords="government tenders, institutional supply, tender documentation, government procurement, compliance"
      />
      <SectionBanner
        title="Government Tenders"
        tagline="Tender-Ready • Compliance Certified • Institutional Supply"
        image={IMG.heroBg}
        crumb="Government Tenders"
        crumbTo="/"
      />

      <GovernmentTender />

      {/* Tender Process */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Process Overview
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Our Tender Process
            </motion.h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Tender Analysis',
                description: 'Specification review, compliance check, cost estimation, technical feasibility',
              },
              {
                step: '02',
                title: 'Documentation',
                description: 'EOI preparation, technical specs, quality certifications, financial documentation',
              },
              {
                step: '03',
                title: 'Bid Submission',
                description: 'Complete tender documentation, pricing, delivery schedule, warranty terms',
              },
              {
                step: '04',
                title: 'Award & Execution',
                description: 'Order confirmation, production planning, delivery management, final inspection',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lux border border-navy/10 bg-gradient-to-br from-navy/5 to-gold/5 p-8 luxury-shadow"
              >
                <div className="text-5xl font-black text-gold/30">{item.step}</div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-navy/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
