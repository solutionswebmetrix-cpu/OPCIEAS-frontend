
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Download,
  Droplets,
  FileText,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Landmark,
  Leaf,
  Printer,
  ShieldCheck,
  Sprout,
  Trees,
  Users,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';
import ruralDevelopmentPdf from '../assets/pdf/WEB - RURAL.pdf';
import heroSocialImage from '../assets/Social/inner introduction page.jpg';
import socialImage113 from '../assets/Social/113.jpg';
import socialImage114 from '../assets/Social/114.jpg';
import socialImage117 from '../assets/Social/117.jpg';
import socialImage118 from '../assets/Social/118.jpg';
import socialImage119 from '../assets/Social/119.jpg';
import socialImage120 from '../assets/Social/120.jpg';
import socialImage122 from '../assets/Social/122.jpg';
import socialImage123 from '../assets/Social/123.jpg';
import socialImage124 from '../assets/Social/124.jpg';
import socialImage125 from '../assets/Social/125.jpg';
import socialImage133 from '../assets/Social/133.jpg';
import socialImage141 from '../assets/Social/141.jpg';

const modelIdeas = [
  'shared effort',
  'cooperative farming',
  'water management',
  'green development',
  'education',
  'business',
  'infrastructure',
  'tourism',
  'documentation',
  'transparent management',
];

const keyInsights = [
  'shared effort and planning',
  'productive use of unused government land',
  'unit-based census',
  'cooperative farming',
  'shared water management',
  'reducing basic scarcity',
  'documentation',
  'cultural development',
  'equal ownership rights',
  'transparent management',
  'easier implementation of laws',
  'tourism development',
  'elimination of caste barriers',
];

const chapters = [
  'Author\'s Plea to Rural Communities',
  'Chapter I — The Current State of Rural Areas',
  'Chapter II — The Significance of this Unit System',
  'Chapter III — The Child is the Father of the Man',
  'Chapter IV — Advantage of the Unit System',
  'Chapter V — Thinking Differently',
  'Chapter VI — The Technical Function of A Unit',
  'Chapter VII — Success Behind the Unit',
  'Chapter VIII — Member Selection Process',
  'Chapter IX — The Inferiority Among Many',
  'Chapter X — The Countryside Will Thrive',
  'Chapter XI — The Unit',
  'Chapter XII — The Children\'s Education',
  'Chapter XIII — The Power Of Partnership Business',
  'Chapter XIV — Unconventional Punishment: A Different Approach',
  'Chapter XV — Unit Must Be Business Oriented',
  'Chapter XVI — Many Traps in Rural',
  'Chapter XVII — Reviving Indigenous Businesses',
  'Chapter XVIII — Miscellaneous Income Sources',
  'Chapter XIX — Wind Turbines',
  'Chapter XX — Census',
  'Chapter XXI — The Unit and Its Website',
  'Chapter XXII — Castes Can Be Abolished',
  'Chapter XXIII — Heavenly Earth A Vision for Rural Prosperity',
];

const vignettes = [
  { icon: HeartHandshake, title: 'Social Service – Our Commitment', text: 'A practical and dignified approach to rural development that uplifts communities through unity, shared effort, and long-term opportunity.' },
  { icon: Users, title: 'Empowering Rural Communities', text: 'The focus is not dependency but productive citizenship, family development, dignity, and shared local action.' },
  { icon: ShieldCheck, title: 'Protecting the Vulnerable', text: 'Development must create safety, fairness, and equal opportunity for the most vulnerable members of society.' },
  { icon: Leaf, title: 'Our Vision', text: 'A rural future shaped by self-reliance, honest leadership, education, and transparent local institutions.' },
];

const leadershipPillars = [
  'Shared leadership and inclusive collaboration',
  'Rediscovering the foundations of education',
  'Accountability and integrity',
  'Cultivating a new mindset',
  'A cautionary tale',
  'Empowering through understanding',
];

