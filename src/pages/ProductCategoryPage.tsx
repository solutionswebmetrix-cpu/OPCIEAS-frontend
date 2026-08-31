import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, MessageCircle, Boxes } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import ProductCard from '../components/ProductCard';
import InquiryForm from '../components/InquiryForm';
import { fetchCategory, fetchProducts, type Product, type Category } from '../lib/data';

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
    overview: 'Library, laboratory, reading and training furniture engineered for colleges and institutes with ergonomic and tender-compliant quality.',
    highlights: ['Library Table', 'Library Rack', 'Reading Table', 'Laboratory Bench', 'Lecture Podium', 'Training Desk', 'Training Chair', 'College Furniture'],
    specs: [
      { label: 'Applications', value: 'Colleges, universities, libraries, R&D labs and training institutes' },
      { label: 'Materials', value: 'Mild steel + engineered wood / chemical-resistant resin tops as required' },
      { label: 'Design', value: 'Heavy-duty frame, scratch-resistant surfaces, bulk-supply ready' },
    ],
    gallery: ['Library reading zones', 'Laboratory workbenches', 'Lecture hall and training rooms'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'school-furniture': {
    overview: 'Classroom, activity and playground furniture for schools and kindergartens with safety, ergonomics and heavy-duty durability.',
    highlights: ['Student Desk', 'Student Chair', 'Dual Desk', 'Teacher Table', 'Teacher Chair', 'Kids / Nursery Furniture', 'Activity Table', 'Play Equipment'],
    specs: [
      { label: 'Suitability', value: 'Schools, preschools, nursery, coaching centres and activity zones' },
      { label: 'Materials', value: 'Powder-coated steel, HDPE, anti-scratch laminated tops, outdoor UV-stabilized' },
      { label: 'Design', value: 'Safe rounded edges, age-appropriate height, low-maintenance, bulk-ready' },
    ],
    gallery: ['Classroom layout', 'Play zone and activity area', 'Outdoor playground furniture'],
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
    highlights: ['Single Cot', 'Two Tier Bunk Bed', 'Three Tier Steel Cot', 'Wardrobe', 'Hostel Locker', 'Study Table', 'Hostel Chair', 'Commercial Mattress'],
    specs: [
      { label: 'Suitability', value: 'Hostels, dormitories, student housing and residential institutions' },
      { label: 'Build', value: 'Powder-coated steel frames with durable bedding textile finishes' },
      { label: 'Storage', value: 'Under-bed clearance, lockers, wardrobes and study units available' },
    ],
    gallery: ['Hostel dormitory setup', 'Bunk beds and storage', 'Student study & wardrobe units'],
    cta: ['Request Quote', 'WhatsApp Inquiry'],
  },
  'industrial-storage': {
    overview: 'Heavy-duty warehouse and industrial storage racks, shelves, lockers and cabinets with high load capacity and export finish.',
    highlights: ['Warehouse Rack', 'Industrial Rack', 'Heavy-Duty Rack', 'Slotted Angle Rack', 'Pallet Rack', 'Long Span Shelving', 'SS Wire Rack', 'Steel Locker'],
    specs: [
      { label: 'Applications', value: 'Warehouses, factories, godowns, retail storage, offices and industrial yards' },
      { label: 'Build', value: 'Mild steel / SS, powder-coated or galvanized finish, boltless / bolted assembly' },
      { label: 'Capacity', value: '200 kg – 2000 kg / shelf depending on model, custom heights and widths available' },
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
  'premium-seating': {
    overview: 'Premium seating solutions for auditoriums, cinemas and stadiums with comfort, durability and superior design.',
    highlights: ['Auditorium Chairs', 'Cinema Seats', 'Stadium Chairs', 'Premium Comfort', 'Durable Upholstery'],
    specs: [
      { label: 'Applications', value: 'Auditoriums, cinema halls and stadiums' },
      { label: 'Materials', value: 'Steel frames, upholstered seating and weather-resistant finishes' },
      { label: 'Features', value: 'Ergonomic comfort, cup holders and folding mechanisms' },
    ],
    gallery: ['Auditorium seating models', 'Cinema seat layout', 'Stadium chair installations'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
  'play-equipment': {
    overview: 'Durable play equipment for schools, parks and residential communities built for safety and long-lasting use.',
    highlights: ['Slides', 'Swings', 'Climbing Frames', 'Play Structures', 'Outdoor Activity Equipment'],
    specs: [
      { label: 'Suitability', value: 'Schools, parks, societies and community centres' },
      { label: 'Materials', value: 'HDPE, steel and UV-protected finishes' },
      { label: 'Safety', value: 'Child-safe design with durable, weather-resistant construction' },
    ],
    gallery: ['Playground equipment', 'School play area installations', 'Outdoor activity structures'],
    cta: ['Request Quote', 'Download Catalogue'],
  },
};

export default function ProductCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [cat, setCat] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const loadCategoryData = async () => {
    if (!slug) return;
    setLoading(true);
    const [c, ps] = await Promise.all([
      fetchCategory(slug),
      fetchProducts(undefined, slug),
    ]);
    setCat(c);
    setProducts(ps);
    setLoading(false);
  };

  useEffect(() => {
    void loadCategoryData();
  }, [slug]);

  useEffect(() => {
    const refreshProducts = () => {
      if (document.visibilityState !== 'hidden') {
        void loadCategoryData();
      }
    };

    window.addEventListener('focus', refreshProducts);
    document.addEventListener('visibilitychange', refreshProducts);

    return () => {
      window.removeEventListener('focus', refreshProducts);
      document.removeEventListener('visibilitychange', refreshProducts);
    };
  }, [slug]);

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.short_desc || '').toLowerCase().includes(search.toLowerCase())
  );
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

  const content = categoryContent[cat.slug] || categoryContent[cat.name.toLowerCase().replace(/\s+/g, '-')] || null;

  return (
    <>
      <PageMeta
        title={`${cat.name} | OPCIEAS`}
        description={cat.description || `Premium ${cat.name} products from OPCIEAS for commercial, institutional and export applications.`}
        keywords={`${cat.name}, commercial furniture, ${cat.name.toLowerCase()}, OPCIEAS`}
        canonical={`https://www.opcieascommercialfurniture.com/products/category/${cat.slug}`}
        schema={{ '@context': 'https://schema.org', '@type': 'Product', name: cat.name, description: cat.description }}
      />
      <SectionBanner title={cat.name} tagline={cat.tagline || ''} image={cat.banner_image || ''} crumb={cat.name} crumbTo={`/products/category/${cat.slug}`} />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          {cat.description && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-3xl text-center">
              <p className="font-body text-base text-navy/70">{cat.description}</p>
            </motion.div>
          )}

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

          {/* Filters + Search */}
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
              <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-4 py-2.5 font-sub text-sm text-navy"><Download className="h-4 w-4" /> Catalogue</Link>
              <a href={`https://wa.me/919845579049?text=I'm%20interested%20in%20${encodeURIComponent(cat.name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-sub text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>

          <p className="mb-6 font-sub text-sm text-navy/50">{filtered.length} product(s) found</p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Boxes className="mb-4 h-12 w-12 text-navy/20" />
              <p className="font-sub text-sm text-navy/50">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} categorySlug={cat.slug} />)}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry */}
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
