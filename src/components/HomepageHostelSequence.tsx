import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHostelAssets } from '../lib/productAssetResolver';

const hostelStory = [
  {
    id: 'hostel-cot',
    label: 'Hostel Cot',
    subtitle: 'Compact comfort for high-occupancy rooms',
    description: 'Durable, clean-lined cots designed for efficient room layouts and dependable daily use.',
  },
  {
    id: 'single-cot',
    label: 'Single Cot',
    subtitle: 'Space-saving personal accommodation',
    description: 'Simple, strong, and tidy single-bed units suitable for student rooms and dormitory blocks.',
  },
  {
    id: 'bunker-cot',
    label: 'Bunker Cot',
    subtitle: 'Stacked utility with added storage value',
    description: 'Built to maximize occupancy while preserving safety, storage access, and easy maintenance.',
  },
  {
    id: 'triple-cot',
    label: 'Triple Cot',
    subtitle: 'High-density institutional sleeping systems',
    description: 'Heavy-duty triple-bunk solutions planned for bulk hostel and institutional accommodation projects.',
  },
] as const;

export default function HomepageHostelSequence() {
  const assets = getHostelAssets(4);

  return (
    <section id="hostel-furniture" className="border-t border-navy/10 bg-white py-12 sm:py-16 lg:py-20">
      <div className="container-x px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Hostel Furniture</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Student living solutions designed for density, comfort, and durability</h2>
          </div>
          <Link to="/products/category/hostel-furniture" className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 font-sub text-sm">
            Explore Hostel Range <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {hostelStory.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="overflow-hidden rounded-lux border border-navy/10 bg-light-grey shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={assets[index]?.image ?? assets[0]?.image}
                  alt={item.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-sub text-[10px] uppercase tracking-[0.22em] text-navy">
                  {item.label}
                </span>
              </div>
              <div className="p-5">
                <p className="font-sub text-[10px] uppercase tracking-[0.24em] text-gold">Dormitory System</p>
                <h3 className="mt-3 font-heading text-xl font-black text-navy">{item.label}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-navy/70">{item.subtitle}</p>
                <p className="mt-3 font-body text-sm leading-6 text-navy/60">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}