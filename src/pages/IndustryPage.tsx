import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MapPin, Calendar } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import { fetchIndustry, fetchIndustryProjects, fetchProducts, fetchClients, type Industry, type IndustryProject, type Product, type Client } from '../lib/data';

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [ind, setInd] = useState<Industry | null>(null);
  const [projects, setProjects] = useState<IndustryProject[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!slug) return;
      const i = await fetchIndustry(slug);
      setInd(i);
      if (i) {
        const [p, pr, cl] = await Promise.all([fetchIndustryProjects(i.id), fetchProducts(), fetchClients()]);
        setProjects(p);
        setProducts(pr.slice(0, 8));
        setClients(cl);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-navy"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>;

  if (!ind) {
    return <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <p className="font-heading text-2xl font-bold text-white">Industry not found</p>
      <Link to="/" className="mt-4 rounded-full bg-gold px-6 py-2 font-sub text-sm text-navy">Back Home</Link>
    </div>;
  }

  const solutions = ind.solutions || [];

  return (
    <>
      <PageMeta
        title={`${ind.name} | OPCIEAS`}
        description={ind.overview || `Explore ${ind.name} solutions from OPCIEAS, a premium commercial furniture manufacturer serving institutional, corporate and export projects.`}
        keywords={`${ind.name}, commercial furniture, institutional furniture, export furniture, OPCIEAS`}
      />
      <SectionBanner title={ind.name} tagline={ind.tagline || ''} image={ind.hero_image || ''} crumb={ind.name} crumbTo={`/industries/${ind.slug}`} />

      {/* Overview */}
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-2xl font-black text-navy sm:text-3xl">Industry Overview</motion.h2>
            <p className="mt-4 font-body text-base leading-relaxed text-navy/70">{ind.overview}</p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      {solutions.length > 0 && (
        <section className="bg-navy/5 py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Our Solutions</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {solutions.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08 }} className="rounded-lux bg-white p-6 luxury-shadow">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Check className="h-5 w-5" /></div>
                  <h3 className="font-heading text-base font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 font-body text-sm text-navy/60">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Relevant Products */}
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Relevant Products</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      {projects.length > 0 && (
        <section className="bg-navy py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-white sm:text-3xl">Completed Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }} className="overflow-hidden rounded-lux border border-white/10 bg-white/5">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image || ''} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-white">{p.title}</h3>
                    {p.client && <p className="mt-1 font-sub text-sm text-gold">{p.client}</p>}
                    <div className="mt-2 flex items-center gap-4 font-sub text-xs text-white/50">
                      {p.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.location}</span>}
                      {p.year && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.year}</span>}
                    </div>
                    {p.description && <p className="mt-3 font-body text-sm text-white/60">{p.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {ind.certifications?.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Certifications</h2>
            <div className="flex flex-wrap gap-4">
              {ind.certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-2 rounded-full bg-navy/5 px-5 py-3 font-sub text-sm font-medium text-navy">
                  <Check className="h-4 w-4 text-gold" /> {c}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Logos */}
      {clients.length > 0 && (
        <section className="bg-navy/5 py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Our Clients</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.05 }} className="flex aspect-[3/2] items-center justify-center rounded-lux bg-white p-4 luxury-shadow">
                  <span className="font-heading text-sm font-bold text-navy">{c.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry */}
      <section className="bg-navy py-20">
        <div className="container-x px-6">
          <div className="mx-auto max-w-2xl">
            <InquiryForm category={ind.name} />
          </div>
        </div>
      </section>
    </>
  );
}
