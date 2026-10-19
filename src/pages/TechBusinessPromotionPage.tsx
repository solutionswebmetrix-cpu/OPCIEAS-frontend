import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, Factory, Globe2, Network, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

const pillars = [
  { icon: ShieldCheck, title: 'Portal Governance', desc: 'Structured, rule-based digital systems with accountability and transparent workflows.' },
  { icon: Factory, title: 'Industrial Promotion', desc: 'Verified promotion of manufacturing capacity, supplier capability and buyer pathways.' },
  { icon: CheckCircle2, title: 'Transparency', desc: 'Clear processes and documented approvals across stakeholder touchpoints.' },
  { icon: Sparkles, title: 'Trust', desc: 'Reliable engagement built on verified identities, compliance and delivery discipline.' },
  { icon: Building2, title: 'Compliance', desc: 'Alignment with governance norms, documentation standards and business integrity.' },
  { icon: Network, title: 'Business Networking', desc: 'Connections between buyers, sellers, institutions and strategic partners.' },
  { icon: Globe2, title: 'Export Promotion', desc: 'Global growth channels with export-ready documentation and buyer outreach.' },
  { icon: CheckCircle2, title: 'Quality Standards', desc: 'Benchmarking through ISO, BIS, NSIC and industry quality expectations.' },
];

export default function TechBusinessPromotionPage() {
  return (
    <>
      <PageMeta
        title="Tech Business Promotion | OPCIEAS"
        description="OPCIEAS Tech Business Promotion connects governance, industrial promotion, transparency, trust, compliance, business networking, export promotion and quality standards."
        keywords="tech business promotion, portal governance, industrial promotion, transparency, trust, compliance, export promotion, quality standards"
      />
      <SectionBanner
        title="Tech Business Promotion"
        tagline="Portal Governance • Industrial Promotion • Transparency • Trust • Compliance • Business Networking • Export Promotion • Quality Standards"
        image={IMG.heroProduct}
        crumb="Tech Business Promotion"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Introduction</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">A professional bridge between industry, governance and opportunity</h2>
              <p className="mt-6 font-body text-base leading-relaxed text-green-700">
                This portal is dedicated to industrial development. We understand the challenges businesses face when investing in digital advertisements across various portals. Our focus is on delivering transparent, results-driven growth for industrial manufacturers.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-green-700">
                Many industrialists utilize numerous listings across various Indian portals, often finding that traditional directories fall short of driving real industry growth. However, a strong digital presence remains essential.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-lux border border-navy/10 bg-white p-8 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Core Focus</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {pillars.map(({ title }) => (
                  <div key={title} className="rounded-2xl border border-navy/10 bg-navy/5 px-4 py-3 text-sm font-medium text-navy/80">
                    {title}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lux border border-navy/10 bg-light-grey p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">{desc}</p>
              </motion.div>
            ))}
          </div>

          <article className="mx-auto mt-16 max-w-4xl rounded-lux border border-navy/10 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="font-heading text-2xl font-black leading-tight text-navy sm:text-3xl">
              Tech Business Promotion – A New Era for Indian Industrialists
            </h2>

            <section className="mt-8">
              <h3 className="font-heading text-xl font-bold text-navy">The Present Reality</h3>
              <p className="mt-3 font-body leading-relaxed text-navy/75">
                Across India, manufacturers and industrialists have long depended on traditional advertisement portals that allow anyone to post buy leads - whether genuine or fabricated. Many of these so-called leads turn out to be minor retail needs or non-serious inquiries, yet platforms continue to circulate them simply to drive revenue.
              </p>
              <p className="mt-4 font-body leading-relaxed text-navy/75">
                Manufacturers spend time calling these numbers, only to discover they are completely irrelevant or misleading. Despite the lack of genuine returns, portals return year after year to collect heavy annual subscriptions. Consequently, many companies maintain 10 to 12 different ad listings simply out of habit or prestige, rather than actual business results.
              </p>
              <p className="mt-4 font-body leading-relaxed text-navy/75">
                This outdated system has become a persistent burden. The inefficiency of traditional portals drains valuable resources without delivering verified, confirmed business opportunities.
              </p>
            </section>

            <section className="mt-8">
              <h3 className="font-heading text-xl font-bold text-navy">Why OPCIEAS?</h3>
              <p className="mt-3 font-body leading-relaxed text-navy/75">
                OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd. is not an outsider-we are one among you. We deeply understand the frustration of paying for high-cost advertisements that yield little more than noise and fake leads. That is why we are inviting fellow industrialists to explore a results-driven transformation.
              </p>
              <p className="mt-4 font-body leading-relaxed text-navy/75">
                Our vision is straightforward: instead of relying on speculative ads, we are building a transparent, collective ecosystem where confirmed orders and genuine opportunities are shared fairly among members. Together, we can break free from the costly cycle of traditional advertising and create a platform that truly serves manufacturers.
              </p>
            </section>

            <section className="mt-8">
              <h3 className="font-heading text-xl font-bold text-navy">A Call for Change</h3>
              <p className="mt-3 font-body leading-relaxed text-navy/75">
                We believe many industrialists are ready to move past the old advertising model and are seeking a smarter, more transparent path. But to take the next step forward, we need to know - are you ready for change?
              </p>
              <p className="mt-5 rounded-xl border-l-4 border-gold bg-gold/10 px-5 py-4 font-body leading-relaxed text-navy">
                <strong>Important Notice:</strong> At this stage, we are not collecting any subscription fees until our minimum required membership is confirmed. We only ask for your willingness to participate. Please simply reply with a Yes along with your company name and contact details so we can shape this movement together.
              </p>
            </section>

            <section className="mt-8">
              <h3 className="font-heading text-xl font-bold text-navy">How You Can Join</h3>
              <ul className="mt-3 list-disc space-y-2 pl-6 font-body leading-relaxed text-navy/75">
                <li><strong>Visit our website:</strong> www.opcieas.com</li>
                <li><strong>Write to us:</strong> opcieas@outlook.com</li>
                <li><strong>Spread the Word:</strong> Share this vision with your fellow industrialists and friends in the manufacturing community.</li>
              </ul>
            </section>

            <section className="mt-8">
              <h3 className="font-heading text-xl font-bold text-navy">Together Forward</h3>
              <p className="mt-3 font-body leading-relaxed text-navy/75">
                This is not just another portal; it is a movement dedicated to fairness, transparency, and sustainable growth. With your support, OPCIEAS will become the definitive platform where Indian industrialists finally achieve true dignity in promotion and verified business opportunities.
              </p>
            </section>
          </article>

          <div className="mt-16 flex flex-wrap gap-4">
            <div className="w-full rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-navy">
              <p className="font-sub text-base font-bold leading-relaxed sm:text-lg">
                Zero Subscription Fees Until We Reach Our Goal! We are building a verified network of manufacturers first. No fees, no risk - just reply "Yes" with your company details to join the movement.
              </p>
            </div>
            <Link to="/contact" className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
