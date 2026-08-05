import {
  CANONICAL_CATEGORIES,
  PRODUCT_IMAGE_GROUPS,
  CATEGORY_BANNERS,
  IMG,
  SCHOOL_FURNITURE_IMAGES,
  CanonicalCategoryName,
  toKebab,
} from './images';
import { apiGet, apiPost, apiFormData } from './api';
import type {
  Category,
  Product,
  Industry,
  IndustryProject,
  Client,
  Certification,
  Career,
  PurchaseRequirement,
  RFQPayload,
  ContactPayload,
  AuthStatus,
} from './types';

export type {
  Category,
  Product,
  Industry,
  IndustryProject,
  Client,
  Certification,
  Career,
  PurchaseRequirement,
  RFQPayload,
  ContactPayload,
  AuthStatus,
};

const CATEGORY_META: Record<CanonicalCategoryName, { tagline: string; description: string }> = {
  'Office Furniture': {
    tagline: 'Ergonomic and premium office solutions',
    description: 'Executive desks, conference tables, ergonomic workstations, reception counters, cabinets and storage engineered for premium corporate, government and enterprise workspaces with export-ready finish and quality control.',
  },
  'Educational Furniture': {
    tagline: 'Classroom, library and campus essentials',
    description: 'Library furniture, reading tables, laboratory benches, training desks, lecture podiums and college furniture designed for durable daily use in educational institutions with ergonomic and tender-compliant specifications.',
  },
  'School Furniture': {
    tagline: 'Classroom and activity furniture for schools',
    description: 'Student desks and chairs, dual desks, teacher furniture, nursery and kindergarten activity furniture, playground equipment and school storage systems designed for safety, ergonomics and heavy-duty institutional use.',
  },
  'Hospital Furniture': {
    tagline: 'Healthcare and medical furniture solutions',
    description: 'Patient beds, semi-fowler and ICU beds, over-bed tables, bedside lockers, examination tables, crash carts and hospital storage engineered for hygiene, easy cleaning and long-term use in clinical and healthcare environments.',
  },
  'Hostel Furniture': {
    tagline: 'Durable hostel and dormitory furniture',
    description: 'Heavy-duty metal and steel beds, bunk beds, wardrobes, lockers, study tables and storage systems for student hostels, dormitories and institutional housing with robust frames and low-maintenance finishes.',
  },
  'Industrial Storage': {
    tagline: 'Warehouse and heavy-duty storage solutions',
    description: 'Industrial racks, warehouse racks, slotted angle racks, pallet racks, heavy-duty shelves, SS wire racks, lockers and cabinets engineered for high load capacities, boltless assembly and export-ready galvanized or powder-coated finishes.',
  },
  'Bathroom Collection': {
    tagline: 'Premium bathroom storage and accessories',
    description: 'Bathroom vanities, mirror cabinets, storage shelves, towel racks and bathroom storage systems with waterproof, rust-resistant and stain-resistant finishes suitable for commercial, hospitality and institutional washrooms.',
  },
  'Letter Box': {
    tagline: 'Premium letter boxes for homes and societies',
    description: 'ABS, metal and wooden letter boxes, apartment cluster mail systems, society letter box banks, wall-mounted and outdoor letter boxes with secure locking and weatherproof finishes for residential complexes and offices.',
  },
};

const mockCategories: Category[] = CANONICAL_CATEGORIES.map((c) => {
  const meta = CATEGORY_META[c.name];
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    tagline: meta.tagline,
    description: meta.description,
    banner_image: CATEGORY_BANNERS[c.name] ?? null,
    icon: null,
  };
});

const CATEGORY_NAME_TO_ID: Record<string, string> = Object.fromEntries(
  CANONICAL_CATEGORIES.map((c) => [c.name, c.id])
);

const DEFAULT_MATERIALS: Record<CanonicalCategoryName, string[]> = {
  'Office Furniture':      ['Engineered Wood + Powder-Coated Steel', 'Laminate / Veneer Top', 'Mild Steel Frame'],
  'Educational Furniture': ['Mild Steel + Engineered Wood', 'Powder-Coated Frame', 'Anti-Scratch Laminate'],
  'School Furniture':      ['Mild Steel + HDPE / Plastic', 'Powder-Coated Tubular Frame', 'Anti-Scratch Laminated Top'],
  'Hospital Furniture':    ['CR / MS Steel Frame', 'Epoxy / Powder-Coated Finish', 'Foam + Leatherette Upholstery'],
  'Hostel Furniture':      ['Mild Steel / Steel', 'Powder-Coated Finish', 'Engineered Wood Work Surface'],
  'Industrial Storage':    ['Mild Steel', 'Powder-Coated / Galvanized', 'Heavy-Duty Uprights & Beams'],
  'Bathroom Collection':   ['Stainless Steel 304 / PVC / Marine Ply', 'Waterproof Finish', 'Rust-Resistant Hardware'],
  'Letter Box':            ['Stainless Steel 304 / Mild Steel / ABS Plastic / Wood', 'Powder-Coated or Polished', 'Lockable Mechanism'],
};

const DEFAULT_FINISHES: Record<CanonicalCategoryName, string[]> = {
  'Office Furniture':      ['Laminate', 'High Gloss', 'Veneer', 'Powder Coated'],
  'Educational Furniture': ['Powder Coated', 'Laminate', 'Matte'],
  'School Furniture':      ['Powder Coated', 'Laminate', 'UV Protected'],
  'Hospital Furniture':    ['Epoxy Coated', 'Powder Coated', 'Easy-Clean Surface'],
  'Hostel Furniture':      ['Powder Coated', 'Laminate', 'Matte'],
  'Industrial Storage':    ['Powder Coated', 'Galvanized', 'Chrome Plated'],
  'Bathroom Collection':   ['Mirror Polish', 'Brushed', 'Waterproof Laminate', 'Chrome'],
  'Letter Box':            ['Powder Coated', 'Mirror Polish', 'Natural Wood Polish', 'Matte'],
};

