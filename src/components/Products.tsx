import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchCategories, fetchProducts, isCategoryVisible, resolveProductImage, type Category, type Product } from '../lib/data';

function HomeProductCard({ product, index, categoryIndex }: { product: Product; index: number; categoryIndex: number }) {
  const productSlug = product.slug || String(product.id);
  const image = resolveProductImage(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (categoryIndex * 0.03) + (index % 5) * 0.04, duration: 0.45 }}
      className="group overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <Link to={`/product/${productSlug}`} className="block">
        <div className="h-56 sm:h-60 xl:h-64 bg-white p-2.5 sm:p-3">
          {image ? <img
            src={image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading={categoryIndex === 0 && index < 4 ? 'eager' : 'lazy'}
          /> : <div className="h-full w-full bg-navy/5" aria-label="Product image unavailable" />}
        </div>
        <div className="flex min-h-[9rem] flex-col border-t border-navy/10 p-3.5 sm:p-4">
          <h3 className="mt-1 font-heading text-base font-bold text-navy sm:text-lg leading-tight line-clamp-2">{product.name}</h3>
          {product.short_desc && <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-navy/70">{product.short_desc}</p>}
          {product.price_range && <p className="mt-2 font-sub text-xs font-semibold text-navy">{product.price_range}</p>}
          <span className="mt-auto inline-flex items-center gap-1.5 pb-2 pt-4 font-sub text-sm font-semibold text-gold">
            View Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (e) {
        console.error('Categories API error:', e);
        setError(true);
        setCategories([]);
      }

      try {
        const products = await fetchProducts();
        setAllProducts(products);
      } catch (e) {
        console.error('Products API error:', e);
        setError(true);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const productsByCategory = useMemo(() => {
    return categories.filter((category) => isCategoryVisible(category)).map((category) => {
      const products = allProducts
        .filter((product) => String(product.category_id ?? '') === String(category.id))
        .sort((a, b) => Number(b.featured || b.is_featured) - Number(a.featured || a.is_featured))
        .slice(0, 5);

      return {
        category,
        products,
      };
    }).filter((entry) => entry.products.length > 0);
  }, [allProducts, categories]);

  const visibleProductGroups = useMemo(() => {
    if (!selectedCategoryId) return productsByCategory.slice(0, 1);
    return productsByCategory.filter(({ category }) => String(category.id) === selectedCategoryId);
  }, [productsByCategory, selectedCategoryId]);

  if (loading) {
    return (
      <section id="products" className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-x px-6">
          <div className="mb-8 lg:mb-10 text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Product Showcase</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
              Furniture for Every Commercial Space
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-xl font-body text-sm text-navy/60">
              From office interiors and educational campuses to hospitals, hospitality and industrial storage — 1000+ furniture products engineered for durability and style.
            </motion.p>
          </div>
          <div className="font-sub text-sm uppercase tracking-[0.2em] text-gold">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-x px-6">
        <div className="mb-8 lg:mb-10 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">What We Manufacture</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Product collections for bulk institutional and commercial supply.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-navy/65">
            Educational furniture, school systems, hostel seating, industrial storage, and custom project supply built for government, institutional, and export procurement buyers.
          </motion.p>
        </div>

        {error && (
          <p role="alert" className="mb-6 rounded-lux border border-navy/10 bg-navy/5 px-4 py-3 font-body text-sm text-navy/70">
            Product data could not be loaded from the configured API.
          </p>
        )}

        <div className="mb-6 lg:mb-8 rounded-xl border border-navy/10 bg-light-grey/70 p-2">
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Product categories">
            {productsByCategory.map(({ category }) => {
              const categoryId = String(category.id);
              const selected = (selectedCategoryId || String(productsByCategory[0]?.category.id)) === categoryId;
              return (
                <button
                  key={categoryId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setSelectedCategoryId(categoryId)}
                  className={`rounded-full border px-4 py-2 font-sub text-xs transition ${selected ? 'border-gold bg-gold text-navy' : 'border-transparent bg-transparent text-navy/70 hover:border-gold/50 hover:text-gold'}`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:gap-10">
          {visibleProductGroups.map(({ category, products }, catIdx) => {
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: Math.min(catIdx * 0.05, 0.25), duration: 0.5 }}
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-xl font-black text-navy sm:text-2xl">{category.name}</h3>
                  </div>
                  <Link
                    to={`/products/category/${category.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-4 py-2 font-sub text-xs font-semibold text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    View All <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {products.map((product, idx) => (
                    <HomeProductCard
                      key={product.id || product.slug}
                      product={product}
                      index={idx}
                      categoryIndex={catIdx}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
          {visibleProductGroups.length === 0 && !loading && !error && (
            <div className="font-sub text-sm uppercase tracking-[0.2em] text-gold">No products available.</div>
          )}
        </div>
      </div>

    </section>
  );
}
