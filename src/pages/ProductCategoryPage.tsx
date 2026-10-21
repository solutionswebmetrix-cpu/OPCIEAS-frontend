import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, MessageCircle, Boxes, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import { CANONICAL_CATEGORIES, getCategoryBannerImage } from '../lib/images';
import { fetchCategories, fetchProducts, isCategoryVisible, productBelongsToCategory, productBelongsToSubcategory, resolveCategoryFromSlug, type Product, type Category } from '../lib/data';
import { categoryHighlightGroups, getCategorySubcategoryRoute } from '../lib/categorySubcategories';

type CategoryDescriptionSection = {
  heading: string;
  paragraphs?: string[];
  items?: Array<{ label?: string; text: string }>;
};

type CategoryContent = {
  overview: string;
  highlights: string[];
  accessories?: string[];
  specs: Array<{ label: string; value: string }>;
  gallery: string[];
  cta: string[];
  descriptionSections?: CategoryDescriptionSection[];
};

const categoryContent: Record<string, CategoryContent> = {
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
    overview: 'Equip learning spaces and institutions with durable, ergonomic, and high-performance furniture designed to withstand rigorous daily use. Our comprehensive range ensures comfort, safety, and longevity across all academic and institutional environments.',
    highlights: [],
    specs: [],
    gallery: [],
    cta: [],
    descriptionSections: [
      {
        heading: 'Classroom & Campus Solutions',
        paragraphs: ['We offer thoughtfully designed student desks, chairs, and collaborative layouts optimized for every stage of learning and professional training.'],
        items: [
          { label: 'Kindergarten & Nursery (KG):', text: 'Colorful, safe, rounded-edge ergonomic tables and low seating.' },
          { label: 'Primary School Sets:', text: 'Integrated student desk-bench combinations optimized for growing children.' },
          { label: 'High School & College Benches:', text: 'Durable dual- or triple-seater desks with integrated bookshelves and modesty panels.' },
          { label: 'University, Lecture Halls & PG Training Centers:', text: 'Premium writing pad chairs, executive lecture seating, and setups trusted by higher education institutions and defense training academies.' },
        ],
      },
      {
        heading: 'Hostel Furniture & Bedding Solutions (Including Defense Quarters)',
        paragraphs: ['Sturdy, space-efficient heavy-duty metal cots, bunk beds, study tables, wardrobes, cupboards, and storage units built for rigorous hostel living. Specifically engineered to meet the durability demands of military barracks, air force residential quarters, university hostels, and corporate dormitories.'],
        items: [
          { label: 'Single Cot:', text: 'Compact, heavy-duty single-user frames (durable steel/wood finish for individual rooms).' },
          { label: 'Bunk Bed:', text: 'Space-saving two-tier beds (ideal for student hostels, dormitories, and budget accommodations).' },
          { label: 'Triple Bunk / Heavy Institutional Bed:', text: 'Multi-tier or heavy enterprise configurations designed for maximum capacity utilization.' },
        ],
      },
      {
        heading: 'The Bedding & Living Collection',
        paragraphs: ['Complete your institutional rooms with our premium sleep essentials. We offer long-lasting mattresses (rubberized coir, latex, and high-density cushion foam), breathable cotton-filled beds, washable cushion pillows, 100% cotton bedsheets, and protective mattress covers designed for easy maintenance and superior hygiene.'],
      },
      {
        heading: 'Auditorium & Stadium Seating',
        paragraphs: ['Premium, comfortable seating solutions engineered for large-scale assembly halls, auditoriums, and sports stadiums, balancing aesthetics with long-lasting structural strength.'],
      },
      {
        heading: 'Why Choose Our Institutional Range?',
        paragraphs: ['Built to outperform standard commercial options, our products use heavy-duty materials and reinforced construction to handle rough, high-traffic usage. We deliver exceptional value through superior lifespan, minimizing replacement costs for schools, colleges, and hostels.'],
      },
    ],
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
    highlights: [],
    specs: [],
    gallery: [],
    cta: ['Request Quote', 'WhatsApp Inquiry'],
  },
  'industrial-storage': {
    overview: 'Heavy-duty storage solutions for warehouses, commercial kitchens and industrial environments.',
    highlights: [],
    specs: [],
    gallery: [],
    cta: [],
    descriptionSections: [
      {
        heading: 'Light-Duty Wire Racks & Utility Shelving',
        items: [
          { label: 'Ideal For:', text: 'Office files, light storage, and general utility use.' },
          { label: 'Capacity:', text: '200 kg to 250 kg capacity per shelf. When fitted with wheels, capacity is 120 kg to 150 kg per rack.' },
        ],
      },
      {
        heading: 'Medium-Duty Boltless Shelving & SS Racks',
        items: [
          { label: 'Ideal For:', text: 'Multi-tier shelving systems for archiving old documents in banks and courts, commercial kitchens, and retail display backrooms.' },
          { label: 'Capacity:', text: '200 kg to 250 kg per level, offering a balance of strength and versatility.' },
        ],
      },
      {
        heading: 'Heavy-Duty Industrial Storage & Pallet Racks',
        items: [
          { label: 'Ideal For:', text: 'Industrial warehouses, godowns, and demanding commercial environments.' },
          { label: 'Capacity:', text: 'High-weight-capacity systems ranging from 1,000 kg to 2,500 kg+ per level, engineered with superior corrosion resistance.' },
        ],
      },
    ],
  },
  'bathroom-collection': {
    overview: 'Premium bathroom collection featuring waterproof mirrors, rust-resistant racks and compact storage solutions for modern commercial washrooms.',
    highlights: [],
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
    highlights: ['ABS Plastic Letter Box', 'Metal Letter Box', 'Wooden Letter Box', 'Apartment Cluster System'],
    specs: [
      { label: 'Material Options', value: 'Stainless Steel, Mild Steel, ABS Plastic and Solid Wood' },
      { label: 'Applications', value: 'Residential societies, apartments, offices, institutions and gated communities' },
      { label: 'Design', value: 'Secure locking, weatherproof, flat / cluster modules, newspaper holder option' },
    ],
    gallery: ['Apartment letter box clusters', 'Stylish metal / wooden boxes', 'Society and office entrance banks'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
};

const fallbackCategories: Pick<Category, 'id' | 'name' | 'slug'>[] = CANONICAL_CATEGORIES.filter((category) => isCategoryVisible(category)).map((category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
}));

