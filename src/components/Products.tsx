import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchCategories, fetchProducts, isCategoryVisible, productBelongsToCategory, productBelongsToSubcategory, resolveProductImage, type Category, type Product } from '../lib/data';
import { getCategorySubcategoryRoute } from '../lib/categorySubcategories';

const EDUCATIONAL_PROGRESSION = ['KG', 'Primary', 'High School', 'Junior College', 'PG College'] as const;
type EducationalProgression = typeof EDUCATIONAL_PROGRESSION[number];

const PROGRESSION_BY_SUBCATEGORY: Record<string, EducationalProgression> = {
  'k g': 'KG',
  kg: 'KG',
  lkg: 'KG',
  primary: 'Primary',
  'high school': 'High School',
  'colleges higher education': 'Junior College',
  'junior college': 'Junior College',
  'p g imiversity': 'PG College',
  'university college': 'PG College',
};

const HOSTEL_SUBCATEGORIES = [
  { label: 'Hostel – Single Cot', subcategory: 'Single Cots' },
  { label: 'Bunker Cots', subcategory: 'Bunker Cots' },
  { label: 'Triple Cots', subcategory: 'Triple Cots' },
  { label: 'Accessories', subcategory: 'Accessories' },
] as const;

const CATEGORY_FILTERS = [
  { label: 'Educational Furniture', slug: 'educational-furniture' },
  { label: 'School Furniture', slug: 'school-furniture' },
  { label: 'Hostel Furniture', slug: 'hostel-furniture' },
  { label: 'Industrial Storage', slug: 'industrial-storage' },
  { label: 'Bathroom Collection', slug: 'bathroom-collection' },
  { label: 'Letter Box', slug: 'letter-boxes' },
  { label: 'Commercial Furniture', slug: 'commercial-furniture' },
] as const;

