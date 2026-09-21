import { motion } from 'framer-motion';
import { ArrowRight, Ruler, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/logo/logo.png';
import { findProductAssetByName, type ProductAsset } from '../lib/productAssetResolver';

function asset(name: string, category?: string): ProductAsset | null {
  return findProductAssetByName(name, category) ?? findProductAssetByName(name);
}

const institutionalAssets = [
  asset('Minimal Desk and Bench Set', 'School Furniture'),
  asset('White Lecture Chair with Writing Tablet', 'Educational Furniture'),
  asset('Adjustable Height Table', 'Educational Furniture'),
  asset('Chrome Wire Shelving on Terracotta Floor', 'Industrial Storage'),
].filter((item): item is ProductAsset => !!item);

const schoolAssets = [
  asset('Colorful Kindergarten Classroom Furniture', 'School Furniture'),
  asset('Kids Classroom Chair', 'School Furniture'),
  asset('School Desk & Chair Sets', 'School Furniture'),
].filter((item): item is ProductAsset => !!item);

const seatingAssets = [
  asset('Rows of Burgundy Seats in a Bright Classroom', 'School Furniture'),
  asset('Chrome Three-Seat Waiting Bench', 'Educational Furniture'),
  asset('Stackable Student Chairs', 'School Furniture'),
].filter((item): item is ProductAsset => !!item);

function AssetGrid({ items }: { items: ProductAsset[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {items.map((item) => (
        <Link key={item.slug} to={`/product/${item.slug}`} className="group overflow-hidden rounded-xl border border-navy/10 bg-white">
          <div className="flex h-32 items-center justify-center bg-light-grey p-2 sm:h-40 sm:p-3">
            <img src={item.image} alt={item.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          </div>
          <p className="min-h-12 p-2 font-sub text-[10px] font-semibold leading-4 text-navy sm:p-3 sm:text-xs">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default function CommercialFurnitureShowcase() {
  return (
    <section id="commercial-furniture-showcase" className="bg-white px-6 py-16 sm:py-20">
      <div className="container-x">
        <div className="grid gap-8 border-b border-navy/10 pb-14 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-5">
            <img src={companyLogo} alt="OPCIEAS emblem" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">OPCIEAS™</p>
              <p className="mt-2 font-heading text-2xl font-black text-navy">Commercial Furniture</p>
              <p className="mt-2 font-sub text-xs uppercase tracking-[0.16em] text-navy/60">Bulk-ready product presentation</p>
            </div>
          </motion.div>
          <div>
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Available for specification-led supply</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Furniture for bulk requirements</h2>
            <p className="mt-4 max-w-3xl font-body text-base leading-7 text-navy/70">Furniture for which specifications, images or technical drawings are available and which can be supplied for bulk requirements.</p>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <section>
            <p className="font-sub text-xs uppercase tracking-[0.28em] text-gold">Section A</p>
            <h3 className="mt-3 font-heading text-2xl font-black text-navy sm:text-3xl">Educational / Institutional Furniture</h3>
            <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-navy/70">Furniture-only solutions for classrooms, libraries and record rooms: desks, benches, chairs, tables and SS wire racks.</p>
            <div className="mt-6"><AssetGrid items={institutionalAssets} /></div>
            <div className="mt-6 flex flex-wrap gap-2 font-sub text-xs text-navy/65">
              {['Classrooms', 'Libraries', 'Record Rooms', 'Desks', 'Benches', 'Chairs', 'Tables', 'SS Wire Racks'].map((label) => <span key={label} className="rounded-full border border-navy/10 bg-light-grey px-3 py-1.5">{label}</span>)}
            </div>
          </section>

          <section>
            <p className="font-sub text-xs uppercase tracking-[0.28em] text-gold">Section B</p>
            <h3 className="mt-3 font-heading text-2xl font-black text-navy sm:text-3xl">School Furniture</h3>
            <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-navy/70">Nursery furniture, kindergarten furniture and school desks with child-friendly proportions and safety-conscious design.</p>
            <div className="mt-6"><AssetGrid items={schoolAssets} /></div>
            <div className="mt-6 flex flex-wrap gap-2 font-sub text-xs text-navy/65">
              {['Nursery', 'Kindergarten', 'School Desks', 'Child-friendly design', 'Rounded-edge awareness'].map((label) => <span key={label} className="rounded-full border border-navy/10 bg-light-grey px-3 py-1.5">{label}</span>)}
            </div>
          </section>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="border-t-2 border-gold pt-6">
            <p className="font-sub text-xs uppercase tracking-[0.28em] text-gold">Public-space seating</p>
            <h3 className="mt-3 font-heading text-2xl font-black text-navy sm:text-3xl">Auditorium / Cine / Stadium Seating</h3>
            <p className="mt-3 max-w-3xl font-body text-sm leading-6 text-navy/70">A dedicated seating range for auditoriums, cinema environments and stadium/public-viewing spaces. Product-specific durability details should be confirmed against the selected model before quotation.</p>
            <div className="mt-6"><AssetGrid items={seatingAssets} /></div>
            <p className="mt-4 font-body text-sm text-navy/65">Polypropylene chair applications include public gatherings, halls, auditoriums and stadiums where the selected chair model is suitable.</p>
          </section>

          <aside className="border border-gold/30 bg-gold/5 p-6">
            <Ruler className="h-6 w-6 text-gold" />
            <h3 className="mt-4 font-heading text-xl font-bold text-navy">SS Wire Racks</h3>
            <p className="mt-2 font-body text-sm leading-6 text-navy/70">Verified available information:</p>
            <dl className="mt-4 space-y-3 font-body text-sm text-navy/80">
              <div><dt className="font-sub text-xs uppercase tracking-[0.16em] text-navy/55">Loading capacity</dt><dd className="mt-1 font-semibold">200 kg per level</dd></div>
              <div><dt className="font-sub text-xs uppercase tracking-[0.16em] text-navy/55">Dimensions</dt><dd className="mt-1">W 914 × D 457 × H 1829 mm</dd></div>
              <div><dt className="font-sub text-xs uppercase tracking-[0.16em] text-navy/55">Configuration</dt><dd className="mt-1">Medium-duty detachable wire rack</dd></div>
            </dl>
            <div className="mt-5 flex items-center gap-2 font-sub text-xs text-navy/65"><ShieldCheck className="h-4 w-4 text-gold" /> Confirm final configuration during RFQ</div>
          </aside>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-heading text-xl font-bold leading-8 text-navy sm:text-2xl">Bulk demand of any furniture supply can be undertaken.</p>
          <Link to="/rfq" className="btn-gold inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Request Bulk Quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
