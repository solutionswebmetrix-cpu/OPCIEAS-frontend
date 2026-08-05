
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function TermsOfUsePage() {
  return (
    <>
      <PageMeta
        title="Terms of Use - OPCIEAS Pvt. Ltd."
        description="Terms and conditions governing the use of OPCIEAS website and services"
      />
      <SectionBanner
        title="Terms of Use"
        tagline="Legal terms and conditions"
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
              <h2 className="font-heading text-2xl font-black text-navy mb-4">1. Acceptance of Terms</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                By accessing or using the OPCIEAS website, products, and services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">2. Use of Website</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                You may use this website for lawful purposes only and in accordance with these terms. You agree not to use the website in any way that may damage, disable, overburden, or impair the site or interfere with any other party's use and enjoyment of the website.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">3. Intellectual Property</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                All content on this website, including text, graphics, logos, images, and software, is the property of OPCIEAS Pvt. Ltd. and is protected by copyright, trademark, and other intellectual property laws.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">4. Disclaimer</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                The information on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
