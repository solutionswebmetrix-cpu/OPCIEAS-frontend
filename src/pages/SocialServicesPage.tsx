
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Check, ChevronDown, Droplets, Globe2, Handshake, Home, Leaf,
  Scale, ShieldCheck, Sprout, Users,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';

const ruralHeroImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85';

const philosophy = [
  ['Industry', 'Commerce', 'Agriculture', 'Social Service'],
  ['Meaningful human aid', 'Self-reliance', 'Joint effort', 'Rural prosperity'],
  ['Unity', 'Dignity', 'Fairness', 'Responsible citizenship'],
];

const townshipOutcomes = [
  'Land turns fertile and green',
  'Education, local business and trade flourish',
  'Resource scarcities are systematically solved',
  'Villages evolve into self-sustained townships with modern housing, local shops and infrastructure',
];

const townshipImpact = [
  { icon: Droplets, title: 'Water Management', text: 'A practical part of the 200-family township model.' },
  { icon: Sprout, title: 'Cooperative Farming', text: 'A shared approach within structured rural development.' },
  { icon: Leaf, title: 'Green Infrastructure', text: 'Supporting fertile, green surroundings and modern infrastructure.' },
  { icon: Globe2, title: 'Cultural Tourism', text: 'One of the principles presented in Heavenly Earth.' },
];

const insights = [
  ['Family Planning', 'A principle from the Heavenly Earth vision.'],
  ['Land Recovery', 'A principle for rural development.'],
  ['Unit Census System', 'A structured system presented in the book.'],
  ['Water & Food Security', 'A foundation of the township model.'],
  ['Cultural Tourism', 'A way the model connects place and community.'],
  ['Proper Documentation', 'A principle for organized rural development.'],
];

const chapters = [
  'Chapter I: The Current State of Rural Areas', 'Chapter II: The Significance of This Unit System',
  'Chapter III: The Child is the Father of the Man', 'Chapter IV: Advantages of the Unit System',
  'Chapter V: Thinking Differently', 'Chapter VI: The Technical Function of a Unit',
  'Chapter VII: The Success Behind the Unit', 'Chapter VIII: Member Selection Process',
  'Chapter IX: Overcoming Inferiority', 'Chapter X: The Countryside Will Thrive',
  'Chapter XI: The Unit', 'Chapter XII: Children’s Education',
  'Chapter XIII: The Power of Partnership Business', 'Chapter XIV: Unconventional Punishment: A Different Approach',
  'Chapter XV: Making the Unit Business-Oriented', 'Chapter XVI: Traps to Avoid in Rural Development',
  'Chapter XVII: Reviving Indigenous Businesses', 'Chapter XVIII: Miscellaneous Income Sources',
  'Chapter XIX: Harnessing Wind Energy', 'Chapter XX: The Unit Census',
  'Chapter XXI: The Unit and Its Website', 'Chapter XXII: Abolishing Caste Barriers',
  'Chapter XXIII: Heavenly Earth – A Vision for Rural Prosperity',
];

const excerpts = [
  ['A Call to Unity', 'Rural development through unity.'],
  ['Shared Leadership', 'A principle of the community unit.'],
  ['The Two Dimensions of Learning', 'Learning as part of practical rural development.'],
  ['Accountability & Integrity', 'Responsible organization and honest practices.'],
  ['Empowerment through Understanding', 'Understanding as a path to confidence and growth.'],
];

