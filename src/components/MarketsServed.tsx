
import { motion } from 'framer-motion';
import { GraduationCap, Building, Briefcase, Heart, Utensils, ShoppingBag, Globe, Users, TrendingUp } from 'lucide-react';

const markets = [
  { icon: GraduationCap, title: 'Educational Institutions', desc: 'Schools, colleges, universities, and educational facilities.' },
  { icon: Building, title: 'Government Projects', desc: 'Government offices, public buildings, and infrastructure projects.' },
  { icon: Briefcase, title: 'Corporate Offices', desc: 'Modern office spaces and corporate workplaces.' },
  { icon: Heart, title: 'Healthcare', desc: 'Hospitals, clinics, and healthcare facilities.' },
  { icon: Utensils, title: 'Hospitality', desc: 'Hotels, restaurants, and hospitality establishments.' },
  { icon: ShoppingBag, title: 'Retail Chains', desc: 'Retail stores, supermarkets, and shopping outlets.' },
  { icon: Globe, title: 'Export Buyers', desc: 'International clients and global export markets.' },
  { icon: Users, title: 'Contractors', desc: 'Construction and interior contractors.' },
  { icon: TrendingUp, title: 'Infrastructure Projects', desc: 'Large-scale infrastructure and development projects.' }
];

export default function MarketsServed() {
  return (
    <section className="bg-navy/5 py-24">
      <div className="container-x px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Our Reach</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Industries We Serve</motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market, i) => {
            const Icon = market.icon;
            return (
              <motion.div
                key={market.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lux bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold mb-6">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">{market.title}</h3>
                <p className="font-body text-sm text-navy/70">{market.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
