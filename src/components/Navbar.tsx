import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, FileText, Globe, ChevronDown } from 'lucide-react';
import companyLogo from '../assets/logo/logo.png';
import opcIeasTextWordmark from '../assets/logo/OPCIEAS_approved_text_wordmark.png';
import { resolveCategoryFromSlug, normalizeCategorySlug, type Category } from '../lib/data';

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

const headerNavItemClass = 'group relative inline-flex h-9 shrink-0 items-center gap-1 rounded-full px-2 font-sub text-sm font-semibold leading-none text-navy transition-colors duration-200 hover:bg-gold/10 hover:text-gold';
const headerActionClass = 'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-2.5 font-sub text-sm font-medium text-navy transition-colors duration-200 hover:bg-gold/10 hover:text-gold';

const fallbackCategorySeed: Category[] = [
  { id: '2', name: 'Educational Furniture', slug: 'educational-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 2, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '3', name: 'School Furniture', slug: 'school-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 3, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '5', name: 'Hostel Furniture', slug: 'hostel-furniture', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 5, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '6', name: 'Industrial Storage', slug: 'industrial-storage', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 6, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '7', name: 'Bathroom Collection', slug: 'bathroom-collection', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 7, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
  { id: '8', name: 'Letter Boxes', slug: 'letter-boxes', description: null, tagline: null, image: null, banner_image: null, icon: null, sort_order: 8, is_featured: false, status: 'active', meta_title: null, meta_description: null, parent_id: null, created_at: undefined, updated_at: undefined },
];

function getCategoryRoute(category: Pick<Category, 'id' | 'name' | 'slug'>): string {
  const resolved = resolveCategoryFromSlug(category.slug || category.name, [category]);
  return `/products/category/${resolved?.slug || normalizeCategorySlug(category.slug || category.name || 'products')}`;
}

const productDropdownItems = [
  ...fallbackCategorySeed.map((category) => ({
    name: category.slug === 'letter-boxes' ? 'Letter Box' : category.name,
    to: getCategoryRoute(category),
  })),
  { name: 'Commercial Furniture', to: '/furniture' },
  { name: 'Fiberglass Special Order', to: '/products/vertical/fiberglass-special-order' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsPanel, setProductsPanel] = useState(false);
  const closeProductsPanel = () => setProductsPanel(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('/');
  const location = useLocation();
  const navigate = useNavigate();
  
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
        className="sticky top-0 z-[1000] h-[76px] w-full border-b border-navy/10 bg-white shadow-sm min-[1200px]:h-[88px]"
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 sm:px-7">
          <Link
            to="/"
            aria-label="OPCIEAS logo and wordmark"
            className="inline-flex min-w-0 shrink-0 items-center gap-1.5 min-[1200px]:gap-2"
          >
            <img
              src={companyLogo}
              alt="OPCIEAS emblem"
              className="h-12 w-12 shrink-0 object-contain min-[1200px]:h-16 min-[1200px]:w-16"
            />
            <img
              src={opcIeasTextWordmark}
              alt="OPCIEAS Private Limited — Hand Crafted Since 1999 wordmark"
              className="block h-auto w-[min(38vw,146px)] object-contain opacity-80 min-[1200px]:w-[150px]"
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden h-full items-center gap-0 min-[1200px]:flex">
            {menu.map((m) => {
              if (m.label === 'Products') {
                return (
                  <div key={m.label} className="relative flex items-center h-full" onMouseEnter={() => setProductsPanel(true)} onMouseLeave={() => setProductsPanel(false)}>
                    <button type="button" onClick={() => { setProductsPanel((value) => !value); navigate('/products'); }} className={headerNavItemClass}>
                      <span>Products</span>
                      <ChevronDown className="h-3 w-3" />
                      <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-2/3" />
                    </button>

                    <AnimatePresence>
                      {productsPanel && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="pointer-events-auto absolute left-0 top-full z-[1100] w-64 rounded-lux border border-border-grey bg-white p-2 shadow-lg">
                          {productDropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.to}
                              onClick={closeProductsPanel}
                              className="block rounded-lg px-3 py-2 font-sub text-sm font-semibold text-navy transition-colors hover:bg-gold/10 hover:text-gold"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div key={m.label} className="relative flex items-center h-full" onMouseEnter={() => { closeProductsPanel(); setMega(m.items ? m.label : null); }} onMouseLeave={() => setMega((cur) => (cur === m.label ? null : cur))}>
                  {m.to ? (
                    <Link to={m.to} className={headerNavItemClass}>
                      <span>{m.label}</span>
                      <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-2/3" />
                    </Link>
                  ) : (
                    <span className={`${headerNavItemClass} cursor-pointer ${m.label === 'Home' && ['overview','why-choose-us','manufacturing'].includes(activeId) ? 'border-gold bg-gold/15 text-gold' : ''}`}>
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
          <div className="relative hidden h-full shrink-0 items-center gap-2 min-[1200px]:flex">
            <div className="relative">
              <button onClick={() => setLangOpen((s) => !s)} className={headerActionClass}><Globe className="h-3.5 w-3.5" /> EN</button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lux bg-white border border-border-grey p-2 shadow-lg">
                  <button className="w-full text-left rounded px-3 py-2 font-sub text-sm text-navy">English <span className="text-gold">(Active)</span></button>
                  <button className="w-full text-left rounded px-3 py-2 font-sub text-sm text-navy/60">Hindi <span className="text-navy/40">(Coming Soon)</span></button>
                </div>
              )}
            </div>
            <Link to="/catalogue" className={`${headerActionClass} gap-2 px-3`}><Download className="h-4 w-4" /> Catalogue</Link>
            <Link to="/rfq" className="btn-gold inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-gold/80 px-[18px] py-0 font-sub text-sm font-semibold shadow-sm transition-colors duration-200 hover:border-gold-3">Request Quote</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="relative z-[1002] ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 min-[1200px]:hidden" aria-label="Toggle menu">
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1001] bg-black/20 min-[1200px]:hidden" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 z-[1002] h-full w-[min(88vw,380px)] overflow-y-auto bg-white p-5 pt-20 sm:p-6 sm:pt-20 min-[1200px]:hidden">
              {menu.map((m) => {
                if (m.label === 'Products') {
                  return (
                    <div key={m.label} className="border-b border-border-grey py-3">
                      <div className="flex items-center justify-between gap-2">
                        <button type="button" onClick={() => setProductsOpen((value) => !value)} className="rounded-lg border border-navy/10 bg-navy/5 px-3 py-2 font-sub text-base font-bold text-navy transition-colors hover:border-gold hover:bg-gold/10">{m.label}</button>
                        <ChevronDown className={`h-4 w-4 text-gold transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                      </div>
                      {productsOpen && (
                        <div className="mt-2 space-y-1 pl-2">
                          {productDropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.to}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 font-sub text-sm font-semibold text-navy transition-colors hover:bg-gold/10 hover:text-gold"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={m.label}>
                    {m.to ? (
                      <Link to={m.to} onClick={() => setOpen(false)} className="mb-2 block rounded-lg border border-navy/10 bg-navy/5 px-3 py-3 font-sub text-base text-navy transition-colors hover:border-gold hover:bg-gold/10">{m.label}</Link>
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
              <div className="border-b border-border-grey py-3">
                <button
                  type="button"
                  onClick={() => setLangOpen((value) => !value)}
                  className="flex min-h-11 w-full items-center justify-between rounded-lg border border-navy/10 bg-navy/5 px-3 py-2 font-sub text-sm font-semibold text-navy"
                >
                  <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4 text-gold" /> Language</span>
                  <span className="text-navy/65">EN <ChevronDown className={`ml-1 inline h-4 w-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} /></span>
                </button>
                {langOpen && (
                  <div className="mt-2 space-y-1 pl-2">
                    <button type="button" className="block min-h-10 w-full rounded-lg px-3 text-left font-sub text-sm text-navy">English <span className="text-gold">(Active)</span></button>
                    <button type="button" className="block min-h-10 w-full rounded-lg px-3 text-left font-sub text-sm text-navy/60">Hindi <span className="text-navy/40">(Coming Soon)</span></button>
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/catalogue" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-navy/20 bg-navy/5 px-4 font-sub text-sm text-navy transition-colors hover:bg-navy/10"><Download className="mr-2 h-4 w-4" /> Catalogue</Link>
                <Link to="/rfq" onClick={() => setOpen(false)} className="btn-gold inline-flex min-h-11 items-center justify-center rounded-full px-5 font-sub text-sm font-semibold">Request Quote</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
