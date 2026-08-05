import { motion } from 'framer-motion';
import { FileText, Boxes, PenTool, Building2, School, GraduationCap, HeartPulse, Building, TrainFront, Cpu, Layers, Factory } from 'lucide-react';

const services = [
  { icon: Boxes, title: 'Bulk Supply', desc: 'High-volume furniture supply for large contracts & institutions.' },
  { icon: Factory, title: 'OEM Manufacturing', desc: 'Original equipment manufacturing for global brands.' },
  { icon: Layers, title: 'ODM', desc: 'Original design manufacturing with custom engineering.' },
  { icon: FileText, title: 'Tender Documentation', desc: 'Complete tender participation & documentation support.' },
  { icon: School, title: 'School Projects', desc: 'Furniture for schools, colleges & universities.' },
  { icon: GraduationCap, title: 'University Projects', desc: 'Campus-wide furniture programs & installations.' },
  { icon: HeartPulse, title: 'Hospital Projects', desc: 'Medical-grade furniture for hospitals & clinics.' },
  { icon: Building2, title: 'Government Offices', desc: 'Furniture for government & PSU offices.' },
  { icon: Building, title: 'PSU Projects', desc: 'Public sector undertaking furniture supply.' },
  { icon: TrainFront, title: 'Railways', desc: 'Railway station & coach furniture solutions.' },
  { icon: Cpu, title: 'Smart City', desc: 'Smart city infrastructure & public furniture.' },
  { icon: PenTool, title: 'Metro', desc: 'Metro station seating & infrastructure furniture.' },
];

export default function GovernmentTender() {
  return (
    <section id="tender" className="relative overflow-hidden bg-navy py-32">
      <div className="absolute inset-0 blueprint-bg opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[140px]" />

      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Government Tender</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Trusted Government Tender Furniture Manufacturer
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 font-body text-sm text-white/60">
            Approved supplier with the capacity, certifications and compliance to deliver government, PSU and institutional furniture tenders at scale.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-lux glass-navy p-6 transition-all duration-500 hover:border-gold/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">{s.title}</h3>
              <p className="mt-2 font-body text-xs text-white/60">{s.desc}</p>
              <div className="absolute inset-0 rounded-lux opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.1), transparent 70%)' }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a href="/rfq" className="btn-gold rounded-full px-6 py-3 font-sub text-sm">Submit Tender Inquiry</a>
          <a href="/products" className="btn-ghost rounded-full px-6 py-3 font-sub text-sm">Download Tender Catalogue</a>
        </motion.div>
      </div>
    </section>
  );
}
