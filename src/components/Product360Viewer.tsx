import { useState, useRef, useEffect } from 'react';
import { X, RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  productName: string;
  open: boolean;
  onClose: () => void;
}

export default function Product360Viewer({ images, productName, open, onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [auto, setAuto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) { setIdx(0); setZoom(1); setAuto(false); }
  }, [open]);

  useEffect(() => {
    if (!auto || images.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 1200);
    return () => clearInterval(t);
  }, [auto, images.length]);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDrag(true);
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(x);
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drag) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = x - startX;
    if (Math.abs(diff) > 30) {
      setIdx((i) => (diff > 0 ? (i - 1 + images.length) % images.length : (i + 1) % images.length));
      setStartX(x);
    }
  };
  const onUp = () => setDrag(false);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-lux bg-navy p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-bold text-white">{productName}</h3>
              <p className="font-sub text-xs text-gold">360° Product Viewer</p>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-square w-full cursor-grab overflow-hidden rounded-lux bg-dark select-none active:cursor-grabbing"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
          >
            <img
              src={images[idx]}
              alt={`${productName} view ${idx + 1}`}
              className="h-full w-full object-contain transition-transform duration-150"
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s' }}
              draggable={false}
            />
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-2 font-sub text-xs text-white/80">
              Drag to rotate • View {idx + 1} / {images.length}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-gold hover:text-navy"><ZoomOut className="h-4 w-4" /></button>
              <span className="font-sub text-xs text-white/60">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-gold hover:text-navy"><ZoomIn className="h-4 w-4" /></button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setAuto(!auto)} className={`flex items-center gap-2 rounded-full px-4 py-2 font-sub text-xs transition ${auto ? 'bg-gold text-navy' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                <RotateCw className="h-4 w-4" /> {auto ? 'Stop Auto-Rotate' : 'Auto-Rotate'}
              </button>
              <button onClick={() => setIdx((i) => (i + 1) % images.length)} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-sub text-xs text-white transition hover:bg-gold hover:text-navy">
                <Maximize2 className="h-4 w-4" /> Next Angle
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${i === idx ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`thumb ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