const DEFAULT_COLORS: Record<CanonicalCategoryName, string[]> = {
  'Office Furniture':      ['Walnut Brown', 'Maple Cream', 'White', 'Charcoal Grey', 'Black', 'Navy Blue'],
  'Educational Furniture': ['Maple', 'Grey', 'White', 'Blue', 'Beige'],
  'School Furniture':      ['Sky Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Pink', 'White', 'Woodgrain'],
  'Hospital Furniture':    ['White', 'Sky Blue', 'Beige', 'Medical Grey', 'Sage Green'],
  'Hostel Furniture':      ['Charcoal Grey', 'Black', 'Royal Blue', 'Ivory', 'Woodgrain'],
  'Industrial Storage':    ['Silver Grey', 'Blue', 'Orange', 'Galvanized Silver', 'Ral 7035'],
  'Bathroom Collection':   ['Chrome Silver', 'Brushed Gold', 'White', 'Matte Black', 'Woodgrain'],
  'Letter Box':            ['Stainless Steel', 'Black', 'Brown Wood', 'White', 'Gold', 'Grey'],
};

const DEFAULT_SIZE_RANGES: Record<CanonicalCategoryName, string[]> = {
  'Office Furniture':      ['Standard', 'Compact', 'Executive (1.8m+)', 'Boardroom (3.0m+)'],
  'Educational Furniture': ['2-Seater', '4-Seater', '6-Seater', 'Modular'],
  'School Furniture':      ['Nursery / Kids', 'Primary', 'Secondary', 'Adult / Teacher'],
  'Hospital Furniture':    ['Single', 'Bariatric', 'Paediatric', 'Standard Clinical'],
  'Hostel Furniture':      ['Single Cot', 'Bunk Bed', '3-Tier', 'With Storage'],
  'Industrial Storage':    ['8 Shelves / Level', '12 Shelves / Level', '16 Shelves / Level', '20+ Shelves / Level', 'Custom'],
  'Bathroom Collection':   ['600mm', '800mm', '1000mm', '1200mm', 'Custom'],
  'Letter Box':            ['Single Unit', '8 Flats', '16 Flats', '24 Flats', 'Custom Cluster'],
};

const PRICE_BRACKETS: Record<CanonicalCategoryName, [number, number]> = {
  'Office Furniture':      [12000, 120000],
  'Educational Furniture': [5000, 55000],
  'School Furniture':      [1500, 40000],
  'Hospital Furniture':    [15000, 110000],
  'Hostel Furniture':      [8000, 45000],
  'Industrial Storage':    [7000, 80000],
  'Bathroom Collection':   [5000, 35000],
  'Letter Box':            [1500, 55000],
};

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickByHash<T>(arr: T[], seed: string, idx = 0): T {
  return arr[(hashCode(seed + '||' + String(idx))) % arr.length];
}

function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

function generatePriceRange(cleanName: string, cat: CanonicalCategoryName): string {
  const [lo, hi] = PRICE_BRACKETS[cat];
  const mid = Math.floor((lo + hi) / 2);
  const seed = hashCode(cleanName);
  const p1 = lo + (seed % Math.max(1, Math.floor((mid - lo) / 500))) * 500;
  const p2 = mid + ((seed >> 3) % Math.max(1, Math.floor((hi - mid) / 1000))) * 1000;
  const a = Math.min(p1, p2);
  const b = Math.max(p1, p2);
  return `${formatINR(Math.max(a, lo))} - ${formatINR(Math.min(b, hi))}`;
}

function generateShortDesc(cleanName: string, cat: CanonicalCategoryName): string {
  const prefix: Record<CanonicalCategoryName, string> = {
    'Office Furniture':      'Premium commercial-grade',
    'Educational Furniture': 'Institutional-quality',
    'School Furniture':      'Heavy-duty, student-ready',
    'Hospital Furniture':    'Hygiene-friendly clinical',
    'Hostel Furniture':      'Durable dormitory',
    'Industrial Storage':    'Heavy-duty industrial',
    'Bathroom Collection':   'Waterproof premium',
    'Letter Box':            'Secure, weatherproof',
  };
  return `${prefix[cat]} ${cleanName.toLowerCase()} designed for ${cat.toLowerCase()} use with durable finish and export-ready quality.`;
}

function generateLongDesc(cleanName: string, cat: CanonicalCategoryName): string {
  return `${cleanName} from OPCIEAS is engineered for demanding ${cat.toLowerCase()} environments. Manufactured with premium raw materials, strict quality control and export-grade finishing, this product combines durable construction with ergonomic design and low long-term maintenance. Suitable for government tender supply, bulk institutional orders, commercial establishments, hospitality, education campuses, industrial facilities and export markets. Every unit is backed by standardized dimensions, quality assurance documentation and customization flexibility for finishes, colors and sizes to meet project-specific requirements. Contact our team for RFQ, bulk pricing, installation support and tender-ready technical specifications.`;
}

