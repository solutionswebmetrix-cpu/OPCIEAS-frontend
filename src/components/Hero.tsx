import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, ChevronDown, Award, Factory, Globe2 } from 'lucide-react';
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

const LINE1 = 'Educational Furniture';
const LINE2 = 'Built for Modern Learning Spaces';
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
      className="inline-block ml-[2px] align-[0.08em] h-[0.9em] w-[3px] rounded-sm"
      style={{ backgroundColor: '#071A35' }}
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
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const updateObjectPosition = () => {
      if (!videoRef.current) return;
      const w = window.innerWidth;
      if (w >= 1024) {
        videoRef.current.style.objectPosition = '50% 40%';
      } else if (w >= 640) {
        videoRef.current.style.objectPosition = '55% center';
      } else {
        videoRef.current.style.objectPosition = '60% center';
      }
    };
    updateObjectPosition();
    window.addEventListener('resize', updateObjectPosition);
    return () => window.removeEventListener('resize', updateObjectPosition);
  }, []);

  const showCursorLine1 = phase === 'TYPING_LINE1' || phase === 'DELETING_LINE1';
  const showCursorLine2 = phase === 'TYPING_LINE2' || phase === 'DELETING_LINE2';

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden bg-white">
      {/* Background: banner video — full quality, no blur/filters */}
      <div className="pointer-events-none absolute inset-0">
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: 'none',
            imageRendering: 'auto',
            opacity: 1,
            transform: 'none',
          }}
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
        </motion.video>
        {/* Subtle bottom fade for clean transition to next section only */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/70 to-transparent" />
        {/* Localized light gradient for text readability — text area only, NOT full video coverage */}
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-white/70 via-white/38 to-transparent md:w-[52%] lg:w-[48%]" />
      </div>

      {/* Subtle decorative orbs — very low opacity to not obscure video details */}
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-56 w-56 rounded-full bg-gold/5 blur-[80px] animate-float-slow" />
      <div className="pointer-events-none absolute right-[10%] bottom-[15%] h-64 w-64 rounded-full bg-navy/4 blur-[90px] animate-float" />

      <div className="container-x relative z-10 flex min-h-screen items-center px-6 py-32">
        {/* Left content with strong localized soft white background behind text block for readability */}
        <div className="relative max-w-3xl">
          {/* Diffused white halo behind text area ONLY — strong contrast, does not cover video */}
          <div aria-hidden className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 rounded-[3.5rem] bg-white/55 blur-[36px]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/45 bg-white/95 px-4 py-2 shadow-md backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-glow rounded-full bg-gold" />
            <span
              className="font-sub text-xs tracking-widest"
              style={{ color: '#071A35' }}
            >COMMERCIAL FURNITURE MANUFACTURER SINCE 2000</span>
          </motion.div>

          {/* Typewriter headline — FULL DARK NAVY with bright white text-shadow for video contrast */}
          <h1
            className="font-heading text-4xl font-black leading-[1.05] sm:text-5xl xl:text-6xl"
            style={{ color: '#071A35', textShadow: '0 2px 16px rgba(255,255,255,0.92), 0 0 2px rgba(255,255,255,0.8)' }}
          >
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
            className="mt-4 font-sub text-lg"
            style={{ color: '#071A35', textShadow: '0 1px 10px rgba(255,255,255,0.95), 0 0 2px rgba(255,255,255,0.85)' }}
          >
            Vibrant, durable single-seat and dual-seat desk systems engineered for safety, comfort, and active classrooms.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-5 max-w-xl font-body text-sm"
            style={{ color: '#071A35', textShadow: '0 1px 8px rgba(255,255,255,0.92), 0 0 2px rgba(255,255,255,0.8)' }}
          >
            Premium furniture solutions for offices, education, hospitality, healthcare and institutional projects across India and global markets.
          </motion.p>

          <div className="mt-5 flex flex-wrap gap-2">
            {['25+ Years Experience', 'ISO 9001:2015 Certified', 'Government Tender Specialist', 'Export Ready', 'Trusted by TATA, NOKIA, JW Marriott', 'Bulk Manufacturing', 'Institutional Projects'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-navy/20 bg-white/95 px-3 py-1.5 font-sub text-xs font-medium shadow-md backdrop-blur-md"
                style={{ color: '#071A35' }}
              >{t}</span>
            ))}
          </div>

          {/* Buttons — always clickable, z-20. btn-gold already #071A35 text, btn-ghost already var(--navy). Enforce icons. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="relative z-20 mt-8 flex flex-wrap gap-3"
          >
            <Link to="/products" className="btn-gold magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm [&>svg]:text-[#071A35]">
              Explore Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm [color:#071A35] [&>svg]:text-[#071A35] hover:[color:var(--gold)] hover:[&>svg]:text-[var(--gold)]">
              <FileText className="h-4 w-4" /> Request Bulk Quote
            </Link>
          </motion.div>

          {/* Stats — glass cards: 82% translucent white per spec; full dark navy labels; gold numbers preserved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-5"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border px-3 py-3 shadow-md"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.82)',
                  borderColor: 'rgba(7,26,53,0.28)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: '0 6px 22px rgba(7,26,53,0.10), inset 0 1px 0 rgba(255,255,255,0.7)',
                }}
              >
                {/* GOLD STATISTIC NUMBERS — preserved exactly as gold-text brand color */}
                <p className="font-heading text-2xl font-extrabold gold-text sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                {/* DARK NAVY STATISTIC LABELS — full #071B3A, larger size (11px→12px), semibold, white edge halo */}
                <p
                  className="mt-1 font-sub uppercase tracking-[0.08em]"
                  style={{
                    color: '#071A35',
                    fontSize: '11.5px',
                    lineHeight: '1.3',
                    fontWeight: 600,
                    textShadow: '0 1px 6px rgba(255,255,255,0.95), 0 0 2px rgba(255,255,255,0.9)',
                  }}
                >{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trust badge: 88% translucent white, DARK NAVY text, GOLD icons preserved */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div
          className="flex items-center gap-3 rounded-full px-5 py-2.5 shadow-md"
          style={{
            backgroundColor: 'rgba(255,255,255,0.88)',
            border: '1px solid rgba(217,173,43,0.45)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 6px 22px rgba(7,26,53,0.10)',
            outline: '1px solid rgba(255,255,255,0.72)',
          }}
        >
          <Award className="h-4 w-4 text-gold" />
          <span
            className="font-sub tracking-wide"
            style={{
              color: '#071A35',
              fontSize: '12.5px',
              fontWeight: 600,
              textShadow: '0 1px 6px rgba(255,255,255,0.95), 0 0 2px rgba(255,255,255,0.9)',
            }}
          >25 Years of Premium Manufacturing</span>
          <Factory className="h-4 w-4 text-gold" />
          <Globe2 className="h-4 w-4 text-gold" />
        </div>
      </motion.div>

      {/* Scroll indicator — FULL DARK NAVY chevron with white halo for video contrast */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <Link to="/company/about" className="block rounded-full bg-white/90 p-2 shadow-md backdrop-blur-md ring-1 ring-navy/20">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="h-5 w-5" style={{ color: '#071A35' }} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