const heavenlyEarthVisuals = [
  { src: heroSocialImage, alt: 'Heavenly Earth vision cover image for rural prosperity and community development', caption: 'Heavenly Earth – Rural Development Vision' },
  { src: socialImage113, alt: 'Fresh produce and market agriculture representing productive rural livelihoods', caption: 'Rural Livelihoods – Agriculture and Shared Prosperity' },
  { src: socialImage114, alt: 'Green wheat field highlighting sustainable land use and agricultural productivity', caption: 'Agriculture and Land Productivity – Heavenly Earth' },
  { src: socialImage117, alt: 'Rural landscape with farmland and natural beauty supporting community growth', caption: 'Village Prosperity Model – Heavenly Earth' },
  { src: socialImage118, alt: 'Cattle in a rural enclosure showing livestock and livelihood strength in village economies', caption: 'Livestock and Community Enterprise – Rural Development' },
  { src: socialImage119, alt: 'Rolling rural farmland and village surroundings reflecting long-term rural stewardship', caption: 'Rural Landscape – Stewardship and Growth' },
  { src: socialImage120, alt: 'Hilly rural land and cultivated fields showing the living landscape of village development', caption: 'Heavenly Earth – Village Growth and Renewal' },
  { src: socialImage122, alt: 'Agricultural countryside with open fields and natural terrain for rural development planning', caption: 'Rural Development in Practice – Land and Community' },
  { src: socialImage123, alt: 'Green countryside representing the agricultural foundation of rural prosperity', caption: 'Sustainable Rural Future – Heavenly Earth' },
  { src: socialImage124, alt: 'Village field environment illustrating community-led farming and resilient village life', caption: 'Community Farming and Rural Stability' },
  { src: socialImage125, alt: 'Rural landscape and cultivated fields showing the balance of nature, work, and dignity', caption: 'Village Life – Shared Effort and Renewal' },
  { src: socialImage133, alt: 'Open rural terrain and greenery supporting the Heavenly Earth vision for inclusive growth', caption: 'Land, Hope and Rural Transformation' },
  { src: socialImage141, alt: 'Greener countryside view representing long-term prosperity and village well-being', caption: 'Heavenly Earth – A Vision for Greener Rural Prosperity' },
];

function SocialVisualCard({ src, alt, caption, priority = false }: { src: string; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm">
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="h-72 w-full object-cover transition duration-500 hover:scale-[1.02]"
      />
      <figcaption className="border-t border-navy/10 bg-light-grey px-4 py-3 font-body text-sm leading-relaxed text-navy/75">
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-navy sm:text-5xl">{title}</h2>
    </div>
  );
}

