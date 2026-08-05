import { motion } from 'framer-motion';
import { Boxes, Flame, Sparkles, Wrench, Package, ShieldCheck, Factory } from 'lucide-react';

const steps = [
  { icon: Boxes, title: 'Raw Material Inspection', desc: 'Steel, wood & hardware verified against specification before production.' },
  { icon: Factory, title: 'Production Inspection', desc: 'In-process checks at every manufacturing stage.' },
  { icon: Flame, title: 'Welding Inspection', desc: 'Weld strength, penetration & finish verified per standard.' },
  { icon: Sparkles, title: 'Painting Inspection', desc: 'Coating thickness, adhesion & uniformity tested.' },
  { icon: Wrench, title: 'Assembly Inspection', desc: 'Dimensional accuracy & functional checks post-assembly.' },
  { icon: Package, title: 'Packaging Inspection', desc: 'Export-grade packaging verified for transit safety.' },
  { icon: ShieldCheck, title: 'Final QC', desc: 'Comprehensive final quality certification before dispatch.' },
];

export default function QualityControl() {
  return (
    <section id="quality" className="relative overflow-hidden bg-white py-32">
      <div className="container-x px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Quality Control</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Seven Stages of Inspection
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 font-body text-sm text-navy/60">
            Every product passes through a rigorous multi-stage quality control process before it reaches you.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-lux border border-navy/10 bg-navy/5 p-6 transition-all duration-500 hover:border-gold hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="font-heading text-xs text-gold-3">STAGE {String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-1 font-heading text-base font-bold text-navy">{s.title}</h3>
              <p className="mt-2 font-body text-xs text-navy/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
