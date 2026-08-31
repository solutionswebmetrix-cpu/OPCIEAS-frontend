import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, FileText, Download, ArrowUpRight, RotateCw } from 'lucide-react';
import { IMG } from '../lib/images';
import { fetchCategories, fetchFeaturedProducts, fetchProducts, type Category, type Product } from '../lib/data';
import Product360Viewer from './Product360Viewer';

function ProductCard({ name, img, count, slug, i }: { name: string; img?: string; count?: number; slug: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const rx = -((e.clientY - r.top) / r.height - 0.5) * 10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    setT({ rx, ry });
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-lux border border-navy/10 bg-white luxury-shadow"
    >
      <Link to={`/products/category/${slug}`}>
        <img src={img || IMG.heroBg} alt={`${name} by OPCIEAS`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <p className="font-sub text-[10px] uppercase tracking-wider text-gold">{count ? `${count}+ Products` : 'Signature Collection'}</p>
          <h3 className="mt-1 font-heading text-lg font-bold text-navy">{name}</h3>
          <div className="relative z-10 mt-3 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <button className="flex items-center gap-1 rounded-full bg-navy/10 px-3 py-1.5 font-sub text-xs text-navy backdrop-blur transition hover:bg-gold hover:text-navy">
              <Eye className="h-3 w-3" /> Quick View
            </button>
            <button className="flex items-center gap-1 rounded-full bg-navy/10 px-3 py-1.5 font-sub text-xs text-navy backdrop-blur transition hover:bg-gold hover:text-navy">
              <Download className="h-3 w-3" /> Catalogue
            </button>
          </div>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedProduct({ product, i }: { product: Product; i: number }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const gallery = product.gallery?.length ? product.gallery : [product.image || IMG.heroBg];
  const primaryImage = product.image || gallery[0] || IMG.heroBg;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-200px' }}
      transition={{ duration: 0.8 }}
      className={`relative flex min-h-[70vh] items-center overflow-hidden ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <img src={primaryImage} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        <div className={`absolute inset-0 ${i % 2 === 1 ? 'bg-gradient-to-l from-white via-white/80 to-transparent' : 'bg-gradient-to-r from-white via-white/80 to-transparent'}`} />
      </div>
      <div className="container-x relative z-10 px-6">
        <div className={`max-w-lg ${i % 2 === 1 ? 'ml-auto text-right' : ''}`}>
          <span className="inline-block rounded-full bg-gold/20 px-3 py-1 font-sub text-xs font-semibold text-gold-3">Featured</span>
          <h3 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">{product.name}</h3>
          <p className="mt-3 font-body text-sm text-navy/70">{product.short_desc || product.long_desc || 'Premium product from OPCIEAS.'}</p>
          <div className={`relative z-10 mt-6 flex flex-wrap gap-3 ${i % 2 === 1 ? 'justify-end' : ''}`}>
            <button onClick={() => setViewerOpen(true)} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm text-navy"><RotateCw className="h-4 w-4" /> 360° View</button>
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm text-navy"><FileText className="h-4 w-4" /> Request Quote</Link>
            <a href={primaryImage} download className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><Download className="h-4 w-4" /> Download PDF</a>
          </div>
        </div>
      </div>
      <Product360Viewer images={gallery} productName={product.name} open={viewerOpen} onClose={() => setViewerOpen(false)} />
    </motion.div>
  );
}

export default function Products() {
  const [showcaseItems, setShowcaseItems] = useState<Array<{ name: string; img: string; slug: string; count: number }>>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()]);
      const countsByCat = products.reduce<Record<string, number>>((acc, product) => {
        const key = product.category_id || 'all';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const items = categories.map((category: Category) => ({
        name: category.name,
        img: category.banner_image || category.image || IMG.heroBg,
        slug: category.slug,
        count: countsByCat[category.id] || 0,
      }));

      setShowcaseItems(items);
      const featured = (await fetchFeaturedProducts()).slice(0, 3);
      setFeaturedProducts(featured);
    })();
  }, []);

  return (
    <section id="products" className="relative overflow-hidden bg-white py-32">
      <div className="container-x px-6">
        <div className="mb-16 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Product Showcase</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Furniture for Every Commercial Space
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-xl font-body text-sm text-navy/60">
            From office interiors and educational campuses to hospitals, hospitality and industrial storage — 1000+ furniture products engineered for durability and style.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {showcaseItems.map((item, i) => (
            <ProductCard key={item.slug} name={item.name} img={item.img} count={item.count} slug={item.slug} i={i} />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <div className="container-x mb-12 px-6">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-2xl font-black text-navy sm:text-3xl">
            Featured Products
          </motion.h3>
        </div>
        {featuredProducts.map((product, i) => (
          <FeaturedProduct key={product.id} product={product} i={i} />
        ))}
      </div>
    </section>
  );
}
