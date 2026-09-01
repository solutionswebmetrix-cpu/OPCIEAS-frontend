import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, FileCheck, TrendingUp, Shield, Award, Zap } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function SupplierPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Expanded Market Access',
      desc: 'Connect with institutional buyers, government procurement, and corporate entities across technology, furniture, and agriculture sectors.',
    },
    {
      icon: Shield,
      title: 'Verified Buyer Network',
      desc: 'Access a curated ecosystem of authentic institutional buyers with proven procurement budgets and compliance requirements.',
    },
    {
      icon: Award,
      title: 'Credibility & Trust',
      desc: 'Be recognized as a verified supplier through OPCIEAS platform, gaining institutional confidence and competitive advantage.',
    },
    {
      icon: FileCheck,
      title: 'Compliance Support',
      desc: 'Integrated documentation, GST management, tender tracking, and regulatory alignment—streamlining B2B operations.',
    },
    {
      icon: Users,
      title: 'Business Networking',
      desc: 'Connect with industry peers, collaborate on large projects, and participate in curated supplier ecosystems.',
    },
    {
      icon: Zap,
      title: 'Growth & Scale',
      desc: 'Reach institutional buyers seeking volume supply, turnkey solutions, and long-term partnerships—from single orders to government tenders.',
    },
  ];

  const requirements = [
    { num: '01', title: 'Business Registration', desc: 'Valid business entity with GST registration, trade license, or incorporation certificate.' },
    { num: '02', title: 'Tax Compliance', desc: 'Active PAN and GST records. Compliance with statutory obligations and transparent tax filings.' },
    { num: '03', title: 'Product Quality', desc: 'Products/services must comply with applicable standards (BIS, ISO, or industry-specific norms).' },
    { num: '04', title: 'Transparency', desc: 'Honest product descriptions, accurate specifications, and compliance with OPCIEAS quality standards.' },
    { num: '05', title: 'Reliable Fulfillment', desc: 'Commitment to on-time delivery, quality control, and professional communication with buyers.' },
    { num: '06', title: 'Ethical Operations', desc: 'Non-involvement in unauthorized trade practices, counterfeits, or regulatory violations.' },
  ];

  const categories = [
    'Furniture & Textiles',
    'Technology & IT',
    'Agriculture & Food',
    'Equipment & Machinery',
    'Industrial Supplies',
    'Construction Materials',
    'Hospitality & Catering',
    'Office & Admin Supplies',
  ];

  return (
    <>
      <PageMeta
        title="Supplier Onboarding | OPCIEAS B2B Marketplace"
        description="Join OPCIEAS as a verified supplier. Connect with institutional buyers, access government procurement, and grow your business through our trusted B2B platform."
        keywords="supplier registration, B2B marketplace, vendor onboarding, institutional buyers, procurement platform"
      />

      {/* Banner */}
      <SectionBanner
        title="Supplier Onboarding & Vendor Management"
        tagline="Grow Your Business • Access Institutional Buyers • Trusted Marketplace"
        image={IMG.heroBg}
        crumb="Supplier"
        crumbTo="/"
      />

      {/* Why Join OPCIEAS as Supplier */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-[100px] animate-float" />
          <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-navy-3/10 blur-[120px] animate-float-slow" />
        </div>

        <div className="container-x relative z-10 px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Grow With OPCIEAS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl"
            >
              Why Join as a Supplier?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-body text-lg text-navy/75"
            >
              OPCIEAS connects verified suppliers with institutional buyers across technology, furniture, and agriculture. Access procurement opportunities, expand your market reach, and grow with a trusted partner.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-lux border border-border-grey bg-gradient-to-br from-white to-blue-50/30 p-8 transition-all duration-300 hover:border-gold hover:shadow-lg"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/5 transition-all group-hover:bg-gold/10" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold transition-all group-hover:bg-gold/25">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-navy">{benefit.title}</h3>
                    <p className="mt-3 font-body text-sm text-navy/70 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supplier Requirements */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Eligibility
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Supplier Requirements
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-body text-lg text-navy/75"
            >
              To ensure platform integrity and buyer confidence, all suppliers must meet these standards.
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-lux border border-border-grey bg-white p-8 hover:shadow-md transition-all"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold/20 font-heading text-lg font-bold text-gold">
                  {req.num}
                </div>
                <h3 className="font-heading text-lg font-bold text-navy">{req.title}</h3>
                <p className="mt-3 font-body text-sm text-navy/70 leading-relaxed">{req.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Categories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Supplier Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-body text-lg text-navy/75"
            >
              We welcome suppliers across these categories. Other categories can be added based on buyer demand.
            </motion.p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-lg border border-border-grey bg-gradient-to-br from-blue-50/50 to-transparent p-6 text-center hover:border-gold hover:bg-gold/5 transition-all"
              >
                <CheckCircle2 className="mx-auto h-6 w-6 text-gold mb-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="font-heading font-semibold text-navy">{cat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Supplier Registration Process
            </motion.h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {[
                { step: '1', title: 'Complete Application', desc: 'Fill out detailed supplier registration form with company details, credentials, and contact information.' },
                { step: '2', title: 'Document Verification', desc: 'Submit GST certificate, PAN, business registration, and relevant certifications for OPCIEAS verification.' },
                { step: '3', title: 'Compliance Review', desc: 'OPCIEAS reviews all documents to ensure compliance with statutory requirements and quality standards.' },
                { step: '4', title: 'Approval & Onboarding', desc: 'Upon approval, receive credentials and training on platform usage, buyer guidelines, and fulfillment standards.' },
                { step: '5', title: 'Start Selling', desc: 'Activate your supplier profile, manage inventory, respond to buyer inquiries, and fulfill orders.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 font-heading text-lg font-bold text-gold">
                      {item.step}
                    </div>
                    {i < 4 && <div className="mt-4 w-1 h-20 bg-gradient-to-b from-gold/40 to-transparent" />}
                  </div>
                  <div className="pt-2 pb-8">
                    <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 font-body text-navy/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Declaration & Undertaking */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lux border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-8 sm:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-gold" />
                <h3 className="font-heading text-xl font-bold text-navy">Supplier Declaration & Undertaking</h3>
              </div>
              <p className="font-body text-navy/75 leading-relaxed">
                All suppliers joining OPCIEAS commit to:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Supply only standard, compliant products meeting OPCIEAS quality benchmarks',
                  'Maintain transparency in product descriptions, specifications, and pricing',
                  'Comply with all applicable statutory requirements (GST, tax, regulatory)',
                  'Fulfill orders on time with professional communication and quality control',
                  'Respect intellectual property, ethical business practices, and buyer confidentiality',
                  'Participate in fair competition without unethical or fraudulent practices',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-navy/70">
                    <CheckCircle2 className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-navy/95 py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/10 blur-[120px] animate-float" />
        </div>

        <div className="container-x relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
              Ready to Join OPCIEAS?
            </h2>
            <p className="mt-4 font-body text-lg text-white/85">
              Complete your supplier registration and start connecting with verified institutional buyers. Grow your business with a trusted platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/seller/application"
                className="btn-gold flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Join as Supplier <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-white flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Contact Support
              </Link>
            </div>

            <p className="mt-6 font-body text-sm text-white/70">
              Questions? Our supplier support team is available to assist you at <a href="mailto:supplier@opcieas.com" className="text-gold hover:underline">supplier@opcieas.com</a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
