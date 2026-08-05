import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';

interface Props {
  title: string;
  tagline?: string;
  image: string;
  crumb: string;
  crumbTo?: string;
}

export default function SectionBanner({ title, tagline, image, crumb, crumbTo }: Props) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-navy pt-32">
      <div className="pointer-events-none absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy" />
      </div>
      <div className="container-x relative z-10 flex min-h-[50vh] flex-col justify-center px-6 py-16">
        <Breadcrumbs items={[{ label: crumb, to: crumbTo }]} />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl xl:text-6xl"
        >
          {title}
        </motion.h1>
        {tagline && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 max-w-xl font-sub text-lg text-white/60">{tagline}</motion.p>}
      </div>
    </section>
  );
}
