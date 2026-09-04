import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, RotateCw, ArrowRight } from 'lucide-react';
import { IMG, CANONICAL_CATEGORIES, PRODUCT_IMAGE_GROUPS, cleanProductName, toKebab, type CanonicalCategoryName } from '../lib/images';
import { fetchFeaturedProducts, fetchProducts, type Product } from '../lib/data';
import Product360Viewer from './Product360Viewer';

function HomeProductCard({ group, product, index, categoryIndex }: { group: typeof PRODUCT_IMAGE_GROUPS[number]; product?: Product; index: number; categoryIndex: number }) {
  const productSlug = product?.slug || `asset-${toKebab(group.cleanName)}`;
  const primaryImage = product?.image || group.image;
  const productName = product?.name || group.cleanName;
  const productCategory = product?.category_id ? group.category : group.category;
  void productCategory;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (categoryIndex * 0.03) + (index % 5) * 0.04, duration: 0.45 }}
      className="group overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <Link to={`/product/${productSlug}`} className="block">
        <div className="h-48 sm:h-52 bg-white p-2.5 sm:p-3">
          <img
            src={primaryImage}
            alt={productName}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading={categoryIndex === 0 && index < 4 ? 'eager' : 'lazy'}
          />
        </div>
        <div className="flex min-h-[10rem] flex-col border-t border-navy/10 p-3.5 sm:p-4">
          <p className="font-sub text-[10px] uppercase tracking-[0.16em] text-gold">{group.category}</p>
          {product ? (
            <>
              <h3 className="mt-1 font-heading text-base font-bold text-navy sm:text-lg leading-tight line-clamp-2">{product.name}</h3>
              {product.short_desc && <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-navy/70">{product.short_desc}</p>}
              {product.price_range && <p className="mt-2 font-sub text-xs font-semibold text-navy">{product.price_range}</p>}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3.5 font-sub text-xs text-gold">
                View Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </>
          ) : (
            <>
              <h3 className="mt-1 font-heading text-base font-bold text-navy sm:text-lg leading-tight line-clamp-2">{group.cleanName}</h3>
              <p className="mt-2 font-body text-xs text-navy/60">Product information will be updated soon.</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3.5 font-sub text-xs text-gold">
                View Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </>
          )}
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const products = await fetchProducts();
      setAllProducts(products);
      const featured = (await fetchFeaturedProducts()).slice(0, 3);
      setFeaturedProducts(featured);
    })();
  }, []);

  const productsByCategory = useMemo(() => {
    const map = new Map<CanonicalCategoryName, { group: typeof PRODUCT_IMAGE_GROUPS[number]; product?: Product }[]>();

    for (const group of PRODUCT_IMAGE_GROUPS) {
      if (!map.has(group.category)) {
        map.set(group.category, []);
      }
      const arr = map.get(group.category)!;
      const matchedProduct = allProducts.find(
        (candidate) => toKebab(cleanProductName(candidate.name)) === toKebab(group.cleanName)
      );
      arr.push({ group, product: matchedProduct });
    }

    for (const [cat, arr] of map.entries()) {
      arr.sort((a, b) => {
        const aFeatured = a.product?.featured || a.product?.is_featured ? 1 : 0;
        const bFeatured = b.product?.featured || b.product?.is_featured ? 1 : 0;
        if (bFeatured !== aFeatured) return bFeatured - aFeatured;
        return a.group.cleanName.localeCompare(b.group.cleanName);
      });
      map.set(cat, arr.slice(0, 5));
    }

    return map;
  }, [allProducts]);

  const categoriesWithProducts = CANONICAL_CATEGORIES.filter((cat) => {
    const items = productsByCategory.get(cat.name);
    return items && items.length > 0;
  });

  return (
    <section id="products" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x px-6">
        <div className="mb-14 sm:mb-16 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Product Showcase</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Furniture for Every Commercial Space
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-xl font-body text-sm text-navy/60">
            From office interiors and educational campuses to hospitals, hospitality and industrial storage — 1000+ furniture products engineered for durability and style.
          </motion.p>
        </div>

        <div className="space-y-14 sm:space-y-20">
          {categoriesWithProducts.map((cat, catIdx) => {
            const items = productsByCategory.get(cat.name)!;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: Math.min(catIdx * 0.05, 0.25), duration: 0.5 }}
              >
                <div className="mb-5 sm:mb-7 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-xl font-black text-navy sm:text-2xl">{cat.name}</h3>
                    <p className="mt-1 font-sub text-xs uppercase tracking-[0.2em] text-navy/40">
                      {items.length} product{items.length !== 1 ? 's' : ''} displayed
                    </p>
                  </div>
                  <Link
                    to={`/products/category/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-4 py-2 font-sub text-xs font-semibold text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    View All <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3.5 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {items.map((item, idx) => (
                    <HomeProductCard
                      key={item.group.key}
                      group={item.group}
                      product={item.product}
                      index={idx}
                      categoryIndex={catIdx}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-20 sm:mt-24">
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
