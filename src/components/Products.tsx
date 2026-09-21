import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchCategories, fetchProducts, resolveProductImage, type Category, type Product } from '../lib/data';
import { HOMEPAGE_SHOWCASE_CATALOG, type ProductAsset } from '../lib/productAssetResolver';

function isViteAssetUrl(value?: string | null): boolean {
  if (!value) return false;
  return /^\/src\/assets\//i.test(value) || /^\/assets\//i.test(value);
}

function HomeProductCard({ product, index, categoryIndex }: { product: Product; index: number; categoryIndex: number }) {
  const productSlug = product.slug || String(product.id);
  const image = isViteAssetUrl(product.image) ? product.image : resolveProductImage(product.image);

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
          {image ? <img
            src={image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading={categoryIndex === 0 && index < 4 ? 'eager' : 'lazy'}
          /> : <div className="h-full w-full bg-navy/5" aria-label="Product image unavailable" />}
        </div>
        <div className="flex min-h-[10rem] flex-col border-t border-navy/10 p-3.5 sm:p-4">
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

function assetToProduct(category: Category, asset: ProductAsset): Product {
  return {
    id: asset.slug || asset.fileName || asset.path,
    seller_id: undefined,
    category_id: String(category.id),
    subcategory: asset.folder,
    name: asset.name,
    slug: asset.slug,
    sku: null,
    short_desc: null,
    short_description: asset.folder,
    long_desc: null,
    description: asset.folder,
    key_features: [],
    features: [],
    supply_type: null,
    specs: {},
    specifications: {},
    dimensions: null,
    material: null,
    materials_used: null,
    color: null,
    warranty_months: null,
    warranty_terms: null,
    packaging_specifications: null,
    export_available: false,
    export_badge: null,
    weight: null,
    variants: null,
    tags: null,
    min_order_quantity: 1,
    max_order_quantity: null,
    unit: undefined,
    price: null,
    discount_price: null,
    discount_percentage: null,
    tax_percentage: 0,
    stock_quantity: undefined,
    availability_status: undefined,
    is_approved: true,
    approved_at: null,
    approved_by: null,
    featured: false,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: false,
    rating: undefined,
    total_reviews: undefined,
    total_views: undefined,
    total_orders: undefined,
    status: 'Published',
    meta_title: null,
    meta_description: null,
    image: asset.image,
    gallery: [asset.image],
    images: [],
    price_range: null,
    created_at: new Date().toISOString(),
    updated_at: undefined,
  };
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
    return categories.map((category) => {
      const apiCategoryProducts = allProducts
        .filter((product) => String(product.category_id ?? '') === String(category.id))
        .sort((a, b) => Number(b.featured || b.is_featured) - Number(a.featured || a.is_featured));

      const products: Product[] = [...apiCategoryProducts];
      const usedSlugs = new Set(products.map((product) => product.slug || String(product.id)));
      const assetPool = HOMEPAGE_SHOWCASE_CATALOG[category.name] ?? [];
      const assetByName = new Map<string, ProductAsset>();
      for (const asset of assetPool) {
        assetByName.set(asset.name.trim().toLowerCase(), asset);
      }

      for (const asset of assetPool) {
        if (products.length >= 5) break;
        if (usedSlugs.has(asset.slug)) continue;
        products.push(assetToProduct(category, asset));
        usedSlugs.add(asset.slug);
      }

      const finalProducts: Product[] = products.slice(0, 5).map((product) => {
        const matchName = (product.name || '').trim().toLowerCase();
        const matched = assetByName.get(matchName);
        if (matched) {
          return {
            ...product,
            image: matched.image,
            gallery: [matched.image],
            __showcaseAssetOverride: true,
          } as Product & { __showcaseAssetOverride?: boolean };
        }
        return product;
      });

      return {
        category,
        products: finalProducts,
      };
    }).filter((entry) => entry.products.length > 0);
  }, [allProducts, categories]);

  const visibleProductGroups = useMemo(() => {
    if (!selectedCategoryId) return productsByCategory.slice(0, 1);
    return productsByCategory.filter(({ category }) => String(category.id) === selectedCategoryId);
  }, [productsByCategory, selectedCategoryId]);

  if (loading) {
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
          <div className="font-sub text-sm uppercase tracking-[0.2em] text-gold">Loading products...</div>
        </div>
      </section>
    );
  }

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

        <div className="mb-8 rounded-xl border border-navy/10 bg-light-grey/70 p-2">
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

        <div className="space-y-14 sm:space-y-20">
          {visibleProductGroups.map(({ category, products }, catIdx) => {
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: Math.min(catIdx * 0.05, 0.25), duration: 0.5 }}
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-7">
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

                <div className="grid grid-cols-2 gap-3.5 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
