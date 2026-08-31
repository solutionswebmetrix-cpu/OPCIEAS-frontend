import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import Manufacturing from '../components/Manufacturing';
import { IMG } from '../lib/images';

export default function ManufacturingPage() {
  return (
    <>
      <PageMeta
        title="Manufacturing Capabilities | OPCIEAS Direct Factory"
        description="Discover OPCIEAS manufacturing capabilities: in-house production, custom OEM solutions, and turnkey furniture supply for institutional and commercial markets."
        keywords="manufacturing, furniture factory, in-house production, OEM, custom manufacturing, industrial furniture"
      />
      <SectionBanner
        title="Manufacturing Capabilities"
        tagline="Direct Factory • In-House Production • Custom OEM Solutions"
        image={IMG.heroBg}
        crumb="Manufacturing"
        crumbTo="/"
      />

      <Manufacturing />

      {/* Detailed Manufacturing Process */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Our Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              From Design to Delivery
            </motion.h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Design & Engineering',
                description: 'CAD/BIM specs, technical drawings, material selection, cost optimization',
              },
              {
                step: '02',
                title: 'Material Sourcing',
                description: 'Premium quality raw materials, certified suppliers, compliance verification',
              },
              {
                step: '03',
                title: 'Manufacturing',
                description: 'Precision production, quality checks at every stage, real-time monitoring',
              },
              {
                step: '04',
                title: 'Final Inspection & Delivery',
                description: 'Multi-point inspection, packaging, documentation, on-time dispatch',
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

      {/* Capacity & Infrastructure */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-gold/10 blur-3xl animate-float" />
        <div className="container-x relative z-10 px-6">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Infrastructure
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Industrial Capacity & Expertise
            </motion.h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {[
              { label: 'Production Capacity', value: '10,000+ units/month' },
              { label: 'Factory Size', value: '45,000 sq ft' },
              { label: 'Skilled Workforce', value: '200+ workers' },
              { label: 'Quality Standards', value: 'ISO 9001:2015 certified' },
              { label: 'Delivery Timeline', value: '7-30 days (depending on order)' },
              { label: 'Global Markets', value: '20+ export countries' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lux border border-gold/20 bg-navy/5 p-8"
              >
                <p className="font-sub text-xs uppercase tracking-[0.2em] text-gold">{item.label}</p>
                <p className="mt-3 font-heading text-2xl font-black text-navy">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