function SectionTitle({ eyebrow, title, dark = false }: { eyebrow?: string; title: string; dark?: boolean }) {
  return <div className="max-w-3xl"><p className={`font-sub text-xs uppercase tracking-[0.25em] ${dark ? 'text-gold-2' : 'text-gold-3'}`}>{eyebrow}</p><h2 className={`mt-3 font-heading text-3xl font-black leading-tight sm:text-5xl ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2></div>;
}

export default function SocialServicesPage() {
  const [openChapter, setOpenChapter] = useState<number | null>(0);

  return <>
    <PageMeta title="Heavenly Earth – A Vision for Rural Prosperity | OPCIEAS" description="Heavenly Earth presents a vision for rural prosperity, self-reliance, unity and structured rural development through a 200-family unit model." keywords="Rural Development, Self-Reliance in India, Sustainable Township Model, Rural Empowerment, Heavenly Earth Book, Rural Prosperity" />

    <header className="relative isolate min-h-[680px] overflow-hidden bg-navy">
      <img src={ruralHeroImage} alt="Vibrant green rural fields representing rural self-reliance" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,26,53,.88),rgba(7,26,53,.48),rgba(7,26,53,.16))]" />
      <div className="container-x flex min-h-[680px] items-end px-6 pb-20 pt-36 sm:px-10 lg:pb-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-4xl text-white">
          <p className="font-sub text-xs uppercase tracking-[0.32em] text-gold-2">OPCIEAS Social Service</p>
          <h1 className="mt-5 font-heading text-4xl font-black leading-[1.04] sm:text-6xl lg:text-7xl">Heavenly Earth – A Vision for Rural Prosperity</h1>
          <h2 className="mt-7 max-w-3xl font-sub text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">OPCIEAS – Connecting Industry, Agriculture, and Social Service.</h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/80">A vision for rural prosperity through self-reliance, unity, dignity and practical rural development.</p>
        </motion.div>
      </div>
    </header>

    <main>
      <section className="bg-white py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="Our Commitment" title="Social Service – Our Commitment" /><div className="mt-12 grid gap-5 lg:grid-cols-3">{philosophy.map((items, i) => <article key={i} className="border-t-2 border-gold/60 bg-light-grey p-7"><h3 className="font-heading text-xl font-bold text-navy">{i === 0 ? 'Connected purpose' : i === 1 ? 'Meaningful aid' : 'Human dignity'}</h3><ul className="mt-5 space-y-3">{items.map(item => <li key={item} className="flex gap-3 font-body text-sm leading-relaxed text-body-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-3" />{item}</li>)}</ul></article>)}</div></div></section>

      <section className="bg-[#edf3ed] py-20 sm:py-28"><div className="container-x grid gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><SectionTitle eyebrow="Rural Empowerment" title="Empowering Rural Communities" /><div className="grid gap-4 sm:grid-cols-2"><article className="bg-white p-7"><Users className="h-7 w-7 text-gold-3" /><h3 className="mt-5 font-heading text-xl font-bold text-navy">Rural development</h3><p className="mt-3 font-body text-sm leading-relaxed text-body-text">A practical vision for productive citizens, family upliftment and stronger communities.</p></article><article className="bg-navy p-7 text-white"><Home className="h-7 w-7 text-gold-2" /><h3 className="mt-5 font-heading text-xl font-bold">Quality of life</h3><p className="mt-3 font-body text-sm leading-relaxed text-white/75">Rural prosperity rooted in self-reliance and dignity.</p></article></div></div></section>

      <section className="bg-white py-20 sm:py-28"><div className="container-x grid gap-10 px-6 lg:grid-cols-2"><div><SectionTitle eyebrow="Change with responsibility" title="Responsibility and Transformation" /></div><div className="grid gap-3 sm:grid-cols-2">{['Legal remedies', 'Formal organization', 'Fair support', 'Trust', 'Hard work', 'Equality', 'Responsible citizenship'].map(item => <div key={item} className="flex items-center gap-3 border border-navy/10 p-4 font-sub text-sm text-navy"><Scale className="h-4 w-4 text-gold-3" />{item}</div>)}</div></div></section>

      <section className="bg-navy py-20 text-white sm:py-28"><div className="container-x grid gap-12 px-6 lg:grid-cols-[1fr_1.2fr]"><SectionTitle dark eyebrow="Inclusion and safety" title="Protecting the Vulnerable" /><div className="grid gap-5 sm:grid-cols-2">{['Dignity', 'Safety', 'Fairness', 'Protection', 'Legal safeguards', 'Across economic levels'].map(item => <div key={item} className="border border-white/15 p-6"><ShieldCheck className="h-6 w-6 text-gold-2" /><h3 className="mt-4 font-heading text-lg font-bold">{item}</h3><p className="mt-2 font-body text-sm leading-relaxed text-white/65">Social service should be inclusive and protect people across different economic levels.</p></div>)}</div></div></section>

      <section className="bg-[#f7f4ea] py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="The guiding vision" title="Our Vision" /><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Rural workers', 'Skilled labourers', 'Striving communities', 'Honest practices', 'Equality', 'Self-reliance', 'Dignity', 'Unity'].map(item => <div key={item} className="border-b border-gold/30 py-5 font-heading text-xl font-bold text-navy">{item}</div>)}</div></div></section>

      <section className="bg-white py-20 sm:py-28"><div className="container-x grid gap-12 px-6 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><SectionTitle eyebrow="A practical philosophy" title="Self-Reliance, Not Dependency" /><div className="space-y-5 font-body text-lg leading-relaxed text-body-text"><p>Handouts provide short-term survival.</p><p>Sustainable progress comes through self-earned prosperity.</p><p>Practical skills can create strength, confidence and growth.</p></div></div></section>

      <section className="bg-[#edf3ed] py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="Structured rural development" title="Rural Development – The Power of Unity" /><div className="mt-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div className="bg-navy p-8 text-white sm:p-10"><p className="font-sub text-xs uppercase tracking-[0.25em] text-gold-2">200-FAMILY UNIT MODEL</p><p className="mt-7 font-heading text-5xl font-black">200</p><p className="font-sub text-sm text-white/70">families</p><p className="mt-5 font-heading text-3xl font-bold">approximately 1,000</p><p className="font-sub text-sm text-white/70">individuals</p></div><div className="grid gap-4 sm:grid-cols-2">{townshipOutcomes.map((item, i) => <article key={item} className="bg-white p-6"><span className="font-sub text-sm text-gold-3">0{i + 1}</span><h3 className="mt-4 font-heading text-lg font-bold text-navy">{item}</h3></article>)}</div></div></div></section>

      <section className="bg-white py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="The township model" title="The 200-Family Township Impact" /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{townshipImpact.map(({ icon: Icon, title, text }) => <article key={title} className="border border-navy/10 p-7 transition hover:-translate-y-1 hover:border-gold/60"><Icon className="h-8 w-8 text-gold-3" /><h3 className="mt-6 font-heading text-xl font-bold text-navy">{title}</h3><p className="mt-3 font-body text-sm leading-relaxed text-body-text">{text}</p></article>)}</div></div></section>

      <section className="bg-[#f7f4ea] py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="Book principles" title="Insights from Heavenly Earth" /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{insights.map(([title, text], i) => <article key={title} className="bg-white p-7"><span className="font-sub text-sm text-gold-3">0{i + 1}</span><h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3><p className="mt-2 font-body text-sm leading-relaxed text-body-text">{text}</p></article>)}</div></div></section>

      <section className="bg-navy py-20 text-white sm:py-28"><div className="container-x grid gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div className="flex min-h-[400px] items-center justify-center border border-white/20 bg-white/5 p-10 text-center"><div><BookOpen className="mx-auto h-12 w-12 text-gold-2" /><p className="mt-6 font-heading text-xl font-bold">Book cover asset placeholder</p><p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-white/65">The client-provided book image is not available in this project. The original artwork should be placed here when supplied.</p></div></div><div><p className="font-sub text-xs uppercase tracking-[0.25em] text-gold-2">Featured book</p><h2 className="mt-4 font-heading text-3xl font-black sm:text-5xl">HEAVENLY EARTH – A VISION FOR RURAL PROSPERITY</h2><p className="mt-5 font-sub text-lg text-white/80">A Blueprint for Self-Reliant Rural Development by Ravindran Kolaparambil</p><h3 className="mt-10 font-heading text-2xl font-bold">About the Book</h3><p className="mt-4 font-body leading-relaxed text-white/75">Heavenly Earth presents a practical roadmap around self-reliance, unity, structured community units, the 200-family model, modern infrastructure, green landscapes and local economies.</p><h3 className="mt-10 font-heading text-2xl font-bold">Key Themes &amp; Insights</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Self-Reliance Over Dependency', 'The 200-Family Unit Model', 'Two Dimensions of Learning', 'Shared Leadership'].map(item => <div key={item} className="flex gap-3 border border-white/15 p-4 font-sub text-sm"><Check className="h-4 w-4 shrink-0 text-gold-2" />{item}</div>)}</div></div></div></section>

      <section className="bg-white py-20 sm:py-28"><div className="container-x px-6"><div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><SectionTitle eyebrow="Available online" title="Get Your Copy" /><p className="mt-5 font-body text-lg text-body-text">Heavenly Earth – A Vision for Rural Prosperity is available now online:</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><button type="button" disabled className="cursor-not-allowed border border-navy/15 px-5 py-3 text-left font-sub text-sm text-navy/50" aria-disabled="true">Buy on Amazon.in <span className="float-right text-xs">Link pending</span></button><button type="button" disabled className="cursor-not-allowed border border-navy/15 px-5 py-3 text-left font-sub text-sm text-navy/50" aria-disabled="true">Buy on Notion Press <span className="float-right text-xs">Link pending</span></button></div></div></div></section>

      <section className="bg-[#edf3ed] py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="The book" title="Table of Contents" /><div className="mt-10 divide-y divide-navy/10 border-y border-navy/10">{chapters.map((chapter, index) => <div key={chapter}><button type="button" onClick={() => setOpenChapter(openChapter === index ? null : index)} aria-expanded={openChapter === index} className="flex w-full items-center justify-between gap-4 py-4 text-left font-sub text-sm font-semibold text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"><span>{chapter}</span><ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openChapter === index ? 'rotate-180' : ''}`} /></button>{openChapter === index && <div className="pb-4 pr-8 font-body text-sm leading-relaxed text-body-text">{chapter.replace(/^Chapter [^:]+: /, '')}</div>}</div>)}</div></div></section>

      <section className="bg-white py-20 sm:py-28"><div className="container-x px-6"><SectionTitle eyebrow="Selected principles" title="Key Excerpts &amp; Principles" /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{excerpts.map(([title, text]) => <article key={title} className="border-l-2 border-gold/70 bg-light-grey p-7"><Handshake className="h-6 w-6 text-gold-3" /><h3 className="mt-5 font-heading text-lg font-bold text-navy">{title}</h3><p className="mt-3 font-body text-sm leading-relaxed text-body-text">{text}</p></article>)}</div></div></section>
    </main>
  </>;
}