const FEATURE_POOL: Record<CanonicalCategoryName, string[]> = {
  'Office Furniture': [
    'Ergonomic Design', 'Cable Management', 'Lockable Drawers', 'Modular Construction',
    'Scratch-Resistant Laminate', 'Powder-Coated Frame', 'Ample Storage', 'Stain-Resistant Surface',
    'Tender-Ready Specs', 'Export-Grade Finish', 'Custom Sizes Available', 'Bulk Manufacturing Capacity',
  ],
  'Educational Furniture': [
    'Heavy-Duty Frame', 'Ergonomic Sizing', 'Scratch-Resistant Top', 'Stackable / Compact Storage',
    'Powder-Coated Finish', 'Age-Appropriate Design', 'Easy To Clean', 'Long-Lasting Welds',
    'Bulk Supply Ready', 'Tender Compliant', 'Anti-Skid Feet', 'Classroom Tested',
  ],
  'School Furniture': [
    'Safe Rounded Edges', 'Ergonomic', 'Scratch-Resistant', 'Heavy-Duty Tubular Frame',
    'Powder-Coated', 'UV-Stabilized Plastic Components', 'Anti-Skid Feet', 'Weather-Resistant (Outdoor Models)',
    'Age-Appropriate Height', 'Bulk Supply', 'Tender Ready', 'Low Maintenance',
  ],
  'Hospital Furniture': [
    'Hygienic, Easy-Clean Surfaces', 'Medical-Grade Powder Coat', 'Adjustable Height / Backrest',
    'Side Rails (Models Applicable)', 'Lockable Castors', 'Corrosion-Resistant Frame',
    'Clinical-Validated Design', 'Standardized For Tenders', 'Custom Configurations', 'Bulk Supply Ready',
  ],
  'Hostel Furniture': [
    'Strong Welded Steel Frame', 'Powder-Coated Corrosion Resistance', 'Safety Rails (Bunk Models)',
    'Integrated Ladder', 'Ample Under-Bed Storage', 'Lockable Compartments',
    'Dormitory-Ready', 'Bulk Order Friendly', 'Easy Assembly Kit', 'Long Lifespan',
  ],
  'Industrial Storage': [
    'High Load Capacity', 'Boltless / Bolted Assembly', 'Adjustable Shelf Levels',
    'Powder-Coated or Galvanized Finish', 'Rust Resistant', 'Modular Expansion',
    'Forklift-Compatible (Racks)', 'Export Packaging', 'Custom Dimensions', 'Warehouse Tested',
  ],
  'Bathroom Collection': [
    'Waterproof / Humidity-Resistant', 'Rust-Resistant Hardware', 'Premium Finish (Chrome / SS)',
    'Easy Wall Mounting', 'Ample Storage', 'Stain-Resistant Surface',
    'Commercial-Grade Build', 'Hospitality & Office Ready', 'Mirror / Shelf Options', 'Low Maintenance',
  ],
  'Letter Box': [
    'Secure Locking Mechanism', 'Weatherproof Construction', 'Anti-Corrosion Finish',
    'Easy Installation (Wall / Floor)', 'Apartment Cluster Configurations', 'Multiple Flats Modules',
    'Newspaper Holder (Optional)', 'Keyed Lock', 'Mail Theft Protection', 'Custom Branding',
  ],
};

function generateFeatures(cleanName: string, cat: CanonicalCategoryName): string[] {
  const pool = FEATURE_POOL[cat];
  const count = 4 + (hashCode(cleanName) % 3);
  const picks: string[] = [];
  let cursor = 0;
  while (picks.length < count && cursor < pool.length * 2) {
    const item = pool[(hashCode(cleanName + '|f|' + cursor)) % pool.length];
    if (!picks.includes(item)) picks.push(item);
    cursor++;
  }
  return picks;
}

function generateSpecs(cleanName: string, cat: CanonicalCategoryName): Record<string, string> {
  const materials = DEFAULT_MATERIALS[cat];
  const finishes = DEFAULT_FINISHES[cat];
  const colors = DEFAULT_COLORS[cat];
  const sizes = DEFAULT_SIZE_RANGES[cat];
  const dimsByCat: Record<CanonicalCategoryName, string> = {
    'Office Furniture':      'As per selected model / Custom',
    'Educational Furniture': 'Standard institutional sizes / Custom',
    'School Furniture':      'Student ergonomic sizing / Age-specific',
    'Hospital Furniture':    'Clinical standard sizes / Custom',
    'Hostel Furniture':      'Standard cot / bunk dimensions',
    'Industrial Storage':    'Load capacity 200–2000 kg / level, custom height & width',
    'Bathroom Collection':   'Wall-mount / countertop as per model',
    'Letter Box':            'As per flat-count module / Custom cluster',
  };
  return {
    'Material':   pickByHash(materials, cleanName, 1) + ' | ' + pickByHash(materials, cleanName, 2),
    'Finish':     pickByHash(finishes, cleanName, 3),
    'Color Options': `${pickByHash(colors, cleanName, 4)}, ${pickByHash(colors, cleanName, 5)}, ${pickByHash(colors, cleanName, 6)}`,
    'Size Options':  `${pickByHash(sizes, cleanName, 7)} | ${pickByHash(sizes, cleanName, 8)}`,
    'Dimensions':   dimsByCat[cat],
    'Warranty':     '1 Year Manufacturer Warranty (Terms Apply)',
    'Compliance':   'ISO 9001:2015 | NSIC | MSME | Export Ready',
  };
}

