import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { IMG } from '../lib/images';
import type { Product } from '../lib/data';

interface Props {
  product: Product;
  index: number;
  categorySlug?: string;
}

export default function ProductCard({ product, index }: Props) {
  const waText = encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share details.`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
    >
      <div className="group relative overflow-hidden rounded-lux border border-navy/10 bg-white luxury-shadow">
        <Link
          to={`/product/${product.slug}`}
          className="block aspect-[4/5] overflow-hidden"
        >
          <img src={product.image || IMG.heroBg} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            {product.price_range && <p className="font-sub text-[10px] uppercase tracking-wider text-gold">{product.price_range}</p>}
            <h3 className="mt-1 font-heading text-lg font-bold text-white">{product.name}</h3>
            {product.short_desc && <p className="mt-1 line-clamp-2 font-body text-xs text-white/50">{product.short_desc}</p>}
            <div className="relative z-10 mt-3 flex gap-2">
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 font-sub text-xs text-white backdrop-blur transition group-hover:bg-gold group-hover:text-navy">
                <Eye className="h-3 w-3" /> View Details
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>

        <div className="space-y-2 border-t border-navy/10 bg-navy/5 p-4">
          <Link to="/rfq" className="block rounded-full border border-white/10 bg-white/10 px-3 py-2 text-center text-xs font-sub text-white transition hover:border-gold hover:text-gold">Request Quote</Link>
          <a href={`https://wa.me/919845579049?text=${waText}`} target="_blank" rel="noreferrer" className="block rounded-full border border-white/10 bg-[#25D366] px-3 py-2 text-center text-xs font-sub text-white transition hover:bg-[#1ebe5b]">WhatsApp Inquiry</a>
        </div>
      </div>
    </motion.div>
  );
}
