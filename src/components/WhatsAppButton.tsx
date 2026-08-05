import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const actions = [
    'Product Inquiry',
    'Catalogue Request',
    'Export Inquiry',
    'Tender Inquiry',
    'Dealer / Distributor',
  ];

  const waLink = (msg: string) => `https://wa.me/919845579049?text=${encodeURIComponent(msg)}`;

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition hover:scale-110"
        aria-label="WhatsApp"
      >
        <span className="absolute -inset-1 animate-glow rounded-full bg-[#25D366]/40" />
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-7 w-7" />}
      </motion.button>

      {/* Popup menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[900] w-64 overflow-hidden rounded-lux glass-navy p-4 luxury-shadow"
          >
            <p className="mb-3 font-heading text-sm font-bold text-white">How can we help?</p>
            <div className="space-y-2">
              {actions.map((a) => (
                <a
                  key={a}
                  href={waLink(`Hello OPCIEAS, I would like to know about: ${a}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy/40 px-3 py-2.5 font-sub text-xs text-white/80 transition hover:border-gold hover:bg-gold/10 hover:text-gold"
                >
                  <Send className="h-3.5 w-3.5 text-[#25D366]" /> {a}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
