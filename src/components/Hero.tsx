import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const bannerAssets = Object.entries(
  import.meta.glob('../assets/banner/*.{png,jpg,jpeg,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>,
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([path, image]) => ({ path, image }));

export default function Hero() {
  const [productIndex, setProductIndex] = useState(0);
  const [loadedPaths, setLoadedPaths] = useState<Set<string>>(() => new Set(bannerAssets[0] ? [bannerAssets[0].path] : []));
  const slides = bannerAssets.map((asset, index) => ({
    asset,
    label: `OPCIEAS furniture banner ${index + 1}`,
  }));
  const activeSlide = slides[productIndex] ?? slides[0];

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

      <div className="container-x relative z-10 flex min-h-[min(640px,calc(100vh-82px))] w-full items-center px-6 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-[700px]">
          <p className="font-sub text-xs uppercase tracking-[0.28em] text-gold sm:text-sm">OPCIEAS PVT. LTD.</p>
          <h1 className="mt-4 font-heading text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Commercial Furniture
          </h1>
          <p className="mt-4 max-w-3x2 font-sub text-xs uppercase leading-relaxed tracking-[0.12em] text-white/90 sm:text-lg">
            Educational • INSTITUTIONAL • Corporates • Government Tender • Contractors and Exports
          </p>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/85 sm:text-lg">
            Minimum Order Quantity: 500+ Units. Manufactured for institutional, educational, and bulk project supply requirements.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/products" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm font-semibold">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm font-semibold text-white">
              Request Bulk Quote
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