function getProgressionGroup(categorySlug: string, product: Product): string {
  const subcategory = (product.subcategory ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return PROGRESSION_BY_SUBCATEGORY[subcategory] ?? (categorySlug === 'school-furniture' ? 'Other School Furniture' : 'Other Educational Furniture');
}

function groupProgressionProducts(categorySlug: string, products: Product[]): { label: string; products: Product[] }[] {
  const groups = new Map<string, Product[]>(
    EDUCATIONAL_PROGRESSION.map((label) => [label, []]),
  );

  for (const product of products) {
    const label = getProgressionGroup(categorySlug, product);
    const group = groups.get(label);
    if (group) {
      group.push(product);
    } else {
      groups.set(label, [product]);
    }
  }

  return Array.from(groups, ([label, groupProducts]) => ({ label, products: groupProducts }))
    .filter(({ products: groupProducts }) => groupProducts.length > 0);
}

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
            className="h-full w-full object-contain object-center"
            loading={categoryIndex === 0 && index < 4 ? 'eager' : 'lazy'}
          /> : <div className="h-full w-full bg-navy/5" aria-label="Product image unavailable" />}
        </div>
        <div className="flex min-h-[9rem] flex-col border-t border-navy/10 p-3.5 sm:p-4">
          <h3 className="mt-1 font-heading text-base font-bold text-navy sm:text-lg leading-tight line-clamp-2">{product.name}</h3>
          {product.short_desc && <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-navy/70">{product.short_desc}</p>}
          {product.price_range && <p className="mt-2 font-sub text-xs font-semibold text-navy">{product.price_range}</p>}
          <span className="mt-auto inline-flex items-center gap-1.5 pb-2 pt-4 font-sub text-sm font-semibold text-accent-blue">
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
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('educational-furniture');

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
        .sort((a, b) => Number(b.featured || b.is_featured) - Number(a.featured || a.is_featured));

      return {
        category,
        products,
      };
    }).filter((entry) => entry.products.length > 0);
  }, [allProducts, categories]);

  const visibleProductGroups = useMemo(() => {
    if (selectedCategorySlug === 'hostel-furniture') return [];
    return productsByCategory.filter(({ category }) => category.slug === selectedCategorySlug);
  }, [productsByCategory, selectedCategorySlug]);

  const hostelSubcategoryGroups = useMemo(() => {
    const hostelCategory = categories.find((category) => category.slug === 'hostel-furniture');
    const hostelProducts = allProducts.filter((product) =>
      hostelCategory
        ? productBelongsToCategory(product, hostelCategory)
        : product.category_slug?.trim().toLowerCase() === 'hostel-furniture'
    );

    return HOSTEL_SUBCATEGORIES.map(({ label, subcategory }) => ({
      label,
      subcategory,
      products: hostelProducts.filter((product) => productBelongsToSubcategory(product, subcategory)),
    }));
  }, [allProducts, categories]);
  const hasHostelProducts = hostelSubcategoryGroups.some(({ products }) => products.length > 0);

  if (loading) {
    return (
      <section id="products" className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
        <div className="container-x px-6">
          <div className="mb-8 lg:mb-10 text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-accent-blue">Product Showcase</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
              Furniture for Every Commercial Space
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-xl font-body text-sm text-navy/60">
              Browse the approved local product range across education, hostel, storage, bathroom and commercial categories.
            </motion.p>
          </div>
          <div className="font-sub text-sm uppercase tracking-[0.2em] text-accent-blue">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-x px-6">
        <div className="mb-8 lg:mb-10 text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-accent-blue">What We Manufacture</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Commercial Furniture- Educational and Institutional furniture Manufacturer
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
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter products by category">
            {CATEGORY_FILTERS.map(({ label, slug }) => {
              const selected = selectedCategorySlug === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedCategorySlug(slug)}
                  style={{
                    backgroundColor: selected ? '#0B1F3A' : '#FFFFFF',
                    color: selected ? '#FFFFFF' : '#0B1F3A',
                  }}
                  className={`relative z-10 inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 font-sub text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 ${
                    selected ? 'border-navy' : 'border-navy/15 hover:border-navy/40 hover:bg-light-grey'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:gap-10">
          {visibleProductGroups.map(({ category, products }, catIdx) => {
            const progressionGroups = ['educational-furniture', 'school-furniture'].includes(category.slug)
              ? groupProgressionProducts(category.slug, products)
              : [{ label: '', products }];

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
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/40 bg-accent-blue/5 px-4 py-2 font-sub text-xs font-semibold text-accent-blue transition-all duration-300 hover:border-accent-blue hover:bg-accent-blue hover:text-navy"
                  >
                    View All <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {progressionGroups.map((group, groupIndex) => (
                  <div key={group.label || category.slug} className={groupIndex > 0 ? 'mt-6' : ''}>
                    {group.label && <h4 className="mb-3 font-heading text-lg font-bold text-navy">{group.label}</h4>}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {group.products.map((product, idx) => (
                        <HomeProductCard
                          key={product.id || product.slug}
                          product={product}
                          index={idx}
                          categoryIndex={catIdx}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            );
          })}
          {visibleProductGroups.length === 0 &&
            !(selectedCategorySlug === 'hostel-furniture' && hasHostelProducts) &&
            !loading &&
            !error && (
            <div className="font-sub text-sm uppercase tracking-[0.2em] text-accent-blue">No products available.</div>
          )}

          {selectedCategorySlug === 'hostel-furniture' && (
            <div className="space-y-8">
              {hostelSubcategoryGroups.map(({ label, subcategory, products }, groupIndex) => {
              return (
                <div key={subcategory}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-heading text-xl font-black text-navy sm:text-2xl">{label}</h3>
                    <Link
                      to={getCategorySubcategoryRoute('hostel-furniture', subcategory)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/40 bg-accent-blue/5 px-4 py-2 font-sub text-xs font-semibold text-accent-blue transition-all duration-300 hover:border-accent-blue hover:bg-accent-blue hover:text-navy"
                    >
                      View All <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  {products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {products.map((product, index) => (
                        <HomeProductCard
                          key={product.id || product.slug}
                          product={product}
                          index={index}
                          categoryIndex={productsByCategory.length + groupIndex}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lux border border-navy/10 bg-light-grey px-4 py-5 font-body text-sm text-navy/65">
                      No products are currently available in this subcategory.
                    </p>
                  )}
                </div>
              );
              })}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
