
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function DisclaimerPage() {
  return (
    <>
      <PageMeta
        title="Disclaimer - OPCIEAS Pvt. Ltd."
        description="Disclaimers and legal notices for OPCIEAS website and services"
      />
      <SectionBanner
        title="Disclaimer"
        tagline="Important legal notices"
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
              <h2 className="font-heading text-2xl font-black text-navy mb-4">General Disclaimer</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                The information provided by OPCIEAS Pvt. Ltd. on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-lux bg-navy/5 p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl font-black text-navy mb-4">External Links</h2>
              <p className="font-body text-sm leading-relaxed text-navy/70">
                The site may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
