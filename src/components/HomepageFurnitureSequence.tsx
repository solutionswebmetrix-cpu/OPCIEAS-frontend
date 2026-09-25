import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/logo/logo.png';
import { getEducationalAssets, type ProductAsset } from '../lib/productAssetResolver';

type SequenceScene = {
  id: string;
  label: string;
  subtitle: string;
  heading: string;
  route: string;
  assets: ProductAsset[];
};

function resolveAssets(category: string) {
  return getEducationalAssets(category, 3);
}

const scenes: SequenceScene[] = [
  {
    id: 'kg-classes',
    label: 'KG Classes',
    subtitle: 'Safe • Durable • Colourful',
    heading: 'Designed for Young Minds',
    route: '/products/category/educational-furniture?subcategory=kg-classes',
    assets: resolveAssets('KG Classes'),
  },
  {
    id: 'primary',
    label: 'Primary',
    subtitle: 'Smart • Strong • Ergonomic',
    heading: 'Built for Better Learning',
    route: '/products/category/educational-furniture?subcategory=primary',
    assets: resolveAssets('Primary'),
  },
  {
    id: 'high-school',
    label: 'High School',
    subtitle: 'Smart • Strong • Ergonomic',
    heading: 'Built for Better Learning',
    route: '/products/category/educational-furniture?subcategory=high-school',
    assets: resolveAssets('High School'),
  },
  {
    id: 'colleges-higher-education',
    label: 'Colleges & Higher Education',
    subtitle: 'Durable Institutional Solutions',
    heading: 'Professional Seating for Higher Education',
    route: '/products/category/educational-furniture?subcategory=colleges-higher-education',
    assets: resolveAssets('Colleges & Higher Education'),
  },
];

export default function HomepageFurnitureSequence() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const activeScene = useMemo(() => scenes[sceneIndex] ?? scenes[0], [sceneIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSceneIndex((current) => (current + 1) % scenes.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="homepage-furniture-sequence" className="relative overflow-hidden border-b border-navy/10 bg-light-grey py-12 sm:py-16 lg:py-20">
      <div className="container-x w-full px-6">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-10">
          <div className="min-w-0 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <img src={companyLogo} alt="OPCIEAS emblem" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
              <div>
                <p className="font-sub text-xs text-gold">OPCIEAS Pvt. Ltd.</p>
                <p className="mt-1 font-sub text-xs text-navy/60">Premium furniture manufacturer since 1999</p>
              </div>
            </motion.div>
            <p className="mt-8 font-sub text-xs uppercase tracking-[0.3em] text-gold">Educational Journey</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Furniture That Builds Better Learning Spaces</h2>
            <p className="mt-4 font-body text-base leading-7 text-navy/70">Premium Educational &amp; Institutional Furniture Manufacturing Since 1999</p>
            <div className="mt-6 border-l-4 border-gold bg-white px-5 py-4 font-heading text-xl font-black leading-relaxed text-navy sm:text-2xl">
              {activeScene.heading}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to={activeScene.route} className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 font-sub text-sm">Explore Products <ArrowRight className="h-4 w-4" /></Link>
              <span className="font-sub text-xs text-navy/60">Educational • Institutional • Export Ready</span>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-lux border border-navy/10 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Scene {sceneIndex + 1}</p>
                    <h3 className="mt-2 font-heading text-2xl font-black text-navy sm:text-3xl">{activeScene.label}</h3>
                    <p className="mt-2 max-w-md font-body text-sm leading-6 text-navy/65">{activeScene.subtitle}</p>
                  </div>
                  <span className="shrink-0 font-sub text-xs text-navy/50">{String(sceneIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-6 grid min-h-[330px] grid-cols-2 gap-3 sm:mt-8 sm:h-[285px] sm:min-h-0 sm:grid-cols-3 sm:gap-3">
                  {activeScene.assets.map((asset, index) => (
                    <motion.div
                      key={asset.slug}
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.12, duration: 0.5 }}
                      className={`flex min-h-[150px] items-center justify-center overflow-hidden rounded-xl border border-navy/10 bg-light-grey p-2 sm:min-h-0 ${index === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
                    >
                      <img src={asset.image} alt={asset.name} className="h-full w-full object-cover" loading={sceneIndex === 0 ? 'eager' : 'lazy'} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex gap-1 sm:bottom-6 sm:left-7" role="tablist" aria-label="Educational furniture scenes">
              {scenes.map((scene, index) => (
                <button
                  key={scene.id}
                  type="button"
                  role="tab"
                  aria-selected={index === sceneIndex}
                  aria-label={`View ${scene.label}`}
                  onClick={() => setSceneIndex(index)}
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                >
                  <span className={`h-2.5 w-2.5 rounded-full transition-all ${index === sceneIndex ? 'bg-gold ring-4 ring-gold/15' : 'bg-navy/20 hover:bg-navy/40'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
