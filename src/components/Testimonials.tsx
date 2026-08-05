import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMG } from '../lib/images';

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Procurement Head, TATA Group', text: 'OPCIEAS delivered 2000+ workstations for our corporate offices on time and with impeccable quality. Their tender documentation was flawless.', img: IMG.testimonials[0] },
  { name: 'Dr. Anjali Sharma', role: 'Director, AIIMS', text: 'The hospital furniture supplied by OPCIEAS meets every medical-grade standard. Their team understood our requirements perfectly.', img: IMG.testimonials[1] },
  { name: 'Mohammed Al-Rashid', role: 'Import Manager, UAE', text: 'We have been importing from OPCIEAS for 5 years. Their export packaging, compliance and on-time delivery are world-class.', img: IMG.testimonials[2] },
  { name: 'Sarah Williams', role: 'Interior Architect, London', text: 'As an architect, I recommend OPCIEAS for commercial projects. Their BIM and CAD files made specification effortless.', img: IMG.testimonials[3] },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-32">
      <div className="pointer-events-none absolute right-10 top-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl animate-float-slow" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Testimonials</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="relative mx-auto max-w-3xl" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lux glass-light p-10 text-center luxury-shadow"
            >
              <Quote className="mx-auto mb-6 h-10 w-10 text-gold" />
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <p className="font-body text-lg italic leading-relaxed text-navy/80">"{testimonials[i].text}"</p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <img src={testimonials[i].img} alt={testimonials[i].name} className="h-14 w-14 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-heading text-base font-bold text-navy">{testimonials[i].name}</p>
                  <p className="font-sub text-xs text-navy/60">{testimonials[i].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)} className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full glass-light p-3 text-navy hover:text-gold sm:-left-12"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => setI((p) => (p + 1) % testimonials.length)} className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full glass-light p-3 text-navy hover:text-gold sm:-right-12"><ChevronRight className="h-5 w-5" /></button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, d) => (
              <button key={d} onClick={() => setI(d)} className={`h-1.5 rounded-full transition-all ${d === i ? 'w-8 bg-gold' : 'w-1.5 bg-navy/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
