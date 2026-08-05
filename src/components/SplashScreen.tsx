import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logoSrc from '../assets/logo/logo.png';

console.log('Logo Loaded:', logoSrc);

const subtitles = [
  'Commercial Furniture Manufacturer',
  'Government Tender Specialist',
  'Export Furniture Manufacturer',
];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoPulse, setLogoPulse] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showSweep, setShowSweep] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const logoPreload = document.createElement('link');
    logoPreload.rel = 'preload';
    logoPreload.as = 'image';
    logoPreload.href = logoSrc;
    document.head.appendChild(logoPreload);

    const image = new Image();
    image.src = logoSrc;

    const timeline = [
      window.setTimeout(() => setLogoVisible(true), 150),
      window.setTimeout(() => setLogoPulse(true), 1200),
      window.setTimeout(() => setShowTitle(true), 1700),
      window.setTimeout(() => setShowTagline(true), 2200),
      window.setTimeout(() => setShowSubtitle(true), 2600),
      window.setTimeout(() => setShowSweep(true), 3200),
      window.setTimeout(() => {
        document.body.style.overflow = '';
        localStorage.setItem('opcieas_intro', 'played');
        onComplete();
      }, 5900),
    ];

    return () => {
      document.body.style.overflow = '';
      timeline.forEach(window.clearTimeout);
      document.head.removeChild(logoPreload);
    };
  }, [onComplete]);

  const handleSkip = () => {
    document.body.style.overflow = '';
    localStorage.setItem('opcieas_intro', 'played');
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] text-white"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08),_transparent_40%)]" />
          <div className="splash-particle left-[12%] top-[18%] h-2 w-2" />
          <div className="splash-particle left-[25%] top-[72%] h-1.5 w-1.5" />
          <div className="splash-particle left-[42%] top-[35%] h-1.5 w-1.5" />
          <div className="splash-particle left-[63%] top-[16%] h-2 w-2" />
          <div className="splash-particle left-[78%] top-[60%] h-1 w-1" />
          <div className="splash-particle left-[88%] top-[42%] h-2.5 w-2.5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_35%)] opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(212,175,55,0.12),_transparent_22%)] opacity-60 blur-2xl" />
        </div>

        <div className="relative mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
          <button
            type="button"
            onClick={handleSkip}
            className="glass absolute right-6 top-6 z-10 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:border-gold hover:text-gold"
          >
            Skip Intro
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? (logoPulse ? 1.05 : 1) : 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-[#F2D37B]/20 via-[#D4AF37]/10 to-transparent blur-3xl opacity-80" />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(212,175,55,0.24)] backdrop-blur-2xl">
              <img src={logoSrc} alt="OPCIEAS logo" className="h-full w-full object-contain" />
            </div>
            <motion.div
              animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? 1 : 0.75 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 m-auto h-44 w-44 rounded-full bg-gold/10 blur-3xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 max-w-3xl"
          >
            <h1 className="font-heading text-4xl font-black uppercase tracking-[0.35em] text-transparent sm:text-5xl md:text-6xl" style={{ backgroundImage: 'linear-gradient(135deg, #E8C766 0%, #D4AF37 50%, #B8932B 100%)', WebkitBackgroundClip: 'text' }}>
              OPCIEAS™
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showTagline ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-4 max-w-2xl text-sm uppercase tracking-[0.35em] text-white/60 sm:text-base"
          >
            Everyone Says Go Green... We Show How!!!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 16 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-8 grid gap-3 text-sm font-medium text-white/70 sm:grid-cols-3"
          >
            {subtitles.map((line) => (
              <div key={line} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 shadow-[0_0_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">
                {line}
              </div>
            ))}
          </motion.div>

          <div className="relative mt-12 h-2.5 w-full overflow-hidden rounded-full bg-white/5 sm:w-3/4">
            <motion.div
              initial={{ x: '-110%' }}
              animate={{ x: showSweep ? '110%' : '-110%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="splash-sweep absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-[#F6E4A3]/90 to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
