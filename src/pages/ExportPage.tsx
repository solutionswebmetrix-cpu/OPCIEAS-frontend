import Export from '../components/Export';
import Hero from '../components/Hero';
import InquiryForm from '../components/InquiryForm';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function ExportPage() {
  return (
    <main>
      <Hero />
      <Export />

      <section className="relative overflow-hidden bg-dark py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionBanner title="Export Advantages" tagline="Why choose OPCIEAS for exports" image={IMG.exportContainer} crumb="Export" crumbTo="/export" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lux glass-navy p-6">
                  <h4 className="font-heading text-lg text-white">Export Compliance</h4>
                  <p className="mt-2 text-white/60">End-to-end export documentation, packaging and certification.</p>
                </div>
                <div className="rounded-lux glass-navy p-6">
                  <h4 className="font-heading text-lg text-white">Export Packaging</h4>
                  <p className="mt-2 text-white/60">Custom export-grade packaging for safe international transit.</p>
                </div>
                <div className="rounded-lux glass-navy p-6">
                  <h4 className="font-heading text-lg text-white">Global Shipping</h4>
                  <p className="mt-2 text-white/60">Trusted forwarders and timely shipments to key markets.</p>
                </div>
                <div className="rounded-lux glass-navy p-6">
                  <h4 className="font-heading text-lg text-white">Quality Assurance</h4>
                  <p className="mt-2 text-white/60">Stringent QA and export-ready finish standards.</p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <a href="/products" className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Download Catalogue</a>
                <a href="/rfq" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Request Quote</a>
              </div>
            </div>

            <div>
              <div className="rounded-lux glass-navy p-6">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
