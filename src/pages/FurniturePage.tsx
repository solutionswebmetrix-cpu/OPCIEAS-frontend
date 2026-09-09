import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, Factory, FileText, FlaskConical, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import ProductCard from '../components/ProductCard';
import SectionBanner from '../components/SectionBanner';
import { fetchCategories, fetchProducts, type Category, type Product } from '../lib/data';
import { CATEGORY_BANNERS } from '../lib/images';

const bulkGroups = [
  {
    title: 'Classroom & Academic Seating',
    description: 'Ergonomic desks, single and dual benches, fixed-lecture hall seating, and integrated writing-pad chairs for schools and universities.',
    categories: ['educational furniture', 'school furniture'],
    terms: ['desk', 'bench', 'student', 'classroom', 'lecture', 'writing pad', 'academic', 'chair', 'seating'],
  },
  {
    title: 'Laboratory & Specialized Furniture',
    description: 'Chemical-, electrical-, and thermal-resistant workstations, rotatable stools, and modular record storage units designed for industrial and educational labs.',
    categories: ['educational furniture', 'school furniture', 'office furniture', 'industrial storage'],
    terms: ['laboratory', 'lab', 'stool', 'workstation', 'record', 'specialized'],
  },
  {
    title: 'Hostel & Residential Accommodation',
    description: 'Heavy-duty single, bunker, and triple cots, paired with marine-grade stainless steel hardware and waterproof amenities.',
    categories: ['hostel furniture'],
    terms: ['cot', 'bunker', 'hostel', 'bed', 'mattress', 'pillow', 'bedsheet'],
  },
  {
    title: 'Institutional & Office Storage',
    description: 'Steel and fiberglass cupboards, anti-corrosive filing cabinets, and secure locker systems for students, staff, and industrial facilities.',
    categories: ['office furniture', 'industrial storage', 'hospital furniture', 'bathroom collection', 'letter box'],
    terms: ['storage', 'rack', 'locker', 'cupboard', 'cabinet', 'filing', 'shelf', 'letter box'],
  },
  {
    title: 'Auditorium & Library Infrastructure',
    description: 'Sturdy high-capacity library racks, auditorium rows, and heavy-use public space seating.',
    categories: ['educational furniture', 'school furniture', 'office furniture'],
    terms: ['auditorium', 'library', 'cinema', 'stadium', 'lecture', 'public space', 'seating'],
  },
] as const;

const bulkSupplyBenefits = [
  ['Faster Delivery', 'Streamlined manufacturing ensures rapid fulfillment for orders in the hundreds or thousands.'],
  ['Uncompromising Quality Control', 'Standardized production lines mean rigorous consistency across every single unit.'],
  ['Competitive Bulk Pricing', 'Optimized manufacturing processes pass direct cost savings on to your institution.'],
  ['Built for Heavy Usage', 'Engineered specifically to withstand the demands of schools, colleges, auditoriums, and public spaces.'],
] as const;

const fiberglassBenefits = [
  ['All-Weather Resilience', 'Impervious to water, liquids, acids, salts, and chemicals - ideal for heavy-duty laboratories and coastal environments.'],
  ['Insect & Pest Proof', 'Completely immune to termites, wood rot, and fungal decay.'],
  ['High Strength-to-Weight Ratio', 'Extremely tough and impact-resistant, yet lightweight to significantly reduce transit costs.'],
  ['Low-to-Zero Maintenance', 'Built without exposed loose screws or bolts. We utilize proprietary high-strength adhesives developed in-house for maximum joint stability and silent, reliable performance.'],
  ['Customizable Finishes', 'Integrated, inbuilt non-fading colors molded directly into the material - no repainting required.'],
] as const;

const infrastructure = [
  ['Advanced Production Lines', 'Purpose-built systems for rapid fiberglass molding and precision steel fabrication.', Factory],
  ['In-House R&D Team', 'Continuous innovation in adhesive bonding, ergonomics, and material science.', FlaskConical],
  ['Dedicated Design & Project Support', 'Experienced engineering professionals ensuring seamless execution from blueprint to bulk delivery.', Building2],
] as const;

