import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import opcIeasTextWordmark from '../assets/logo/OPCIEAS_approved_text_wordmark.png';
import CompanyLogo from './CompanyLogo';

const subtitles = [
  'Commercial Furniture Manufacturer',
  'Government Tender Specialist',
  'Export Furniture Manufacturer',
];

export default function Loader({ done, onComplete }: { done: boolean; onComplete: () => void }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoPulse, setLogoPulse] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const complete = useCallback(() => {
    document.body.style.overflow = '';
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const wordmarkPreload = document.createElement('link');
    wordmarkPreload.rel = 'preload';
    wordmarkPreload.as = 'image';
    wordmarkPreload.href = opcIeasTextWordmark;
    document.head.appendChild(wordmarkPreload);

    const timeline = [
      window.setTimeout(() => setLogoVisible(true), 150),
      window.setTimeout(() => setLogoPulse(true), 1200),
      window.setTimeout(() => setShowTitle(true), 1700),
      window.setTimeout(() => setShowSubtitle(true), 2600),
      window.setTimeout(complete, 5900),
    ];

    return () => {
      document.body.style.overflow = '';
      timeline.forEach(window.clearTimeout);
      if (wordmarkPreload.parentNode) wordmarkPreload.parentNode.removeChild(wordmarkPreload);
    };
  }, [complete]);

  const handleSkip = () => complete();

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          role="status"
          aria-label="OPCIEAS intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-[#FFFFFF] text-navy"
        >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="splash-particle left-[12%] top-[18%] h-2 w-2" />
          <div className="splash-particle left-[25%] top-[72%] h-1.5 w-1.5" />
          <div className="splash-particle left-[42%] top-[35%] h-1.5 w-1.5" />
          <div className="splash-particle left-[63%] top-[16%] h-2 w-2" />
          <div className="splash-particle left-[78%] top-[60%] h-1 w-1" />
          <div className="splash-particle left-[88%] top-[42%] h-2.5 w-2.5" />
        </div>

        <div className="relative mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
          <button
            type="button"
            onClick={handleSkip}
            className="absolute right-6 top-6 z-10 rounded-full border border-navy/20 bg-light-grey px-4 py-2 text-xs uppercase tracking-[0.35em] text-navy/80 transition hover:border-accent-blue hover:text-accent-blue"
          >
            Skip Intro
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: logoVisible ? 1 : 0, scale: logoVisible ? (logoPulse ? 1.05 : 1) : 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-[36px] bg-accent-blue/5 blur-3xl" />
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              <CompanyLogo alt="OPCIEAS logo" className="h-full w-full object-contain" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 max-w-3xl"
          >
            <img
              src={opcIeasTextWordmark}
              alt="OPCIEAS Private Limited — Hand Crafted Since 1999"
              className="h-auto w-[min(72vw,340px)] object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 16 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-8 grid w-full gap-3 text-sm font-medium text-navy/85 sm:grid-cols-3"
          >
            {subtitles.map((line) => (
              <div key={line} className="rounded-3xl border border-navy/10 bg-light-grey px-5 py-3 shadow-sm">
                {line}
              </div>
            ))}
          </motion.div>

          <div className="relative mt-12 h-2.5 w-full overflow-hidden rounded-full bg-navy/5 sm:w-3/4">
            <motion.div
              initial={{ x: '-110%' }}
              animate={{ x: showSubtitle ? '110%' : '-110%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="splash-sweep absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"
            />
          </div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
