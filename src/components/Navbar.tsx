import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, FileText, Globe, MessageCircle, ChevronDown } from 'lucide-react';
import companyLogo from '../assets/logo/logo.png';
import opcIeasTextWordmark from '../assets/logo/OPCIEAS_approved_text_wordmark.png';
import { fetchCategories, fetchProducts, resolveProductImage, resolveCategoryFromSlug, normalizeCategorySlug, normalizeCategoryName, canonicalizeCategory, type Category, type Product } from '../lib/data';
import { HOMEPAGE_SHOWCASE_CATALOG, type ProductAsset } from '../lib/productAssetResolver';

const menu = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Company', 
    items: [
      { name: 'About Us', to: '/company/about' },
      { name: 'Manufacturing', to: '/manufacturing' },
      { name: 'Tech Business Promotion', to: '/tech-business-promotion' },
      { name: 'Certifications & Quality', to: '/quality' },
    ],
  },
  {
    label: 'Products',
    to: '/products',
  },
  {
    label: 'Business',
    items: [
      { name: 'Supplier Onboarding', to: '/supplier' },
      { name: 'Buyer Registration', to: '/buyer' },
      { name: 'Membership', to: '/membership' },
      { name: 'Request Quote', to: '/rfq' },
    ],
  },
  {
    label: 'Special',
    items: [
      { name: 'Social Services — Rural Development', to: '/social-service' },
      { name: 'Social Services — Affluent Aged Dignity Living', to: '/community-impact' },
      { name: 'Agriculture — Fisheries & Aquaculture', to: '/fisheries-aquaculture' },
      { name: 'Community Impact', to: '/community-impact' },
      { name: 'Compliance & Governance', to: '/compliance' },
      { name: 'Government Tenders', to: '/government-tenders' },
      { name: 'Export Services', to: '/export' },
    ],
  },
  {
    label: 'Contact',
    to: '/contact',
  },
];

const fallbackCategorySeed: Category[] = [
  { id: '2', name: 'Educational Furniture', slug: 'educational-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 2, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '3', name: 'School Furniture', slug: 'school-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 3, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '5', name: 'Hostel Furniture', slug: 'hostel-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 5, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '6', name: 'Industrial Storage', slug: 'industrial-storage', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 6, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '7', name: 'Bathroom Collection', slug: 'bathroom-collection', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 7, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '8', name: 'Letter Boxes', slug: 'letter-boxes', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 8, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
];

function getProductDetailPath(product: Product): string {
  if (product.slug) return `/product/${product.slug}`;
  if (product.id) return `/product/${product.id}`;
  return '/products';
}

function isViteAssetUrl(value?: string | null): boolean {
  return !!value && (/^\/src\/assets\//i.test(value) || /^\/assets\//i.test(value));
}

function resolveNavbarImage(image?: string | null): string | null {
  if (!image) return null;
  return isViteAssetUrl(image) ? image : resolveProductImage(image);
}

type PreviewProduct = {
  name: string;
  slug?: string;
  image: string;
  short_desc?: string | null;
  href: string;
  fromAsset: boolean;
};

function normalizeSubcategoryValue(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value.map((item) => normalizeSubcategoryValue(item)).filter(Boolean).join(' ');
  }
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).map((item) => normalizeSubcategoryValue(item)).filter(Boolean).join(' ');
  }
  return String(value);
}

function normalizeSubcategoryLabel(value?: string | null): string {
  return normalizeCategoryName(value || '').replace(/\s*\/\s*/g, ' / ');
}

function getCategoryRoute(category: Pick<Category, 'id' | 'name' | 'slug'>): string {
  const resolved = resolveCategoryFromSlug(category.slug || category.name, [category]);
  return `/products/category/${resolved?.slug || normalizeCategorySlug(category.slug || category.name || 'products')}`;
}

function getSubcategoryRoute(category: Pick<Category, 'id' | 'name' | 'slug'>, subcategory: string | null): string {
  const path = getCategoryRoute(category);
  if (!subcategory) return path;
  return `${path}?subcategory=${encodeURIComponent(normalizeCategorySlug(subcategory) || normalizeCategoryName(subcategory))}`;
}

