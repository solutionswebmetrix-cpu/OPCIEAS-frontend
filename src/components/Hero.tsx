import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, ChevronDown } from 'lucide-react';
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
const LINE2 = 'Institutional Furniture • Storage • Fiberglass';
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
      style={{ backgroundColor: '#FFFFFF' }}
    />
  );
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
    <section id="hero" ref={heroRef} className="relative h-[620px] overflow-hidden bg-white sm:h-[620px] md:h-[640px] lg:h-[clamp(620px,72vh,720px)]">
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
        <div className="absolute inset-0 bg-[#050B14]/25" />
      </div>

      {/* Subtle decorative orbs — very low opacity to not obscure video details */}
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-56 w-56 rounded-full bg-gold/5 blur-[80px] animate-float-slow" />
      <div className="pointer-events-none absolute right-[10%] bottom-[15%] h-64 w-64 rounded-full bg-navy/4 blur-[90px] animate-float" />

      <div className="container-x relative z-10 flex h-full items-center px-6 py-10 sm:py-8 lg:px-10 lg:py-6 xl:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-navy/65 px-4 py-2"
          >
            <span className="h-2 w-2 animate-glow rounded-full bg-gold" />
            <span
              className="font-sub text-xs tracking-widest text-white"
            >COMMERCIAL FURNITURE MANUFACTURER SINCE 2000</span>
          </motion.div>

          {/* Typewriter headline — white for readability over video */}
          <h1
            className="font-heading text-4xl font-black leading-[1.05] sm:text-5xl xl:text-6xl"
            style={{ color: '#FFFFFF', fontWeight: 800, opacity: 1, textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}
          >
            <span className="block font-black whitespace-pre">
              {text1 || '\u00A0'}
              <AnimatePresence mode="wait" initial={false}>
                {showCursorLine1 && <TypewriterCursor key="c1" />}
              </AnimatePresence>
            </span>
            <span
              className="mt-2 block max-w-[14ch] text-[1.7rem] font-bold leading-[1.12] whitespace-normal sm:max-w-[18ch] sm:text-[2.3rem] lg:max-w-none lg:whitespace-nowrap lg:text-[2.8rem]"
              style={{
                color: '#FFFFFF',
                fontWeight: 800,
                textShadow: '0 2px 12px rgba(0,0,0,0.45)',
                opacity: 1,
              }}
            >
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
            className="mt-3 font-sub text-lg"
            style={{ color: '#FFFFFF', fontWeight: 600, lineHeight: 1.5, opacity: 1, textShadow: '0 1px 8px rgba(0,0,0,0.45)' }}
          >
            OPCIEAS supplies institutional furniture, educational systems, stainless steel storage, writing pad chairs, play equipment, and special-order fiberglass solutions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-3 max-w-[760px] font-body text-base leading-[1.5] sm:text-[1.1rem] lg:text-[1.2rem]"
            style={{ color: '#FFFFFF', fontWeight: 550, lineHeight: 1.5, opacity: 1, textShadow: '0 1px 8px rgba(0,0,0,0.45)' }}
          >
            Built for schools, institutions, corporate environments, government buyers, and export-oriented procurement programs.
          </motion.p>

          <div className="mt-4 flex flex-wrap gap-2">
            {['KG Furniture', 'Double Slide Play Station', 'Stainless Steel Racks', 'Writing Pad Chairs', 'Educational Furniture', 'Institutional Furniture', 'Storage Solutions', 'Special Order Fiberglass'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/35 bg-navy/55 px-3 py-1.5 font-sub text-xs font-medium"
                style={{ color: '#FFFFFF', opacity: 1 }}
              >{t}</span>
            ))}
          </div>

          {/* Buttons — always clickable, z-20. btn-gold already #071A35 text, btn-ghost already var(--navy). Enforce icons. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="relative z-20 mt-6 flex flex-wrap gap-3"
          >
            <Link to="/products" className="btn-gold magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm [&>svg]:text-[#071A35]">
              Explore Catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost magnetic flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm [color:#071A35] [&>svg]:text-[#071A35] hover:[color:var(--gold)] hover:[&>svg]:text-[var(--gold)]">
              <FileText className="h-4 w-4" /> Request Bulk Quote
            </Link>
          </motion.div>

        </div>
      </div>

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