function matchesProduct(product: Product, group: typeof bulkGroups[number], categoryName: string) {
  const searchable = product.name.toLowerCase();
  return group.categories.includes(categoryName.toLowerCase()) && group.terms.some((term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escapedTerm}\\b`, 'i').test(searchable);
  });
}

export default function FurniturePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    void Promise.all([fetchProducts(), fetchCategories()]).then(([productList, categoryList]) => {
      setProducts(productList);
      setCategories(categoryList);
    });
  }, []);

  const productsByGroup = useMemo(() => bulkGroups.map((group) => ({
    group,
    products: products.filter((product) => {
      const categoryName = categories.find((category) => category.id === String(product.category_id ?? ''))?.name ?? '';
      return matchesProduct(product, group, categoryName);
    }).slice(0, 4),
  })), [categories, products]);

  return (
    <>
      <PageMeta
        title="Commercial & Institutional Furniture Built for Scale | OPCIEAS"
        description="At OPCIEAS, based in Bengaluru, we specialize in high-volume, precision-engineered furniture for institutions, commercial projects, and large-scale contractors."
        keywords="commercial furniture, institutional furniture, fiberglass furniture, bulk furniture, OPCIEAS"
      />
      <SectionBanner
        title="Commercial & Institutional Furniture Built for Scale"
        tagline="High-volume furniture for institutions, commercial projects, and large-scale contractors"
        image={CATEGORY_BANNERS['Office Furniture']}
        crumb="Commercial Furniture"
        crumbTo="/furniture"
      />

      <main className="bg-white">
        <section className="container-x px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Commercial Furniture</p>
            <h1 className="mt-3 font-heading text-3xl font-black text-navy sm:text-5xl">Commercial & Institutional Furniture Built for Scale</h1>
            <p className="mt-6 font-body text-base leading-8 text-navy/75">
              At OPCIEAS, based in Bengaluru, we specialize in high-volume, precision-engineered furniture for institutions, commercial projects, and large-scale contractors. We have streamlined our production to focus exclusively on standardized, high-demand furniture solutions -combining high-grade steel framing with advanced fiberglass to deliver unmatched durability, zero-maintenance longevity, and modern aesthetics.
            </p>
            <p className="mt-6 border-l-4 border-gold bg-gold/5 px-5 py-4 text-left font-heading text-xl font-bold leading-relaxed text-navy sm:text-2xl">
              OPCIEAS Fiberglass Furniture - durable, eco-friendly, and built to last for India’s institutions.
            </p>
          </div>
        </section>

        <section className="bg-light-grey px-6 py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Why Choose OPCIEAS?</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Why Choose OPCIEAS?</h2>
            </div>
            <div className="mt-12">
              <h3 className="font-heading text-2xl font-bold text-navy">Why Bulk Commercial Supply?</h3>
              <p className="mt-3 max-w-3xl font-body text-base leading-7 text-navy/70">Why Bulk Commercial Supply? By focusing our production on high-volume commercial needs rather than one-off custom pieces, we deliver clear advantages for large projects:</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {bulkSupplyBenefits.map(([title, description]) => (
                  <article key={title} className="border-t-2 border-gold bg-white p-6">
                    <CheckCircle2 className="h-5 w-5 text-gold" />
                    <h4 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h4>
                    <p className="mt-2 font-body text-sm leading-6 text-navy/70">{description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div id="fiberglass-advantages" className="mt-16 border-t border-navy/10 pt-12">
              <h3 className="font-heading text-2xl font-bold text-navy">Why Fiberglass Over Traditional Wood?</h3>
              <p className="mt-3 max-w-3xl font-body text-base leading-7 text-navy/70">Traditional wooden furniture suffers from rot, swelling, termite infestation, and continuous maintenance costs. Fiberglass is the superior, sustainable alternative:</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {fiberglassBenefits.map(([title, description]) => (
                  <article key={title} className="border border-navy/10 bg-white p-6">
                    <h4 className="font-heading text-lg font-bold text-navy">{title}</h4>
                    <p className="mt-2 font-body text-sm leading-6 text-navy/70">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="selected-bulk-product-range" className="container-x px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Selected Bulk Product Range</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Selected Bulk Product Range</h2>
          </div>
          <div className="mt-12 space-y-16">
            {productsByGroup.map(({ group, products: matchingProducts }) => (
              <section key={group.title}>
                <h3 className="font-heading text-2xl font-bold text-navy">{group.title}</h3>
                <p className="mt-3 max-w-3xl font-body text-base leading-7 text-navy/70">{group.description}</p>
                {matchingProducts.length > 0 ? (
                  <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {matchingProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
                  </div>
                ) : (
                  <p className="mt-5 font-body text-sm italic text-navy/50">Existing matching products will appear here when available.</p>
                )}
              </section>
            ))}
          </div>
        </section>

        <section id="manufacturing-excellence" className="bg-navy px-6 py-16 text-white sm:py-20">
          <div className="container-x">
            <div className="max-w-4xl">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Manufacturing Excellence & Quality Commitment</p>
              <h2 className="mt-3 font-heading text-3xl font-black sm:text-4xl">Manufacturing Excellence & Quality Commitment</h2>
              <h3 className="mt-10 font-heading text-2xl font-bold text-gold">Strict Quality Policy</h3>
              <p className="mt-4 font-body text-base leading-8 text-white/80">Quality and durability drive everything we do. Our steel is directly sourced through long-term partnerships with India's leading steel producers, while our fiberglass formulations meet international structural standards. Every raw material batch undergoes strict pre-production screening, followed by continuous monitoring through fabrication to ensure flawless performance.</p>
            </div>
            <div className="mt-14 border-t border-white/15 pt-12">
              <h3 className="font-heading text-2xl font-bold">State-of-the-Art Infrastructure</h3>
              <p className="mt-3 max-w-3xl font-body text-base leading-7 text-white/75">Our integrated Bengaluru facility is equipped to handle large-scale commercial contracts with precision:</p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {infrastructure.map(([title, description, Icon]) => (
                  <article key={title} className="border border-white/15 p-6">
                    <Icon className="h-6 w-6 text-gold" />
                    <h4 className="mt-5 font-heading text-lg font-bold">{title}</h4>
                    <p className="mt-2 font-body text-sm leading-6 text-white/70">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="bulk-order-cta" className="container-x px-6 py-16 sm:py-20">
          <div className="border-t-4 border-gold bg-light-grey p-8 sm:p-12">
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Partner with OPCIEAS</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Partner with OPCIEAS for Your Next Bulk Order</h2>
            <p className="mt-5 max-w-3xl font-body text-base leading-8 text-navy/75">Equip your institution with furniture designed to eliminate recurring replacement costs. Contact our team today for bulk inquiries, technical specifications, or quotation details.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/rfq" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm"><FileText className="h-4 w-4" /> REQUEST BULK INQUIRY</Link>
              <Link to="/contact" className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm text-navy"><ArrowRight className="h-4 w-4" /> REQUEST QUOTATION</Link>
              <a href="mailto:info@opcieas.com" className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-3 font-sub text-sm text-navy"><Mail className="h-4 w-4" /> info@opcieas.com</a>
            </div>
            <p className="mt-6 font-body text-sm text-navy/60">www.opcieas.co</p>
          </div>
        </section>
      </main>
    </>
  );
}
