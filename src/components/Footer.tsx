import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Send, CheckCircle2, Loader2 } from 'lucide-react';
import companyLogo from '../assets/logo/logo.png';

const cols = [
  { title: 'Company', links: [{ label: 'About', to: '/company/about' }, { label: 'Manufacturing', to: '/manufacturing' }, { label: 'Tech Business Promotion', to: '/tech-business-promotion' }, { label: 'Contact', to: '/contact' }] },
  { title: 'Products', links: [{ label: 'Educational Furniture', to: '/products' }, { label: 'Storage Solutions', to: '/products' }, { label: 'Catalogue', to: '/catalogue' }, { label: 'All Products', to: '/products' }] },
  { title: 'Business', links: [{ label: 'Membership', to: '/membership' }, { label: 'Payment Instructions', to: '/payment-instructions' }, { label: 'Request Quote', to: '/rfq' }, { label: 'Compliance', to: '/compliance' }] },
  { title: 'Policies', links: [{ label: 'Enquiry', to: '/contact' }, { label: 'Terms of Use', to: '/terms-of-use' }, { label: 'Privacy Policy', to: '/privacy-policy' }, { label: 'Disclaimer', to: '/disclaimer' }] },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      console.log('Demo mode: Newsletter subscribed', email);
      setStatus('done');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <footer className="relative overflow-hidden bg-white pt-20">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-x relative px-6">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 overflow-hidden rounded-lux glass-navy p-8 sm:p-10"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="font-heading text-2xl font-black text-navy sm:text-3xl">Stay Updated</h3>
              <p className="mt-2 font-body text-sm text-body-text">Subscribe for product updates, export news and tender opportunities.</p>
            </div>
            <form onSubmit={subscribe} className="flex gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
              <button type="submit" disabled={status === 'loading'} className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm disabled:opacity-60">
                {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : status === 'done' ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {status === 'done' ? 'Thank you for subscribing.' : 'Subscribe'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Main footer */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_3fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-navy/60">
                <img src={companyLogo} alt="OPCIEAS logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="font-heading text-xl font-extrabold tracking-widest text-navy">OPCIEAS</p>
                <p className="font-sub text-[10px] tracking-[0.2em] text-gold">PVT. LTD.</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-body-text">
                OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd. delivers institutional furniture, storage solutions, and business promotion services with a focus on quality, reliability, and transparent engagement.
            </p>
              <p className="mt-4 font-sub text-sm italic text-gold">ISO certification information: available upon final client confirmation and document approval.</p>
              <p className="mt-2 font-body text-xs text-navy/60">Export credentials: presented on request with relevant documentation and compliance record.</p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {['in', 'f', 'X', 'ig', 'yt'].map((s) => (
                <a key={s} href="/" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 font-sub text-xs text-navy/70 transition hover:border-gold hover:bg-gold hover:text-navy">{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-heading text-sm font-bold text-gold">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}><Link to={l.to} className="font-body text-sm text-navy/70 transition hover:text-gold">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-8 sm:flex-row">
          <p className="font-body text-xs text-muted-text">© 2025 OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="font-body text-xs text-muted-text transition hover:text-gold">Privacy Policy</a>
            <a href="/terms-of-use" className="font-body text-xs text-muted-text transition hover:text-gold">Terms</a>
            <a href="/" className="font-body text-xs text-muted-text transition hover:text-gold">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gold transition hover:bg-gold hover:text-navy"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.a>
    </footer>
  );
}
