import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';
import { fetchCertifications, fetchClients, submitContact, type Certification, type Client } from '../lib/data';

const pages: Record<string, { title: string; tagline: string; image: string; }> = {
  about: { title: 'About Us', tagline: '25 years of manufacturing excellence', image: IMG.aboutFactory },
  team: { title: 'Our Team', tagline: 'Meet the experts behind OPCIEAS', image: IMG.heroProduct },
  manufacturing: { title: 'Manufacturing', tagline: 'State-of-the-art production facility', image: IMG.manufacturingBg },
  infrastructure: { title: 'Infrastructure', tagline: '200,000 sq ft manufacturing facility', image: IMG.heroBg },
  'quality-control': { title: 'Quality Control', tagline: 'ISO 9001 certified quality processes', image: IMG.exportContainer },
  certifications: { title: 'Certifications', tagline: 'Certified for excellence', image: IMG.heroBg },
  clients: { title: 'Our Clients', tagline: 'Trusted by 500+ organisations', image: IMG.gallery[0]?.src || IMG.heroBg },
  contact: { title: 'Contact Us', tagline: 'Get in touch with our team', image: IMG.heroBg },
};

const teamMembers = [
  { name: 'Managing Director', role: 'Leadership & Strategy', image: IMG.heroProduct },
  { name: 'Executive Director', role: 'Operations & Business Development', image: IMG.aboutFactory },
  { name: 'Head of Engineering', role: 'Product Design & Development', image: IMG.exportGlobe },
  { name: 'Production Manager', role: 'Manufacturing & Quality', image: IMG.manufacturingBg },
  { name: 'Sales Head', role: 'Client Relations & Sales', image: IMG.heroBg },
  { name: 'HR Manager', role: 'Human Resources & Administration', image: IMG.gallery[1]?.src || IMG.heroBg },
];

const pageMeta: Record<string, { title: string; description: string; keywords: string }> = {
  about: {
    title: 'About OPCIEAS | Premium Furniture Manufacturer',
    description: 'Learn about OPCIEAS, a premium commercial furniture manufacturer with 25 years of experience in government tenders, institutional projects, export solutions and corporate interiors.',
    keywords: 'commercial furniture manufacturer, government tender supplier, institutional furniture, export furniture, corporate furniture',
  },
  team: {
    title: 'Our Team | OPCIEAS',
    description: 'Meet the leadership and operations team behind OPCIEAS premium furniture manufacturing and project delivery.',
    keywords: 'furniture manufacturing team, leadership, operations, OPCIEAS team',
  },
  manufacturing: {
    title: 'Manufacturing | OPCIEAS',
    description: 'Discover OPCIEAS manufacturing capabilities, production facility, CNC metalwork, powder coating and assembly for premium furniture.',
    keywords: 'furniture manufacturing, CNC production, powder coating, premium furniture',
  },
  infrastructure: {
    title: 'Infrastructure | OPCIEAS',
    description: 'Explore the OPCIEAS infrastructure, including our large-scale production facility, warehouse, logistics and export packaging support.',
    keywords: 'furniture infrastructure, manufacturing facility, logistics, export packaging',
  },
  'quality-control': {
    title: 'Quality Control | OPCIEAS',
    description: 'Read about OPCIEAS quality control processes, ISO 9001 standards, inspection procedures and product testing.',
    keywords: 'quality control, ISO 9001, furniture inspection, product testing',
  },
  certifications: {
    title: 'Certifications | OPCIEAS',
    description: 'OPCIEAS certifications and approvals for government tenders, export operations and premium furniture manufacturing quality.',
    keywords: 'OPCIEAS certifications, ISO 9001, MSME, NSIC, IEC, government approvals',
  },
  clients: {
    title: 'Clients | OPCIEAS',
    description: 'Trusted by government, institutional and corporate clients, OPCIEAS delivers large-scale furniture projects with premium service.',
    keywords: 'furniture clients, corporate clients, government clients, institutional clients',
  },
  contact: {
    title: 'Contact OPCIEAS | Premium Furniture Manufacturer',
    description: 'Contact OPCIEAS for premium commercial furniture projects, government tender support, export deliveries and custom manufacturing.',
    keywords: 'contact OPCIEAS, furniture inquiry, government tender support, export furniture request',
  },
};

