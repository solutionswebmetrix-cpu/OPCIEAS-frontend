import { motion } from 'framer-motion';
import {
  Cpu,
  Building2,
  Heart,
  ArrowRight,
  Shield,
  Eye,
  Scale,
  Handshake,
  Network,
  Ship,
  Award,
  Factory,
  Warehouse,
  Sofa,
  FileText,
  Fish,
  Leaf,
  Sun,
  Users,
  TreePine,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMG } from '../lib/images';

/* ============================================================
   TECH BUSINESS PROMOTION — BANNER / NARRATION / CONTENT
   ============================================================ */

const TECH_PILLARS = [
  { icon: Shield, title: 'Portal Governance', desc: 'Structured, rule-based digital portals with controlled access, audit trails, and transparent workflows for institutions and enterprises.' },
  { icon: Factory, title: 'Industrial Promotion', desc: 'Industry-grade platforms that connect manufacturers, vendors, and buyers with verified credentials, tender workflows, and procurement pipelines.' },
  { icon: Eye, title: 'Transparency', desc: 'Every transaction, document, and approval is documented and accessible. Open processes build confidence across every stakeholder.' },
  { icon: Handshake, title: 'Trust', desc: 'Trust is engineered through accountability. Verified identities, documented commitments, and compliance-first operations underpin every platform.' },
  { icon: Scale, title: 'Compliance', desc: 'Adherence to MCA norms, GST standards, data privacy, and sector-specific regulations — non-negotiable, documented, and auditable.' },
  { icon: Network, title: 'Business Networking', desc: 'Curated ecosystems of buyers, sellers, service providers, and industry peers. Connections that are verified, relevant, and growth-oriented.' },
  { icon: Ship, title: 'Export Promotion', desc: 'Export-ready documentation, IEC-linked profiles, cross-border trade enablement, and global buyer connectivity for Indian manufacturers.' },
  { icon: Award, title: 'Quality Standards', desc: 'Quality benchmarks aligned with ISO, BIS, NSIC, and international norms. Platforms that reward and surface certified excellence.' },
];

/* ============================================================
   FURNITURE & TEXTILES — BANNER / NARRATION / CONTENT
   ============================================================ */

const FURNITURE_PILLARS = [
  { icon: Building2, title: 'Institutional Furniture', desc: 'Government offices, educational campuses, hospitals, hostels, and public institutions — every piece engineered for heavy daily use, tender-compliant dimensions, and certified lifespan.' },
  { icon: Sparkles, title: 'FRP Furniture', desc: 'Fibre-reinforced polymer furniture designed for outdoor, coastal, and high-moisture environments. Rust-free, colourfast, and structurally robust.' },
  { icon: Warehouse, title: 'Steel Furniture', desc: 'Powder-coated CR / MS steel furniture — racks, lockers, cabinets, workbenches, and storage systems. Heavy-gauge, precision-welded, and tender-ready.' },
  { icon: Sofa, title: 'Textiles', desc: 'Premium upholstery, furnishing fabrics, curtains, mattresses, and textile accessories — coordinated for complete institutional and hospitality interiors.' },
  { icon: FileText, title: 'Bundled Furnishing Solutions', desc: 'One-point turnkey packages — furniture + textiles + storage + seating — delivered, installed, and documented. Single vendor, single responsibility, single invoice.' },
  { icon: Shield, title: 'Eliminating Substandard Products', desc: 'Zero tolerance for short-cuts. No ungraded steel, no untested plywood, no substandard hardware. Every component is specified, sourced, and inspected.' },
  { icon: Ship, title: 'Export Ready Products', desc: 'ISPM-15 compliant packaging, metric sizing, export documentation, and international finishing. Products engineered for containerisation and long-haul logistics.' },
];

/* ============================================================
   SOCIAL SERVICES — BANNER / NARRATION / CONTENT
   (Exact narration preserved — do NOT rewrite meaning)
   ============================================================ */

