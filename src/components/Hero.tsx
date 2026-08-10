import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, FileText, ChevronDown, Award, Factory, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

type Phase =
  | 'TYPING_LINE1'
  | 'PAUSE_LINE1'
  | 'TYPING_LINE2'
  | 'PAUSE_LINE2'
  | 'DELETING_LINE2'
  | 'DELETING_LINE1'
  | 'PAUSE_RESTART';

const LINE1 = 'Commercial Furniture';
const LINE2 = 'Manufacturer Since 2000';
const CHAR_DELAY = 80;
const DELETE_DELAY = 40;
const PAUSE_AFTER_LINE1 = 1000;
const PAUSE_AFTER_LINE2 = 2000;
const PAUSE_BEFORE_RESTART = 500;

function TypewriterCursor() {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
      className="inline-block ml-[2px] align-[0.08em] h-[0.9em] w-[3px] bg-white rounded-sm"
    />
  );
}

const stats = [
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 1, suffix: '', label: 'ISO 9001:2015 Certified' },
  { value: 500, suffix: '+', label: 'Government Projects' },
  { value: 1000, suffix: '+', label: 'Bulk Manufacturing' },
  { value: 20, suffix: '+', label: 'Export Ready' },
  { value: 50, suffix: '+', label: 'Trusted Brands' },
  { value: 500, suffix: '+', label: 'Institutional Expertise' },
  { value: 200, suffix: '+', label: 'Government Tender Specialist' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = 0;
        const dur = 1800;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1);
          setN(Math.floor(start + (value - start) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('TYPING_LINE1');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  useEffect(() => {
    clearAllTimers();

    switch (phase) {
      case 'TYPING_LINE1': {
        if (text1.length < LINE1.length) {
          addTimer(() => {
            setText1(LINE1.slice(0, text1.length + 1));
          }, CHAR_DELAY);
        } else {
          setPhase('PAUSE_LINE1');
        }
        break;
      }
      case 'PAUSE_LINE1': {
        addTimer(() => setPhase('TYPING_LINE2'), PAUSE_AFTER_LINE1);
        break;
      }
      case 'TYPING_LINE2': {
        if (text2.length < LINE2.length) {
          addTimer(() => {
            setText2(LINE2.slice(0, text2.length + 1));
          }, CHAR_DELAY);
        } else {
          setPhase('PAUSE_LINE2');
        }
        break;
      }
      case 'PAUSE_LINE2': {
        addTimer(() => setPhase('DELETING_LINE2'), PAUSE_AFTER_LINE2);
        break;
      }
      case 'DELETING_LINE2': {
        if (text2.length > 0) {
          addTimer(() => {
            setText2(LINE2.slice(0, text2.length - 1));
          }, DELETE_DELAY);
        } else {
          setPhase('DELETING_LINE1');
        }
        break;
      }
      case 'DELETING_LINE1': {
        if (text1.length > 0) {
          addTimer(() => {
            setText1(LINE1.slice(0, text1.length - 1));
          }, DELETE_DELAY);
        } else {
          setPhase('PAUSE_RESTART');
        }
        break;
      }
      case 'PAUSE_RESTART': {
        addTimer(() => setPhase('TYPING_LINE1'), PAUSE_BEFORE_RESTART);
        break;
      }
    }

    return clearAllTimers;
  }, [phase, text1, text2]);

  const showCursorLine1 = phase === 'TYPING_LINE1' || phase === 'DELETING_LINE1';
  const showCursorLine2 = phase === 'TYPING_LINE2' || phase === 'DELETING_LINE2';

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden bg-dark">
      {/* Background: banner video */}
      <div className="pointer-events-none absolute inset-0">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
      </div>

      {/* Floating ambient orbs — decorative, no pointer events */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-navy-3/40 blur-[120px] animate-float" />

      <div className="container-x relative z-10 flex min-h-screen items-center px-6 py-32">
        {/* Left content */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2"
          >
            <span className="h-2 w-2 animate-glow rounded-full bg-gold" />
            <span className="font-sub text-xs tracking-widest text-white/80">COMMERCIAL FURNITURE MANUFACTURER SINCE 2000</span>
          </motion.div>

          {/* Typewriter headline */}
          <h1 className="font-heading text-4xl font-black leading-[1.05] text-white text-shadow-lux sm:text-5xl xl:text-6xl">
            <span className="block font-black whitespace-pre">
              {text1 || '\u00A0'}
              <AnimatePresence mode="wait" initial={false}>
                {showCursorLine1 && <TypewriterCursor key="c1" />}
              </AnimatePresence>
            </span>
            <span className="block gold-text font-bold whitespace-pre">
              {text2 || '\u00A0'}
              <AnimatePresence mode="wait" initial={false}>
                {showCursorLine2 && <TypewriterCursor key="c2" />}
              </AnimatePresence>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-4 font-sub text-lg text-white/85"
          >
            Trusted manufacturer of premium commercial, institutional and export furniture with certified quality and bulk delivery capability.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-5 max-w-xl font-body text-sm text-white/75"
          >
            Premium furniture solutions for offices, education, hospitality, healthcare and institutional projects across India and global markets.
          </motion.p>

          <div className="mt-5 flex flex-wrap gap-2">
            {['25+ Years Experience', 'ISO 9001:2015 Certified', 'Government Tender Specialist', 'Export Ready', 'Trusted by TATA, NOKIA, JW Marriott', 'Bulk Manufacturing', 'Institutional Projects'].map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-sub text-xs font-medium text-white/90">{t}</span>
            ))}
          </div>

          {/* Buttons — always clickable, z-20 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="relative z-20 mt-8 flex flex-wrap gap-3"
          >
            <Link to="/products" className="btn-gold magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              <FileText className="h-4 w-4" /> Request Quote
            </Link>
            <Link to="/products" className="btn-ghost magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              <Download className="h-4 w-4" /> Download Catalogue
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-5"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-extrabold gold-text sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 font-sub text-[10px] uppercase tracking-wider text-white/75">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust badge — decorative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex items-center gap-3 rounded-full glass px-5 py-2.5">
          <Award className="h-4 w-4 text-gold" />
          <span className="font-sub text-xs tracking-wide text-white/80">25 Years of Premium Manufacturing</span>
          <Factory className="h-4 w-4 text-gold" />
          <Globe2 className="h-4 w-4 text-gold" />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/80"
      >
        <Link to="/company/about">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
