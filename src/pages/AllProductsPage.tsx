import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, MessageCircle, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import ProductCard from '../components/ProductCard';
import { IMG } from '../lib/images';
import { fetchCategories, fetchProducts, type Category, type Product } from '../lib/data';

export default function AllProductsPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');

  useEffect(() => {
    (async () => {
      const [c, p] = await Promise.all([fetchCategories(), fetchProducts()]);
      setCats(c);
      setProducts(p);
      setLoading(false);
    })();
  }, []);

  let filtered = products;
  if (activeCat !== 'all') filtered = products.filter((p) => p.category_id === activeCat);
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-navy"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>;
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
      <SectionBanner title="All Products" tagline="1000+ commercial furniture solutions" image={IMG.heroBg} crumb="Products" crumbTo="/products" />

      {/* Category grid */}
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {cats.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }}>
                <Link to={`/products/${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-lux border border-navy/10 luxury-shadow">
                  <img src={c.banner_image || ''} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h3 className="font-heading text-lg font-bold text-white">{c.name}</h3>
                    {c.tagline && <p className="font-sub text-xs text-white/60">{c.tagline}</p>}
                    <span className="mt-2 inline-flex items-center gap-1 font-sub text-xs text-gold">View Products <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All products with filter */}
      <section className="bg-navy/5 py-20">
        <div className="container-x px-6">
          <div className="mb-8 flex flex-col gap-4 rounded-lux bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search all products..." className="w-full rounded-full bg-navy/5 px-10 py-2.5 font-sub text-sm text-navy outline-none ring-1 ring-navy/10 focus:ring-gold" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCat('all')} className={`rounded-full px-4 py-2 font-sub text-xs transition ${activeCat === 'all' ? 'bg-gold text-navy' : 'bg-navy/10 text-navy hover:bg-navy/20'}`}>All</button>
              {cats.map((c) => (
                <button key={c.id} onClick={() => setActiveCat(c.id)} className={`rounded-full px-4 py-2 font-sub text-xs transition ${activeCat === c.id ? 'bg-gold text-navy' : 'bg-navy/10 text-navy hover:bg-navy/20'}`}>{c.name}</button>
              ))}
            </div>
          </div>

          <p className="mb-6 font-sub text-sm text-navy/50">{filtered.length} product(s)</p>

          {filtered.length === 0 ? (
            <div className="py-20 text-center"><p className="font-sub text-sm text-navy/50">No products found.</p></div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm text-navy"><Download className="h-4 w-4" /> Download Catalogue</Link>
            <a href="https://wa.me/919845579049" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Inquiry</a>
          </div>
        </div>
      </section>
    </>
  );
}
