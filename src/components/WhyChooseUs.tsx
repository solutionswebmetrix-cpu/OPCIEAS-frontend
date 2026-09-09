import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  ['Faster Delivery', 'Streamlined manufacturing ensures rapid fulfillment for orders in the hundreds or thousands.'],
  ['Uncompromising Quality Control', 'Standardized production lines mean rigorous consistency across every single unit.'],
  ['Competitive Bulk Pricing', 'Optimized manufacturing processes pass direct cost savings on to your institution.'],
] as const;

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" style={{ scrollMarginTop: '100px' }} className="relative overflow-hidden bg-white py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Why Choose OPCIEAS?</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Why Bulk Commercial Supply?
          </motion.h2>
          <p className="mt-5 font-body text-base leading-7 text-navy/70">Why Bulk Commercial Supply? By focusing our production on high-volume commercial needs rather than one-off custom pieces, we deliver clear advantages for large projects:</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {benefits.map(([title, description], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: index * 0.06, duration: 0.45 }} className="border-t-2 border-gold bg-white p-6 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 font-body text-sm leading-6 text-body-text">{description}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 border-l-4 border-gold bg-gold/5 p-6">
          <h3 className="font-heading text-xl font-bold text-navy">Built for Heavy Usage</h3>
          <p className="mt-2 font-body text-sm leading-6 text-navy/70">Engineered specifically to withstand the demands of schools, colleges, auditoriums, and public spaces.</p>
        </div>
      </div>
    </section>
  );
}
