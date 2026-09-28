import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const bannerAssets = Object.entries(
  import.meta.glob('../assets/banner/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>,
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([path, image]) => ({ path, image }));

const heroMessages = [
  {
    title: 'Commercial & Institutional Furniture',
    subtitle: 'Built for Bulk Supply',
  },
  {
    title: 'Educational Furniture for Schools & Colleges',
    subtitle: 'Bulk Supply • Institutional Projects',
  },
  {
    title: 'Furniture for Government & Export Buyers',
    subtitle: 'Government • Institutional • Export Markets',
  },
];

export default function Hero() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [loadedPaths, setLoadedPaths] = useState<Set<string>>(() => new Set(bannerAssets[0] ? [bannerAssets[0].path] : []));
  const slides = bannerAssets.map((asset, index) => ({
    asset,
    label: `OPCIEAS furniture banner ${index + 1}`,
  }));
  const activeSlide = slides[productIndex] ?? slides[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % heroMessages.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    bannerAssets.forEach(({ path, image }) => {
      const preload = new Image();
      preload.onload = () => {
        if (cancelled) return;
        setLoadedPaths((current) => {
          if (current.has(path)) return current;
          const next = new Set(current);
          next.add(path);
          return next;
        });
      };
      preload.src = image;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setProductIndex((current) => {
        const next = (current + 1) % slides.length;
        return loadedPaths.has(slides[next].asset.path) ? next : current;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [loadedPaths, slides.length]);

  const activeMessage = heroMessages[messageIndex];

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#091827]"
      style={{
        minHeight: 'min(640px, calc(100vh - 82px))',
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden bg-[#091827]">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={activeSlide?.asset.path}
              src={activeSlide?.asset.image}
              alt={activeSlide?.label}
              onLoad={() => setLoadedPaths((current) => new Set(current).add(activeSlide.asset.path))}
              initial={{ opacity: 0, scale: 1.04, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -18 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,26,0.86)_0%,rgba(8,15,26,0.55)_35%,rgba(8,15,26,0.12)_72%,rgba(8,15,26,0.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/75 to-transparent" />
        </div>

      </div>

      <div className="container-x relative z-10 flex min-h-[min(640px,calc(100vh-82px))] w-full items-start px-6 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-[560px]">
          <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">OPCIEAS Pvt. Ltd.</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-sub text-[10px] uppercase tracking-[0.22em] text-gold">Hand Crafted Since 1999</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeMessage.title}-${activeMessage.subtitle}`}
              initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(3px)' }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="mt-5"
            >
              <h1 className="max-w-[560px] font-heading text-[clamp(36px,4vw,64px)] font-black leading-[0.98] text-white sm:leading-[1.02]">
                {activeMessage.title}
                <span className="mt-2 block text-[clamp(24px,2.2vw,38px)] font-semibold leading-[1.06] text-white/90">
                  {activeMessage.subtitle}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          <p className="mt-5 max-w-xl font-sub text-xs uppercase tracking-[0.18em] text-white/80 sm:text-sm">
            Government • Institutional • Educational • Export Markets
          </p>
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-white/85 sm:text-base">
            Minimum Order Quantity: 500+ Units. Manufactured for institutional, educational, and bulk project supply requirements.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/products" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm font-semibold">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm font-semibold text-white">
              Request Bulk Quote
            </Link>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <a href="#introduction" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 ring-1 ring-navy/10 shadow-md">
          <ChevronDown className="h-4 w-4 text-navy" />
        </a>
      </motion.div>
    </section>
  );
}
