import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, FileText, Globe, MessageCircle, ChevronDown } from 'lucide-react';
import companyLogo from '../assets/logo/logo.png';

const menu = [
  {
    label: 'Home', items: [
      { name: 'Overview', to: '/', scrollId: 'overview' },
      { name: 'Why Choose Us', to: '/', scrollId: 'why-choose-us' },
      { name: 'Manufacturing', to: '/', scrollId: 'manufacturing' },
    ],
  },
  {
    label: 'Company', items: [
      { name: 'About Us', to: '/company/about' },
      { name: 'Manufacturing', to: '/manufacturing' },
      { name: 'Quality & Certifications', to: '/quality' },
      { name: 'All Industries', to: '/industries' },
      { name: 'Clients', to: '/clients' },
      { name: 'Contact', to: '/contact' },
    ],
  },
  {
    label: 'Products', items: [
      { name: 'All Categories', to: '/products' },
      { name: 'Office Furniture', to: '/products/office-furniture' },
      { name: 'Educational Furniture', to: '/products/educational-furniture' },
      { name: 'School Furniture', to: '/products/school-furniture' },
      { name: 'Hospital Furniture', to: '/products/hospital-furniture' },
      { name: 'Hostel Furniture', to: '/products/hostel-furniture' },
    ],
  },
  {
    label: 'Special', items: [
      { name: 'Government Tenders', to: '/government-tenders' },
      { name: 'Export Services', to: '/export' },
      { name: 'Gallery', to: '/gallery' },
    ],
  },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('/')
  const location = useLocation();
  const navigate = useNavigate();

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
        className={`fixed top-0 z-[1000] w-full transition-all duration-500 ${
          scrolled ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'bg-white/80 backdrop-blur'
        }`}
      >
        <div className="container-x flex items-center justify-between px-6 h-full">
          <Link to="/" className="flex items-center gap-3 h-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-navy">
              <img src={companyLogo} alt="OPCIEAS logo" className="h-full w-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <p className="font-heading text-lg font-extrabold tracking-widest text-navy">OPCIEAS</p>
              <p className="font-sub text-[10px] tracking-[0.2em] text-gold">PVT. LTD.</p>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1 h-10">
            {menu.map((m) => (
              <div key={m.label} className="relative flex items-center h-full" onMouseEnter={() => setMega(m.items ? m.label : null)} onMouseLeave={() => setMega((cur) => (cur === m.label ? null : cur))}>
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
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3 h-10 relative">
            <div className="relative">
              <button onClick={() => setLangOpen((s) => !s)} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border-grey px-3 text-xs font-sub text-navy/70 transition hover:border-gold hover:text-gold"><Globe className="h-3.5 w-3.5" /> EN</button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lux bg-white border border-border-grey p-2 shadow-lg">
                  <button className="w-full text-left rounded px-3 py-2 font-sub text-sm text-navy">English <span className="text-gold">(Active)</span></button>
                  <button className="w-full text-left rounded px-3 py-2 font-sub text-sm text-navy/60">Hindi <span className="text-navy/40">(Coming Soon)</span></button>
                </div>
              )}
            </div>
            <Link to="/products" className="inline-flex h-10 items-center gap-2 rounded-full border border-navy/20 bg-navy/5 px-4 py-0 font-sub text-sm text-navy hover:border-navy/40 hover:bg-navy/10 transition"><Download className="h-4 w-4" /> Catalogue</Link>
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
              {menu.map((m) => (
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
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/products" onClick={() => setOpen(false)} className="inline-flex justify-center items-center rounded-full px-4 py-3 font-sub text-sm border border-navy/20 bg-navy/5 text-navy hover:bg-navy/10">Download Catalogue</Link>
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
