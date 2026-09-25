import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
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
    subtitle: 'Built for 500+ Unit Bulk Orders',
  },
  {
    title: 'Premium Educational & Institutional Furniture',
    subtitle: 'Manufacturing Since 1999',
  },
  {
    title: 'Furniture Solutions for',
    subtitle: 'Government • Institutional • Export Markets',
  },
];

export default function Hero() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
    if (isPaused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setProductIndex((current) => {
        const next = (current + 1) % slides.length;
        return loadedPaths.has(slides[next].asset.path) ? next : current;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isPaused, loadedPaths, slides.length]);

  const moveProduct = (direction: number) => {
    setProductIndex((current) => {
      const next = (current + direction + slides.length) % slides.length;
      return loadedPaths.has(slides[next].asset.path) ? next : current;
    });
  };

  const activeMessage = heroMessages[messageIndex];

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#091827]"
      style={{
        minHeight: 'min(760px, calc(100vh - 82px))',
      }}
    >
      <div
        className="absolute inset-0 z-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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

        <button type="button" aria-label="Previous product" onClick={() => moveProduct(-1)} className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-gold sm:left-7">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Next product" onClick={() => moveProduct(1)} className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition hover:bg-gold sm:right-7">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="container-x relative z-10 flex min-h-[min(760px,calc(100vh-82px))] w-full items-start px-6 py-10 pb-36 sm:py-12 sm:pb-40 lg:py-14 lg:pb-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-[560px]">
          <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">OPCIEAS Pvt. Ltd.</p>

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
            National Tender Supply • Institutional Projects • Export Supply
          </p>
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-white/85 sm:text-base">
            Minimum Order Quantity: 500+ Units. Commercial and institutional supply for government buyers, contractors, education, healthcare and export procurement programs.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/catalogue" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm font-semibold">
              Explore Catalog <ArrowRight className="h-4 w-4" />
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