const SOCIAL_EXACT_NARRATION = `OPCIEAS Social Services division is dedicated to community-led, sustainable development. We believe in empowering people through Self Help Groups that build savings, entrepreneurship, and financial independence at the grassroots. Village Development initiatives are designed to upgrade local infrastructure, water access, sanitation, and shared community spaces through participatory planning and accountable execution. Solar Adoption programmes bring clean, reliable electricity to households, schools, micro-enterprises and community centres — reducing energy poverty, lowering long-term costs, and advancing India's renewable energy vision. Aquaculture and Fisheries initiatives support inland and coastal communities with technical guidance, quality inputs, market linkages, and sustainable harvesting practices to protect livelihoods and aquatic ecosystems. Elder Lifestyle programmes are built around dignity, companionship, and accessible wellness — creating environments where senior citizens live with security, comfort, and continued participation in community life. Every intervention is measured by its ability to deliver Sustainable Prosperity: outcomes that are socially just, economically viable, and ecologically regenerative for generations to come.`;

const SOCIAL_PILLARS = [
  { icon: Users, title: 'Self Help', desc: 'SHG formation, savings discipline, micro-enterprise enablement, and financial literacy that empower women and grassroots collectives.' },
  { icon: Leaf, title: 'Village Development', desc: 'Participatory planning for rural infrastructure, water and sanitation, community buildings, and livelihood support systems.' },
  { icon: Sun, title: 'Solar Adoption', desc: 'Rooftop solar, off-grid systems, street lighting, and solar-powered community centres for clean energy access everywhere.' },
  { icon: Fish, title: 'Aquaculture', desc: 'Inland fish farming, pond management, quality seed supply, feed technology, and training for farmer-producer groups.' },
  { icon: Fish, title: 'Fisheries', desc: 'Coastal fisheries, safe harvest practices, cold chain linkages, and market access for fishing communities.' },
  { icon: Heart, title: 'Elder Lifestyle', desc: 'Dignified living, wellness programmes, companionship, accessible infrastructure, and age-friendly community design.' },
  { icon: TreePine, title: 'Sustainable Prosperity', desc: 'Every outcome must be socially equitable, economically viable, and ecologically regenerative — today, tomorrow, and for the next generation.' },
];

/* ============================================================
   SHARED SECTION COMPONENT
   ============================================================ */

interface DivisionProps {
  id: string;
  tag: string;
  name: string;
  tagline: string;
  narration: string;
  icon: typeof Cpu;
  image: string;
  accent: string;
  linkTo: string;
  pillars: Array<{ icon: any; title: string; desc: string }>;
  index: number;
  narrationScopeClass?: string;
}