export default function ProductCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Pick<Category, 'id' | 'name' | 'slug'>[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const requestedSubcategory = (searchParams.get('subcategory') ?? '').trim();

  const loadData = async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const categoryList = await fetchCategories().catch(() => fallbackCategories);
      const normalizedCategoryList = categoryList.length
        ? categoryList.map((category) => ({ id: category.id, name: category.name, slug: category.slug }))
        : fallbackCategories;
      setCategories(normalizedCategoryList);

      const catFromRoute = slug ? resolveCategoryFromSlug(slug, normalizedCategoryList) : null;
      if (!catFromRoute) {
        setApiProducts([]);
        setLoading(false);
        return;
      }

      let selectedProducts: Product[] = [];
      try {
        const categoryFilteredProducts = await fetchProducts(catFromRoute.id, catFromRoute.slug);
        if (Array.isArray(categoryFilteredProducts) && categoryFilteredProducts.length > 0) {
          selectedProducts = categoryFilteredProducts;
        }
      } catch (categoryError) {
        console.error('[CategoryPage] category-specific fetch failed, falling back to full product list:', categoryError);
      }

      if (selectedProducts.length === 0) {
        try {
          const allProducts = await fetchProducts();
          selectedProducts = allProducts.filter((product) => productBelongsToCategory(product, catFromRoute));
        } catch (loadError) {
          console.error('[CategoryPage] full product list fetch failed:', loadError);
          selectedProducts = [];
          setLoadError(loadError instanceof Error ? loadError.message : String(loadError));
        }
      }

      setApiProducts(selectedProducts);
      setLoading(false);
    } catch (error) {
      console.error('[CategoryPage] product loading failed:', error);
      setLoadError(error instanceof Error ? error.message : String(error));
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
    let products = [...apiProducts];
    if (requestedSubcategory) {
      products = products.filter((product) => productBelongsToSubcategory(product, requestedSubcategory));
    }
    return products;
  }, [apiProducts, cat, requestedSubcategory]);

  let filtered = [...categoryProducts];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((product) => {
      const categoryName = categoryList.find((category) => category.id === String(product.category_id ?? ''))?.name ?? '';
      const searchable = [
        product.name,
        product.slug,
        product.subcategory,
        product.short_desc,
        product.description,
        categoryName,
        ...(Array.isArray(product.tags) ? product.tags : []),
        ...(Array.isArray(product.features) ? product.features : []),
      ].filter((value): value is string => typeof value === 'string');
      return searchable.some((value) => value.toLowerCase().includes(q));
    });
  }
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-heading text-2xl font-bold text-navy">Category not found</p>
        <Link to="/products" className="mt-4 rounded-full bg-accent-blue px-6 py-2 font-sub text-sm text-navy">View All Products</Link>
      </div>
    );
  }

  const bannerImage = getCategoryBannerImage(cat.name) ?? '';
  const content = categoryContent[cat.slug] || null;
  const highlightGroup = categoryHighlightGroups[cat.slug];

  return (
    <>
      <PageMeta
        title={`${cat.name} | OPCIEAS`}
        description={`Premium ${cat.name} products from OPCIEAS for commercial, institutional and export applications.`}
        keywords={`${cat.name}, commercial furniture, ${cat.name.toLowerCase()}, OPCIEAS`}
        canonical={`https://www.opcieascommercialfurniture.com/products/category/${cat.slug}`}
        schema={{ '@context': 'https://schema.org', '@type': 'Product', name: cat.name, description: `Premium ${cat.name} from OPCIEAS` }}
      />
      <SectionBanner title={cat.name} tagline={loadError ? 'Product data unavailable' : `${categoryProducts.length} product${categoryProducts.length !== 1 ? 's' : ''}`} image={bannerImage} crumb={cat.name} crumbTo={`/products/category/${cat.slug}`} variant="category" />

      <section className="bg-white py-20">
        <div className="container-x px-6">

          {content && highlightGroup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 rounded-lux border border-navy/10 bg-navy/5 p-6"
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-accent-blue">Category Highlights</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-navy">{cat.name}</h2>
              <p className="mt-3 font-body text-sm text-navy/70">{content.overview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {highlightGroup.subcategories.map((item) => (
                  <Link
                    key={item.label}
                    to={getCategorySubcategoryRoute(cat.slug, item.subcategory)}
                    aria-label={`View ${item.label} products`}
                    className="rounded-full border border-navy/10 bg-white px-3 py-1.5 font-sub text-xs text-navy/70 transition-colors hover:border-accent-blue/40 hover:text-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {highlightGroup.accessories && (
                <div className="mt-6">
                  <p className="font-sub text-xs uppercase tracking-[0.3em] text-accent-blue">Accessories</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {highlightGroup.accessories.map((item) => (
                      <Link
                        key={item.label}
                        to={getCategorySubcategoryRoute(cat.slug, item.subcategory)}
                        aria-label={`View ${item.label} products`}
                        className="rounded-full border border-navy/10 bg-white px-3 py-1.5 font-sub text-xs text-navy/70 transition-colors hover:border-accent-blue/40 hover:text-navy"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {content && content.descriptionSections ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 rounded-lux border border-navy/10 bg-navy/5 p-6"
            >
              <p className="font-sub text-base uppercase tracking-[0.3em] text-[#163A63]">Category Overview</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-navy">{cat.name}</h2>
              {content.overview && <p className="mt-3 font-body text-base leading-relaxed text-navy/70">{content.overview}</p>}
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {content.descriptionSections.map((section) => (
                  <section key={section.heading} className="rounded-lux bg-white p-5 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-navy">{section.heading}</h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-3 font-body text-base leading-relaxed text-navy/70">{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-base leading-relaxed text-navy/70">
                        {section.items.map((item) => (
                          <li key={item.label ?? item.text}>
                            {item.label && <strong className="font-semibold text-navy">{item.label} </strong>}
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
              <div className="mt-5">
                <Link to="/products" className="inline-flex items-center gap-1.5 font-sub text-sm font-semibold text-accent-blue">
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to All Products
                </Link>
              </div>
            </motion.article>
          ) : content && !highlightGroup && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 grid gap-6 rounded-lux border border-navy/10 bg-navy/5 p-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="font-sub text-xs uppercase tracking-[0.3em] text-accent-blue">Category Highlights</p>
                <h2 className="mt-2 font-heading text-2xl font-black text-navy">{cat.name}</h2>
                <p className="mt-3 font-body text-sm text-navy/70">{content.overview}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.highlights.map((item) => (
                    <span key={item} className="rounded-full border border-navy/10 bg-white px-3 py-1.5 font-sub text-xs text-navy/70">{item}</span>
                  ))}
                </div>
                {content.accessories && (
                  <div className="mt-6">
                    <p className="font-sub text-xs uppercase tracking-[0.3em] text-accent-blue">Accessories</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {content.accessories.map((item) => (
                        <span key={item} className="rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1.5 font-sub text-xs text-navy/70">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-5">
                  <Link to="/products" className="inline-flex items-center gap-1.5 font-sub text-xs font-semibold text-accent-blue">
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Back to All Products
                  </Link>
                </div>
              </div>
              {content.specs.length > 0 && <div className="rounded-lux bg-white p-5 shadow-sm">
                <p className="font-heading text-sm font-bold text-navy">Specifications</p>
                <div className="mt-3 space-y-2">
                  {content.specs.map((spec) => (
                    <div key={spec.label} className="border-b border-navy/5 pb-2">
                      <p className="font-sub text-[11px] uppercase tracking-[0.2em] text-navy/40">{spec.label}</p>
                      <p className="mt-1 font-body text-sm text-navy/70">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>}
            </motion.div>
          )}

          {content && content.gallery.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 rounded-lux bg-white p-6 shadow-sm ring-1 ring-navy/10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-sub text-xs uppercase tracking-[0.3em] text-accent-blue">Gallery & Details</p>
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
                  <span key={item} className="rounded-full border border-accent-blue/20 bg-accent-blue/10 px-3 py-1.5 font-sub text-xs text-accent-blue-3">{item}</span>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mb-8 flex flex-col gap-4 rounded-lux bg-navy/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-full bg-white px-10 py-2.5 font-sub text-sm text-navy outline-none ring-1 ring-navy/10 transition focus:ring-accent-blue" />
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

          <div className="mb-8 border-l-2 border-accent-blue bg-accent-blue/5 px-4 py-3 font-body text-sm leading-relaxed text-navy/75">
            For formal quotations, complete category catalogues, or product flyers, please contact info@opcieas.com or click 'Request On-Demand Catalogue'.
            <Link to="/contact" className="ml-1 font-semibold text-accent-blue underline underline-offset-2">Request On-Demand Catalogue</Link>
          </div>

          {loadError ? (
            <p role="alert" className="mb-6 rounded-lux border border-navy/10 bg-navy/5 px-4 py-3 font-body text-sm text-navy/70">
              Product data could not be loaded from the configured API: {loadError}
            </p>
          ) : (
            <>
              <p className="mb-6 font-sub text-sm text-navy/50">{filtered.length} product(s) found</p>
              {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Boxes className="mb-4 h-12 w-12 text-navy/20" />
              <p className="font-sub text-sm text-navy/50">No products found in this category.</p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-blue px-5 py-2 font-sub text-xs text-navy">
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
            </>
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
