import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, MessageCircle, ArrowRight, Grid3X3 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import ProductCard from '../components/ProductCard';
import { CATEGORY_BANNERS, CANONICAL_CATEGORIES } from '../lib/images';
import { fetchCategories, fetchProducts, isCategoryVisible, productBelongsToCategory, type Product, type Category } from '../lib/data';
import { getBusinessVerticalImages } from '../lib/businessVerticalImages';

const fallbackCategories: Pick<Category, 'id' | 'name' | 'slug'>[] = CANONICAL_CATEGORIES.filter((category) => isCategoryVisible(category)).map((category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
}));

export default function AllProductsPage() {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Pick<Category, 'id' | 'name' | 'slug'>[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');

  useEffect(() => {
    (async () => {
      try {
        setLoadError(null);
        const [products, categoryList] = await Promise.all([fetchProducts(), fetchCategories()]);
        const visibleCategories = categoryList.length
          ? categoryList.filter((category) => isCategoryVisible(category))
          : fallbackCategories;
        setApiProducts(products.filter((product) =>
          visibleCategories.some((category) => productBelongsToCategory(product, category))
        ));
        setCategories(visibleCategories.map((category) => ({ id: category.id, name: category.name, slug: category.slug })));
      } catch (error) {
        console.error('[AllProductsPage] Product fetch failed:', error);
        setApiProducts([]);
        setCategories(fallbackCategories);
        setLoadError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categoryList = useMemo(() => categories.length ? categories : fallbackCategories, [categories]);

  const filtered = useMemo(() => {
    let out = [...apiProducts];

    if (activeCat !== 'all') {
      out = out.filter((product) => String(product.category_id ?? '') === activeCat);
    }

    if (search) {
      const q = search.toLowerCase();
      out = out.filter((product) => {
        const category = categoryList.find((item) => productBelongsToCategory(product, item));
        const searchable = [
          product.name,
          product.slug,
          product.category_name,
          product.category_slug,
          product.subcategory,
          product.short_desc,
          product.description,
          ...(Array.isArray(product.tags) ? product.tags : []),
          ...(Array.isArray(product.features) ? product.features : []),
          category?.name,
        ].filter((value): value is string => typeof value === 'string');
        return searchable.some((value) => value.toLowerCase().includes(q));
      });
    }

    return out;
  }, [apiProducts, activeCat, categoryList, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: apiProducts.length };
    for (const category of categoryList) {
      counts[category.id] = apiProducts.filter((product) => String(product.category_id ?? '') === category.id).length;
    }
    return counts;
  }, [apiProducts, categoryList]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-white"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>;
  }

  return (
    <>
      <PageMeta
        title="All Products | OPCIEAS"
        description="Browse OPCIEAS product categories for premium office furniture, industrial storage, educational furniture, stainless steel solutions and more."
        keywords="commercial furniture, office furniture, industrial storage, educational furniture, stainless steel racks, bathroom storage, hostel furniture, premium seating"
        canonical="https://www.opcieascommercialfurniture.com/products"
        schema={{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'OPCIEAS Products', description: 'Product categories and commercial furniture solutions from OPCIEAS.' }}
      />
      <SectionBanner title="All Products" tagline={loadError ? 'Product data unavailable' : `${apiProducts.length} commercial furniture solutions`} image={CATEGORY_BANNERS['Educational Furniture']} crumb="Products" crumbTo="/products" />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {categoryList.map((category, index) => {
              const count = categoryCounts[category.id] || 0;
              const categoryImage = CATEGORY_BANNERS[category.name as keyof typeof CATEGORY_BANNERS] ||
                (category.slug === 'fiberglass-special-order' ? getBusinessVerticalImages('fiberglass')[0] : null) ||
                CATEGORY_BANNERS['Educational Furniture'];
              return (
                <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * 0.08 }}>
                  <Link to={`/products/category/${category.slug}`} className="group relative block overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={categoryImage} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-navy">{category.name}</h3>
                      <p className="mt-1 font-sub text-xs text-navy/70">{loadError ? 'Product count unavailable' : `${count} product${count !== 1 ? 's' : ''}`}</p>
                      <span className="mt-3 inline-flex items-center gap-1 font-sub text-xs text-gold font-medium">View Products <ArrowRight className="h-3 w-3" /></span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy/5 py-20">
        <div className="container-x px-6">
          <div className="mb-8 flex flex-col gap-4 rounded-lux bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search all products..." className="w-full rounded-full bg-navy/5 px-10 py-2.5 font-sub text-sm text-navy outline-none ring-1 ring-navy/10 focus:ring-gold" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCat('all')}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sub text-xs transition ${activeCat === 'all' ? 'bg-gold text-navy' : 'bg-gray-100 text-navy hover:bg-gray-200'}`}
              >
                <Grid3X3 className="h-3.5 w-3.5" /> All Categories {loadError ? '(unavailable)' : `(${categoryCounts.all || 0})`}
              </button>
              {categoryList.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCat(category.id)}
                  className={`rounded-full px-4 py-2 font-sub text-xs transition ${activeCat === category.id ? 'bg-gold text-navy' : 'bg-gray-100 text-navy hover:bg-gray-200'}`}
                >
                  {category.name} {loadError ? '(unavailable)' : `(${categoryCounts[category.id] || 0})`}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-6 font-sub text-sm text-navy/50">{loadError ? 'Product count unavailable' : `${filtered.length} product(s)`}</p>

          {loadError ? (
            <div role="alert" className="rounded-lux border border-navy/10 bg-white px-5 py-4 font-body text-sm text-navy/70">
              Product data could not be loaded from the configured API: {loadError}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center"><p className="font-sub text-sm text-navy/50">No products found.</p></div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product, index) => (
                <ProductCard key={product.id || `${product.slug}-${index}`} product={product} index={index} categorySlug={categoryList.find((category) => category.id === String(product.category_id ?? ''))?.slug} />
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/catalogue" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm text-navy"><Download className="h-4 w-4" /> Download Catalogue</Link>
            <a href="https://wa.me/919845579049" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Inquiry</a>
          </div>
        </div>
      </section>
    </>
  );
}