function buildProductsFromImageGroups(): Product[] {
  const cleanNameCounts: Record<string, number> = {};
  const slugCounts: Record<string, number> = {};
  const products: Product[] = [];
  const groupsSorted = [...PRODUCT_IMAGE_GROUPS].sort((a, b) => a.cleanName.localeCompare(b.cleanName));
  for (let idx = 0; idx < groupsSorted.length; idx++) {
    const g = groupsSorted[idx];
    const cat = g.category;
    const category_id = CATEGORY_NAME_TO_ID[cat] || null;
    const displayName = g.cleanName;
    const nameKey = displayName.toLowerCase();
    cleanNameCounts[nameKey] = (cleanNameCounts[nameKey] || 0) + 1;
    const countForName = cleanNameCounts[nameKey];
    const finalName = countForName > 1 ? `${displayName} (Variant ${countForName})` : displayName;
    let slug = toKebab(finalName);
    if (!slug) slug = 'product-' + (idx + 1);
    if (slugCounts[slug]) {
      slugCounts[slug] += 1;
      slug = `${slug}-${slugCounts[slug]}`;
    } else {
      slugCounts[slug] = 1;
    }
    const gallery = g.gallery && g.gallery.length ? [...g.gallery] : [g.image];
    const featuredSeed = hashCode(g.cleanName + g.key) % 7;
    const featured = featuredSeed === 0;
    products.push({
      id: String(1000 + idx),
      slug,
      name: finalName,
      category_id,
      short_desc: generateShortDesc(g.cleanName, cat),
      long_desc:  generateLongDesc(g.cleanName, cat),
      image:      g.image || gallery[0] || null,
      gallery,
      specs:      generateSpecs(g.cleanName, cat),
      features:   generateFeatures(g.cleanName, cat),
      price_range: generatePriceRange(g.cleanName, cat),
      featured,
      created_at: new Date(Date.now() - idx * 3600_000).toISOString(),
    });
  }
  return products;
}

const mockProducts: Product[] = buildProductsFromImageGroups();

const mockIndustries: Industry[] = [
  { id: '1', slug: 'government',   name: 'Government',   tagline: 'Trusted for government tenders', overview: 'OPCIEAS supports government departments, public sector undertakings, civic bodies, and defense-linked procurement programs with furniture that meets stringent tender specifications and institutional expectations. We engineer durable chairs, desks, storage systems, and seating solutions suited to offices, training centers, courts, and public facilities, with a strong focus on value, safety, and long-term maintenance. Our team understands the need for compliant documentation, predictable delivery schedules, and scalable manufacturing for large projects. From procurement-ready specifications to bulk production and installation support, OPCIEAS delivers dependable solutions for high-accountability environments. Every order is backed by quality assurance, customization flexibility, and experience working with public institutions that demand reliability, accountability, and on-time execution. Contact our team to discuss your next government furniture requirement.', hero_image: null, solutions: [{ title: 'Tender Ready', desc: 'Compliant products for government procurement.' }, { title: 'Bulk Manufacturing', desc: 'High volume production capability.' }, { title: 'Timely Delivery', desc: 'On-time execution of large projects.' }], certifications: ['ISO 9001:2015', 'NSIC', 'MSME'] },
  { id: '2', slug: 'corporate',    name: 'Corporate',    tagline: 'Modern office furniture', overview: 'OPCIEAS partners with modern enterprises that want workspaces to reflect performance, professionalism, and brand identity. We deliver premium office furniture for headquarters, regional offices, coworking hubs, and enterprise campuses, including ergonomic workstations, executive desks, conference tables, reception furniture, and collaborative seating. Our solutions are designed to improve productivity, support hybrid work styles, and create a polished environment for clients, employees, and leadership teams. With flexible customization, fast turnaround, and manufacturing depth, we help businesses scale their interiors without compromising on quality or design intent. From boardrooms to open-plan offices, OPCIEAS combines contemporary aesthetics with durable materials, structured quality control, and export-ready finishing standards. Let us help you create a workplace that elevates culture and operations.', hero_image: null, solutions: [{ title: 'Modular Workstations', desc: 'Customizable office setups.' }, { title: 'Executive Furniture', desc: 'Premium office suites.' }, { title: 'Ergonomic Design', desc: 'Comfort-focused furniture.' }], certifications: ['ISO 9001:2015'] },
  { id: '3', slug: 'healthcare',   name: 'Healthcare',   tagline: 'Hospital and medical furniture', overview: 'OPCIEAS serves healthcare facilities with furniture that balances hygiene, durability, comfort, and operational efficiency. Our range includes patient beds, examination tables, waiting area seating, storage solutions, and utility furniture designed for hospitals, clinics, diagnostic centers, and wellness facilities. We understand that medical environments demand cleanable surfaces, dependable performance, and safe configurations that support both staff and patients. OPCIEAS provides tailored solutions for high-traffic care settings, with customization options for dimensions, finishes, accessories, and infection-control requirements. Every product is manufactured with quality discipline, compliance-minded processes, and institutional experience that supports long-term use in demanding environments. For healthcare projects that require reliability and fast execution, OPCIEAS is a trusted manufacturing partner.', hero_image: null, solutions: [{ title: 'Patient Beds', desc: 'Adjustable and safe.' }, { title: 'Examination Tables', desc: 'Comfortable and hygienic.' }, { title: 'Hospital Furniture', desc: 'Complete range for hospitals.' }], certifications: ['ISO 9001:2015'] },
  { id: '4', slug: 'hospitality',  name: 'Hospitality',  tagline: 'Hotel and restaurant furniture', overview: 'OPCIEAS supports hotels, resorts, restaurants, cafés, and premium hospitality brands with furniture that elevates guest experience while meeting operational demands. We supply guest room furniture, lobby seating, restaurant tables, banquet pieces, reception counters, and durable commercial interiors designed for style and longevity. Our team works closely with hospitality operators to create spaces that feel welcoming, refined, and efficient from the first impression to the last detail. With broad customization options, premium finishes, and scalable bulk manufacturing, we help projects move from concept to delivery with confidence. OPCIEAS also brings strong institutional experience across hospitality environments, where appearance, maintenance, and turnaround time all matter. Partner with us to create interiors that impress guests and support seamless service.', hero_image: null, solutions: [{ title: 'Hotel Rooms', desc: 'Premium room furniture.' }, { title: 'Restaurants', desc: 'Dining and seating solutions.' }, { title: 'Lobbies', desc: 'Elegant lobby furniture.' }], certifications: ['ISO 9001:2015'] },
  { id: '5', slug: 'education',    name: 'Education',    tagline: 'School and institutional furniture', overview: 'Complete furniture solutions for educational institutions.', hero_image: null, solutions: [{ title: 'Classrooms', desc: 'Ergonomic classroom furniture.' }, { title: 'Hostels', desc: 'Hostel furniture and beds.' }, { title: 'Libraries', desc: 'Library tables and storage.' }], certifications: ['ISO 9001:2015', 'NSIC'] },
  { id: '6', slug: 'industrial',   name: 'Industrial',   tagline: 'Industrial and warehouse solutions', overview: 'Heavy-duty industrial and warehouse furniture.', hero_image: null, solutions: [{ title: 'Warehouse Racks', desc: 'High capacity storage.' }, { title: 'Workbenches', desc: 'Industrial workstations.' }, { title: 'Steel Furniture', desc: 'Durable steel furniture.' }], certifications: ['ISO 9001:2015'] },
  { id: '7', slug: 'export',       name: 'Export',       tagline: 'Export ready furniture', overview: 'OPCIEAS delivers export-ready furniture solutions for international buyers seeking reliability, quality consistency, and competitive manufacturing strength. We support global projects with products engineered for safe packing, efficient logistics, and compliance with international specifications, whether for institutional, hospitality, or commercial applications. Our portfolio includes storage systems, office furniture, seating, and custom-built solutions that can be adapted to regional requirements, market preferences, and project-specific dimensions. OPCIEAS combines bulk production capability with careful quality control, documentation support, and flexible customization to meet overseas procurement expectations. With experience serving international demand and a strong focus on export readiness, we help clients reduce risk and accelerate delivery across borders. Connect with OPCIEAS for your next global furniture program.', hero_image: null, solutions: [{ title: 'Export Packaging', desc: 'International standard packaging.' }, { title: 'Customization', desc: 'Tailored to market requirements.' }, { title: 'Compliance', desc: 'International standards.' }], certifications: ['ISO 9001:2015', 'IEC'] },
];

