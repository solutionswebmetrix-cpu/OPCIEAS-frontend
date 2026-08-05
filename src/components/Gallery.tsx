import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Share2, Download, Maximize2 } from 'lucide-react';
import { IMG } from '../lib/images';

const cats = ['All', 'Factory', 'Office', 'Educational', 'Government', 'Hospital', 'Hotel', 'Industrial', 'Export', 'Warehouse'];

const images = IMG.gallery;

const hClass: Record<string, string> = {
  tall: 'row-span-2',
  medium: 'row-span-1',
  short: 'row-span-1',
};

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? images : images.filter((im) => im.cat === active);

  return (
    <section id="gallery" className="relative overflow-hidden bg-dark py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Premium Gallery</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Inside OPCIEAS
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 font-sub text-xs transition-all ${active === c ? 'btn-gold' : 'glass text-white/70 hover:text-gold'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((im, i) => (
            <motion.div
              key={im.src + i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              onClick={() => setLightbox(i)}
              className={`group relative cursor-pointer overflow-hidden rounded-lux border border-white/10 ${hClass[im.h]}`}
            >
              <img src={im.src} alt={`${im.cat} furniture by OPCIEAS`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full bg-white/15 px-2 py-1 font-sub text-[10px] text-white backdrop-blur">{im.cat}</span>
                <ZoomIn className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute right-6 top-6 text-white/70 hover:text-white" onClick={() => setLightbox(null)}><X className="h-8 w-8" /></button>
            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white" onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? null : (p - 1 + filtered.length) % filtered.length); }}><ChevronLeft className="h-10 w-10" /></button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={filtered[lightbox].src.replace('w=800', 'w=1400')}
              alt="Gallery fullscreen"
              className="max-h-[85vh] max-w-[90vw] rounded-lux object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white" onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? null : (p + 1) % filtered.length); }}><ChevronRight className="h-10 w-10" /></button>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
              <button className="flex items-center gap-1.5 rounded-full glass px-4 py-2 font-sub text-xs text-white"><Download className="h-3.5 w-3.5" /> Download</button>
              <button className="flex items-center gap-1.5 rounded-full glass px-4 py-2 font-sub text-xs text-white"><Share2 className="h-3.5 w-3.5" /> Share</button>
              <button className="flex items-center gap-1.5 rounded-full glass px-4 py-2 font-sub text-xs text-white"><Maximize2 className="h-3.5 w-3.5" /> 360 View</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
