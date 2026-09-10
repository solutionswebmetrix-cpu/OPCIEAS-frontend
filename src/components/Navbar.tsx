import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, FileText, Globe, MessageCircle, ChevronDown } from 'lucide-react';
import companyLogo from '../assets/logo/logo.png';
import { fetchCategories, fetchProducts, type Category, type Product } from '../lib/data';

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
  { id: '1', name: 'Office Furniture', slug: 'office-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 1, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '2', name: 'Educational Furniture', slug: 'educational-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 2, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '3', name: 'School Furniture', slug: 'school-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 3, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '4', name: 'Hospital Furniture', slug: 'hospital-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 4, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
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
    const productsByCategory = new Map<string, Product[]>();

    for (const product of allProducts) {
      const categoryId = String(product.category_id ?? '');
      if (!categoryId) continue;
      const current = productsByCategory.get(categoryId) ?? [];
      current.push(product);
      productsByCategory.set(categoryId, current);
    }

    return categories
      .filter((category) => category && category.name && category.slug)
      .map((category) => ({
        category,
        products: (productsByCategory.get(String(category.id)) ?? []).slice(0, 5),
      }));
  }, [categories, allProducts]);

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
        className={`fixed top-0 z-[1000] h-[84px] w-full transition-all duration-500 lg:h-24 ${
          scrolled ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-white/80 backdrop-blur'
        }`}
      >
        <div className="container-x flex h-full items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex h-full shrink-0 items-center gap-0">
            <img src={companyLogo} alt="OPCIEAS approved emblem" className="h-18 w-18 shrink-0 object-contain sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20" />
            <span className="flex shrink-0 flex-col items-center justify-center text-center text-[#123c35]">
              <span className="whitespace-nowrap text-[30px] font-bold leading-none sm:text-[34px] lg:text-[38px]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>OPCIEAS</span>
              <span className="whitespace-nowrap text-[16px] leading-[1.1] sm:text-[18.6px] lg:text-[21px]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Private Limited</span>
              <span className="mt-1.5 flex items-center justify-center gap-1.5 text-[6px] font-semibold leading-none tracking-[0.1em] sm:gap-2 sm:text-[7px] sm:tracking-[0.12em] lg:text-[8px]">
                <span className="h-px w-5 shrink-0 bg-gold sm:w-7 lg:w-9" aria-hidden="true" />
                <span className="whitespace-nowrap">HAND CRAFTED SINCE 1999</span>
                <span className="h-px w-5 shrink-0 bg-gold sm:w-7 lg:w-9" aria-hidden="true" />
              </span>
            </span>
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
                              <p className="font-heading text-base font-bold text-navy">Commercial Furniture</p>
                              <p className="mt-1 font-body text-xs text-navy/70">Commercial &amp; Institutional Bulk Supply</p>
                              <span className="mt-2 inline-block font-sub text-[10px] uppercase tracking-[0.18em] text-gold">Explore Commercial Furniture →</span>
                            </Link>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {categoryMenuRows.map(({ category, products }) => (
                                <div key={category.id} className="rounded-xl border border-navy/10 bg-light-grey/40 p-3">
                                  <div className="mb-2 flex items-center justify-between gap-2">
                                    <Link to={`/products/category/${category.slug}`} onClick={closeProductsPanel} className="font-heading text-sm font-bold text-navy hover:text-gold">
                                      {category.name}
                                    </Link>
                                    <Link to={`/products/category/${category.slug}`} onClick={closeProductsPanel} className="font-sub text-[10px] uppercase tracking-[0.18em] text-navy/50 hover:text-gold">View all</Link>
                                  </div>
                                  {products.length ? (
                                    <div className="grid grid-cols-1 gap-2">
                                      {products.map((product) => (
                                        <Link key={product.id || product.slug} to={getProductDetailPath(product)} onClick={closeProductsPanel} className="group flex min-w-0 items-center gap-2 rounded-lg border border-transparent bg-white p-2 transition hover:border-gold/40 hover:bg-gold/5">
                                          {product.image ? <img src={product.image} alt={product.name} className="h-12 w-12 rounded-md object-cover" loading="lazy" /> : <div className="h-12 w-12 rounded-md bg-navy/10" aria-hidden="true" />}
                                          <div className="min-w-0 flex-1">
                                            <p className="break-words font-sub text-[11px] font-semibold text-navy group-hover:text-gold">{product.name}</p>
                                            {product.short_desc ? <p className="break-words font-body text-[10px] text-navy/60">{product.short_desc}</p> : <p className="break-words font-body text-[10px] text-navy/50">{category.name}</p>}
                                          </div>
                                        </Link>
                                      ))}
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
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3">
                        <div className="bg-white border border-border-grey rounded-lux p-4 shadow-lg">
                          <div className="space-y-1">
                            {m.items.map((item) => (
                              <button key={item.name} onClick={() => { setMega(null); goTo(item.to, (item as any).scrollId); }} className="group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-light-grey/50">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy"><FileText className="h-3.5 w-3.5" /></div>
                                <span className={`font-sub text-sm ${((item as any).scrollId && activeId === (item as any).scrollId) ? 'text-gold' : 'text-navy/70'} group-hover:text-gold`}>{item.name}</span>
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
                        {categoryMenuRows.map(({ category, products }) => (
                          <div key={category.id} className="rounded-lg border border-navy/10 bg-light-grey/40 p-2">
                            <Link to={`/products/category/${category.slug}`} onClick={() => setOpen(false)} className="font-sub text-sm font-semibold text-navy hover:text-gold">{category.name}</Link>
                            {products.length ? (
                              <div className="mt-2 space-y-1.5">
                                {products.map((product) => (
                                  <Link key={product.id || product.slug} to={getProductDetailPath(product)} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md bg-white p-1.5 text-left">
                                    {product.image ? <img src={product.image} alt={product.name} className="h-8 w-8 rounded object-cover" loading="lazy" /> : <div className="h-8 w-8 rounded bg-navy/10" aria-hidden="true" />}
                                    <span className="truncate font-sub text-xs text-navy/70">{product.name}</span>
                                  </Link>
                                ))}
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
