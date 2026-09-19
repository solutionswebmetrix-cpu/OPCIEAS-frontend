import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, MessageCircle, Boxes, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import { CATEGORY_BANNERS, CANONICAL_CATEGORIES, type CanonicalCategoryName } from '../lib/images';
import { fetchCategories, fetchProducts, resolveProductImage, type Product, type Category } from '../lib/data';
import { HOMEPAGE_SHOWCASE_CATALOG, type ProductAsset } from '../lib/productAssetResolver';

const categoryContent: Record<string, { overview: string; highlights: string[]; specs: Array<{ label: string; value: string }>; gallery: string[]; cta: string[] }> = {
  'office-furniture': {
    overview: 'Premium office furniture for modern corporate, government and enterprise workspaces including executive desks, workstations, storage and reception.',
    highlights: ['Executive Desk', 'Workstation', 'Conference Table', 'Reception Counter', 'Filing Cabinet', 'Office Chair', 'Pedestal', 'Storage Cupboard', 'Bookshelf'],
    specs: [
      { label: 'Applications', value: 'Corporate offices, government, banks, IT parks and enterprise HQs' },
      { label: 'Construction', value: 'Engineered wood top + powder-coated steel frame, laminate / veneer finish' },
      { label: 'Utility', value: 'Ergonomic, cable-managed, lockable storage, tender-ready spec sheets' },
    ],
    gallery: ['Executive suite layout', 'Open-plan workstations', 'Reception and boardroom setup'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'educational-furniture': {
    overview: 'Educational Furniture follows a clear audience-based flow: KG Classes → Primary → High School → Colleges & Higher Education.',
    highlights: ['KG Classes', 'Primary', 'High School', 'Colleges & Higher Education'],
    specs: [
      { label: 'KG Classes', value: 'Kids desks and individual seating for KG classes.' },
      { label: 'Primary', value: 'Single-seat and dual-seat desk/chair units for primary learning.' },
      { label: 'High School', value: 'Single-seat and dual-seat desk/chair units for high school classrooms.' },
      { label: 'College & Higher Education', value: 'Lecture seating with writing pads and integrated cup/bag holders for college and higher education.' },
    ],
    gallery: ['KG classroom seating', 'Primary desk/chair units', 'High school desk/chair units', 'College lecture seating with writing pad and cup/bag holders'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'school-furniture': {
    overview: 'Classroom, activity and institutional furniture for schools and kindergartens with safety, ergonomics and heavy-duty durability.',
    highlights: ['Student Desk', 'Student Chair', 'Dual Desk', 'Teacher Table', 'Teacher Chair', 'Kids / Nursery Furniture', 'Activity Table', 'Classroom Seating'],
    specs: [
      { label: 'Suitability', value: 'Schools, preschools, nursery, coaching centres and activity zones' },
      { label: 'Materials', value: 'Powder-coated steel, HDPE, anti-scratch laminated tops, outdoor UV-stabilized' },
      { label: 'Design', value: 'Safe rounded edges, age-appropriate height, low-maintenance, bulk-ready' },
    ],
    gallery: ['Classroom layout', 'Activity zone and seating', 'Institutional classroom furniture'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'hospital-furniture': {
    overview: 'Patient beds, examination tables, lockers and clinical furniture built for hygiene, easy cleaning and long clinical use.',
    highlights: ['Patient Bed', 'Semi-Fowler / ICU Bed', 'Over-Bed Table', 'Bedside Locker', 'Examination Table', 'Doctor Table', 'Hospital Chair', 'Crash Cart / Trolley'],
    specs: [
      { label: 'Applications', value: 'Hospitals, clinics, diagnostic centres, nursing homes and dispensaries' },
      { label: 'Build', value: 'CR / MS steel, epoxy or medical-grade powder coat, castors and side rails where applicable' },
      { label: 'Compliance', value: 'Hygienic design, tender-compliant docs, bulk manufacturing for medical projects' },
    ],
    gallery: ['Ward patient bed setup', 'Examination room furniture', 'Hospital storage and trolleys'],
    cta: ['Request Quote', 'WhatsApp Inquiry'],
  },
  'hostel-furniture': {
    overview: 'Robust and durable hostel furniture for student accommodation, dormitories and institutional living spaces.',
    highlights: ['Single Cots', 'Bunker Cots', 'Triple Cots', 'Wardrobe', 'Hostel Locker', 'Study Table', 'Hostel Chair', 'Commercial Mattress'],
    specs: [
      { label: 'Suitability', value: 'Hostels, dormitories, student housing and residential institutions' },
      { label: 'Build', value: 'Powder-coated steel frames with durable bedding textile finishes' },
      { label: 'Storage', value: 'Under-bed clearance, lockers, wardrobes and study units available' },
      { label: 'Cot Dimensions', value: 'Single: L 1800 × W 750 × H 300–350 mm; Bunker: L 1800 × W 900 × H 1600–1650 mm; Triple: L 1800 × W 900 × H 2600 mm' },
      { label: 'Accessories', value: 'Rubberized coir, foam and spring mattresses; washable pillows; 200–600 TC cotton bedsheets and pillow covers' },
    ],
    gallery: ['Hostel dormitory setup', 'Bunker cots and storage', 'Student study & wardrobe units'],
    cta: ['Request Quote', 'WhatsApp Inquiry'],
  },
  'industrial-storage': {
    overview: 'Heavy-duty warehouse and industrial storage racks, shelves, lockers and cabinets with high load capacity and export finish.',
    highlights: ['Warehouse Rack', 'Industrial Rack', 'Heavy-Duty Rack', 'Slotted Angle Rack', 'Pallet Rack', 'Long Span Shelving', 'SS Detachable Wire Racks', 'SS Wire Rack', 'Steel Locker'],
    specs: [
      { label: 'Applications', value: 'Warehouses, factories, godowns, retail storage, offices and industrial yards' },
      { label: 'Build', value: 'Mild steel / SS, powder-coated or galvanized finish, boltless / bolted assembly' },
      { label: 'Capacity', value: '200 kg – 2000 kg / shelf depending on model, custom heights and widths available' },
      { label: 'SS Detachable Wire Racks', value: 'Medium Duty • Loading Capacity 200 Kg per Level • Size H72" × W36" × D18"' },
      { label: 'Customization', value: 'Custom dimensions and tailored configurations available upon request.' },
    ],
    gallery: ['Warehouse rack aisles', 'Factory storage installation', 'Heavy-duty lockers & cabinets'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'bathroom-collection': {
    overview: 'Premium bathroom collection featuring waterproof mirrors, rust-resistant racks and compact storage solutions for modern commercial washrooms.',
    highlights: ['Mirror Cabinet', 'Vanity Unit', 'Bathroom Shelf', 'Towel Rack', 'Bathroom Storage', 'Wash Basin Cabinet', 'Stainless Steel Rack'],
    specs: [
      { label: 'Finish', value: 'Marine grade stainless steel 304, chrome, waterproof laminate / PVC' },
      { label: 'Protection', value: 'Waterproof, rust-resistant and corrosion-proof design' },
      { label: 'Use', value: 'Hotels, hospitals, hostels, apartments, offices and premium bathrooms' },
      { label: 'Customization', value: 'Custom dimensions and tailored configurations available upon request.' },
    ],
    gallery: ['Bathroom vanity and storage', 'Waterproof mirror display', 'SS rack and accessories'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'letter-boxes': {
    overview: 'Premium letter boxes for apartments, societies and office entrances, available in ABS plastic, metal and wood finishes.',
    highlights: ['ABS Plastic Letter Box', 'Metal Letter Box', 'Wooden Letter Box', 'Wall-Mounted Letter Box', 'Apartment Cluster System', 'Society Letter Bank'],
    specs: [
      { label: 'Material Options', value: 'Stainless Steel, Mild Steel, ABS Plastic and Solid Wood' },
      { label: 'Applications', value: 'Residential societies, apartments, offices, institutions and gated communities' },
      { label: 'Design', value: 'Secure locking, weatherproof, flat / cluster modules, newspaper holder option' },
    ],
    gallery: ['Apartment letter box clusters', 'Stylish metal / wooden boxes', 'Society and office entrance banks'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
};

const fallbackCategories: Pick<Category, 'id' | 'name' | 'slug'>[] = CANONICAL_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
}));

function resolveCategoryFromSlug(slug: string, categories: Pick<Category, 'id' | 'name' | 'slug'>[]) {
  const exact = categories.find((category) => category.slug === slug);
  if (exact) return exact;

  const aliasMap: Record<string, string> = {
    'letter-box': 'letter-boxes',
    'office': 'office-furniture',
    'education': 'educational-furniture',
    'school': 'school-furniture',
    'hospital': 'hospital-furniture',
    'hostel': 'hostel-furniture',
    'industrial': 'industrial-storage',
    'storage-solutions': 'industrial-storage',
    'bathroom': 'bathroom-collection',
    'letterbox': 'letter-boxes',
  };
  const aliased = aliasMap[slug];
  if (aliased) return categories.find((category) => category.slug === aliased) || fallbackCategories.find((category) => category.slug === aliased) || null;

  const nameAliases: Record<string, string[]> = {
    'office-furniture': ['office furniture'],
    'educational-furniture': ['educational furniture', 'education'],
    'school-furniture': ['school furniture', 'school'],
    'hospital-furniture': ['hospital furniture', 'healthcare'],
    'hostel-furniture': ['hostel furniture', 'hostel'],
    'industrial-storage': ['industrial storage', 'storage solutions'],
    'bathroom-collection': ['bathroom collection', 'bathroom storage'],
    'letter-boxes': ['letter box', 'letter boxes', 'mail box'],
  };
  const matchingName = nameAliases[slug]?.find((name) => categories.some((category) => category.name.toLowerCase() === name));
  if (matchingName) return categories.find((category) => category.name.toLowerCase() === matchingName) || null;

  return fallbackCategories.find((category) => category.slug === slug) || null;
}

function isViteAssetUrl(value?: string | null): boolean {
  if (!value) return false;
  return /^\/src\/assets\//i.test(value) || /^\/assets\//i.test(value);
}

function assetToProduct(category: Pick<Category, 'id' | 'name' | 'slug'>, asset: ProductAsset): Product {
  return {
    id: asset.slug || asset.fileName || asset.path,
    seller_id: undefined,
    category_id: String(category.id),
    subcategory: asset.folder,
    name: asset.name,
    slug: asset.slug,
    sku: null,
    short_desc: asset.folder,
    short_description: asset.folder,
    long_desc: null,
    description: asset.folder,
    key_features: [],
    features: [],
    supply_type: null,
    specs: {},
    specifications: {},
    dimensions: null,
    material: null,
    materials_used: null,
    color: null,
    warranty_months: null,
    warranty_terms: null,
    packaging_specifications: null,
    export_available: false,
    export_badge: null,
    weight: null,
    variants: null,
    tags: null,
    min_order_quantity: 1,
    max_order_quantity: null,
    unit: undefined,
    price: null,
    discount_price: null,
    discount_percentage: null,
    tax_percentage: 0,
    stock_quantity: undefined,
    availability_status: undefined,
    is_approved: true,
    approved_at: null,
    approved_by: null,
    featured: false,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: false,
    rating: undefined,
    total_reviews: undefined,
    total_views: undefined,
    total_orders: undefined,
    status: 'Published',
    meta_title: null,
    meta_description: null,
    image: asset.image,
    gallery: [asset.image],
    images: [],
    price_range: null,
  } as Product;
}

export default function ProductCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Pick<Category, 'id' | 'name' | 'slug'>[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const loadData = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const categoryList = await fetchCategories();
      const normalizedCategoryList = categoryList.length
        ? categoryList.map((category) => ({ id: category.id, name: category.name, slug: category.slug }))
        : fallbackCategories;
      setCategories(normalizedCategoryList);
      // #region debug-point B-D:resolve-category
      console.log('[DEBUG-CPE][B] ProductCategoryPage categories loaded', {
        categoryListSource: categoryList.length ? 'API' : 'CANONICAL-FALLBACK',
        categoryListCount: normalizedCategoryList.length,
        categoryList: normalizedCategoryList.map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
      });
      // #endregion

      const catFromRoute = slug ? resolveCategoryFromSlug(slug, normalizedCategoryList) : null;
      console.log('Selected category:', slug);
      console.log('Selected category ID:', catFromRoute?.id ?? 'none');
      console.log('Selected category slug:', catFromRoute?.slug ?? 'none');
      // #region debug-point C:catFromRoute-resolved
      console.log('[DEBUG-CPE][C] Category from route resolved', {
        rawSlug: slug ?? 'none',
        resolvedId: catFromRoute?.id ?? 'NULL',
        resolvedName: catFromRoute?.name ?? 'NULL',
        resolvedSlug: catFromRoute?.slug ?? 'NULL',
        isResolved: !!catFromRoute,
      });
      // #endregion

      if (!catFromRoute) {
        // #region debug-point C:cat-null
        console.warn('[DEBUG-CPE][C] Category NOT FOUND — setting empty products');
        // #endregion
        setApiProducts([]);
        setLoading(false);
        return;
      }

      const selectedProducts = await fetchProducts(catFromRoute.id, catFromRoute.slug);
      const apiUrl = `/products/list.php?category_id=${encodeURIComponent(catFromRoute.id)}&categorySlug=${encodeURIComponent(catFromRoute.slug)}`;
      console.log('API URL:', apiUrl);
      console.log('Total products:', selectedProducts.length);
      console.log('Filtered products:', selectedProducts.length);
      // #region debug-point D:filtered-api-products
      console.log('[DEBUG-CPE][D] Products from filtered API call', {
        categoryId: catFromRoute.id,
        categoryName: catFromRoute.name,
        categorySlug: catFromRoute.slug,
        productCount: selectedProducts.length,
        products: selectedProducts.map((p) => ({ id: p.id, name: p.name, slug: p.slug, cat_id: p.category_id, hasImage: !!p.image })),
      });
      // #endregion

      setApiProducts(selectedProducts);
      setLoading(false);
    } catch (error) {
      console.error('[ProductCategoryPage] Product/category fetch failed:', error);
      setLoadError(true);
      setApiProducts([]);
      setCategories(fallbackCategories);
      setLoading(false);
    }
  };

  useEffect(() => { void loadData(); }, [slug]);

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== 'hidden') void loadData();
    };
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [slug]);

  const categoryList = useMemo(() => categories.length ? categories : fallbackCategories, [categories]);
  const cat = useMemo(() => (slug ? resolveCategoryFromSlug(slug, categoryList) : null), [slug, categoryList]);

  const categoryProducts = useMemo(() => {
    if (!cat) return [] as Product[];
    return apiProducts;
  }, [apiProducts, cat]);

  let filtered = [...categoryProducts];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((product) => {
      const categoryName = categoryList.find((category) => category.id === String(product.category_id ?? ''))?.name ?? '';
      return product.name.toLowerCase().includes(q) ||
        (product.short_desc || '').toLowerCase().includes(q) ||
        categoryName.toLowerCase().includes(q);
    });
  }
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-heading text-2xl font-bold text-navy">Category not found</p>
        <Link to="/products" className="mt-4 rounded-full bg-gold px-6 py-2 font-sub text-sm text-navy">View All Products</Link>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-heading text-2xl font-bold text-navy">Unable to load products</p>
        <p className="mt-2 font-body text-sm text-navy/60">Please try again shortly.</p>
        <Link to="/products" className="mt-4 rounded-full bg-gold px-6 py-2 font-sub text-sm text-navy">View All Products</Link>
      </div>
    );
  }

  const bannerImage = CATEGORY_BANNERS[cat.name as CanonicalCategoryName] || categoryProducts[0]?.image || '';
  const content = categoryContent[cat.slug] || null;

  return (
    <>
      <PageMeta
        title={`${cat.name} | OPCIEAS`}
        description={`Premium ${cat.name} products from OPCIEAS for commercial, institutional and export applications.`}
        keywords={`${cat.name}, commercial furniture, ${cat.name.toLowerCase()}, OPCIEAS`}
        canonical={`https://www.opcieascommercialfurniture.com/products/category/${cat.slug}`}
        schema={{ '@context': 'https://schema.org', '@type': 'Product', name: cat.name, description: `Premium ${cat.name} from OPCIEAS` }}
      />
      <SectionBanner title={cat.name} tagline={`${categoryProducts.length} product${categoryProducts.length !== 1 ? 's' : ''}`} image={bannerImage} crumb={cat.name} crumbTo={`/products/category/${cat.slug}`} />

      <section className="bg-white py-20">
        <div className="container-x px-6">

          {content && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 grid gap-6 rounded-lux border border-navy/10 bg-navy/5 p-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Category Highlights</p>
                <h2 className="mt-2 font-heading text-2xl font-black text-navy">{cat.name}</h2>
                <p className="mt-3 font-body text-sm text-navy/70">{content.overview}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.highlights.map((item) => (
                    <span key={item} className="rounded-full border border-navy/10 bg-white px-3 py-1.5 font-sub text-xs text-navy/70">{item}</span>
                  ))}
                </div>
                <div className="mt-5">
                  <Link to="/products" className="inline-flex items-center gap-1.5 font-sub text-xs font-semibold text-gold">
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to All Products
                  </Link>
                </div>
              </div>
              <div className="rounded-lux bg-white p-5 shadow-sm">
                <p className="font-heading text-sm font-bold text-navy">Specifications</p>
                <div className="mt-3 space-y-2">
                  {content.specs.map((spec) => (
                    <div key={spec.label} className="border-b border-navy/5 pb-2">
                      <p className="font-sub text-[11px] uppercase tracking-[0.2em] text-navy/40">{spec.label}</p>
                      <p className="mt-1 font-body text-sm text-navy/70">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {content && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 rounded-lux bg-white p-6 shadow-sm ring-1 ring-navy/10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Gallery & Details</p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-navy">Product Gallery & Technical Notes</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.cta.map((item) => (
                    <span key={item} className="rounded-full bg-navy/5 px-3 py-1.5 font-sub text-xs text-navy/70">{item}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {content.gallery.map((item) => (
                  <span key={item} className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 font-sub text-xs text-gold-3">{item}</span>
                ))}
              </div>
            </motion.div>
          )}

          {cat.slug === 'hostel-furniture' && (
            <div className="mb-8 rounded-lux border border-gold/30 bg-gold/5 p-4 text-sm text-navy/80">
              <strong>Complimentary OPCIEAS brand 'Single Blankets' supplied with hostel orders of 1000 units and above.</strong>
            </div>
          )}

          <div className="mb-8 flex flex-col gap-4 rounded-lux bg-navy/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-full bg-white px-10 py-2.5 font-sub text-sm text-navy outline-none ring-1 ring-navy/10 transition focus:ring-gold" />
            </div>
            <div className="flex items-center gap-3">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full bg-white px-4 py-2.5 font-sub text-sm text-navy outline-none ring-1 ring-navy/10">
                <option value="newest">Newest</option>
                <option value="name">A-Z</option>
              </select>
              <Link to="/catalogue" className="btn-ghost flex items-center gap-2 rounded-full px-4 py-2.5 font-sub text-sm text-navy"><Download className="h-4 w-4" /> Catalogue</Link>
              <a href={`https://wa.me/919845579049?text=I'm%20interested%20in%20${encodeURIComponent(cat.name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>

          <div className="mb-8 border-l-2 border-gold bg-gold/5 px-4 py-3 font-body text-sm leading-relaxed text-navy/75">
            For formal quotations, complete category catalogues, or product flyers, please contact info@opcieas.com or click 'Request On-Demand Catalogue'.
            <Link to="/contact" className="ml-1 font-semibold text-gold underline underline-offset-2">Request On-Demand Catalogue</Link>
          </div>

          <p className="mb-6 font-sub text-sm text-navy/50">{filtered.length} product(s) found</p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Boxes className="mb-4 h-12 w-12 text-navy/20" />
              <p className="font-sub text-sm text-navy/50">No products found in this category.</p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 font-sub text-xs text-navy">
                Browse All Products <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product, index) => (
                <ProductCard key={product.id || `${product.slug}-${index}`} product={product} index={index} categorySlug={cat.slug} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="mx-auto max-w-2xl">
            <InquiryForm category={cat.name} />
          </div>
        </div>
      </section>
    </>
  );
}
