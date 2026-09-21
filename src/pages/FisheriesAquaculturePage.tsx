
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Mountain,
  Droplets,
  Utensils,
  Truck,
  Database,
  Users,
  Coins,
  Heart,
  Leaf,
  Sprout,
  Building2,
  Fish,
  Award,
  Landmark,
  TreePine,
  CheckCircle2,
  Scale,
  Sun,
  Home,
  Handshake,
  Globe2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

const STEPS = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Obtain Necessary Licensing',
    desc: 'Secure standard permits and regulatory approvals to ensure full operational compliance.',
    accent: 'from-[#1e3a8a] via-[#0B2745] to-[#071A35]',
  },
  {
    num: '02',
    icon: Mountain,
    title: 'Prepare Suitable Land',
    desc: 'Develop unused or low-yield land into properly designed fish ponds or tank facilities.',
    accent: 'from-[#047857] via-[#059669] to-[#34D399]',
  },
  {
    num: '03',
    icon: Droplets,
    title: 'Establish Water Facilities',
    desc: 'Secure reliable, clean water sources and maintain quality monitoring for optimal stock health.',
    accent: 'from-[#0369a1] via-[#0284c7] to-[#38bdf8]',
  },
  {
    num: '04',
    icon: Utensils,
    title: 'Implement Planned Feeding Systems',
    desc: 'Follow structured feeding schedules to maximize growth rates and reduce operational waste.',
    accent: 'from-[#b45309] via-[#d97706] to-[#f59e0b]',
  },
  {
    num: '05',
    icon: Truck,
    title: 'Manage Harvesting & Marketing',
    desc: 'Time harvests effectively, secure advance local orders, and build direct channels to local and regional buyers.',
    accent: 'from-[#D4AF37] via-[#B8932B] to-[#8B6F1E]',
  },
];

const SELF_RELIANCE_CARDS = [
  {
    icon: Database,
    title: 'Streamlined Digital Data',
    desc: 'Clear record-keeping of pond dimensions, stocking dates, feed usage, harvest dates, and buyer transactions supports transparency and continuous improvement.',
  },
  {
    icon: Users,
    title: 'Community-Led Accountability',
    desc: 'When responsibilities are shared and visible — feeding, maintenance, monitoring, and marketing — discipline improves and the unit builds its own internal checks.',
  },
  {
    icon: Coins,
    title: 'Shared Prosperity',
    desc: 'Cooperative operation allows returns to circulate locally — supporting families, creating secondary jobs, and enabling the community to re-invest in its own growth.',
  },
];

const BENEFIT_CARDS = [
  {
    icon: Handshake,
    title: 'Equal Ownership & Security',
    desc: 'The proposed community-unit model is based on shared ownership and collective responsibility. Participating families contribute effort and share in the outcomes of the operation.',
  },
  {
    icon: Heart,
    title: 'Focus on Essential Needs',
    desc: 'Surplus generated from the unit can support essentials such as nutrition, education, healthcare access, and household needs — reducing vulnerability and strengthening well-being.',
  },
  {
    icon: Leaf,
    title: 'Self-Reliance Over Dependency',
    desc: 'The model is oriented toward building local capacity and ongoing productive activity rather than one-time assistance, so communities earn their own path forward.',
  },
  {
    icon: Award,
    title: 'Health & Lifestyle Renewal',
    desc: 'Reliable access to fresh, nutritious protein supports family health. Regular work routines, cooperative responsibility, and shared progress can also renew community confidence and quality of life.',
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">{children}</p>
  );
}

