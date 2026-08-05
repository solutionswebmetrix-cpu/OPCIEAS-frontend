
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title="Privacy Policy - OPCIEAS Pvt. Ltd."
        description="How OPCIEAS collects, uses, and protects your personal information"
      />
      <SectionBanner
        title="Privacy Policy"
        tagline="Your data, our responsibility"
        image={IMG.heroBg}
        crumb="Legal"
        crumbTo="/"
      />
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">1. Information We Collect</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                We collect personal information that you provide directly to us, such as your name, email address, phone number, and company details when you fill out forms, request quotes, or contact us.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">2. How We Use Your Information</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                We use your information to process your requests, provide our services, communicate with you, improve our website, and comply with legal obligations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">3. Data Protection</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
