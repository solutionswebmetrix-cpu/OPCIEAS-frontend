import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import QualityControl from '../components/QualityControl';
import Certificates from '../components/Certificates';
import { IMG } from '../lib/images';

export default function QualityPage() {
  return (
    <>
      <PageMeta
        title="Quality Assurance & Certifications | OPCIEAS"
        description="OPCIEAS quality assurance process: 7-stage inspection, ISO certifications, and compliance standards ensuring premium commercial furniture."
        keywords="quality control, quality assurance, certifications, ISO 9001, inspection process"
      />
      <SectionBanner
        title="Quality & Certifications"
        tagline="Premium Quality • 7-Stage Inspection • ISO 9001:2015 Certified"
        image={IMG.heroBg}
        crumb="Quality"
        crumbTo="/"
      />

      {/* Quality Control */}
      <QualityControl />

      {/* Seven-Stage Quality Process */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div className="container-x relative z-10 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Our Standards
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Seven-Stage Quality Inspection
            </motion.h2>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: '1',
                title: 'Raw Material Inspection',
                description: 'Certification verification, dimensional checks, quality grading before production entry',
              },
              {
                stage: '2',
                title: 'Pre-Production Audit',
                description: 'Design spec review, sample approval, production sequence verification',
              },
              {
                stage: '3',
                title: 'In-Process Quality',
                description: 'Real-time monitoring, workmanship checks, progressive inspections during manufacturing',
              },
              {
                stage: '4',
                title: 'Component Testing',
                description: 'Load-bearing tests, finish durability, mechanical function verification',
              },
              {
                stage: '5',
                title: 'Final Assembly Check',
                description: 'Complete unit inspection, dimensional accuracy, alignment and finish validation',
              },
              {
                stage: '6',
                title: 'Packaging Inspection',
                description: 'Protective materials, documentation completeness, shipping readiness confirmation',
              },
              {
                stage: '7',
                title: 'Dispatch Verification',
                description: 'Final checklist, delivery documentation, on-time shipment tracking initiation',
              },
            ].map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-lux border border-gold/20 bg-navy/5 p-6 transition-all duration-500 hover:bg-gold/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 text-gold text-lg font-bold">
                    {item.stage}
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 font-body text-sm text-navy/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Standards */}
      <Certificates />
    </>
  );
}