function SectionTitle({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-navy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className={`mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-gold to-gold-2 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}

export default function FisheriesAquaculturePage() {
  return (
    <div className="bg-white text-navy">
      <PageMeta
        title="Fisheries & Aquaculture | OPCIEAS PVT. LTD."
        description="Explore Fisheries & Aquaculture as a rural livelihood and community development opportunity through planned fish farming, responsible resource management and local market participation."
        keywords="Fisheries, Aquaculture, Fish Farming, Rural Livelihood, Community Development, Agriculture, OPCIEAS, Self Reliance, Cooperative, Pond Farming"
      />

      {/* ============================================================
         SECTION 1 — HERO
         ============================================================ */}
      <header className="relative isolate overflow-hidden bg-navy pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,173,43,0.2),_transparent_40%),linear-gradient(90deg,rgba(7,26,53,0.98),rgba(7,26,53,0.7),rgba(7,26,53,0.45))]" />
        <div className="container-x relative z-10 px-6 pb-14 pt-12 sm:pb-16 lg:pb-20 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl text-white"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-2 backdrop-blur">
              <Link
                to="/social-service"
                className="font-sub text-[11px] uppercase tracking-[0.25em] text-gold-2 transition hover:text-gold"
              >
                Social Services
              </Link>
              <span className="text-gold-2/40">›</span>
              <span className="font-sub text-[11px] uppercase tracking-[0.25em] text-gold-2/80">
                Agriculture
              </span>
              <span className="text-gold-2/40">›</span>
              <span className="font-sub text-[11px] uppercase tracking-[0.25em] text-gold">
                Fisheries & Aquaculture
              </span>
            </div>

            <h1 className="mt-8 font-heading text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
              Fisheries &amp; Aquaculture:
              <br />
              <span className="gold-text">A Modern Livelihood Opportunity</span>
            </h1>

            <p className="mt-7 max-w-3xl font-body text-base leading-relaxed text-white/85 sm:text-lg">
              Live fish farming and aquaculture offer a healthy, reliable, and modern source of nutrition. Unlike processed foods, fresh fish production creates valuable local employment while delivering dependable quality to consumers. With standard licensing, proper land preparation, reliable water sources, and expert guidance, establishing and managing an aquaculture farm is straightforward and highly effective.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#land-transformation"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm"
              >
                Explore the Aquaculture Model <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/social-service"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-sub text-sm text-white transition hover:bg-white/10"
              >
                <Landmark className="h-4 w-4" /> Rural Development Overview
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="h-24 bg-gradient-to-b from-transparent to-white" />
      </header>

      {/* ============================================================
         SECTION 2 — TRANSFORMING LAND INTO SUSTAINABLE VALUE
         ============================================================ */}
      <section
        id="land-transformation"
        className="bg-white py-12 sm:py-16"
        style={{ scrollMarginTop: '100px' }}
      >
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                eyebrow="Land as Productive Capital"
                title="Transforming Land into Sustainable Value"
              />
              <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-navy/75">
                <p>
                  Unused, barren, or low-yield land can be developed into fish ponds or tanks,
                  converting idle acreage into a productive asset. Planned rearing systems turn
                  that potential into a consistent source of activity for the community.
                </p>
                <p>
                  Local teams can manage feeding, harvesting, distribution, tank monitoring and
                  operational discipline. When systems are documented and routines are
                  standardized, operations become predictable and easier to run season after
                  season.
                </p>
                <p>
                  Proximity to local populations creates direct market opportunities for fresh
                  and live fish. As operations mature and quality is maintained, future market
                  and export potential can also be evaluated in a structured manner.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="order-first lg:order-none"
            >
              <div className="relative overflow-hidden rounded-lux border border-navy/10 shadow-sm">
                <div className="grid grid-cols-2 gap-px bg-border-grey">
                  {[
                    { icon: Sprout, label: 'Barren / Low-Yield Land → Productive Ponds' },
                    { icon: Users, label: 'Local Teams Manage Daily Operations' },
                    { icon: Droplets, label: 'Tank Monitoring & Water Discipline' },
                    { icon: Truck, label: 'Local & Future Market Channels' },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 bg-white px-5 py-4"
                    >
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="font-sub text-xs font-medium leading-snug text-navy/80 sm:text-sm">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 3 — DRIVING NATIONAL ECONOMIC GROWTH
         ============================================================ */}
      <section className="bg-light-grey/60 py-12 sm:py-16">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="order-last lg:order-none">
              <div className="relative overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm">
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gold" />
                    <p className="font-sub text-xs uppercase tracking-[0.28em] text-gold">
                      Official Reference
                    </p>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/75">
                    Department of Fisheries Annual Report 2024-25 reports fisheries&rsquo; share
                    at <span className="font-semibold text-navy">7.26% of agricultural GVA for 2022-23</span>
                    {' '}and describes fisheries/aquaculture as an important source of food, nutrition,
                    income and livelihood.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <SectionTitle
                eyebrow="Sector Context"
                title="Driving National Economic Growth"
              />
              <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-navy/75">
                <p>
                  Fisheries and aquaculture are recognised nationally as important sources of
                  food, nutrition, income and livelihood. Activity spanning inland ponds, tanks,
                  reservoirs and coastal areas can support rural households while contributing
                  to the broader agricultural economy.
                </p>
                <p>
                  Well-planned units can create employment across seed supply, feed management,
                  harvesting, logistics, local vending, and downstream processing when the
                  appropriate scale is reached. Participating families gain nutritional benefits
                  alongside income opportunities.
                </p>
                <div className="rounded-lux border border-gold/30 bg-gold/5 p-5">
                  <div className="flex items-start gap-3">
                    <Scale className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p className="font-body text-sm leading-relaxed text-navy/80">
                      Applicable tax treatment should be verified according to the nature, scale
                      and structure of the activity. Licensing, subsidy eligibility, and
                      regulatory requirements should be confirmed with the relevant local and
                      state authorities before beginning operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Fish, label: 'Nutrition & Food Security' },
                  { icon: Coins, label: 'Rural Income & Employment' },
                  { icon: Globe2, label: 'Sector Growth Potential' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-navy/10 bg-white p-4 shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-gold" />
                    <p className="mt-3 font-heading text-sm font-bold text-navy">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 4 — 5 STEPS TO AQUACULTURE SUCCESS
         ============================================================ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-x px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-3xl text-center"
          >
            <Eyebrow>Operational Roadmap</Eyebrow>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-navy sm:text-4xl lg:text-5xl">
              5 Steps to Aquaculture Success
            </h2>
            <div className="mx-auto mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-gold to-gold-2" />
            <p className="mt-6 font-body text-base leading-relaxed text-navy/70">
              A structured sequence helps community units move from planning to disciplined
              production, harvest, and market linkage.
            </p>
          </motion.div>

          <div className="relative mt-10 sm:mt-14">
            <div
              className="absolute left-[22px] top-0 hidden h-full w-[2px] bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2 sm:block sm:-translate-x-1/2"
              aria-hidden="true"
            />
            <div className="space-y-6 sm:space-y-10">
              {STEPS.map(({ num, icon: Icon, title, desc, accent }, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative grid gap-5 sm:grid-cols-2 sm:gap-12"
                  >
                    <div className={`sm:pr-10 ${isEven ? 'sm:text-right' : 'sm:col-start-2 sm:pl-10 sm:order-2'}`}>
                      <div className={`flex items-start gap-4 sm:items-start ${isEven ? 'sm:flex-row-reverse sm:text-right' : ''}`}>
                        <div
                          className={`relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-md sm:h-14 sm:w-14`}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                        </div>
                        <div className={`${isEven ? 'sm:flex sm:flex-col sm:items-end' : ''}`}>
                          <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">
                            Step {num}
                          </p>
                          <h3 className="mt-1 font-heading text-xl font-bold text-navy sm:text-2xl">
                            {title}
                          </h3>
                          <p className="mt-3 font-body text-sm leading-relaxed text-navy/70 sm:text-[15px]">
                            {desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 5 — EMPOWERING SELF-RELIANCE & RURAL GROWTH
         ============================================================ */}
      <section className="bg-light-grey/60 py-12 sm:py-16">
        <div className="container-x px-6">
          <SectionTitle
            eyebrow="Community Development"
            title="Empowering Self-Reliance & Rural Growth"
          />
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-navy/70">
            The community-development concept behind the aquaculture model is built on
            transparent data, local stewardship, and returns that remain in the village.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {SELF_RELIANCE_CARDS.map(({ icon: Icon, title, desc }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-lux border border-navy/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold/15">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-6 font-sub text-[11px] uppercase tracking-[0.3em] text-gold">
                  Pillar 0{i + 1}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold text-navy">{title}</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-navy/70">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 6 — FISHERIES: A MODERN LIVELIHOOD OPPORTUNITY
         ============================================================ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <SectionTitle
                eyebrow="Supplementary Income"
                title="Fisheries: A Modern Livelihood Opportunity"
              />
              <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-navy/75">
                <p>
                  Fish rearing can function as a secondary income activity alongside crop
                  cycles, seasonal employment, and existing household work. For families with
                  access to a small pond or shared community facility, even modest scale can
                  meaningfully add to household earnings.
                </p>
                <p>
                  Fresh and live fish supply responds well to direct local customer delivery.
                  Neighbourhood markets, local vendors, weekly haats, and nearby institutions
                  often prefer consistent, quality-conscious suppliers they can trust.
                </p>
                <p>
                  Rural family participation — in pond preparation, feeding schedules, water
                  checks, harvest coordination and customer liaison — brings nutrition and
                  livelihood together into a single community-level opportunity that can grow
                  with experience.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Secondary income alongside existing work',
                  'Fresh and live fish for local markets',
                  'Rural family participation in daily operations',
                  'Nutrition + livelihood combined',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-navy/10 bg-light-grey p-4"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                    <span className="font-sub text-sm text-navy/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="overflow-hidden rounded-lux border border-navy/10 bg-navy p-8 text-white shadow-sm">
                <Fish className="h-10 w-10 text-gold-2" />
                <p className="mt-6 font-heading text-3xl font-black leading-tight sm:text-4xl">
                  Nutrition &amp; Livelihood
                </p>
                <p className="mt-4 font-sub text-sm text-white/80">
                  From the same pond families can draw food for the table and produce for the
                  market.
                </p>
                <div className="mt-8 grid gap-3">
                  {[
                    ['Protein', 'Daily household nutrition'],
                    ['Employment', 'Seasonal and year-round work'],
                    ['Cash flow', 'Direct local market sales'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="font-heading text-sm font-bold text-gold-2">{k}</span>
                      <span className="font-sub text-xs text-white/80">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 7 — TRANSFORMING LAND THROUGH COOPERATIVE EFFORT
         ============================================================ */}
      <section className="bg-[#edf3ed] py-12 sm:py-16">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <SectionTitle
                eyebrow="Cooperative Operation"
                title="Transforming Land through Cooperative Effort"
              />
              <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-navy/75">
                <p>
                  Barren or underutilized land can be brought into use through relatively
                  simple pond or tank infrastructure, supported by piping and water systems.
                  The capital required per participating family can be substantially lower when
                  construction, equipment and maintenance are shared.
                </p>
                <p>
                  Community operation and collective monitoring allow responsibilities —
                  including early-morning and evening routines — to be distributed. Shared
                  management also plays a practical role in theft prevention through active,
                  regular presence at the site.
                </p>
                <div className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p className="font-body text-sm leading-relaxed text-navy/80">
                      The proposed community-unit model is based on shared ownership and
                      collective responsibility. Participation structures, roles, contributions
                      and entitlements should be discussed, documented and agreed by the
                      participating members before operations begin.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Home, title: 'Simple Pond / Tank Infrastructure' },
              { icon: Droplets, title: 'Piping & Water Systems' },
              { icon: Users, title: 'Community Operation & Monitoring' },
              { icon: ShieldCheck, title: 'Shared Site Presence & Security' },
            ].map(({ icon: Icon, title }, i) => (
              <div
                key={title}
                className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm"
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 font-sub text-[11px] uppercase tracking-[0.28em] text-gold">
                  Element 0{i + 1}
                </p>
                <h3 className="mt-1 font-heading text-base font-bold leading-snug text-navy">
                  {title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 8 — DRIVING ECONOMIC GROWTH & ANCESTRAL WISDOM
         ============================================================ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <SectionTitle
                eyebrow="Broader Vision"
                title="Driving Economic Growth & Ancestral Wisdom"
              />
              <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-navy/75">
                <p>
                  Expanding rural fisheries activity can strengthen community income while
                  preserving the traditional practices and indigenous knowledge that have long
                  guided village life. Where communities retain ancestral know-how about water
                  cycles, seasonal calendars, seeds, and medicinal or food plants, these
                  systems can be held and carried forward alongside newer aquaculture methods.
                </p>
                <p>
                  Cultivation of useful plants around pond boundaries, wholesome food
                  practices, and the protection of time-tested knowledge add value beyond the
                  fish itself — enabling villages to retain their identity, food culture and
                  ecological sensibility while building modern livelihoods.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Traditional practices',
                  'Useful plants & biodiversity',
                  'Wholesome food practices',
                  'Time-tested knowledge',
                  'Seasonal wisdom',
                  'Local food culture',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1.5 font-sub text-[11px] text-navy/80"
                  >
                    <TreePine className="h-3.5 w-3.5 text-gold" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="overflow-hidden rounded-lux border border-navy/10 bg-light-grey shadow-sm">
                <div className="p-6 sm:p-7">
                  <p className="font-body text-[15px] leading-relaxed text-navy/80">
                    Modern livelihood opportunity, rooted in the wisdom and practices passed
                    down through generations of rural life.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 9 — KEY BENEFITS OF THE COMMUNITY UNIT MODEL
         ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-navy/95 py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />
          <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-white/5 blur-[120px] animate-float" />
        </div>

        <div className="container-x relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold-2">
              4 Premium Outcomes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Key Benefits of the Community Unit Model
            </h2>
            <div className="mx-auto mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-gold to-gold-2" />
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {BENEFIT_CARDS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lux border border-white/10 bg-white/5 p-8 backdrop-blur transition-all hover:border-gold/30 hover:bg-white/[0.08]"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-2 ring-1 ring-inset ring-gold/20">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-7 font-sub text-[11px] uppercase tracking-[0.3em] text-gold-2">
                  Benefit 0{i + 1}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white">{title}</h3>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-white/75">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 10 — A MODEL FOR NATIONAL PROSPERITY
         ============================================================ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-x px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-5xl"
          >
            <div className="overflow-hidden rounded-lux border border-gold/30 bg-gradient-to-br from-gold/[0.08] via-white to-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="relative p-8 sm:p-10 lg:p-12">
                  <Sun className="h-10 w-10 text-gold" />
                  <h2 className="mt-6 font-heading text-3xl font-black leading-tight text-navy sm:text-4xl">
                    A Model for National Prosperity
                  </h2>
                  <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-gold to-gold-2" />
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      to="/social-service"
                      className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-3 py-1.5 font-sub text-[11px] text-navy/80 transition hover:border-gold hover:text-gold"
                    >
                      <Building2 className="h-3.5 w-3.5" /> Social Services
                    </Link>
                    <Link
                      to="/community-impact"
                      className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-3 py-1.5 font-sub text-[11px] text-navy/80 transition hover:border-gold hover:text-gold"
                    >
                      <Heart className="h-3.5 w-3.5" /> Community Impact
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gold/20 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                  <p className="font-body text-[15px] leading-relaxed text-navy/80 sm:text-base">
                    The proposed self-sufficient community / family-unit model aims to support
                    rural self-reliance, food security, livelihood creation, cooperative economic
                    activity, community development, and broader rural prosperity.
                  </p>
                  <p className="mt-4 font-body text-[15px] leading-relaxed text-navy/80 sm:text-base">
                    When communities organize, document, and operate productive units with
                    discipline and integrity, the model seeks to demonstrate that dignified
                    livelihoods and local self-sufficiency can be built from within — village by
                    village, family by family.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      'Rural self-reliance',
                      'Food security',
                      'Livelihood creation',
                      'Cooperative economic activity',
                      'Community development',
                      'Broader rural prosperity',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3 shadow-sm"
                      >
                        <Sprout className="h-4 w-4 shrink-0 text-gold" />
                        <span className="font-sub text-sm text-navy/80">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-9 flex flex-wrap gap-4">
                    <Link
                      to="/contact"
                      className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm"
                    >
                      Partner With Us <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/rfq"
                      className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm"
                    >
                      <FileText className="h-4 w-4" /> Send an Inquiry
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

