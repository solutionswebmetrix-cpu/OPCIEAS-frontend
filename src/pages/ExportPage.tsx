import Export from '../components/Export';
import Hero from '../components/Hero';
import InquiryForm from '../components/InquiryForm';
import { IMG } from '../lib/images';

export default function ExportPage() {
  return (
    <main>
      <Hero />
      <Export />

      <section className="relative overflow-hidden bg-light-grey py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="overflow-hidden rounded-lux border border-navy/10 bg-cover bg-center" style={{ backgroundImage: `url("${IMG.exportContainer}")` }}>
                <div className="bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30 p-8 sm:p-10">
                  <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Export Advantages</p>
                  <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">Why choose OPCIEAS for exports</h2>
                  <div className="mt-5 h-[3px] w-20 bg-gradient-to-r from-gold to-gold-2 rounded-full" />
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lux border border-navy/10 bg-white p-6 luxury-shadow">
                  <h4 className="font-heading text-lg text-navy">Export Compliance</h4>
                  <p className="mt-2 text-navy/70">End-to-end export documentation, packaging and certification.</p>
                </div>
                <div className="rounded-lux border border-navy/10 bg-white p-6 luxury-shadow">
                  <h4 className="font-heading text-lg text-navy">Export Packaging</h4>
                  <p className="mt-2 text-navy/70">Custom export-grade packaging for safe international transit.</p>
                </div>
                <div className="rounded-lux border border-navy/10 bg-white p-6 luxury-shadow">
                  <h4 className="font-heading text-lg text-navy">Global Shipping</h4>
                  <p className="mt-2 text-navy/70">Trusted forwarders and timely shipments to key markets.</p>
                </div>
                <div className="rounded-lux border border-navy/10 bg-white p-6 luxury-shadow">
                  <h4 className="font-heading text-lg text-navy">Quality Assurance</h4>
                  <p className="mt-2 text-navy/70">Stringent QA and export-ready finish standards.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/catalogue" className="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Download Catalogue</a>
                <a href="/rfq" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">Request Quote</a>
              </div>
            </div>

            <div>
              <div className="rounded-lux border border-navy/10 bg-white p-6 luxury-shadow">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
