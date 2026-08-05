
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Award, Activity, Flame, Droplets, Clock, Building } from 'lucide-react';

const features = [
  { icon: CheckCircle, title: 'Verified Products', desc: 'Every product undergoes strict verification and quality checks.' },
  { icon: Shield, title: 'Durability', desc: 'Built to last with premium materials and craftsmanship.' },
  { icon: Award, title: 'Compliance', desc: 'Adhering to all international quality standards and certifications.' },
  { icon: Activity, title: 'Ergonomic Design', desc: 'Designed for comfort, safety, and optimal performance.' },
  { icon: Flame, title: 'Fire Safety', desc: 'Meeting all fire safety regulations and standards.' },
  { icon: Droplets, title: 'Hygiene Standards', desc: 'Maintaining high hygiene and cleanliness standards.' },
  { icon: Clock, title: 'Long Product Life', desc: 'Products designed for longevity and sustained performance.' },
  { icon: Building, title: 'Bulk Commercial Standards', desc: 'Engineered to meet the demands of large-scale commercial use.' }
];

export default function QualityCommitment() {
  return (
    <section className="bg-white py-24">
      <div className="container-x px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Our Promise</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Our Commitment to Quality</motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                className="group relative overflow-hidden rounded-lux border border-navy/10 bg-navy/5 p-8 transition-all duration-500 hover:border-gold hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-navy mb-6">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="font-body text-sm text-navy/70">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
