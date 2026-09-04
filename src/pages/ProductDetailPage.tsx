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
import { validateProductEssentials } from '../lib/productValidation';
import { findProductAssetBySlug } from '../lib/productAssetResolver';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [assetOnly, setAssetOnly] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!slug) return;
      const p = await fetchProduct(slug);
      const asset = p ? null : findProductAssetBySlug(slug);
      const assetProduct: Product | null = asset ? {
        id: asset.slug,
        category_id: asset.folder,
        name: asset.name,
        slug: asset.slug,
        features: [],
        specs: {},
        image: asset.image,
        gallery: [asset.image],
        created_at: '',
      } : null;
      const resolvedProduct = p || assetProduct;
      setProduct(resolvedProduct);
      setAssetOnly(!p && !!assetProduct);
      if (p) {
        const all = await fetchProducts(p.category_id || undefined);
        setRelated(all.filter((x) => x.id !== p.id).slice(0, 4));
        setActiveImg(0);
      } else {
        setRelated([]);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-heading text-2xl font-bold text-navy">Product not found</p>
        <Link to="/products" className="mt-4 rounded-full bg-gold px-6 py-2 font-sub text-sm text-navy">View All Products</Link>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image || ''];
  const specs = product.specs || {};
  const features = product.features || [];
  const waText = `Hi, I'm interested in ${encodeURIComponent(product.name)}. Please share details.`;
  const dimensionValue = assetOnly ? null : specs['Dimensions'] || specs.Dimensions || specs['dimensions'] || (product.dimensions ? JSON.stringify(product.dimensions) : 'Available on request');
  const materialsValue = assetOnly ? null : specs['Materials Used'] || specs['Material'] || product.materials_used || product.material || 'Available on request';
  const packagingValue = assetOnly ? null : specs['Packaging Specifications'] || specs['Packaging'] || product.packaging_specifications || 'Available on request';
  const warrantyText = assetOnly ? null : product.warranty_terms || specs['Warranty'] || '12 Months Warranty on domestic supply.';
  const weightValue = assetOnly ? null : specs['Weight'] || product.weight || 'Available on request';
  const variantsValue = assetOnly ? null : specs['Variants'] || (Array.isArray(product.variants) ? product.variants.join(', ') : typeof product.variants === 'string' ? product.variants : 'Available on request');
  const hasExport = !!(product.export_available || /export/i.test(String(specs['Export Available'] || '')));
  const supplyLabel = assetOnly ? 'Asset Catalogue Item' : product.supply_type === 'IN_HOUSE' ? 'In-House Manufacturing' : product.supply_type === 'PARTNER' ? 'Partner Supply' : 'Direct Manufacturer';
  const supplyNote = assetOnly ? null : product.supply_type === 'IN_HOUSE' ? 'Manufactured in our own facility with production control and quality assurance.' : 'Supplied through trusted production partners and quality-checked before dispatch.';
  const validation = validateProductEssentials(product);

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
      <section className="bg-white pt-32">
        <div className="container-x px-6 pb-8">
          <Breadcrumbs items={[{ label: 'Products', to: '/products' }, { label: product.name }]} />
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="container-x grid gap-10 px-6 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="group relative aspect-square overflow-hidden rounded-lux border border-navy/10">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-navy/10 p-2 text-navy shadow-sm opacity-0 transition hover:bg-gold hover:text-navy group-hover:opacity-100 focus:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % gallery.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-navy/10 p-2 text-navy shadow-sm opacity-0 transition hover:bg-gold hover:text-navy group-hover:opacity-100 focus:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 border border-navy/10 px-3 py-1 font-sub text-[11px] text-navy shadow-sm opacity-0 transition group-hover:opacity-100">
                {activeImg + 1} / {gallery.length}
              </div>
              <button onClick={() => setViewerOpen(true)} className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white border border-navy/10 px-4 py-2 font-sub text-xs text-navy shadow-sm transition hover:bg-gold hover:text-navy">
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
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-black text-navy sm:text-4xl">{product.name}</motion.h1>
            {product.short_desc && <p className="mt-2 font-sub text-lg text-body-text">{product.short_desc}</p>}
            <div className="mt-4 inline-flex rounded-full border border-gold/70 bg-gold/10 px-3 py-1.5 font-sub text-xs font-semibold uppercase tracking-[0.2em] text-gold">{supplyLabel}</div>
            {hasExport && (<div className="mt-3 inline-flex rounded-full border border-gold/70 bg-gold/10 px-3 py-1.5 font-sub text-xs font-semibold uppercase tracking-[0.2em] text-gold">Export Specifications & Paid Samples Available.</div>)}
            {product.price_range && <p className="mt-4 font-heading text-xl font-bold gold-text">{product.price_range}</p>}
            {supplyNote && <p className="mt-3 font-body text-sm text-navy/70">{supplyNote}</p>}
            <div className="mt-4 grid gap-2 text-sm text-navy sm:grid-cols-2">
              {product.sku && <div><span className="font-sub uppercase tracking-[0.18em] text-navy/60">SKU</span><p className="mt-1 font-medium">{product.sku}</p></div>}
              <div><span className="font-sub uppercase tracking-[0.18em] text-navy/60">Category</span><p className="mt-1 font-medium">{product.subcategory || product.category_id || 'General'}</p></div>
              {!assetOnly && <div><span className="font-sub uppercase tracking-[0.18em] text-navy/60">Availability</span><p className="mt-1 font-medium">{product.stock_quantity ? `${product.stock_quantity} units available` : 'Available on request'}</p></div>}
              {warrantyText && <div><span className="font-sub uppercase tracking-[0.18em] text-navy/60">Warranty</span><p className="mt-1 font-medium">{warrantyText}</p></div>}
            </div>

            {!assetOnly && !validation.valid && (
              <div className="mt-6 rounded-lux border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">Product publishing checklist</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {validation.missing.map((item) => <li key={item}>{item}</li>)}
                  {validation.warnings.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/rfq" className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm">Request Quote</Link>
              <a href="/products" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm text-navy"><Download className="h-4 w-4" /> Download Catalogue</a>
              <a href={`https://wa.me/919845579049?text=${waText}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Inquiry</a>
              <button onClick={() => setViewerOpen(true)} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><RotateCw className="h-4 w-4" /> 360° Viewer</button>
              <a href="tel:+919845579049" className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><Phone className="h-4 w-4" /> Call</a>
              <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href }).catch(() => {})} className="btn-ghost flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-sm"><Share2 className="h-4 w-4" /> Share</button>
            </div>

            {/* Specs */}
            {Object.keys(specs).length > 0 && (
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold text-navy">Specifications</h3>
                <div className="mt-3 overflow-hidden rounded-lux border border-navy/10 bg-light-grey">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="px-4 py-3 font-sub text-xs uppercase tracking-[0.2em]">Specification</th>
                        <th className="px-4 py-3 font-sub text-xs uppercase tracking-[0.2em]">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(specs).map(([k, v]) => (
                        <tr key={k} className="border-t border-navy/10 bg-white">
                          <td className="px-4 py-3 font-sub text-xs uppercase tracking-[0.14em] text-navy/65">{k}</td>
                          <td className="px-4 py-3 font-body text-sm text-navy/80">{String(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-heading text-lg font-bold text-navy">Key Features</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-sub text-sm text-navy/80"><Check className="h-4 w-4 flex-shrink-0 text-gold" /> {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {!assetOnly && <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lux border border-navy/10 bg-white p-5">
                <p className="font-heading text-sm font-bold text-navy">Applications</p>
                <p className="mt-2 font-body text-sm text-navy/70">Suitable for institutional, commercial, hospitality and export projects. Specific applications available on request.</p>
              </div>
              <div className="rounded-lux border border-navy/10 bg-white p-5">
                <p className="font-heading text-sm font-bold text-navy">MOQ & Catalogue</p>
                <p className="mt-2 font-body text-sm text-navy/70">Minimum order quantities vary by product and project. Download our catalogue or request a quote for exact details.</p>
              </div>
            </div>}
          </div>
        </div>

        <div className="container-x mt-12 px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-3xl">
              <h3 className="font-heading text-xl font-bold text-navy">Product Description</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">{product.long_desc || product.description || product.short_desc || (assetOnly ? 'Product information will be updated soon.' : 'Description available on request.')}</p>
            </div>
            {!assetOnly && <div className="rounded-lux border border-navy/10 bg-white p-5">
              <h3 className="font-heading text-lg font-bold text-navy">Technical Specifications</h3>
              <ul className="mt-4 space-y-3 font-sub text-sm text-navy/70">
                <li><span className="text-navy/50">Dimensions:</span> {dimensionValue}</li>
                <li><span className="text-navy/50">Materials Used:</span> {materialsValue}</li>
                <li><span className="text-navy/50">Weight:</span> {weightValue}</li>
                <li><span className="text-navy/50">Packaging:</span> {packagingValue}</li>
                <li><span className="text-navy/50">Variants:</span> {variantsValue}</li>
              </ul>
            </div>}
          </div>
        </div>

        {!assetOnly && <div className="container-x mt-12 px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lux border border-navy/10 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-navy">Key Features</h3>
              <ul className="mt-4 space-y-2">
                {features.length ? features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 font-sub text-sm text-navy/70"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" /> {feature}</li>
                )) : <li className="font-sub text-sm text-navy/70">Available on request.</li>}
              </ul>
            </div>
            <div className="rounded-lux border border-navy/10 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-navy">Warranty</h3>
              <p className="mt-4 font-sub text-sm text-navy/70">{warrantyText}</p>
              <p className="mt-2 font-sub text-sm text-navy/70">Fabric and cushion parts are excluded from warranty.</p>
              <p className="mt-4 font-sub text-sm text-gold">High durability and long-life performance.</p>
            </div>
          </div>
        </div>}

        {/* Inquiry form */}
        {!assetOnly && <div className="container-x mt-16 px-6">
          <div className="grid gap-6 mb-8">
            <div className="rounded-lux border border-navy/10 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-navy">Product Quality & Manufacturing</h3>
              <p className="mt-4 font-body text-sm text-navy/70">Every product—whether manufactured in our facility or sourced through our strategic partners—undergoes strict multi-point commercial durability inspections.</p>
              {product.supply_type === 'IN_HOUSE' && (
                <>
                  <p className="mt-3 font-sub text-sm text-gold font-semibold">In-House Manufacturing | Factory Direct</p>
                  <p className="mt-2 font-body text-sm text-navy/70">This product is manufactured in our specialized production facility with complete production control and quality assurance protocols.</p>
                </>
              )}
              {product.supply_type === 'PARTNER' && (
                <p className="mt-3 font-sub text-sm text-gold font-semibold">Verified Supply Partner Item</p>
              )}
            </div>
            {product.supply_type === 'IN_HOUSE' && (
              <div className="rounded-lux border border-gold/50 bg-gold/5 p-6">
                <h3 className="font-heading text-lg font-bold text-navy">Custom Modifications & Bulk Orders</h3>
                <p className="mt-3 font-body text-sm text-navy/70">As a direct manufacturer, we offer complete customization for enterprise buyers, educational institutions, government projects, and hostel chains.</p>
                <p className="mt-3 font-sub text-sm text-navy">Available options:</p>
                <ul className="mt-2 space-y-1 font-body text-sm text-navy/70 ml-4">
                  <li>• Custom Dimensions & Structural Modifications</li>
                  <li>• Custom Frame Colors & Powder Coating</li>
                  <li>• Specialized Materials & Finishes</li>
                  <li>• Bulk Order Specifications & Pricing</li>
                  <li>• Turnkey Project Delivery</li>
                </ul>
                <Link to="/rfq" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 font-sub text-sm font-semibold text-navy transition hover:bg-gold-2">
                  Request Custom Dimensions / Bulk Modifications
                </Link>
              </div>
            )}
          </div>
          <div className="mx-auto max-w-2xl rounded-lux border border-navy/10 bg-white p-8">
            <InquiryForm productName={product.name} />
          </div>
        </div>}
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

      <div className="bg-white border-t border-navy/5 pb-8 pt-4">
        <div className="container-x px-6">
          <Link to="/products" className="inline-flex items-center gap-2 font-sub text-sm text-navy/70 transition hover:text-gold"><ChevronLeft className="h-4 w-4" /> Back to Products</Link>
        </div>
      </div>
    </>
  );
}