const aboutContent = {
  about: [
    'OPCIEAS is a seasoned and successful leader in the industry, known for delivering premium commercial furniture solutions with lasting value.',
    'The company has grown rapidly through strong production capabilities, design & development expertise, customized solutions and a consistent client-oriented philosophy.',
    'From government and institutional projects to corporate offices, hotels, hospitals and educational spaces, OPCIEAS combines quality manufacturing with dependable service.',
    'Our approach is built on innovation, durability, customization and trust — making us a preferred partner for high-performance furniture requirements.',
  ],
  manufacturing: [
    'Our manufacturing facility spans 200,000 sq ft and is equipped with CNC laser cutting machines, CNC bending machines, robotic welding stations, powder coating lines and automated assembly lines. We process over 500 tonnes of steel and engineered wood per month.',
    'Our production capabilities include sheet-metal fabrication, tubular welding, powder coating, wood working, upholstery and assembly. We maintain a 5S workplace and follow lean manufacturing principles to ensure quality and efficiency.',
    'Every product goes through a rigorous quality control process — from raw material inspection to final assembly testing. Our QC team uses precision measuring instruments and follows ISO 9001 documented procedures.',
  ],
  infrastructure: [
    'Our 200,000 sq ft facility in Faridabad houses dedicated zones for raw material storage, CNC machining, welding, powder coating, woodworking, upholstery, assembly, quality control and finished goods warehousing.',
    'The facility is equipped with 2 CNC laser cutting machines, 4 CNC press brakes, 6 MIG/TIG welding stations, a 6-stage powder coating line, and a dedicated woodworking shop with edge banding and boring machines.',
    'Our logistics infrastructure includes a fleet of trucks for domestic delivery and partnerships with major freight forwarders for export shipments. We handle container loading and ISPM-15 compliant export packaging in-house.',
  ],
  'quality-control': [
    'Quality is built into every stage of our process. From raw material inspection (steel, wood, hardware) to in-process checks and final assembly testing, our QC team follows ISO 9001 documented procedures.',
    'We use precision measuring instruments — vernier callipers, micrometers, height gauges, welding gauges and coating thickness meters — to verify dimensional accuracy, weld quality and powder coating thickness.',
    'Every finished product undergoes a functional test — drawer operation, door alignment, load testing and finish inspection — before it is packed. We maintain batch-wise inspection records for traceability.',
  ],
};

