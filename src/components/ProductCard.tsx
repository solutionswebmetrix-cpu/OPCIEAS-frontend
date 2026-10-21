import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { resolveProductImage, type Product } from '../lib/data';

interface Props {
  product: Product;
  index: number;
  categorySlug?: string;
}

export default function ProductCard({ product, index }: Props) {
  const image = resolveProductImage(product);
  const waText = encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share details.`);
  const supplyLabel = product.supply_type === 'IN_HOUSE' ? 'In-House Manufacturing' : product.supply_type === 'PARTNER' ? 'Partner Supply' : 'Direct Manufacturer';
  const productRoute = product.slug || String(product.id || 'product');
  const isSSRackCard = /ss detachable wire rack|ss wire rack|detachable wire rack/i.test(product.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      className="h-full"
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm hover:shadow-md">
        <Link
          to={`/product/${productRoute}`}
          className="relative block aspect-[4/5] shrink-0 overflow-hidden bg-light-grey"
        >
          {image ? (
            <img src={image} alt={product.name} className="absolute inset-0 h-full w-full object-contain object-center" loading="lazy" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300" />
          )}
          <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass text-accent-blue opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </Link>

        <div className="flex flex-1 flex-col border-t border-navy/10 bg-light-grey p-4">
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent-blue/60 bg-accent-blue/15 px-2 py-0.5 font-sub text-[9px] uppercase tracking-[0.2em] text-accent-blue">{supplyLabel}</span>
              {product.price_range && <span className="font-sub text-[10px] uppercase tracking-wider text-navy/70">{product.price_range}</span>}
            </div>
            <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] font-heading text-lg font-bold leading-7 text-navy">{product.name}</h3>
            {product.short_desc && <p className="mt-1 line-clamp-2 min-h-8 font-body text-xs leading-4 text-navy/70">{product.short_desc}</p>}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <Link
              to="/rfq"
              className="flex min-h-11 w-full min-w-0 items-center justify-center rounded-full border border-navy/20 bg-white px-3 py-2 text-center font-sub text-xs leading-4 text-navy transition hover:border-accent-blue hover:text-accent-blue"
            >
              Request Quote
            </Link>
            <Link
              to={`/product/${productRoute}`}
              className="flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-navy/10 px-3 py-2 text-center font-sub text-xs leading-4 text-navy transition hover:bg-accent-blue"
            >
              <Eye className="h-3.5 w-3.5 shrink-0" /> {isSSRackCard ? 'View Product' : 'View Details'}
            </Link>
            <a
              href={`https://wa.me/919845579049?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full border border-transparent bg-[#25D366] px-3 py-2 text-center font-sub text-xs leading-4 text-white transition hover:bg-[#1ebe5b]"
            >
              <span className="min-w-0 break-words">WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
