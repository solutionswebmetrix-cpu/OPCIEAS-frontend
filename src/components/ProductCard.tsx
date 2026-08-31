import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import type { Product } from '../lib/data';

interface Props {
  product: Product;
  index: number;
  categorySlug?: string;
}

export default function ProductCard({ product, index }: Props) {
  const waText = encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share details.`);
  const supplyLabel = product.supply_type === 'IN_HOUSE' ? 'In-House Manufacturing' : product.supply_type === 'PARTNER' ? 'Partner Supply' : 'Direct Manufacturer';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
    >
      <div className="group relative overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm hover:shadow-md">
        <Link
          to={`/product/${product.slug}`}
          className="block aspect-[4/5] overflow-hidden"
        >
          {product.image ? (
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full border border-gold/60 bg-gold/15 px-2 py-0.5 font-sub text-[9px] uppercase tracking-[0.2em] text-gold">{supplyLabel}</span>
              {product.price_range && <span className="font-sub text-[10px] uppercase tracking-wider text-navy/70">{product.price_range}</span>}
            </div>
            <h3 className="mt-1 font-heading text-lg font-bold text-navy">{product.name}</h3>
            {product.short_desc && <p className="mt-1 line-clamp-2 font-body text-xs text-navy/70">{product.short_desc}</p>}
            <div className="relative z-10 mt-3 flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-navy/10 px-3 py-1.5 font-sub text-xs text-navy backdrop-blur transition group-hover:bg-gold group-hover:text-navy">
                <Eye className="h-3 w-3" /> View Details
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>

        <div className="space-y-2 border-t border-navy/10 bg-light-grey p-4">
          <Link to="/rfq" className="block rounded-full border border-navy/20 bg-white px-3 py-2 text-center text-xs font-sub text-navy transition hover:border-gold hover:text-gold">Request Quote</Link>
          <a href={`https://wa.me/919845579049?text=${waText}`} target="_blank" rel="noreferrer" className="block rounded-full border border-transparent bg-[#25D366] px-3 py-2 text-center text-xs font-sub text-white transition hover:bg-[#1ebe5b]">WhatsApp Inquiry</a>
        </div>
      </div>
    </motion.div>
  );
}