const mockClients: Client[] = [
  { id: '1', name: 'TATA', logo_url: null, industry: 'Corporate', website: null },
  { id: '2', name: 'NOKIA', logo_url: null, industry: 'Corporate', website: null },
  { id: '3', name: 'JW Marriott', logo_url: null, industry: 'Hospitality', website: null },
  { id: '4', name: 'Government Organizations', logo_url: null, industry: 'Government', website: null },
  { id: '5', name: 'Educational Institutions', logo_url: null, industry: 'Education', website: null },
  { id: '6', name: 'Corporate Clients', logo_url: null, industry: 'Corporate', website: null },
];

const mockCertifications: Certification[] = [
  { id: '1', name: 'ISO 9001:2015', issuer: 'Quality Management System', image: null, description: 'Certified quality management processes.' },
  { id: '2', name: 'NSIC', issuer: 'National Small Industries Corporation', image: null, description: 'Registered with NSIC for government supplies.' },
  { id: '3', name: 'MSME UDYAM', issuer: 'Ministry of MSME', image: null, description: 'Registered MSME enterprise.' },
  { id: '4', name: 'Trademark Registration', issuer: 'Government of India', image: null, description: 'Registered brand identity.' },
  { id: '5', name: 'IEC', issuer: 'DGFT', image: null, description: 'Import Export Code for international trade.' },
  { id: '6', name: 'Government Approvals', issuer: 'Various Government Bodies', image: null, description: 'Approved for public sector procurement.' },
];

const mockCareers: Career[] = [
  { id: '1', slug: 'sales-manager',            title: 'Sales Manager',            department: 'Sales',       location: 'Delhi',     type: 'Full Time', experience: '5-10 Years', description: 'Lead sales team for commercial furniture.', requirements: ['Experience in B2B sales', 'Knowledge of furniture industry', 'Good communication skills'], posted_date: new Date().toISOString(), status: 'Open' },
  { id: '2', slug: 'production-supervisor',    title: 'Production Supervisor',    department: 'Production',  location: 'Faridabad', type: 'Full Time', experience: '3-5 Years',  description: 'Supervise manufacturing operations.', requirements: ['Production experience', 'Knowledge of furniture manufacturing', 'Leadership skills'], posted_date: new Date().toISOString(), status: 'Open' },
  { id: '3', slug: 'design-engineer',          title: 'Design Engineer',          department: 'Design',      location: 'Delhi',     type: 'Full Time', experience: '2-5 Years',  description: 'Design furniture products using CAD.', requirements: ['CAD skills', 'Furniture design experience', 'Creative mindset'], posted_date: new Date().toISOString(), status: 'Open' },
];

function unwrap<T>(resp: any): T {
  if (resp && typeof resp === 'object' && 'data' in resp && resp.success !== false) {
    return resp.data as T;
  }
  return resp as T;
}

function parseFeatures(raw: any): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p : [raw];
    } catch {
      return raw.split(/[,\n|]/).map((s) => s.trim()).filter(Boolean);
    }
  }
  if (typeof raw === 'object') return Object.values(raw).map((v) => String(v));
  return [];
}

