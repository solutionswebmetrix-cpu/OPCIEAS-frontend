import { motion } from 'framer-motion';

const clientAssets = import.meta.glob('../assets/client/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const titleMap: Record<string, { name: string; subtitle: string }> = {
  tata: { name: 'TATA Group', subtitle: 'Enterprise Partner' },
  nokia: { name: 'NOKIA', subtitle: 'Technology Client' },
  'jw marriott': { name: 'JW Marriott', subtitle: 'Hospitality Client' },
  government: { name: 'Government Organizations', subtitle: 'Public Sector' },
  educational: { name: 'Educational Institutions', subtitle: 'Institutional Client' },
  corporate: { name: 'Corporate Clients', subtitle: 'Business Partner' },
};

const clients = Object.entries(clientAssets)
  .map(([path, src]) => {
    const rawName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'Client Logo';
    const normalized = rawName.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const match = Object.entries(titleMap).find(([key]) => normalized.includes(key));

    return {
      name: match ? match[1].name : rawName.replace(/\s+/g, ' ').trim(),
      subtitle: match ? match[1].subtitle : 'Trusted Client',
      src,
    };
  })
  .sort((a, b) => {
    const order = ['tata', 'nokia', 'jw marriott', 'government', 'educational', 'corporate'];
    const aOrder = order.findIndex((key) => a.name.toLowerCase().includes(key));
    const bOrder = order.findIndex((key) => b.name.toLowerCase().includes(key));
    const aIndex = aOrder === -1 ? 999 : aOrder;
    const bIndex = bOrder === -1 ? 999 : bOrder;
    return aIndex - bIndex || a.name.localeCompare(b.name);
  });

export default function Clients() {
  return (
    <section id="clients" className="relative overflow-hidden bg-navy py-24">
      <div className="container-x mb-12 px-6 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Trusted By</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
          Premium Clients & Strategic Partners
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-4 max-w-2xl font-body text-sm text-white/60">
          OPCIEAS serves leading corporates, hospitality brands, government organisations, educational institutions and large-scale institutional buyers with world-class furniture solutions.
        </motion.p>
      </div>

      <div className="container-x px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-lux border border-white/10 bg-white/5 p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10"
            >
              <div className="mb-5 flex h-36 items-center justify-center rounded-2xl border border-white/10 bg-white/90 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:h-40 lg:h-44">
                <img
                  src={client.src}
                  alt={`${client.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full max-w-[80%] max-h-[80%] object-contain object-center"
                />
              </div>
              <p className="font-heading text-xl font-bold text-white">{client.name}</p>
              <p className="mt-2 font-body text-sm text-white/60">{client.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
