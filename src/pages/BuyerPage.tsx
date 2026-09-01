import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Search, Zap, Lock, Users, BarChart3, Truck } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function BuyerPage() {
  const features = [
    {
      icon: Search,
      title: 'Browse Verified Suppliers',
      desc: 'Access a curated network of verified suppliers across furniture, technology, agriculture, and industrial products. Every supplier undergoes OPCIEAS compliance verification.',
    },
    {
      icon: Zap,
      title: 'Instant Quotations',
      desc: 'Request bulk quotations from multiple verified suppliers. Compare pricing, delivery timelines, and terms in one platform.',
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      desc: 'Transparent buyer-seller agreements, documented terms, and secure payment handling ensure trust and compliance at every step.',
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      desc: 'OPCIEAS buyer support team guides you through supplier selection, negotiation, and procurement workflows.',
    },
    {
      icon: BarChart3,
      title: 'Track & Monitor',
      desc: 'Real-time order tracking, delivery updates, and quality inspections. Complete visibility from purchase to delivery.',
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      desc: 'Integrated logistics coordination, packaging compliance, and delivery management for smooth order fulfillment.',
    },
  ];

  const categories = [
    {
      icon: '🪑',
      name: 'Furniture',
      desc: 'Institutional furniture, steel systems, FRP solutions, textiles',
    },
    {
      icon: '💻',
      name: 'Technology',
      desc: 'IT solutions, portal services, business platforms',
    },
    {
      icon: '🌾',
      name: 'Agriculture',
      desc: 'Aquaculture, fisheries, solar systems, farming equipment',
    },
    {
      icon: '⚙️',
      name: 'Industrial Supplies',
      desc: 'Machinery, equipment, construction materials',
    },
    {
      icon: '🏥',
      name: 'Healthcare & Hospitality',
      desc: 'Medical furniture, hospitality equipment, supplies',
    },
    {
      icon: '🌱',
      name: 'Services & Consultancy',
      desc: 'Technical consulting, training, audit services',
    },
  ];

  const advantages = [
    {
      num: '100%',
      label: 'Verified Suppliers',
      desc: 'Every supplier meets OPCIEAS compliance standards',
    },
    {
      num: '50+',
      label: 'Product Categories',
      desc: 'Wide range of verified products and services',
    },
    {
      num: '20+',
      label: 'Countries',
      desc: 'Export-ready suppliers and international options',
    },
    {
      num: '24/7',
      label: 'Buyer Support',
      desc: 'Dedicated team to assist with your procurement',
    },
  ];

  return (
    <>
      <PageMeta
        title="Buyer Registration | OPCIEAS B2B Procurement Platform"
        description="Register as a buyer on OPCIEAS. Access verified suppliers for furniture, technology, agriculture, and industrial products. Secure, transparent institutional procurement."
        keywords="buyer registration, B2B procurement, institutional purchases, supplier platform, bulk purchasing"
      />

      {/* Banner */}
      <SectionBanner
        title="Buyer Registration & Procurement"
        tagline="Access Verified Suppliers • Transparent Quotations • Institutional-Grade Support"
        image={IMG.heroBg}
        crumb="Buyer"
        crumbTo="/"
      />

      {/* Why OPCIEAS for Buyers */}
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
              Buyer Benefits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl"
            >
              Smart Procurement Platform for Institutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-body text-lg text-navy/75"
            >
              OPCIEAS connects institutional buyers with verified suppliers. Find quality products, request quotations, and procure with confidence.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
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
                    <h3 className="font-heading text-lg font-bold text-navy">{feature.title}</h3>
                    <p className="mt-3 font-body text-sm text-navy/70 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-lux border border-border-grey bg-white p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-heading font-black text-gold mb-2">{adv.num}</div>
                <p className="font-heading text-lg font-bold text-navy">{adv.label}</p>
                <p className="mt-3 font-body text-sm text-navy/70">{adv.desc}</p>
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
              What You Can Buy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Product Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-body text-lg text-navy/75"
            >
              Browse across multiple categories to find verified suppliers for your procurement needs.
            </motion.p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-lux border border-border-grey bg-gradient-to-br from-blue-50/50 to-transparent p-8 hover:border-gold hover:bg-gold/5 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-heading text-lg font-bold text-navy">{cat.name}</h3>
                <p className="mt-2 font-body text-sm text-navy/70">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Registration & Process */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Easy Onboarding
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Buyer Registration Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-body text-lg text-navy/75"
            >
              Quick and secure registration to start accessing verified suppliers.
            </motion.p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {[
                { step: '1', title: 'Create Account', desc: 'Register with your institution/company details. Secure authentication with KYC support available.' },
                { step: '2', title: 'Browse Suppliers', desc: 'Explore verified suppliers across 50+ product categories. View profiles, certifications, and pricing.' },
                { step: '3', title: 'Request Quotations', desc: 'Submit requests for pricing, samples, and bulk quotations. Connect directly with suppliers or through OPCIEAS.' },
                { step: '4', title: 'Compare & Negotiate', desc: 'Compare offers from multiple suppliers. Negotiate pricing, delivery, and terms with transparency.' },
                { step: '5', title: 'Place Order & Track', desc: 'Finalize order details. Track shipment in real-time and receive delivery updates.' },
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

      {/* Buyer Policies & Security */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Trust & Security
              </p>
              <h2 className="font-heading text-3xl font-black text-navy sm:text-4xl mb-6">
                Your Procurement is Secure
              </h2>
              <ul className="space-y-4">
                {[
                  'All suppliers verified with compliance checks and certifications',
                  'Transparent pricing with no hidden charges',
                  'Secure payment processing with buyer protection',
                  'Quality guarantees and dispute resolution support',
                  'Complete documentation and audit trails for compliance',
                  'Data privacy and confidentiality protection',
                  'Dedicated buyer support for all inquiries',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-navy/70">
                    <CheckCircle2 className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-lux border border-border-grey overflow-hidden bg-gradient-to-br from-blue-50 to-transparent p-10"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold/10 blur-[60px]" />
              <div className="relative z-10 text-center">
                <Lock className="h-16 w-16 text-gold mx-auto mb-4" />
                <p className="font-heading text-xl font-bold text-navy mb-3">Buyer Declaration</p>
                <p className="font-body text-sm text-navy/70 leading-relaxed">
                  "As a buyer on OPCIEAS, I commit to genuine procurement, transparent communication, and fair business practices. I understand all suppliers are verified and compliance-verified for my trust and security."
                </p>
              </div>
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
              Ready to Find Verified Suppliers?
            </h2>
            <p className="mt-4 font-body text-lg text-white/85">
              Register as a buyer today and access our network of verified suppliers. Transparent procurement for institutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/buyer/application"
                className="btn-gold flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Register as Buyer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/rfq"
                className="btn-white flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Submit RFQ
              </Link>
              <Link
                to="/contact"
                className="btn-white-ghost flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Contact Support
              </Link>
            </div>

            <p className="mt-6 font-body text-sm text-white/70">
              Questions? Reach out to our buyer support team at <a href="mailto:buyer@opcieas.com" className="text-gold hover:underline">buyer@opcieas.com</a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