function parseSpecs(raw: any): Record<string, string> {
  if (!raw) return {};
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw);
      return typeof p === 'object' && p ? Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])) : {};
    } catch {
      return { Details: raw };
    }
  }
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v)]));
  }
  return {};
}

function normalizeCategory(raw: any): Category {
  return {
    id: String(raw.id ?? raw.category_id ?? ''),
    parent_id: raw.parent_id != null ? String(raw.parent_id) : null,
    name: raw.name ?? '',
    slug: raw.slug ?? '',
    description: raw.description ?? raw.long_desc ?? null,
    tagline: raw.tagline ?? raw.meta_title ?? null,
    image: raw.image ?? null,
    banner_image: raw.banner_image ?? raw.image ?? null,
    icon: raw.icon ?? null,
    sort_order: typeof raw.sort_order === 'number' ? raw.sort_order : undefined,
    is_featured: !!raw.is_featured,
    status: raw.status ?? undefined,
    meta_title: raw.meta_title ?? null,
    meta_description: raw.meta_description ?? null,
    created_at: raw.created_at ?? undefined,
    updated_at: raw.updated_at ?? undefined,
  };
}

function toNumber(value: any): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

const BACKEND_BASE =
  (import.meta as any).env?.VITE_BACKEND_URL ||
  (import.meta as any).env?.VITE_API_URL?.replace(/\/api\/?$/, '') ||
  'http://localhost:8000';

function resolveImageAbsolute(value: string | null): string | null {
  if (!value) return null;
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('data:') || value.startsWith('blob:')) {
    return value;
  }
  if (value.startsWith(BACKEND_BASE)) return value;
  if (value.startsWith('/uploads/') || value.startsWith('/assets/') || value.startsWith('/')) {
    return BACKEND_BASE + value;
  }
  if (value.startsWith('uploads/') || value.startsWith('assets/')) {
    return `${BACKEND_BASE}/${value}`;
  }
  return value;
}

function normalizeImageUrl(value: any): string | null {
  let raw: string | null = null;
  if (!value) return null;
  if (typeof value === 'string') raw = value;
  else if (typeof value === 'object') {
    raw = value.image_url || value.image_path || value.url || null;
  }
  return resolveImageAbsolute(raw);
}

function normalizeProduct(raw: any): Product {
  const images: string[] = [];
  if (raw.images && Array.isArray(raw.images)) {
    for (const img of raw.images) {
      const url = normalizeImageUrl(img);
      if (url) images.push(url);
    }
  }
  if (raw.gallery && Array.isArray(raw.gallery)) {
    for (const g of raw.gallery) {
      const url = normalizeImageUrl(g);
      if (url) images.push(url);
    }
  }
  const primaryImage =
    normalizeImageUrl(raw.image) ||
    normalizeImageUrl(raw.primary_image) ||
    (raw.images && Array.isArray(raw.images) ? normalizeImageUrl(raw.images.find((i: any) => i?.is_primary)) : null) ||
    images[0] ||
    null;
  const gallery = images.length ? images : (primaryImage ? [primaryImage] : []);

  let priceRange: string | null = raw.price_range ?? null;
  const price = toNumber(raw.price);
  const discountPrice = toNumber(raw.discount_price);
  if (!priceRange && (price !== null || discountPrice !== null)) {
    const p = discountPrice ?? price;
    const hi = price ?? discountPrice;
    priceRange = p === hi ? formatINR(Number(p)) : `${formatINR(Number(p))} - ${formatINR(Number(hi))}`;
  }

  const category_id = raw.category_id != null ? String(raw.category_id) : null;

  return {
    id: String(raw.id ?? raw.product_id ?? ''),
    seller_id: raw.seller_id != null ? String(raw.seller_id) : undefined,
    category_id,
    name: raw.name ?? '',
    slug: raw.slug ?? '',
    sku: raw.sku ?? null,
    short_desc: raw.short_desc ?? raw.short_description ?? null,
    short_description: raw.short_description ?? raw.short_desc ?? null,
    long_desc: raw.long_desc ?? raw.description ?? null,
    description: raw.description ?? raw.long_desc ?? null,
    features: parseFeatures(raw.features),
    specs: parseSpecs(raw.specifications ?? raw.specs),
    specifications: raw.specifications ?? raw.specs ?? null,
    dimensions: raw.dimensions ?? null,
    material: raw.material ?? null,
    color: raw.color ?? null,
    warranty_months: typeof raw.warranty_months === 'number' ? raw.warranty_months : null,
    min_order_quantity: typeof raw.min_order_quantity === 'number' ? raw.min_order_quantity : undefined,
    max_order_quantity: typeof raw.max_order_quantity === 'number' ? raw.max_order_quantity : null,
    unit: raw.unit ?? undefined,
    price: price,
    discount_price: discountPrice,
    discount_percentage: typeof raw.discount_percentage === 'number' ? raw.discount_percentage : null,
    tax_percentage: typeof raw.tax_percentage === 'number' ? raw.tax_percentage : 0,
    stock_quantity: toNumber(raw.stock_quantity) ?? undefined,
    availability_status: raw.availability_status ?? undefined,
    is_approved: !!raw.is_approved,
    approved_at: raw.approved_at ?? null,
    approved_by: raw.approved_by != null ? String(raw.approved_by) : null,
    featured: !!(raw.featured ?? raw.is_featured),
    is_featured: !!(raw.is_featured ?? raw.featured),
    is_new_arrival: !!raw.is_new_arrival,
    is_best_seller: !!raw.is_best_seller,
    rating: typeof raw.rating === 'number' ? raw.rating : undefined,
    total_reviews: typeof raw.total_reviews === 'number' ? raw.total_reviews : undefined,
    total_views: typeof raw.total_views === 'number' ? raw.total_views : undefined,
    total_orders: typeof raw.total_orders === 'number' ? raw.total_orders : undefined,
    status: raw.status ?? undefined,
    meta_title: raw.meta_title ?? null,
    meta_description: raw.meta_description ?? null,
    image: primaryImage,
    gallery,
    price_range: priceRange,
    created_at: raw.created_at ?? new Date().toISOString(),
    updated_at: raw.updated_at ?? undefined,
  };
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const resp = await apiGet<any>('/categories/list.php');
    const items: any[] = unwrap<any[]>(resp) || [];
    if (Array.isArray(items) && items.length) {
      const normalized = items.map(normalizeCategory);
      return normalized.map((c) => {
        if (!c.tagline || !c.banner_image) {
          const mock = mockCategories.find((m) => m.slug === c.slug);
          if (mock) {
            return { ...c, tagline: c.tagline || mock.tagline, banner_image: c.banner_image || mock.banner_image, description: c.description || mock.description };
          }
        }
        return c;
      });
    }
  } catch {
    // STEP 13: NO static fallback - categories MUST come from DB
    console.warn('[fetchCategories] API unavailable, returning empty array');
    return [];
  }
  // STEP 13: NO static fallback
  return [];
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  const list = await fetchCategories();
  return list.find((c) => c.slug === slug) || null;
}

