import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/logo/logo.png';
import { findProductAssetByName, type ProductAsset } from '../lib/productAssetResolver';

type SequenceScene = {
  id: string;
  label: string;
  subtitle: string;
  statement?: string;
  assets: ProductAsset[];
};

function resolveAssets(names: string[], category?: string) {
  return names
    .map((name) => findProductAssetByName(name, category) ?? findProductAssetByName(name))
    .filter((asset): asset is ProductAsset => !!asset)
    .slice(0, 3);
}

const scenes: SequenceScene[] = [
  {
    id: 'kg',
    label: 'KG Classes',
    subtitle: 'Accessible classroom furniture for early learning environments',
    statement: 'Fiberglass inbuilt colour furniture with SS racks not only make a statement but also improve the ambiance of classrooms.',
    assets: resolveAssets([
      'Colorful Kindergarten Classroom Furniture',
      "Colourful Children's Table and Chair Set",
      'Chrome Wire Shelving on Terracotta Floor',
    ], 'School Furniture'),
  },
  {
    id: 'primary',
    label: 'Primary School',
    subtitle: 'Desks, chairs and benches for everyday classroom use',
    assets: resolveAssets([
      'Minimal Desk and Bench Set',
      'Woodgrain Classroom Desk and Bench Set',
      'Single Wooden School Desk and Bench',
    ], 'School Furniture'),
  },
  {
    id: 'high-school',
    label: 'High School',
    subtitle: 'Structured furniture for focused academic spaces',
    assets: resolveAssets([
      'Blue Desk Training Room',
      'White Lecture Chair with Writing Tablet',
      'Gray Adjustable Drafting Table',
    ], 'Educational Furniture'),
  },
  {
    id: 'junior-college',
    label: 'Junior College',
    subtitle: 'Attractive desk and bench settings for higher learning',
    assets: resolveAssets([
      'Modern Beige Desk with Black Trim',
      'Light Wood Office Desk Set',
      'Minimalist Desk and Chair Corner',
    ], 'Educational Furniture'),
  },
  {
    id: 'university-pg',
    label: 'Senior University / PG',
    subtitle: 'Writing pad chairs with distinct blue and red variants',
    assets: resolveAssets([
      'Maroon Tablet-Arm Chair on Concrete',
      'Blue Lecture Chair with Writing Tablet',
      'Red Chair with Writing Tablet',
    ], 'Educational Furniture'),
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
      <div className="container-x w-full px-4 sm:px-6">
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
                <p className="font-sub text-xs uppercase tracking-[0.28em] text-gold">OPCIEAS Commercial Furniture</p>
                <p className="mt-1 font-sub text-[0.65rem] uppercase tracking-[0.18em] text-navy/60">HAND CRAFTED SINCE 1999</p>
              </div>
            </motion.div>
            <p className="mt-8 font-sub text-xs uppercase tracking-[0.3em] text-gold">Educational Furniture</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Furniture that grows with the learning environment</h2>
            <p className="mt-4 font-body text-base leading-7 text-navy/70">A focused product sequence for classrooms, colleges and higher-education spaces, using approved OPCIEAS product visuals.</p>
            {activeScene.statement && (
              <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 font-body text-sm leading-6 text-navy/80">{activeScene.statement}</p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/furniture" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 font-sub text-sm">Explore Commercial Furniture <ArrowRight className="h-4 w-4" /></Link>
              <span className="font-sub text-[0.65rem] uppercase tracking-[0.16em] text-navy/60">An ISO 9001:2015 Certified Company</span>
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
                      <img src={asset.image} alt={asset.name} className="h-full w-full object-contain" loading={sceneIndex === 0 ? 'eager' : 'lazy'} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-5 left-5 flex gap-2 sm:left-8 sm:bottom-7">
              {scenes.map((scene, index) => (
                <button
                  key={scene.id}
                  type="button"
                  aria-label={`View ${scene.label}`}
                  onClick={() => setSceneIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${index === sceneIndex ? 'bg-gold ring-4 ring-gold/15' : 'bg-navy/20 hover:bg-navy/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