function DivisionSection({
  id,
  tag,
  name,
  tagline,
  narration,
  icon: Icon,
  image,
  accent,
  linkTo,
  pillars,
  index,
  narrationScopeClass,
}: DivisionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={id}
      style={{ scrollMarginTop: '100px' }}
      className={`relative overflow-hidden ${isEven ? 'bg-white' : 'bg-navy/[0.03]'}`}
    >
      {/* Banner */}
      <div className="relative overflow-hidden bg-navy">
        <div className="pointer-events-none absolute inset-0">
          <img src={image} alt={name} className="h-full w-full object-cover opacity-25" loading="lazy" />
          <div className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
        </div>
        <div className="container-x relative z-10 px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full glass px-4 py-2">
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-sub text-xs uppercase tracking-[0.3em] text-white/80">{tag}</span>
            </div>
            <h2 className="mt-6 font-heading text-4xl font-black leading-tight text-white sm:text-5xl xl:text-6xl">
              {name}
            </h2>
            <p className="mt-4 font-sub text-lg text-white/85">{tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Narration + Pillars */}
      <div className="container-x px-6 py-20 text-navy sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Narration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={narrationScopeClass}
          >
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Narration</p>
            <h3 className="furniture-section-heading mt-3 font-heading text-2xl font-black text-navy sm:text-3xl">
              About the Division
            </h3>
            <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-gold to-gold-2" />
            <p className="furniture-section-copy mt-8 font-body text-[15px] leading-[1.95] text-navy whitespace-pre-line">
              {narration}
            </p>
            <Link
              to={linkTo}
              className="mt-10 inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 font-sub text-sm"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Pillars Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Core Focus Areas</p>
            <h3 className="mt-3 font-heading text-2xl font-black text-white sm:text-3xl">
              Key Pillars
            </h3>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {pillars.map((p, i) => {
                const PI = p.icon as any;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md"
                  >
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white`}>
                      <PI className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4 className="mt-4 font-heading text-base font-bold text-navy">{p.title}</h4>
                    <p className="mt-2 font-body text-sm leading-relaxed text-navy/80">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRIMARY EXPORT
   ============================================================ */

export default function ThreeDivisions() {
  return (
    <div className="divide-y divide-navy/5">
      {/* 1. TECH BUSINESS PROMOTION */}
      <DivisionSection
        id="division-tech"
        tag="Division 01"
        name="Tech Business Promotion"
        tagline="Portal Governance • Industrial Promotion • Transparency • Trust • Compliance • Networking • Export Promotion • Quality Standards"
        narration={`OPCIEAS Tech Business Promotion division builds the connective tissue between industry, governance, and markets. We design digital platforms and institutional frameworks anchored in Portal Governance — access-controlled, auditable, and rule-based environments where stakeholders interact with confidence. Our Industrial Promotion programmes surface verified manufacturers, showcase capacity, and create procurement pathways that are fair, competitive, and efficient. Transparency is not an afterthought; it is engineered into every workflow. Trust is earned through documented compliance, consistent delivery, and accountability at every touchpoint. We ensure Compliance with MCA, GST, data protection, export-import regulations, and sector-specific statutory requirements. Our Business Networking ecosystems bring together buyers, sellers, financiers, and sector experts around shared standards and verified credentials. Export Promotion platforms enable Indian manufacturers to reach international buyers with IEC-linked profiles, export-ready documentation, and global quality alignment. Every platform, every portal, every promotion programme is built to elevate and enforce Quality Standards that India can stand behind.`}
        icon={Cpu}
        image={IMG.heroBg}
        accent="from-[#4A90E2] via-[#2563EB] to-[#1E3A8A]"
        linkTo="/technology"
        pillars={TECH_PILLARS}
        index={0}
      />

      {/* 2. FURNITURE & TEXTILES */}
      <DivisionSection
        id="division-furniture"
        tag="Division 02"
        name="Furniture & Textiles"
        tagline="Institutional Furniture • FRP • Steel • Textiles • Bundled Furnishing Solutions • Export Ready"
        narration={`OPCIEAS Furniture & Textiles division is a premium manufacturing force built on institutional-grade quality, certified materials, and turnkey delivery. We are the trusted source for Institutional Furniture — desks, benches, storage, seating, and interiors built for schools, colleges, hospitals, offices, hostels, and public buildings that see heavy daily use. Our FRP Furniture range addresses outdoor, coastal, and high-moisture environments where steel and wood cannot deliver the same corrosion-free lifespan. Our Steel Furniture line — racks, lockers, cabinets, workbenches, storage systems — is fabricated from heavy-gauge steel, precision welded, and powder-coated to exacting standards. Our Textiles practice coordinates premium upholstery, furnishing fabrics, curtains, mattress systems, and soft furnishing accessories into cohesive interior packages. Our Bundled Furnishing Solutions simplify procurement for large projects: one partner, one specification, one delivery, one installation, one invoice, and one point of accountability. Above all, we are committed to Eliminating Substandard Products from the supply chain. No ungraded steel, no untested boards, no short-cuts on hardware or finish. Every piece leaving our facility is Export Ready — metric-sized, ISPM-15 packaged, documented for customs, and finished to international quality benchmarks.`}
        icon={Building2}
        image={IMG.products['Office Furniture'].img}
        accent="from-[#D4AF37] via-[#B8932B] to-[#8B6F1E]"
        linkTo="/furniture"
        pillars={FURNITURE_PILLARS}
        index={1}
        narrationScopeClass="furniture-textiles-about"
      />

      {/* 3. SOCIAL SERVICES */}
      <DivisionSection
        id="division-social"
        tag="Division 03"
        name="Social Services"
        tagline="Self Help • Village Development • Solar Adoption • Aquaculture • Fisheries • Elder Lifestyle • Sustainable Prosperity"
        narration={SOCIAL_EXACT_NARRATION}
        icon={Heart}
        image={IMG.gallery[4]?.src || IMG.heroBg}
        accent="from-[#34D399] via-[#059669] to-[#047857]"
        linkTo="/social-services"
        pillars={SOCIAL_PILLARS}
        index={2}
      />
    </div>
  );
}

/* ============================================================
   NAMED EXPORTS FOR REUSE ON DEDICATED PAGES
   ============================================================ */

export {
  TECH_PILLARS,
  FURNITURE_PILLARS,
  SOCIAL_PILLARS,
  SOCIAL_EXACT_NARRATION,
};

export const TECH_OVERVIEW = {
  narration: `OPCIEAS Tech Business Promotion division builds the connective tissue between industry, governance, and markets. We design digital platforms and institutional frameworks anchored in Portal Governance — access-controlled, auditable, and rule-based environments where stakeholders interact with confidence. Our Industrial Promotion programmes surface verified manufacturers, showcase capacity, and create procurement pathways that are fair, competitive, and efficient. Transparency is not an afterthought; it is engineered into every workflow. Trust is earned through documented compliance, consistent delivery, and accountability at every touchpoint. We ensure Compliance with MCA, GST, data protection, export-import regulations, and sector-specific statutory requirements. Our Business Networking ecosystems bring together buyers, sellers, financiers, and sector experts around shared standards and verified credentials. Export Promotion platforms enable Indian manufacturers to reach international buyers with IEC-linked profiles, export-ready documentation, and global quality alignment. Every platform, every portal, every promotion programme is built to elevate and enforce Quality Standards that India can stand behind.`,
  tagline: 'Portal Governance • Industrial Promotion • Transparency • Trust • Compliance • Networking • Export Promotion • Quality Standards',
};

export const FURNITURE_OVERVIEW = {
  narration: `OPCIEAS Furniture & Textiles division is a premium manufacturing force built on institutional-grade quality, certified materials, and turnkey delivery. We are the trusted source for Institutional Furniture — desks, benches, storage, seating, and interiors built for schools, colleges, hospitals, offices, hostels, and public buildings that see heavy daily use. Our FRP Furniture range addresses outdoor, coastal, and high-moisture environments where steel and wood cannot deliver the same corrosion-free lifespan. Our Steel Furniture line — racks, lockers, cabinets, workbenches, storage systems — is fabricated from heavy-gauge steel, precision welded, and powder-coated to exacting standards. Our Textiles practice coordinates premium upholstery, furnishing fabrics, curtains, mattress systems, and soft furnishing accessories into cohesive interior packages. Our Bundled Furnishing Solutions simplify procurement for large projects: one partner, one specification, one delivery, one installation, one invoice, and one point of accountability. Above all, we are committed to Eliminating Substandard Products from the supply chain. No ungraded steel, no untested boards, no short-cuts on hardware or finish. Every piece leaving our facility is Export Ready — metric-sized, ISPM-15 packaged, documented for customs, and finished to international quality benchmarks.`,
  tagline: 'Institutional Furniture • FRP • Steel • Textiles • Bundled Furnishing Solutions • Export Ready',
};