export default function CompanyPage() {
  const { page } = useParams<{ page: string }>();
  const meta = pages[page || 'about'];
  const [certs, setCerts] = useState<Certification[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    (async () => {
      if (page === 'certifications' || page === 'about') {
        const c = await fetchCertifications();
        setCerts(c);
      }
      if (page === 'clients' || page === 'about') {
        const cl = await fetchClients();
        setClients(cl);
      }
    })();
  }, [page]);

  if (!meta) {
    return <div className="flex min-h-screen flex-col items-center justify-center bg-navy pt-32 text-center">
      <p className="font-heading text-2xl font-bold text-white">Page not found</p>
    </div>;
  }

  const content = (aboutContent as Record<string, string[]>)[page || 'about'] || [];
  const set = (k: string, v: string) => setContactForm((p) => ({ ...p, [k]: v }));

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    try {
      await submitContact(contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch { setContactStatus('error'); }
  };

  return (
    <>
      <PageMeta
        title={pageMeta[page || 'about']?.title || meta.title}
        description={pageMeta[page || 'about']?.description || meta.tagline}
        keywords={pageMeta[page || 'about']?.keywords}
      />
      <SectionBanner title={meta.title} tagline={meta.tagline} image={meta.image} crumb={meta.title} crumbTo={`/company/${page}`} />

      {/* Content */}
      {content.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-x px-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {content.map((p: string, i: number) => (
                <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="font-body text-base leading-relaxed text-navy/70">{p}</motion.p>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'team' && (
        <section className="bg-navy/5 py-20">
          <div className="container-x px-6">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Our Leadership</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Experienced Leadership and Operations Team</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-body text-base text-navy/70">
                Our team combines manufacturing expertise, project delivery excellence and business development capabilities to support enterprise and institutional furniture requirements.
              </motion.p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-lux bg-white p-6 luxury-shadow">
                  <div className="overflow-hidden rounded-3xl">
                    <img src={member.image} alt={member.name} className="h-56 w-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-heading text-xl font-bold text-navy">{member.name}</h3>
                    <p className="mt-2 font-sub text-sm text-navy/60">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications list */}
      {(page === 'certifications' || page === 'about') && certs.length > 0 && (
        <section className="bg-navy/5 py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Our Certifications</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }} className="flex gap-4 rounded-lux bg-white p-6 luxury-shadow">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Award className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-navy">{c.name}</h3>
                    {c.issuer && <p className="font-sub text-xs text-navy/50">Issued by {c.issuer}</p>}
                    {c.description && <p className="mt-2 font-body text-sm text-navy/60">{c.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients list */}
      {(page === 'clients' || page === 'about') && clients.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-x px-6">
            <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Our Clients</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (i % 5) * 0.05 }} className="flex aspect-[3/2] items-center justify-center rounded-lux bg-navy/5 p-4">
                  <div className="text-center">
                    <p className="font-heading text-sm font-bold text-navy">{c.name}</p>
                    {c.industry && <p className="font-sub text-[10px] text-navy/40">{c.industry}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact form */}
      {page === 'contact' && (
        <section className="bg-white py-20">
          <div className="container-x grid gap-10 px-6 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-black text-navy sm:text-3xl">Get in Touch</h2>
              <p className="mt-4 font-body text-sm text-navy/60">Have a question or need a quote? Fill out the form and our team will respond within 24 hours.</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><MapPin className="h-5 w-5" /></div><div><p className="font-sub text-xs text-navy/50">Address</p><p className="font-sub text-sm text-navy">OPCIEAS Pvt. Ltd., Faridabad, Haryana, India</p></div></div>
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Phone className="h-5 w-5" /></div><div><p className="font-sub text-xs text-navy/50">Contact Person</p><a href="tel:+919845579049" className="font-sub text-sm text-navy hover:text-gold">Ravi • +91 9845579049</a></div></div>
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Mail className="h-5 w-5" /></div><div><p className="font-sub text-xs text-navy/50">Email</p><a href="mailto:opcieas.opcieas4@gmail.com" className="font-sub text-sm text-navy hover:text-gold">opcieas.opcieas4@gmail.com</a></div></div>
              </div>
            </div>
            <div className="rounded-lux bg-navy p-8">
              {contactStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="mb-3 h-12 w-12 text-green-400" />
                  <h3 className="font-heading text-lg font-bold text-white">Message Sent!</h3>
                  <p className="mt-2 font-sub text-sm text-white/60">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setContactStatus('idle')} className="mt-4 rounded-full bg-white/10 px-5 py-2 font-sub text-xs text-white hover:bg-white/20">Send Another</button>
                </div>
              ) : (
                <form onSubmit={submitContactForm} className="space-y-3">
                  <h3 className="font-heading text-xl font-bold text-white">Send a Message</h3>
                  <input required value={contactForm.name} onChange={(e) => set('name', e.target.value)} placeholder="Name *" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                  <input required type="email" value={contactForm.email} onChange={(e) => set('email', e.target.value)} placeholder="Email *" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                  <input value={contactForm.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Phone" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                  <input value={contactForm.subject} onChange={(e) => set('subject', e.target.value)} placeholder="Subject" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                  <textarea required value={contactForm.message} onChange={(e) => set('message', e.target.value)} placeholder="Message *" rows={4} className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                  <button type="submit" disabled={contactStatus === 'loading'} className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
                    {contactStatus === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
                  </button>
                  {contactStatus === 'error' && <p className="text-center font-sub text-xs text-red-400">Something went wrong. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
