import { motion } from 'framer-motion';
import { Package, Search, Boxes, Ship, Truck, Factory } from 'lucide-react';

const flow = [
  { icon: Factory, label: 'Bulk Export' },
  { icon: Search, label: 'Container Loading' },
  { icon: Package, label: 'International Supply' },
  { icon: Boxes, label: 'Institutional Export' },
  { icon: Ship, label: 'Government Export Projects' },
  { icon: Truck, label: 'Timely Delivery' },
];

const stats = [
  { label: 'Bulk Export Projects', value: '500+' },
  { label: 'Container Loading', value: '24/7' },
  { label: 'Institutional Supply', value: '100+' },
  { label: 'Government Export Projects', value: '50+' },
];

const regions = [
  { name: 'Middle East', x: '58%', y: '48%' },
  { name: 'Europe', x: '48%', y: '28%' },
  { name: 'Africa', x: '50%', y: '62%' },
  { name: 'South East Asia', x: '74%', y: '58%' },
  { name: 'North America', x: '20%', y: '30%' },
  { name: 'Australia', x: '82%', y: '78%' },
  { name: 'India', x: '66%', y: '48%' },
];

export default function Export() {
  return (
    <section id="export" className="relative overflow-hidden bg-dark py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Global Export</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Bulk Export, Container Loading & Institutional Supply
          </motion.h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* World map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[2/1] overflow-hidden rounded-lux glass-navy p-8"
          >
            {/* Stylized globe */}
            <div className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 animate-spin-slow" style={{ borderRadius: '50%' }} />
            <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 animate-spin-slow" style={{ borderRadius: '50%', animationDirection: 'reverse' }} />
            <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-2xl" />
            {/* Region pins */}
            {regions.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="absolute"
                style={{ left: r.x, top: r.y }}
              >
                <div className="relative">
                  <span className="absolute -inset-2 animate-glow rounded-full bg-gold/30" />
                  <span className="relative block h-3 w-3 rounded-full bg-gold" />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-sub text-[10px] text-white/70">{r.name}</span>
                </div>
              </motion.div>
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sub text-xs text-white/40">Animated Export Map</div>
          </motion.div>

          {/* Export flow + stats */}
          <div>
            <h3 className="mb-6 font-heading text-xl font-bold text-white">Export Process Flow</h3>
            <div className="space-y-3">
              {flow.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl glass p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold"><f.icon className="h-4 w-4" /></div>
                  <span className="font-sub text-sm text-white/80">{f.label}</span>
                  <span className="ml-auto font-heading text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-lux glass-navy p-5 text-center">
              <p className="font-heading text-2xl font-black gold-text">{s.value}</p>
              <p className="mt-1 font-sub text-xs text-white/50">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 grid gap-4 rounded-lux border border-white/10 bg-white/5 p-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Business Profile</p>
            <h3 className="mt-2 font-heading text-2xl font-black text-white">Manufacturer. Exporter. Tender Specialist.</h3>
            <p className="mt-3 font-body text-sm text-white/60">OPCIEAS is a certified manufacturer, supplier and exporter with deep experience in government tenders, institutional contracts and premium commercial furniture.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Manufacturer',
                'Supplier',
                'Dealer',
                'Trader',
                'Importer',
                'Exporter',
                'Government Tender Specialist',
                'Institutional Supplier',
                'Export Ready Manufacturer',
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-navy/10 px-3 py-1.5 text-[11px] text-white/70">{item}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid w-full gap-3">
              <a href="/contact" className="btn-gold flex items-center justify-center gap-2 rounded-full px-5 py-3 font-sub text-sm">Request Quote</a>
              <a href="https://wa.me/919845579049" target="_blank" rel="noreferrer" className="btn-ghost flex items-center justify-center gap-2 rounded-full px-5 py-3 font-sub text-sm">WhatsApp Inquiry</a>
              <a href="/products" className="btn-ghost flex items-center justify-center gap-2 rounded-full px-5 py-3 font-sub text-sm">Download Catalogue</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
