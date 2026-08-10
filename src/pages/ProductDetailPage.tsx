import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, RotateCw, Check, ChevronLeft, ChevronRight, Share2, Phone, Download } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import Product360Viewer from '../components/Product360Viewer';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import { fetchProduct, fetchProducts, type Product } from '../lib/data';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!slug) return;
      const p = await fetchProduct(slug);
      setProduct(p);
      if (p) {
        const all = await fetchProducts(p.category_id || undefined);
        setRelated(all.filter((x) => x.id !== p.id).slice(0, 4));
        setActiveImg(0);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
        <p className="font-heading text-2xl font-bold text-white">Product not found</p>
        <Link to="/products" className="mt-4 rounded-full bg-gold px-6 py-2 font-sub text-sm text-navy">View All Products</Link>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image || ''];
  const specs = product.specs || {};
  const features = product.features || [];
  const waText = `Hi, I'm interested in ${encodeURIComponent(product.name)}. Please share details.`;

  return (
    <>
      {product && (
        <PageMeta
          title={`${product.name} | OPCIEAS`}
          description={product.short_desc || `Premium ${product.name} from OPCIEAS.`}
          keywords={`${product.name}, commercial furniture, OPCIEAS, ${product.category_id}`}
          canonical={`https://www.opcieascommercialfurniture.com/product/${product.slug}`}
          schema={{ '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.short_desc || product.long_desc || '' }}
        />
      )}
      <section className="bg-navy pt-32">
        <div className="container-x px-6 pb-8">
          <Breadcrumbs items={[{ label: 'Products', to: '/products' }, { label: product.name }]} />
        </div>
      </section>

      <section className="bg-navy pb-20">
        <div className="container-x grid gap-10 px-6 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="group relative aspect-square overflow-hidden rounded-lux border border-white/10">
              <img
                src={gallery[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy/60 p-2 text-white shadow-md opacity-0 transition hover:bg-gold hover:text-navy group-hover:opacity-100 focus:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % gallery.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-navy/60 p-2 text-white shadow-md opacity-0 transition hover:bg-gold hover:text-navy group-hover:opacity-100 focus:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy/60 px-3 py-1 font-sub text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                {activeImg + 1} / {gallery.length}
              </div>
              <button onClick={() => setViewerOpen(true)} className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full glass px-4 py-2 font-sub text-xs text-white transition hover:bg-gold hover:text-navy">
                <RotateCw className="h-4 w-4" /> 360° View
              </button>
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-20 md:h-24 md:w-24 ${
                      i === activeImg ? 'border-gold ring-2 ring-gold/40' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-black text-white sm:text-4xl">{product.name}</motion.h1>
            {product.short_desc && <p className="mt-2 font-sub text-lg text-white/80">{product.short_desc}</p>}
            {product.price_range && <p className="mt-4 font-heading text-xl font-bold gold-text">{product.price_range}</p>}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/rfq" className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm">Request Quote</Link>
              <a href="/products" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm text-white"><Download className="h-4 w-4" /> Download Catalogue</a>
              <a href={`https://wa.me/919845579049?text=${waText}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Inquiry</a>
              <button onClick={() => setViewerOpen(true)} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><RotateCw className="h-4 w-4" /> 360° Viewer</button>
              <a href="tel:+919845579049" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><Phone className="h-4 w-4" /> Call</a>
              <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href }).catch(() => {})} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><Share2 className="h-4 w-4" /> Share</button>
            </div>

            {/* Specs */}
            {Object.keys(specs).length > 0 && (
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold text-white">Specifications</h3>
                <dl className="mt-3 divide-y divide-white/10 rounded-lux bg-white/5">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between px-4 py-3">
                      <dt className="font-sub text-sm text-white/80">{k}</dt>
                      <dd className="font-sub text-sm font-medium text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-heading text-lg font-bold text-white">Key Features</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-sub text-sm text-white/85"><Check className="h-4 w-4 flex-shrink-0 text-gold" /> {f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lux border border-white/10 bg-white/5 p-5">
                <p className="font-heading text-sm font-bold text-white">Applications</p>
                <p className="mt-2 font-body text-sm text-white/80">Suitable for institutional, commercial, hospitality and export projects. Specific applications available on request.</p>
              </div>
              <div className="rounded-lux border border-white/10 bg-white/5 p-5">
                <p className="font-heading text-sm font-bold text-white">MOQ & Catalogue</p>
                <p className="mt-2 font-body text-sm text-white/80">Minimum order quantities vary by product and project. Download our catalogue or request a quote for exact details.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Long description */}
        {product.long_desc && (
          <div className="container-x mt-12 px-6">
            <div className="max-w-3xl">
              <h3 className="font-heading text-xl font-bold text-white">Product Description</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/80">{product.long_desc}</p>
            </div>
          </div>
        )}

        {/* Inquiry form */}
        <div className="container-x mt-16 px-6">
          <div className="mx-auto max-w-2xl rounded-lux bg-white/5 p-8">
            <InquiryForm productName={product.name} />
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Related Products</h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <Product360Viewer images={gallery} productName={product.name} open={viewerOpen} onClose={() => setViewerOpen(false)} />

      <div className="bg-navy pb-8 pt-4">
        <div className="container-x px-6">
          <Link to="/products" className="inline-flex items-center gap-2 font-sub text-sm text-white/80 transition hover:text-gold"><ChevronLeft className="h-4 w-4" /> Back to Products</Link>
        </div>
      </div>
    </>
  );
}