function productMatchesCategory(product: Product, category: Pick<Category, 'id' | 'name' | 'slug'>): boolean {
  const categoryId = String(category.id ?? '');
  const productCategoryId = String(product.category_id ?? '');
  if (categoryId && productCategoryId && categoryId === productCategoryId) return true;
  if (category.slug && normalizeCategorySlug(product.category_id ?? '') === normalizeCategorySlug(category.slug)) return true;
  const categoryName = normalizeCategoryName(category.name).toLowerCase();
  const productCategoryName = normalizeCategoryName((product as any).category_name ?? (product as any).category ?? '').toLowerCase();
  return !!categoryName && !!productCategoryName && categoryName === productCategoryName;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsPanel, setProductsPanel] = useState(false);
  const closeProductsPanel = () => setProductsPanel(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('/');
  const [categories, setCategories] = useState<Category[]>(fallbackCategorySeed);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchCategories(), fetchProducts()])
      .then(([categoryList, productList]) => {
        if (!mounted) return;
        const liveBySlug = new Map(categoryList.map((category) => [category.slug, category]));
        const normalizedCategories = fallbackCategorySeed.map((fallback) => {
          const live = liveBySlug.get(fallback.slug);
          return live ? { ...fallback, ...live, name: fallback.slug === 'letter-boxes' ? 'Letter Boxes' : live.name } : fallback;
        });
        const extraCategories = categoryList.filter((category) => !fallbackCategorySeed.some((fallback) => fallback.slug === category.slug));
        setCategories([...normalizedCategories, ...extraCategories].sort((a, b) => (Number(a.sort_order ?? 999) - Number(b.sort_order ?? 999)) || a.name.localeCompare(b.name)));
        setAllProducts(productList);
      })
      .catch(() => {
        if (!mounted) return;
        setCategories(fallbackCategorySeed);
        setAllProducts([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categoryMenuRows = useMemo(() => {
    const activeCategories = categories
      .map((category) => canonicalizeCategory(category) ?? category)
      .filter((category): category is Category => !!category && !!category.name && !!category.slug && !['office-furniture', 'hospital-furniture'].includes(normalizeCategorySlug(category.slug)));

    return activeCategories.map((category) => {
      const categoryProducts = allProducts.filter((product) => productMatchesCategory(product, category));
      const subcategoryGroups = new Map<string, Product[]>();

      for (const product of categoryProducts) {
        const rawSubcategory = normalizeSubcategoryValue(product.subcategory ?? product.short_desc ?? product.description ?? product.tags ?? category.name);
        const displayName = normalizeSubcategoryLabel(rawSubcategory) || category.name;
        if (displayName.toLowerCase() === category.name.toLowerCase()) continue;
        const key = normalizeCategorySlug(displayName) || 'general';
        const existing = subcategoryGroups.get(key) ?? [];
        existing.push(product);
        subcategoryGroups.set(key, existing);
      }

      const subcategories = Array.from(subcategoryGroups.entries())
        .map(([key, products]) => {
          const label = normalizeSubcategoryLabel(products[0]?.subcategory ?? products[0]?.short_desc ?? products[0]?.description ?? products[0]?.name ?? key.replace(/-/g, ' '));
          return { key, label, products: products.slice(0, 2) };
        })
        .filter((item) => item.label && item.label.toLowerCase() !== category.name.toLowerCase())
        .slice(0, 4);

      const previewProducts = subcategories.length ? subcategories.flatMap((group) => group.products).slice(0, 5) : categoryProducts.slice(0, 5);
      const fallbackAssets: ProductAsset[] =
        HOMEPAGE_SHOWCASE_CATALOG[category.name] ??
        HOMEPAGE_SHOWCASE_CATALOG[category.name.endsWith(' Box') ? `${category.name}es` : category.name.replace(/Boxes$/, ' Box')] ??
        [];
      const mergedProducts: PreviewProduct[] = [...previewProducts].slice(0, 5).map((product) => ({
        name: product.name,
        slug: product.slug || String(product.id),
        image: resolveNavbarImage(product.image) || '',
        short_desc: product.subcategory || product.short_desc || category.name,
        href: getProductDetailPath(product),
        fromAsset: false,
      }));

      const previewImages = mergedProducts.map((product) => product.image).filter(Boolean).slice(0, 3);
      if (previewImages.length === 0 && fallbackAssets.length) {
        fallbackAssets.slice(0, 3).forEach((asset) => previewImages.push(asset.image));
      }

      return {
        category,
        products: mergedProducts,
        subcategories,
        previewImages,
      };
    });
  }, [categories, allProducts]);

  const commercialFurniturePreviews = useMemo(() => {
    const firstCategories = ['Educational Furniture', 'Hostel Furniture', 'Industrial Storage'];
    const previews: string[] = [];
    for (const name of firstCategories) {
      const assetList = HOMEPAGE_SHOWCASE_CATALOG[name];
      if (assetList && assetList.length) previews.push(assetList[0].image);
    }
    return previews;
  }, []);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Observe sections on the home page to update active menu item
  useEffect(() => {
    const ids = ['overview', 'why-choose-us', 'manufacturing', 'hero'];
    const observers: IntersectionObserver[] = [];
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id || '/');
        }
      });
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(onIntersect, { root: null, threshold: 0.3 });
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const goTo = (to: string, scrollId?: string) => {
    if (!scrollId) {
      navigate(to);
      return;
    }

    const doScroll = () => {
      const el = document.getElementById(scrollId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      // allow navigation to settle
      setTimeout(doScroll, 120);
    } else {
      doScroll();
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 z-[1000] h-[82px] w-full transition-all duration-500 lg:h-[92px] ${
          scrolled ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-white/80 backdrop-blur'
        }`}
      >
        <div className="container-x flex h-full items-center justify-between px-6 lg:px-8">
          <Link
            to="/"
            aria-label="OPCIEAS Pvt. Ltd."
            className="inline-flex h-full shrink-0 items-center"
          >
            <div className="flex items-center gap-[4px] sm:gap-[6px] lg:gap-[8px]">
              <img
                src={companyLogo}
                alt="OPCIEAS approved emblem"
                className="h-[56px] w-[56px] shrink-0 object-contain sm:h-[62px] sm:w-[62px] lg:h-[68px] lg:w-[68px]"
              />

              <div className="flex flex-col leading-none">
                <img
                  src={opcIeasTextWordmark}
                  alt="OPCIEAS approved wordmark"
                  className="block h-[46px] w-auto shrink-0 object-contain sm:h-[54px] lg:h-[62px]"
                />
              </div>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden h-full items-center gap-1 lg:flex">
            {menu.map((m) => {
              if (m.label === 'Products') {
                return (
                  <div key={m.label} className="relative flex items-center h-full" onMouseEnter={() => setProductsPanel(true)} onMouseLeave={() => setProductsPanel(false)}>
                    <button type="button" onClick={() => { setProductsPanel((value) => !value); navigate('/products'); }} className="group relative inline-flex h-full items-center gap-1 px-4 font-sub text-sm font-medium leading-none text-navy/70 transition-colors hover:text-gold">
                      <span>Products</span>
                      <ChevronDown className="h-3 w-3" />
                      <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-2/3" />
                    </button>

                    <AnimatePresence>
                      {productsPanel && (
                        <motion.div initial={{ opacity: 0, x: '-50%', y: 4 }} animate={{ opacity: 1, x: '-50%', y: 0 }} exit={{ opacity: 0, x: '-50%', y: 4 }} transition={{ duration: 0.2 }} className="pointer-events-auto fixed left-[50vw] top-[68px] z-[1100] box-border w-[calc(100vw-32px)] max-w-[1200px]">
                          <div className="box-border max-h-[calc(100vh-92px)] overflow-x-hidden overflow-y-auto rounded-lux border border-border-grey bg-white p-4 shadow-lg">
                            <div className="mb-4 flex items-center justify-between gap-3 border-b border-border-grey pb-3">
                              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Products</p>
                              <Link to="/products" onClick={closeProductsPanel} className="font-sub text-xs font-semibold text-navy/70 hover:text-gold">All Categories</Link>
                            </div>
                              <Link to="/furniture" onClick={closeProductsPanel} className={`mb-4 block rounded-xl border p-4 transition ${location.pathname === '/furniture' ? 'border-gold bg-gold/10' : 'border-gold/40 bg-gold/5 hover:bg-gold/10'}`}>
                                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                  <div className="md:flex-1">
                                    <p className="font-heading text-base font-bold text-navy">Commercial Furniture</p>
                                    <p className="mt-1 font-body text-xs text-navy/70">Commercial &amp; Institutional Bulk Supply</p>
                                    <span className="mt-2 inline-block font-sub text-[10px] uppercase tracking-[0.18em] text-gold">Explore Commercial Furniture →</span>
                                  </div>
                                  {commercialFurniturePreviews.length > 0 && (
                                    <div className="flex gap-2" aria-hidden="true">
                                      {commercialFurniturePreviews.map((src, idx) => (
                                        <img key={`com-${idx}`} src={src} alt="Commercial furniture preview" className="h-14 w-14 rounded-md border border-white/60 object-contain bg-white shadow-sm sm:h-16 sm:w-16" loading="lazy" />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {categoryMenuRows.map(({ category, products, subcategories, previewImages }) => (
                                <div key={category.id} className="rounded-xl border border-navy/10 bg-light-grey/40 p-3">
                                  <div className="mb-2 flex items-center justify-between gap-2">
                                    <Link to={getCategoryRoute(category)} onClick={closeProductsPanel} className="font-heading text-sm font-bold text-navy hover:text-gold">
                                      {category.name}
                                    </Link>
                                    <Link to={getCategoryRoute(category)} onClick={closeProductsPanel} className="font-sub text-[10px] uppercase tracking-[0.18em] text-navy/50 hover:text-gold">View all</Link>
                                  </div>
                                  {previewImages && previewImages.length > 0 && (
                                    <Link to={getCategoryRoute(category)} onClick={closeProductsPanel} className="mb-3 block" aria-label={`${category.name} preview images`}>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        {previewImages.map((src, idx) => (
                                          <img
                                            key={`preview-${category.id}-${idx}`}
                                            src={src}
                                            alt={`${category.name} preview ${idx + 1}`}
                                            className="h-14 w-full rounded-md border border-white/60 object-contain bg-white shadow-sm sm:h-16"
                                            loading="lazy"
                                          />
                                        ))}
                                      </div>
                                    </Link>
                                  )}
                                  {subcategories.length > 0 ? (
                                    <div className="space-y-3">
                                      {subcategories.map((subcategory) => (
                                        <div key={`${category.id}-${subcategory.key}`} className="rounded-lg border border-navy/10 bg-white p-2">
                                          <Link to={getSubcategoryRoute(category, subcategory.label)} onClick={closeProductsPanel} className="mb-2 block font-sub text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/70 hover:text-gold">
                                            {subcategory.label}
                                          </Link>
                                          <div className="space-y-2">
                                            {subcategory.products.map((product, idx) => {
                                              const resolved = resolveNavbarImage(product.image);
                                              return (
                                                <Link key={`${product.slug || product.name}-${idx}`} to={getProductDetailPath(product)} onClick={closeProductsPanel} className="group flex min-w-0 items-center gap-2 rounded-md border border-transparent bg-light-grey/60 p-1.5 transition hover:border-gold/40 hover:bg-gold/5">
                                                  {resolved ? <img src={resolved} alt={product.name} className="h-10 w-10 rounded-md object-cover bg-white" loading="lazy" /> : <div className="h-10 w-10 rounded-md bg-navy/10" aria-hidden="true" />}
                                                  <div className="min-w-0 flex-1">
                                                    <p className="break-words font-sub text-[10px] font-semibold text-navy group-hover:text-gold">{product.name}</p>
                                                  </div>
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : products.length ? (
                                    <div className="grid grid-cols-1 gap-2">
                                      {products.map((product, idx) => {
                                        const resolved = resolveNavbarImage(product.image);
                                        return (
                                          <Link key={`${product.slug || product.name}-${idx}`} to={product.href} onClick={closeProductsPanel} className="group flex min-w-0 items-center gap-2 rounded-lg border border-transparent bg-white p-2 transition hover:border-gold/40 hover:bg-gold/5">
                                            {resolved ? <img src={resolved} alt={product.name} className="h-12 w-12 rounded-md object-contain bg-white" loading="lazy" /> : <div className="h-12 w-12 rounded-md bg-navy/10" aria-hidden="true" />}
                                            <div className="min-w-0 flex-1">
                                              <p className="break-words font-sub text-[11px] font-semibold text-navy group-hover:text-gold">{product.name}</p>
                                              {product.short_desc ? <p className="break-words font-body text-[10px] text-navy/60">{product.short_desc}</p> : <p className="break-words font-body text-[10px] text-navy/50">{category.name}</p>}
                                            </div>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <p className="font-body text-xs text-navy/50">No products available</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div key={m.label} className="relative flex items-center h-full" onMouseEnter={() => { closeProductsPanel(); setMega(m.items ? m.label : null); }} onMouseLeave={() => setMega((cur) => (cur === m.label ? null : cur))}>
                  {m.to ? (
                    <Link to={m.to} className="group relative inline-flex h-full items-center gap-1 px-4 font-sub text-sm font-medium leading-none text-navy/70 transition-colors hover:text-gold">
                      <span>{m.label}</span>
                      <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-2/3" />
                    </Link>
                  ) : (
                    <span className={`group relative inline-flex h-full items-center gap-1 cursor-pointer px-4 font-sub text-sm font-medium leading-none transition-colors ${m.label === 'Home' && ['overview','why-choose-us','manufacturing'].includes(activeId) ? 'text-gold' : 'text-navy/70'} hover:text-gold`}>
                      <span>{m.label}</span>
                      {m.items && <ChevronDown className="h-3 w-3" />}
                      <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-2/3" />
                    </span>
                  )}

                  <AnimatePresence>
                    {m.items && mega === m.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 ${
                          m.label === 'Special' ? 'w-[min(380px,calc(100vw-32px))]' : ''
                        }`}
                      >
                        <div
                          className={`bg-white border border-border-grey rounded-lux shadow-lg ${
                            m.label === 'Special'
                              ? 'p-3 w-full max-h-[calc(100dvh-100px)] lg:max-h-[calc(100vh-110px)] overflow-y-auto'
                              : 'p-4'
                          }`}
                        >
                          <div className={m.label === 'Special' ? 'space-y-1.5' : 'space-y-1'}>
                            {m.items.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => { setMega(null); goTo(item.to, (item as any).scrollId); }}
                                className={`group flex w-full rounded-xl text-left transition hover:bg-light-grey/50 ${
                                  m.label === 'Special'
                                    ? 'items-start gap-3 py-3 px-4'
                                    : 'items-center gap-3 p-2.5'
                                }`}
                              >
                                <div
                                  className={`flex items-center justify-center rounded-lg bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy ${
                                    m.label === 'Special' ? 'mt-0.5 h-8 w-8 flex-shrink-0' : 'h-8 w-8'
                                  }`}
                                >
                                  <FileText className="h-3.5 w-3.5" />
                                </div>
                                <span
                                  className={`font-sub text-sm ${
                                    ((item as any).scrollId && activeId === (item as any).scrollId)
                                      ? 'text-gold'
                                      : 'text-navy/70'
                                  } group-hover:text-gold ${
                                    m.label === 'Special' ? 'leading-[1.4] flex-1' : ''
                                  }`}
                                >
                                  {item.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="relative hidden h-full items-center gap-3 lg:flex">
            <div className="relative">
              <button onClick={() => setLangOpen((s) => !s)} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border-grey px-3 text-xs font-sub text-navy/70 transition hover:border-gold hover:text-gold"><Globe className="h-3.5 w-3.5" /> EN</button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lux bg-white border border-border-grey p-2 shadow-lg">
                  <button className="w-full text-left rounded px-3 py-2 font-sub text-sm text-navy">English <span className="text-gold">(Active)</span></button>
                  <button className="w-full text-left rounded px-3 py-2 font-sub text-sm text-navy/60">Hindi <span className="text-navy/40">(Coming Soon)</span></button>
                </div>
              )}
            </div>
            <Link to="/catalogue" className="inline-flex h-10 items-center gap-2 rounded-full border border-navy/20 bg-navy/5 px-4 py-0 font-sub text-sm text-navy hover:border-navy/40 hover:bg-navy/10 transition"><Download className="h-4 w-4" /> Catalogue</Link>
            <Link to="/rfq" className="btn-gold inline-flex h-10 items-center justify-center rounded-full px-5 py-0 font-sub text-sm">Request Quote</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="relative z-[1002] text-navy lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1001] bg-black/20 lg:hidden" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 z-[1002] h-full w-[80vw] max-w-sm overflow-y-auto bg-white p-6 pt-20 lg:hidden">
              {menu.map((m) => {
                if (m.label === 'Products') {
                  return (
                    <div key={m.label} className="border-b border-border-grey py-3">
                      <div className="flex items-center justify-between gap-2">
                        <button type="button" onClick={() => setProductsOpen((value) => !value)} className="font-sub text-base font-bold text-navy">{m.label}</button>
                        <ChevronDown className={`h-4 w-4 text-gold transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                        <Link to="/products" onClick={() => setOpen(false)} className="font-sub text-xs text-gold">All Categories</Link>
                      </div>
                      {productsOpen && <div className="mt-3 space-y-3 pl-2">
                        <Link to="/furniture" onClick={() => setOpen(false)} className={`block rounded-lg border p-3 ${location.pathname === '/furniture' ? 'border-gold bg-gold/10' : 'border-gold/40 bg-gold/5'}`}>
                          <p className="font-sub text-sm font-bold text-navy">Commercial Furniture</p>
                          <p className="mt-1 font-body text-xs text-navy/70">Commercial &amp; Institutional Bulk Supply</p>
                        </Link>
                        {categoryMenuRows.map(({ category, products, subcategories, previewImages }) => (
                          <div key={category.id} className="rounded-lg border border-navy/10 bg-light-grey/40 p-2">
                            <Link to={getCategoryRoute(category)} onClick={() => setOpen(false)} className="font-sub text-sm font-semibold text-navy hover:text-gold">{category.name}</Link>
                            {previewImages && previewImages.length > 0 && (
                              <div className="mt-2 grid grid-cols-3 gap-1.5">
                                {previewImages.map((src, idx) => (
                                  <img
                                    key={`mobile-preview-${category.id}-${idx}`}
                                    src={src}
                                    alt={`${category.name} preview ${idx + 1}`}
                                    className="h-10 w-full rounded border border-white/60 object-contain bg-white shadow-sm"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            )}
                            {subcategories.length > 0 ? (
                              <div className="mt-2 space-y-2">
                                {subcategories.map((subcategory) => (
                                  <div key={`${category.id}-${subcategory.key}`} className="rounded-md bg-white p-2">
                                    <Link to={getSubcategoryRoute(category, subcategory.label)} onClick={() => setOpen(false)} className="font-sub text-[10px] uppercase tracking-[0.14em] text-navy/70">{subcategory.label}</Link>
                                    <div className="mt-1 space-y-1.5">
                                      {subcategory.products.map((product, idx) => {
                                        const resolved = resolveNavbarImage(product.image);
                                        return (
                                          <Link key={`${product.slug || product.name}-${idx}`} to={getProductDetailPath(product)} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md bg-light-grey/60 p-1.5 text-left">
                                            {resolved ? <img src={resolved} alt={product.name} className="h-8 w-8 rounded object-cover bg-white" loading="lazy" /> : <div className="h-8 w-8 rounded bg-navy/10" aria-hidden="true" />}
                                            <span className="truncate font-sub text-xs text-navy/70">{product.name}</span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : products.length ? (
                              <div className="mt-2 space-y-1.5">
                                {products.map((product, idx) => {
                                  const resolved = resolveNavbarImage(product.image);
                                  return (
                                    <Link key={`${product.slug || product.name}-${idx}`} to={product.href} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md bg-white p-1.5 text-left">
                                      {resolved ? <img src={resolved} alt={product.name} className="h-8 w-8 rounded object-contain bg-white" loading="lazy" /> : <div className="h-8 w-8 rounded bg-navy/10" aria-hidden="true" />}
                                      <span className="truncate font-sub text-xs text-navy/70">{product.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="mt-2 font-sub text-[11px] text-navy/50">No products available</p>
                            )}
                          </div>
                        ))}
                      </div>}
                    </div>
                  );
                }

                return (
                  <div key={m.label}>
                    {m.to ? (
                      <Link to={m.to} onClick={() => setOpen(false)} className="block border-b border-border-grey py-3 font-sub text-base text-navy/70">{m.label}</Link>
                    ) : (
                      <div className="border-b border-border-grey py-3">
                        <p className="font-sub text-base font-bold text-navy">{m.label}</p>
                        <div className="mt-2 space-y-1 pl-4">
                          {m.items?.map((item) => (
                            <button key={item.name} onClick={() => { setOpen(false); goTo(item.to, (item as any).scrollId); }} className="block w-full text-left py-1.5 font-sub text-sm text-navy/70 hover:text-gold">{item.name}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/catalogue" onClick={() => setOpen(false)} className="inline-flex justify-center items-center rounded-full px-4 py-3 font-sub text-sm border border-navy/20 bg-navy/5 text-navy hover:bg-navy/10">Download Catalogue</Link>
                <Link to="/rfq" onClick={() => setOpen(false)} className="btn-gold rounded-full px-4 py-3 text-center font-sub text-sm">Request Quote</Link>
                <a href="https://wa.me/919845579049" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
