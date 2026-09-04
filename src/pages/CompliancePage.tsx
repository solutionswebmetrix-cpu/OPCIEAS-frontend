
import { motion } from 'framer-motion';
import { Download, FileText, ShieldCheck, Building2, Globe2, CheckCircle2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

const complianceItems = [
  {
    title: 'Certificate of Incorporation',
    description: 'Official registration document',
    placeholder: true,
    icon: Building2,
  },
  {
    title: 'PAN Card',
    description: 'Permanent Account Number',
    placeholder: true,
    icon: FileText,
  },
  {
    title: 'GST Registration',
    description: 'Goods and Services Tax certificate',
    placeholder: true,
    icon: CheckCircle2,
  },
  {
    title: 'IEC Import & Export License',
    description: 'Import Export Code certification',
    placeholder: true,
    icon: Globe2,
  },
  {
    title: 'MCA Compliance',
    description: 'Ministry of Corporate Affairs filings',
    placeholder: true,
    icon: ShieldCheck,
  },
  {
    title: 'FEMA Compliance',
    description: 'Foreign Exchange Management Act',
    placeholder: true,
    icon: ShieldCheck,
  },
  {
    title: 'RBI Compliance',
    description: 'Reserve Bank of India regulations',
    placeholder: true,
    icon: ShieldCheck,
  },
];

export default function CompliancePage() {
  return (
    <>
      <PageMeta
        title="Compliance - OPCIEAS Tech Business Promotion, Social Services Pvt. Ltd."
        description="Informational compliance positioning for OPCIEAS: MCA, RBI, FEMA and SEBI applicability notes."
      />
      <SectionBanner
        title="Compliance"
        tagline="Informational compliance positioning and documentation guidance"
        image={IMG.heroBg}
        crumb="Compliance"
        crumbTo="/"
      />
      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="mb-10 max-w-4xl rounded-lux border border-navy/10 bg-light-grey p-6">
            <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Client informational note</p>
            <h2 className="mt-3 font-heading text-2xl font-black text-navy">Compliance positioning</h2>
            <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-navy/75">
              <p><strong className="text-navy">MCA applicability note:</strong> OPCIEAS operates as a company structure subject to applicable corporate and regulatory compliance requirements under the relevant legal framework. This website is informational and does not replace formal legal, regulatory or statutory advice.</p>
              <p><strong className="text-navy">No RBI involvement:</strong> This website is not intended to provide or describe any Reserve Bank of India regulatory role, approval or financing service.</p>
              <p><strong className="text-navy">No FEMA involvement:</strong> The information provided is not a FEMA filing, FEMA advisory, or foreign exchange approval notice.</p>
              <p><strong className="text-navy">No SEBI involvement:</strong> The site does not represent SEBI regulation, approval, or issuer-related compliance for securities or listed-company activity.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {complianceItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="group rounded-lux bg-navy/5 p-6 transition hover:bg-navy/10">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                        <p className="mt-1 font-sub text-sm text-navy/60">{item.description}</p>
                        {item.placeholder && (
                          <p className="mt-2 font-body text-xs italic text-navy/40">Coming soon</p>
                        )}
                      </div>
                    </div>
                    <button className="mt-4 flex items-center gap-2 rounded-full bg-gold px-4 py-2 font-sub text-xs text-navy transition hover:bg-gold/80 disabled:opacity-60" disabled={item.placeholder}>
                      <Download className="h-4 w-4" />
                      {item.placeholder ? 'Coming Soon' : 'Download PDF'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
