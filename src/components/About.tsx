import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { IMG } from '../lib/images';

const timeline = [
  { year: '2000', title: 'Company Started', desc: 'OPCIEAS began with a vision to supply premium commercial furniture to institutional and corporate projects.' },
  { year: '2005', title: 'Manufacturing Expansion', desc: 'Expanded production capacity with modern equipment and a larger furniture manufacturing facility.' },
  { year: '2010', title: 'Government Tender Projects', desc: 'Became an approved supplier for government and institutional furniture tenders.' },
  { year: '2015', title: 'Global Export', desc: 'Started exporting office, school and healthcare furniture to international markets.' },
  { year: '2020', title: 'Smart Manufacturing', desc: 'Adopted CNC, laser cutting and precision assembly for better quality and repeatability.' },
  { year: '2025', title: 'Market Leadership', desc: 'Serving 20+ export destinations with trusted delivery and high-volume project execution.' },
];

const galleryImages = [
  IMG.products['Office Furniture'].img,
  IMG.products['Industrial Storage'].img,
  IMG.products['Educational Furniture'].img,
  IMG.products['Industrial Storage'].img,
  IMG.products['Hospital Furniture'].img,
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const totalWidth = container.scrollWidth;
    const halfWidth = totalWidth / 2;

    const tl = gsap.to(container, {
      x: -halfWidth,
      duration: 22,
      ease: 'none',
      repeat: -1,
      paused: isPaused,
    });

    if (isPaused) {
      tl.pause();
    } else {
      tl.resume();
    }

    return () => {
      tl.kill();
    };
  }, [isPaused]);

  return (
    <section id="overview" ref={ref} style={{ scrollMarginTop: '100px' }} className="relative overflow-hidden bg-white py-32">
      <div className="pointer-events-none absolute right-10 top-20 h-40 w-40 rounded-full border border-navy/10 bg-navy/5 blur-2xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-20 left-10 h-60 w-60 rounded-full border border-gold/10 bg-gold/5 blur-3xl animate-float" />

      <div className="container-x grid gap-12 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left — Animated Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="group relative overflow-hidden rounded-lux border-2 border-gold/30 p-1">
            <div className="absolute inset-0 animate-glow rounded-lux bg-gradient-to-r from-gold/20 via-transparent to-gold/20" />
            <div 
              className="about-gallery-shell relative overflow-hidden rounded-lux"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                ref={carouselRef} 
                className="flex gap-4"
              >
                {/* Duplicate images for infinite loop */}
                {[...galleryImages, ...galleryImages].map((img, i) => (
                  <div 
                    key={i} 
                    className="about-image-card group/img relative flex-shrink-0 overflow-hidden rounded-xl luxury-shadow"
                  >
                    <img 
                      src={img} 
                      alt={`OPCIEAS gallery ${i + 1}`} 
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover/img:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-6 -right-6 rounded-lux glass-light p-5 luxury-shadow"
          >
            <p className="font-heading text-3xl font-black text-navy">25+</p>
            <p className="font-sub text-xs text-navy/60">Years of Excellence</p>
          </motion.div>
        </motion.div>

        {/* Right — content */}
        <motion.div style={{ y }} className="relative">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sub text-sm uppercase tracking-[0.3em] text-gold"
          >
            About OPCIEAS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-heading text-3xl font-black leading-tight text-navy sm:text-4xl xl:text-5xl"
          >
            Engineering Superior Furniture Solutions for Education, Workspaces, and Beyond
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 font-body text-base leading-relaxed text-navy/70"
          >
            At OPCIEAS, we specialize in designing and manufacturing high-performing educational, commercial, and child-safe furniture tailored to meet international quality standards. Built on a foundation of structural integrity, ergonomic research, and modern aesthetics, our product range supports dynamic learning environments and high-productivity corporate offices.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-body text-base leading-relaxed text-navy/70"
          >
            Every piece of furniture engineered at OPCIEAS undergoes rigorous quality testing to ensure maximum durability, safety, and long-term utility. From vibrant single and dual-seat classroom desks to heavy-duty executive office setups, we partner with educational institutions, architects, and corporate clients to transform functional spaces into inspiring environments.
          </motion.p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { title: 'Ergonomic Design', desc: 'Proper posture support and comfortable long-duration classroom use engineered into every product.' },
              { title: 'Child Safety Focus', desc: 'High-grade materials, rounded safety edges, and non-toxic protective coatings for peace of mind.' },
              { title: 'Commercial-Grade Durability', desc: 'Heavy-duty construction built to withstand intensive institutional and commercial environments.' },
            ].map((item) => (
              <div key={item.title} className="rounded-lux border border-navy/10 bg-navy/5 p-4">
                <p className="font-heading text-sm font-bold text-navy">{item.title}</p>
                <p className="mt-1 font-body text-sm text-navy/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="container-x mt-24 px-6">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl"
        >
          Our Journey
        </motion.h3>
        <div className="relative">
          <div className="absolute left-0 top-0 h-1 w-full overflow-hidden rounded-full bg-navy/10">
            <motion.div className="h-full bg-gradient-to-r from-gold-2 to-gold" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-10 md:grid-cols-3 lg:grid-cols-6">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -top-[42px] left-0 h-5 w-5 rounded-full border-2 border-gold bg-white" />
                <p className="font-heading text-2xl font-black gold-text">{t.year}</p>
                <p className="mt-1 font-sub text-sm font-semibold text-navy">{t.title}</p>
                <p className="mt-1 font-body text-xs text-navy/60">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
