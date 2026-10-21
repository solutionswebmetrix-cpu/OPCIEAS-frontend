import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';

interface Props {
  title: string;
  tagline?: string;
  image: string;
  crumb: string;
  crumbTo?: string;
  variant?: 'default' | 'category';
}

export default function SectionBanner({ title, tagline, image, crumb, crumbTo, variant = 'default' }: Props) {
  const isCategoryBanner = variant === 'category';

  return (
    <section
      className={`relative overflow-hidden ${isCategoryBanner ? 'isolate min-h-[320px] bg-navy pt-20 sm:min-h-[360px] lg:min-h-[420px]' : 'min-h-[50vh] bg-navy pt-32'}`}
      id="hero"
    >
      <div className="pointer-events-none absolute inset-0">
        {image ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${image}")` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-navy via-navy/90 to-navy/70" />
        )}
      </div>
      <div className={`container-x relative z-10 flex flex-col justify-center px-6 ${isCategoryBanner ? 'min-h-[320px] py-12 sm:min-h-[360px] sm:py-16 lg:min-h-[420px]' : 'min-h-[50vh] py-16'}`}>
        <Breadcrumbs items={[{ label: crumb, to: crumbTo }]} />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 max-w-4xl break-words font-heading text-4xl font-black text-white sm:text-5xl xl:text-6xl"
        >
          {title}
        </motion.h1>
        {tagline && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 max-w-xl font-sub text-base text-white/90 sm:text-lg">{tagline}</motion.p>}
        <div className="mt-6 h-[3px] w-24 bg-gradient-to-r from-accent-blue to-accent-blue-2 rounded-full" />
      </div>
    </section>
  );
}
