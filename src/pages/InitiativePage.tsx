import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Building2, Factory } from 'lucide-react';
import SectionBanner from '../components/SectionBanner';
import InquiryForm from '../components/InquiryForm';
import PageMeta from '../components/PageMeta';

const initiatives: Record<string, { title: string; tagline: string; intro: string; highlights: string[]; links: { label: string; to: string }[]; image: string; }> = {
  'tech-business-promotion': {
    title: 'Tech Business Promotion',
    tagline: 'Digital growth for modern furniture, infrastructure and enterprise brands',
    intro: 'OPCIEAS supports technology-led business growth through brand visibility, high-value project outreach, export promotion and digital engagement for B2B buyers, architects and institutional procurement teams.',
    highlights: [
      'Digital outreach for government tenders, corporate procurement and institutional partnerships.',
      'Product marketing content tailored for architects, facility managers and project consultants.',
      'Lead generation support for export enquiries, distributor onboarding and public sector engagement.',
    ],
    links: [
      { label: 'View Products', to: '/products' },
      { label: 'Explore Industries', to: '/industries/government' },
      { label: 'Company Profile', to: '/company/about' },
    ],
    image: '/src/assets/Office Furniture.png',
  },
  'agriculture-aquaculture': {
    title: 'Agriculture & Aquaculture',
    tagline: 'Practical infrastructure and robust furniture solutions for rural and agri-business ecosystems',
    intro: 'Our business outreach extends to agriculture, aquaculture and community infrastructure where durable furniture, storage systems and work-ready environments improve safety, efficiency and long-term operations.',
    highlights: [
      'Reliable institutional furniture for training centres, agri-clinics and co-operative facilities.',
      'Storage, shelving and utility furniture for warehousing, cold-chain and farm support units.',
      'Custom solutions for rural development programs, community centres and farmer support spaces.',
    ],
    links: [
      { label: 'Explore Storage Systems', to: '/products/industrial-storage' },
      { label: 'View Export Capability', to: '/industries/export' },
      { label: 'CSR & Rural Empowerment', to: '/initiatives/social-services-rural-empowerment' },
    ],
    image: '/src/assets/Warehouse Racks.png',
  },
  'social-services-rural-empowerment': {
    title: 'Social Services & Rural Empowerment',
    tagline: 'Supporting inclusive growth through practical infrastructure and community-oriented solutions',
    intro: 'OPCIEAS contributes to community development by supporting social service programs, rural capacity building and public-facing spaces that require durable furniture and dependable infrastructure.',
    highlights: [
      'Furniture for community centres, training halls, schools and rural outreach programmes.',
      'Support for social-service partners with scalable procurement and long-life installations.',
      'Operational support for public welfare projects and rural institutional spaces.',
    ],
    links: [
      { label: 'About OPCIEAS', to: '/company/about' },
      { label: 'View Careers', to: '/company/careers' },
      { label: 'Explore CSR', to: '/company/csr' },
    ],
    image: '/src/assets/Educational Furniture.png',
  },
};

export default function InitiativePage() {
  const { slug } = useParams<{ slug: string }>();
  const page = initiatives[slug || ''];

  if (!page) {
    return <div className="flex min-h-screen items-center justify-center bg-navy"> <p className="font-heading text-xl font-bold text-white">Page not found</p></div>;
  }

  return (
    <>
      <PageMeta title={`${page.title} | OPCIEAS`} description={`${page.intro} Discover how OPCIEAS supports growth through durable furniture, institutional partnerships and export-ready solutions.`} keywords={`${page.title}, OPCIEAS, furniture, business promotion, CSR, agriculture`} image={page.image} schema={{ '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.intro }} />
      <SectionBanner title={page.title} tagline={page.tagline} image={page.image} crumb={page.title} crumbTo={`/initiatives/${slug}`} />

      <section className="bg-white py-20">
        <div className="container-x grid gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-sub text-sm uppercase tracking-[0.3em] text-gold">OPCIEAS Initiatives</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Purpose-built growth for public, social and enterprise programs</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-navy/70">{page.intro}</p>
          </motion.div>
          <div className="rounded-lux bg-navy/5 p-8">
            <h3 className="font-heading text-xl font-bold text-navy">What this program delivers</h3>
            <ul className="mt-5 space-y-3">
              {page.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-navy/70"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy/5 py-20">
        <div className="container-x px-6">
          <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Explore Related OPCIEAS Pages</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {page.links.map((link) => (
              <Link key={link.to} to={link.to} className="group rounded-lux border border-navy/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold"><Building2 className="h-5 w-5" /></div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{link.label}</h3>
                <p className="mt-2 font-body text-sm text-navy/60">Continue exploring OPCIEAS solutions and strategic initiatives.</p>
                <span className="mt-4 inline-flex items-center gap-2 font-sub text-sm text-gold">Learn more <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl rounded-lux bg-navy p-8 text-white">
            <div className="flex items-center gap-3 text-gold"><Factory className="h-5 w-5" /><span className="font-sub text-sm uppercase tracking-[0.3em]">Inquiry</span></div>
            <h2 className="mt-4 font-heading text-2xl font-black sm:text-3xl">Start a conversation with OPCIEAS</h2>
            <p className="mt-3 font-body text-sm text-white/60">Tell us about your project, institution or outreach program and our team will respond with relevant furniture and infrastructure recommendations.</p>
            <div className="mt-8"><InquiryForm category={page.title} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
