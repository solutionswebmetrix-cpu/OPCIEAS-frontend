import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PenTool, Layers, Scissors, Boxes, Flame, Sparkles, Wrench, Search, Package, Truck } from 'lucide-react';
import { IMG } from '../lib/images';

const steps = [
  { icon: PenTool, label: 'Design' },
  { icon: Layers, label: 'Material Selection' },
  { icon: Scissors, label: 'Laser Cutting' },
  { icon: Boxes, label: 'Fabrication' },
  { icon: Flame, label: 'Welding' },
  { icon: Sparkles, label: 'Powder Coating' },
  { icon: Wrench, label: 'Assembly' },
  { icon: Search, label: 'Inspection' },
  { icon: Package, label: 'Packaging' },
  { icon: Truck, label: 'Dispatch' },
];

const overviewPillars = [
  { value: '500+', label: 'MOQ' },
  { value: 'Custom', label: 'Dimensions' },
  { value: 'Bulk', label: 'Production' },
  { value: 'Inspection', label: 'Controlled' },
  { value: 'Export', label: 'Ready' },
  { value: 'Project', label: 'Supply' },
];

export default function Manufacturing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="manufacturing" ref={ref} style={{ scrollMarginTop: '100px' }} className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={IMG.manufacturingBg}
          alt="OPCIEAS factory manufacturing floor"
          className="h-full w-full object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      </div>
      <div className="pointer-events-none absolute inset-0 blueprint-bg opacity-10" />

      <div className="container-x relative px-6">
        <div className="mx-auto mb-8 lg:mb-10 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Direct Manufacturing</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Product-led manufacturing built for institutional and export supply.
          </motion.h2>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-8 lg:items-start">
          <div className="relative overflow-hidden rounded-lux border border-navy/10 shadow-sm">
            <img
              src={IMG.manufacturingBg}
              alt="OPCIEAS manufacturing floor – direct factory production"
              className="h-full w-full object-cover aspect-[4/3]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div className="rounded-full bg-white/90 px-3 py-1 font-sub text-[10px] uppercase tracking-[0.22em] text-navy">
                In-House Production
              </div>
              <div className="rounded-full bg-gold px-3 py-1 font-sub text-[10px] uppercase tracking-[0.22em] text-navy">
                Since 1999
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:mt-0 lg:grid-cols-1">
            {[
              {
                title: '01 Design / Specification',
                content: 'Product planning, sizing and project requirements are reviewed to match the buyer’s intended application, quantity and institutional usage.'
              },
              {
                title: '02 Material & Production',
                content: 'Core materials and production methods are selected for commercial durability, finish quality and project suitability.'
              },
              {
                title: '03 Quality Inspection',
                content: 'Each production run is checked for structural integrity, finish consistency and readiness for bulk deployment.'
              },
              {
                title: '04 Bulk Manufacturing',
                content: 'Large-volume orders are produced in line with project schedules, quantity targets and required specification alignment.'
              },
              {
                title: '05 Packing & Delivery',
                content: 'Products are packed for safe handling and dispatch according to the buyer requirement and commercial delivery plan.'
              }
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-lux bg-white p-5 sm:p-6 border border-navy/10 luxury-shadow"
              >
                <p className="font-sub text-[10px] uppercase tracking-[0.28em] text-gold">{card.title.split(' ')[0]}</p>
                <h3 className="mt-2 font-heading text-xl font-bold text-navy">{card.title.replace(/^\d+\s+/, '')}</h3>
                <p className="mt-4 font-body text-sm text-navy/70 leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 lg:mt-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="relative flex min-w-[900px] items-start justify-between px-4">
            <div className="absolute left-4 right-4 top-7 h-0.5 overflow-hidden rounded-full bg-navy/10">
              <motion.div className="h-full bg-gradient-to-r from-gold-2 to-gold" style={{ scaleX: lineScale, transformOrigin: 'left' }} />
            </div>
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative z-10 flex w-20 flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white text-gold shadow-md">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 font-sub text-xs font-medium text-navy">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {overviewPillars.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-lux bg-white p-4 sm:p-5 text-center border border-navy/10 shadow-sm"
            >
              <p className="font-heading text-3xl font-black gold-text sm:text-4xl">{c.value}</p>
              <p className="mt-2 font-sub text-xs uppercase tracking-wider text-navy/70">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