export default function SocialServicesPage() {
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  return (
    <div className="bg-white text-navy print-page">
      <PageMeta
        title="Heavenly Earth – A Vision for Rural Prosperity | OPCIEAS"
        description="Heavenly Earth presents a rural development vision focused on self-reliance, community unity, shared effort, education, and dignified social transformation."
        keywords="Rural Development, Social Service, Heavenly Earth, Rural Prosperity, self-reliance, unit system, village development"
      />

      <header className="relative isolate overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,173,43,0.18),_transparent_35%),linear-gradient(90deg,rgba(7,26,53,0.95),rgba(7,26,53,0.6),rgba(7,26,53,0.35))]" />
        <img
          src={heroSocialImage}
          alt="Heavenly Earth rural development cover image showing a prosperous agricultural landscape"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80"
          loading="eager"
          decoding="async"
        />
        <div className="container-x relative z-10 px-6 pb-12 pt-32 sm:px-10 lg:pb-16 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl text-white"
          >
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold-2">RURAL DEVELOPMENT</p>
            <h1 className="mt-6 font-heading text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              HEAVENLY EARTH – A VISION FOR RURAL PROSPERITY
            </h1>
            <p className="mt-6 max-w-3xl font-sub text-lg leading-relaxed text-white/90 sm:text-xl">
              Insights from - Heavenly Earth
            </p>
            <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/80">
              A practical and hopeful vision for rural prosperity built on self-reliance, unity, local leadership, and a united effort to restore dignity, opportunity, and shared progress.
            </p>
          </motion.div>
        </div>
      </header>

      <main>
        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Our Commitment" title="Social Service – Our Commitment" />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {vignettes.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-lux border border-navy/10 bg-light-grey p-7 shadow-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#edf3ed] py-12 sm:py-16">
          <div className="container-x grid gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionTitle eyebrow="Rural Empowerment" title="Empowering Rural Communities" />
            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-lux bg-white p-6 shadow-sm">
                <Users className="h-7 w-7 text-gold" />
                <h3 className="mt-5 font-heading text-xl font-bold text-navy">Shared effort</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">
                  Rural transformation grows when families, communities, and local institutions work together with discipline and concern for the common good.
                </p>
              </article>
              <article className="rounded-lux bg-navy p-6 text-white shadow-sm">
                <Sprout className="h-7 w-7 text-gold-2" />
                <h3 className="mt-5 font-heading text-xl font-bold">Self-reliance</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/75">
                  It is not about dependency; it is about strengthening local capacity, dignity, and long-term responsibility.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x grid gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionTitle eyebrow="Responsibility and Transformation" title="Responsibility and Transformation" />
            <div className="grid gap-3 sm:grid-cols-2">
              {['Legal awareness', 'Formal organization', 'Fair support', 'Trust', 'Hard work', 'Equality', 'Responsible citizenship', 'Dignity'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-navy/10 bg-light-grey p-4 font-sub text-sm text-navy">
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-12 text-white sm:py-16">
          <div className="container-x grid gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionTitle eyebrow="Protection and Inclusion" title="Protecting the Vulnerable" />
            <div className="grid gap-5 sm:grid-cols-2">
              {['Dignity', 'Safety', 'Fairness', 'Protection', 'Legal safeguards', 'Shared responsibility'].map((item) => (
                <div key={item} className="rounded-lux border border-white/15 bg-white/5 p-6">
                  <ShieldCheck className="h-6 w-6 text-gold-2" />
                  <h3 className="mt-4 font-heading text-lg font-bold">{item}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/70">
                    Rural development must protect people across all economic levels and strengthen the dignity of every family.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8f4ea] py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Our Vision" title="Our Vision" />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {['Rural workers', 'Skilled labourers', 'Striving communities', 'Honest practices', 'Equality', 'Self-reliance', 'Dignity', 'Unity'].map((item) => (
                <div key={item} className="border-b border-gold/40 py-5 font-heading text-xl font-bold text-navy">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x grid gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <SectionTitle eyebrow="Self-Reliance, Not Dependency" title="Rural Empowerment" />
            <div className="space-y-5 font-body text-lg leading-relaxed text-navy/75">
              <p>Handouts provide short-term survival. Sustainable progress is built through self-earned prosperity, practical skills, and collective effort.</p>
              <p>When families are empowered to produce, own, and manage resources responsibly, communities become stronger, more resilient, and more hopeful.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#edf3ed] py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="200-Family Township Model" title="200-Family Township Model" />
            <div className="mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-lux bg-navy p-8 text-white shadow-lg">
                <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold-2">Unit Model</p>
                <p className="mt-7 font-heading text-6xl font-black">200</p>
                <p className="font-sub text-base text-white/75">families</p>
                <p className="mt-6 font-heading text-3xl font-bold">approximately 1,000</p>
                <p className="font-sub text-base text-white/75">individuals</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {modelIdeas.map((item, index) => (
                  <article key={item} className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
                    <span className="font-sub text-xs uppercase tracking-[0.25em] text-gold">0{index + 1}</span>
                    <h3 className="mt-4 font-heading text-lg font-bold text-navy">{item}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="The Power of Unity" title="The Power of Unity" />
            <div className="mt-12 grid gap-5 lg:grid-cols-4">
              {[
                { icon: Droplets, title: 'Water management', text: 'Shared systems lead to better access and stewardship.' },
                { icon: Sprout, title: 'Cooperative farming', text: 'Productive land use supports food security and livelihoods.' },
                { icon: Trees, title: 'Green development', text: 'A healthier rural environment strengthens quality of life.' },
                { icon: Building2, title: 'Infrastructure', text: 'Planning and governance support durable local growth.' },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-lux border border-navy/10 bg-light-grey p-6">
                  <Icon className="h-8 w-8 text-gold" />
                  <h3 className="mt-5 font-heading text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ea] py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Key Principles & Insights" title="Key Principles & Insights" />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {keyInsights.map((item, index) => (
                <article key={item} className="rounded-lux border border-navy/10 bg-white p-5 shadow-sm">
                  <span className="font-sub text-[10px] uppercase tracking-[0.28em] text-gold">0{index + 1}</span>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/80">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-12 text-white sm:py-16">
          <div className="container-x grid gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-lux border border-white/15 bg-white/5 p-8">
              <div className="flex h-48 items-center justify-center rounded-lux border border-dashed border-white/15 bg-white/5">
                <div className="text-center">
                  <BookOpen className="mx-auto h-10 w-10 text-gold-2" />
                  <p className="mt-5 font-heading text-2xl font-black text-white">HEAVENLY EARTH</p>
                  <p className="mt-2 font-sub text-xs uppercase tracking-[0.25em] text-white/70">A Vision for Rural Prosperity</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold-2">Heavenly Earth Book</p>
              <h2 className="mt-4 font-heading text-3xl font-black sm:text-5xl">HEAVENLY EARTH</h2>
              <p className="mt-3 font-sub text-lg text-white/85">A VISION FOR RURAL PROSPERITY</p>
              <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/75">
                The book presents a practical rural development vision rooted in dignity, self-reliance, shared leadership, education, and meaningful community transformation.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Self-reliance, not dependency', 'Shared leadership', 'Unit-based planning', 'Education and culture'].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-white/15 bg-white/5 p-4 font-sub text-sm text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="23 Chapters" title="Content From My Book – Heavenly Earth – A Vision for Rural Prosperity" />
            <div className="mt-10 divide-y divide-navy/10 rounded-lux border border-navy/10 bg-light-grey/60">
              {chapters.map((chapter, index) => (
                <div key={chapter} className="px-4 sm:px-6">
                  <button
                    type="button"
                    aria-expanded={openChapter === index}
                    onClick={() => setOpenChapter(openChapter === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-sub text-sm font-semibold text-navy sm:text-base"
                  >
                    <span>{chapter}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${openChapter === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openChapter === index && (
                    <div className="pb-5 pr-8 font-body text-sm leading-relaxed text-navy/70">
                      {chapter}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ea] py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Heavenly Earth Visuals" title="Rural prosperity through land, community and stewardship" />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {heavenlyEarthVisuals.map((visual, index) => (
                <SocialVisualCard key={`${visual.caption}-${index}`} src={visual.src} alt={visual.alt} caption={visual.caption} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="A Call to Unity" title="A Call to Unity" />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-lux border border-navy/10 bg-light-grey p-7">
                <p className="font-body text-base leading-relaxed text-navy/75">
                  The village is not built by isolated efforts. It is built by unity, shared planning, and a collective willingness to solve local problems with honesty and courage.
                </p>
              </div>
              <div className="rounded-lux border border-gold/30 bg-gold/5 p-7">
                <p className="font-body text-base leading-relaxed text-navy/75">
                  Shared leadership and inclusive collaboration are essential to building a strong rural future rooted in equal ownership, fairness, and accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#edf3ed] py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="A Call to Action" title="A Call to Action" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                'Transformation is collective',
                'Holding fast to hope',
                'Shared leadership and inclusive collaboration',
                'Rediscovering the foundations of education',
                'Accountability and integrity',
                'Cultivating a new mindset',
              ].map((item) => (
                <article key={item} className="rounded-lux bg-white p-6 shadow-sm">
                  <Check className="h-5 w-5 text-gold" />
                  <h3 className="mt-4 font-heading text-xl font-bold text-navy">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Leadership & Reform" title="Shared Leadership and Inclusive Collaboration" />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {leadershipPillars.map((item) => (
                <div key={item} className="rounded-lux border border-navy/10 bg-light-grey p-6">
                  <p className="font-body text-base leading-relaxed text-navy/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ea] py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Education and Accountability" title="Rediscovering the Foundations of Education" />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-lux border border-navy/10 bg-white p-7">
                <GraduationCap className="h-8 w-8 text-gold" />
                <h3 className="mt-5 font-heading text-2xl font-black text-navy">Education as a foundation</h3>
                <p className="mt-4 font-body text-base leading-relaxed text-navy/75">
                  Education is not only academic. It is about character, discipline, practical wisdom, responsibility, and the capacity to build a better future.
                </p>
              </article>
              <article className="rounded-lux border border-navy/10 bg-white p-7">
                <Landmark className="h-8 w-8 text-gold" />
                <h3 className="mt-5 font-heading text-2xl font-black text-navy">Accountability and integrity</h3>
                <p className="mt-4 font-body text-base leading-relaxed text-navy/75">
                  Transparent management and honest leadership are essential for trust, fairness, and the confident growth of every rural community.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="A New Mindset" title="Cultivating a New Mindset" />
            <div className="mt-10 rounded-lux border border-gold/30 bg-gold/5 p-8">
              <p className="font-body text-lg leading-relaxed text-navy/80">
                The future requires a new mindset: one that values shared effort, local ownership, practical action, and the courage to move beyond old patterns of inequality, passivity, or dependency.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy py-12 text-white sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Cautionary Reflection" title="A Cautionary Tale" />
            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-lux border border-white/15 bg-white/5 p-7">
                <p className="font-body text-base leading-relaxed text-white/80">
                  When communities lose direction, hope, or accountability, it becomes harder to build a future of dignity and prosperity. Transformation must be guided by wisdom, responsibility, and honest leadership.
                </p>
              </div>
              <div className="rounded-lux border border-gold/40 bg-gold/10 p-7">
                <p className="font-body text-base leading-relaxed text-navy/80">
                  Empowering through understanding is the bridge between despair and renewal. It means seeing people clearly, preparing them for responsibility, and helping them act with confidence and purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="container-x px-6">
            <SectionTitle eyebrow="Final Call" title="Empowering Through Understanding" />
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {[
                { icon: HandCoins, title: 'Self-reliance', text: 'Local effort creates lasting strength.' },
                { icon: HeartHandshake, title: 'Unity', text: 'Collective action transforms communities.' },
                { icon: FileText, title: 'Documentation', text: 'Clear records make governance and progress possible.' },
                { icon: Check, title: 'Hope', text: 'A credible future is possible when people work together.' },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-lux border border-navy/10 bg-light-grey p-6">
                  <Icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-5 font-heading text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-navy via-navy-2 to-navy/95 py-12 text-white sm:py-16">
          <div className="container-x px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
              <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold-2">Final CTA</p>
              <h2 className="mt-5 font-heading text-3xl font-black sm:text-5xl">A vision for rural prosperity begins with collective action.</h2>
              <p className="mt-5 font-body text-lg leading-relaxed text-white/80">
                The path is clear: shared effort, honest leadership, education, transparent systems, and a commitment to dignity for every family and every village.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a href={ruralDevelopmentPdf} download className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
                  <Download className="h-4 w-4" /> Download Full Rural Development PDF
                </a>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-sub text-sm text-white transition hover:bg-white hover:text-navy">
                  <Printer className="h-4 w-4" /> Print This Page
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