export async function fetchProducts(categoryId?: string): Promise<Product[]> {
  try {
    const params: Record<string, any> = { status: 'Published', limit: 500 };
    if (categoryId) params.category_id = categoryId;
    const resp = await apiGet<any>('/products/list.php', params);
    const items: any[] = unwrap<any[]>(resp) || [];
    if (Array.isArray(items)) {
      return items.map(normalizeProduct);
    }
  } catch (e) {
    // STEP 13: NO static fallback - products MUST come from PHP API
    console.error('[fetchProducts] API fetch failed:', e);
    return [];
  }
  // STEP 13: No mockProducts fallback allowed
  return [];
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const resp = await apiGet<any>('/products/get.php', { slug });
    const raw = unwrap<any>(resp);
    if (raw && (raw.id || raw.slug)) {
      return normalizeProduct(raw);
    }
  } catch (e) {
    // STEP 13: NO static fallback
    console.error('[fetchProduct] API fetch failed for slug=' + slug, e);
    return null;
  }
  // STEP 13: No mockProducts fallback allowed
  return null;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.featured || p.is_featured);
}

export async function fetchIndustries(): Promise<Industry[]> {
  return mockIndustries;
}

export async function fetchIndustry(slug: string): Promise<Industry | null> {
  return mockIndustries.find((i) => i.slug === slug) || null;
}

export async function fetchIndustryProjects(industryId: string): Promise<IndustryProject[]> {
  void industryId;
  return [];
}

export async function fetchClients(): Promise<Client[]> {
  return mockClients;
}

export async function fetchCertifications(): Promise<Certification[]> {
  return mockCertifications;
}

export async function fetchCareers(): Promise<Career[]> {
  return mockCareers;
}

export async function fetchCareer(slug: string): Promise<Career | null> {
  return mockCareers.find((c) => c.slug === slug) || null;
}

export async function submitRFQ(payload: RFQPayload | Record<string, any>): Promise<any> {
  try {
    const body: Record<string, any> = {
      company_name: payload.company_name ?? '',
      contact_name: payload.contact_name ?? '',
      contact_person: payload.contact_person ?? payload.contact_name ?? '',
      email: payload.email ?? '',
      contact_email: payload.contact_email ?? payload.email ?? '',
      phone: payload.phone ?? '',
      contact_phone: payload.contact_phone ?? payload.phone ?? '',
      country: payload.country ?? '',
      city: payload.city ?? '',
      gst: payload.gst ?? '',
      category: payload.category ?? '',
      category_id: payload.category_id ?? null,
      product: payload.product ?? '',
      product_name: payload.product_name ?? payload.product ?? '',
      quantity: payload.quantity ?? '',
      unit: payload.unit ?? 'piece',
      budget: payload.budget ?? '',
      budget_range_min: payload.budget_range_min ?? null,
      budget_range_max: payload.budget_range_max ?? null,
      expected_delivery: payload.expected_delivery ?? '',
      required_date: payload.required_date ?? payload.expected_delivery ?? null,
      message: payload.message ?? '',
      description: payload.description ?? payload.message ?? '',
      delivery_location: payload.delivery_location ?? ((`${payload.city ?? ''} ${payload.country ?? ''}`.trim() || null)),
      specifications: payload.specifications ?? null,
      material: payload.material ?? null,
      color: payload.color ?? null,
      dimensions: payload.dimensions ?? null,
      attachments: payload.attachments ?? null,
      preferred_supplier_location: payload.preferred_supplier_location ?? null,
      certification_required: payload.certification_required ?? null,
      payment_terms: payload.payment_terms ?? null,
      delivery_terms: payload.delivery_terms ?? null,
      visibility: payload.visibility ?? 'public',
    };
    const resp = await apiPost<any>('/rfqs/submit.php', body);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'RFQ submission failed';
    console.error('RFQ submission failed', payload, message);
    return { success: false, message };
  }
}

