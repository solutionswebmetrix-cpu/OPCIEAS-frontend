import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <p className="font-heading text-8xl font-black gold-text sm:text-9xl">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">Page Not Found</h1>
        <p className="mt-3 max-w-md font-sub text-sm text-white/50">The page you are looking for may have been moved, deleted, or never existed.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm"><Home className="h-4 w-4" /> Back Home</Link>
          <Link to="/products" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm text-white"><ArrowLeft className="h-4 w-4" /> View Products</Link>
        </div>
      </motion.div>
    </section>
  );
}
