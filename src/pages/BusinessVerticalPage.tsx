import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Boxes, Search, Download, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import ProductCard from '../components/ProductCard';
import SectionBanner from '../components/SectionBanner';
import { BUSINESS_VERTICALS, type BusinessVerticalSlug, verticalCategoriesSummary, getBusinessVerticalImages } from '../lib/businessVerticalImages';
import { CATEGORY_BANNERS, CANONICAL_CATEGORIES, type CanonicalCategoryName } from '../lib/images';
import { fetchCategories, fetchProducts, type Product, type Category } from '../lib/data';

const fallbackCategories: Pick<Category, 'id' | 'name' | 'slug'>[] = CANONICAL_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
}));

function productMatchesNamePatterns(product: Product, patterns: readonly string[]): boolean {
  const haystack = `${product.name} ${product.short_desc ?? ''}`.toLowerCase();
  return patterns.some((pattern) => haystack.includes(pattern.toLowerCase()));
}

function pickBannerImage(verticalSlug: BusinessVerticalSlug, vert: typeof BUSINESS_VERTICALS[BusinessVerticalSlug]): string {
  const assetKey = (verticalSlug.split('-')[0] || 'educational') as 'educational' | 'institutional' | 'storage' | 'fiberglass';
  const vertImages = getBusinessVerticalImages(assetKey);
  if (vertImages[0]) return vertImages[0];
  const categories = verticalCategoriesSummary(verticalSlug);
  const firstBanner = categories.find((category) => CATEGORY_BANNERS[category as CanonicalCategoryName]);
  if (firstBanner) return CATEGORY_BANNERS[firstBanner as CanonicalCategoryName];
  return vert.highlights[0] ? '' : '';
}

export default function BusinessVerticalPage() {
  const { verticalSlug } = useParams<{ verticalSlug: string }>();
  const slugKey = verticalSlug as BusinessVerticalSlug;
  const vertical = verticalSlug ? BUSINESS_VERTICALS[slugKey] : undefined;

  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Pick<Category, 'id' | 'name' | 'slug'>[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [allProducts, categoryList] = await Promise.all([fetchProducts(), fetchCategories()]);
      setApiProducts(allProducts);
      setCategories(categoryList.length ? categoryList.map((category) => ({ id: category.id, name: category.name, slug: category.slug })) : fallbackCategories);
      setLoading(false);
    })();
  }, [verticalSlug]);

  const categoryList = useMemo(() => categories.length ? categories : fallbackCategories, [categories]);

  const verticalProducts = useMemo(() => {
    if (!vertical) return [] as Product[];

    const targetIds = new Set(vertical.categoryIds.map((id) => String(id)));
    const targetNames = new Set(verticalCategoriesSummary(slugKey).map((name) => name.toLowerCase()));
    const patterns = (vertical as any).namePatterns as readonly string[] | undefined;

    return apiProducts.filter((product) => {
      const categoryId = String(product.category_id ?? '');
      const categoryName = categoryList.find((category) => category.id === categoryId)?.name ?? '';
      const matchesId = targetIds.has(categoryId);
      const matchesName = targetNames.has(categoryName.toLowerCase());
      const matchesPattern = !!patterns && productMatchesNamePatterns(product, patterns);
      return matchesId || matchesName || matchesPattern;
    });
  }, [apiProducts, categoryList, slugKey, vertical]);

  let filtered = [...verticalProducts];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((product) => {
      const categoryName = categoryList.find((category) => category.id === String(product.category_id ?? ''))?.name ?? '';
      return product.name.toLowerCase().includes(q) ||
        (product.short_desc || '').toLowerCase().includes(q) ||
        categoryName.toLowerCase().includes(q);
    });
  }

  if (!vertical) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-heading text-2xl font-bold text-navy">Business vertical not found</p>
        <Link to="/" className="mt-4 rounded-full bg-gold px-6 py-2 font-sub text-sm text-navy">Return Home</Link>
      </div>
    );
  }

  const bannerImage = pickBannerImage(slugKey, vertical);
  const categoryNames = verticalCategoriesSummary(slugKey);

  return (
    <>
      <PageMeta
        title={`${vertical.name} | OPCIEAS`}
        description={`Explore existing OPCIEAS products across the ${vertical.name} business vertical.`}
        keywords={`${vertical.name}, OPCIEAS, products, ${categoryNames.join(', ').toLowerCase()}`}
        canonical={`https://www.opcieascommercialfurniture.com/products/vertical/${slugKey}`}
      />
      <SectionBanner
        title={vertical.name}
        tagline={`${verticalProducts.length} product${verticalProducts.length !== 1 ? 's' : ''} • ${categoryNames.join(' + ')}`}
        image={bannerImage || CATEGORY_BANNERS['Office Furniture']}
        crumb={vertical.name}
        crumbTo={`/products/vertical/${slugKey}`}
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 grid gap-6 rounded-lux border border-navy/10 bg-navy/5 p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Business Vertical</p>
              <h1 className="mt-2 font-heading text-2xl font-black text-navy sm:text-3xl">{vertical.name}</h1>
              <p className="mt-3 font-body text-sm text-navy/70 leading-relaxed">{vertical.overview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {vertical.highlights.map((item) => (
                  <span key={item} className="rounded-full border border-navy/10 bg-white px-3 py-1.5 font-sub text-xs text-navy/70">{item}</span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/products" className="inline-flex items-center gap-1.5 font-sub text-xs font-semibold text-gold">
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" /> All Product Categories
                </Link>
                <Link to="/rfq" className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 font-sub text-xs font-semibold text-navy">
                  Request Quote <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="rounded-lux bg-white p-5 shadow-sm">
              <p className="font-heading text-sm font-bold text-navy">Categories Included</p>
              <ul className="mt-3 space-y-2">
                {categoryNames.map((categoryName) => {
                  const catSlug = CANONICAL_CATEGORIES.find((x) => x.name === categoryName)?.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <li key={categoryName} className="flex items-center justify-between border-b border-navy/5 pb-2 last:border-0 last:pb-0">
                      <span className="font-body text-sm text-navy/70">{categoryName}</span>
                      <Link to={`/products/category/${catSlug}`} className="font-sub text-xs text-gold hover:underline">View Category →</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          <div className="mb-8 flex flex-col gap-4 rounded-lux bg-navy/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-full bg-white px-10 py-2.5 font-sub text-sm text-navy outline-none ring-1 ring-navy/10 transition focus:ring-gold" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-4 py-2.5 font-sub text-sm text-navy"><Download className="h-4 w-4" /> Catalogue</Link>
              <a href={`https://wa.me/919845579049?text=I'm%20interested%20in%20${encodeURIComponent(vertical.name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Boxes className="mb-4 h-12 w-12 text-navy/20" />
              <p className="font-sub text-sm text-navy/50">No matching products. This vertical aggregates products from: {categoryNames.join(', ')}. Try a different search or browse All Products.</p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 font-sub text-xs text-navy">
                Browse All Products <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-6 font-sub text-sm text-navy/50">{filtered.length} product(s) in {vertical.name}</p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((product, index) => (
                  <ProductCard key={product.id || `${product.slug}-${index}`} product={product} index={index} categorySlug={categoryList.find((category) => category.id === String(product.category_id ?? ''))?.slug} />
                ))}
              </motion.div>
            </>
          )}

          <div className="mt-14 text-center">
            <Link to="/products" className="inline-flex items-center gap-2 font-sub text-sm text-gold">
              Browse all product categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