export async function submitContact(payload: ContactPayload | Record<string, any>): Promise<any> {
  try {
    const p = payload as Record<string, any>;
    const body: Record<string, any> = {
      name: p.name ?? p.contact_name ?? '',
      email: p.email ?? '',
      phone: p.phone ?? '',
      company: p.company ?? p.company_name ?? '',
      subject: p.subject ?? (p.product ? `Inquiry: ${p.product}` : 'General Inquiry'),
      message: p.message ?? p.description ?? '',
      type: p.type ?? (p.category ? 'sales' : 'general'),
      source: p.source ?? 'website',
      attachments: p.attachments ?? null,
      preferred_contact_method: p.preferred_contact_method ?? 'any',
      preferred_time: p.preferred_time ?? null,
      priority: p.priority ?? 'normal',
      product: p.product ?? '',
      product_name: p.product_name ?? p.product ?? '',
      category: p.category ?? '',
      category_id: p.category_id ?? null,
      quantity: p.quantity ?? null,
    };
    const resp = await apiPost<any>('/contacts/submit.php', body);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Contact submission failed';
    console.error('Contact submission failed', payload, message);
    return { success: false, message };
  }
}

export async function submitJobApplication(payload: Record<string, any>): Promise<any> {
  try {
    const formData = new FormData();
    if (payload instanceof FormData) {
      const resp = await apiFormData<any>('/jobs/apply.php', payload);
      return resp;
    }
    for (const [k, v] of Object.entries(payload)) {
      if (v == null) continue;
      if (v instanceof File) {
        formData.append(k, v);
      } else if (typeof v === 'object' && !(v instanceof Date)) {
        formData.append(k, JSON.stringify(v));
      } else {
        formData.append(k, String(v));
      }
    }
    const resp = await apiFormData<any>('/jobs/apply.php', formData);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Job application submission failed';
    console.error('Job application submission failed', payload, message);
    return { success: false, message };
  }
}

export async function subscribeNewsletter(email: string, extra?: Record<string, any>): Promise<any> {
  try {
    const body: Record<string, any> = { email, source: 'website_footer', ...(extra || {}) };
    const resp = await apiPost<any>('/newsletters/subscribe.php', body);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Newsletter subscription failed';
    console.error('Newsletter subscription failed', email, message);
    return { success: false, message };
  }
}

export async function fetchMyRequirements(): Promise<PurchaseRequirement[]> {
  try {
    const resp = await apiGet<any>('/purchase_requirements/my.php');
    const items: any[] = unwrap<any[]>(resp) || [];
    if (Array.isArray(items)) {
      return items.map((r: any) => ({
        id: String(r.id ?? ''),
        buyer_id: r.buyer_id != null ? String(r.buyer_id) : '',
        category_id: r.category_id != null ? String(r.category_id) : null,
        title: r.title ?? '',
        slug: r.slug ?? '',
        description: r.description ?? '',
        product_name: r.product_name ?? null,
        required_quantity: Number(r.required_quantity ?? 0),
        unit: r.unit ?? 'piece',
        budget_min: typeof r.budget_min === 'number' ? r.budget_min : null,
        budget_max: typeof r.budget_max === 'number' ? r.budget_max : null,
        preferred_location: r.preferred_location ?? null,
        required_by_date: r.required_by_date ?? null,
        specifications: r.specifications ?? null,
        attachments: r.attachments ?? null,
        total_quotes_received: Number(r.total_quotes_received ?? 0),
        status: r.status ?? 'open',
        visibility: r.visibility ?? 'public',
        expires_at: r.expires_at ?? null,
        awarded_to: r.awarded_to != null ? String(r.awarded_to) : null,
        awarded_at: r.awarded_at ?? null,
        created_at: r.created_at ?? undefined,
        updated_at: r.updated_at ?? undefined,
      }));
    }
  } catch {
    // fallthrough
  }
  return [];
}

export async function createRequirement(payload: Record<string, any>): Promise<any> {
  try {
    const resp = await apiPost<any>('/purchase_requirements/create.php', payload);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Requirement creation failed';
    console.error('Requirement creation failed', payload, message);
    return { success: false, message };
  }
}

export async function deleteRequirement(id: string | number): Promise<any> {
  try {
    const resp = await apiPost<any>('/purchase_requirements/delete.php', { id });
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Requirement deletion failed';
    console.error('Requirement deletion failed', id, message);
    return { success: false, message };
  }
}

export async function sellerRegister(payload: Record<string, any>): Promise<any> {
  try {
    const resp = await apiPost<any>('/auth/seller_register.php', payload);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Seller registration failed';
    console.error('Seller registration failed', payload, message);
    return { success: false, message };
  }
}

export async function buyerRegister(payload: Record<string, any>): Promise<any> {
  try {
    const resp = await apiPost<any>('/auth/buyer_register.php', payload);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Buyer registration failed';
    console.error('Buyer registration failed', payload, message);
    return { success: false, message };
  }
}

export async function buyerLogin(payload: { email: string; password: string }): Promise<any> {
  try {
    const resp = await apiPost<any>('/auth/buyer_login.php', payload);
    return resp;
  } catch (err: any) {
    const message = err?.message || 'Buyer login failed';
    console.error('Buyer login failed', payload, message);
    return { success: false, message };
  }
}

export async function getAuthStatus(): Promise<AuthStatus> {
  try {
    const resp = await apiGet<any>('/auth/login.php');
    const data = unwrap<any>(resp);
    if (data && (data.authenticated || data.user)) {
      return {
        authenticated: !!data.authenticated,
        user: data.user ?? null,
        role: data.role ?? null,
        profile: data.profile ?? null,
      };
    }
  } catch {
    // fallthrough
  }
  return { authenticated: false, user: null, role: null, profile: null };
}

export { IMG, SCHOOL_FURNITURE_IMAGES };

export const _debugProductCount = mockProducts.length;
export const _debugCategoryCount = mockCategories.length;
