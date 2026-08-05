import { motion } from 'framer-motion';
import { ShieldCheck, Award, BadgeCheck, FileCheck, Globe, Gem } from 'lucide-react';

const certs = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System certification for manufacturing excellence.', icon: ShieldCheck },
  { name: 'NSIC', desc: 'National Small Industries Corporation registration for government supplies.', icon: Award },
  { name: 'MSME UDYAM', desc: 'Official MSME registration for manufacturing enterprises.', icon: FileCheck },
  { name: 'Trademark Registration', desc: 'Registered OPCIEAS brand identity for commercial products.', icon: Gem },
  { name: 'IEC', desc: 'Import Export Code for global export operations.', icon: Globe },
  { name: 'Government Approvals', desc: 'Approved supplier for government and institutional procurement.', icon: BadgeCheck },
];

export default function Certificates() {
  return (
    <section id="certificates" className="relative overflow-hidden bg-navy py-32">
      <div className="absolute inset-0 blueprint-bg opacity-20" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Certifications</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Certified. Verified. Trusted.
          </motion.h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ rotate: -1.5, y: -6 }}
              className="group relative overflow-hidden rounded-lux glass-navy p-8 text-center transition-all duration-500 hover:glow-gold"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
                <c.icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">{c.name}</h3>
              <p className="mt-1 font-body text-xs text-white/60">{c.desc}</p>
              <div className="mt-4 flex justify-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <button className="rounded-full border border-gold/40 px-3 py-1 font-sub text-[10px] text-gold hover:bg-gold hover:text-navy">View PDF</button>
                <button className="rounded-full border border-white/20 px-3 py-1 font-sub text-[10px] text-white/70 hover:text-white">Verify</button>
              </div>
              <div className="absolute inset-0 rounded-lux opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12), transparent 70%)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
