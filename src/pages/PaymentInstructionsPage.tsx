import { ArrowRight, Landmark, ShieldCheck, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';

export default function PaymentInstructionsPage() {
  return (
    <>
      <PageMeta
        title="Payment Instructions | OPCIEAS"
        description="Payment and remittance guidance for OPCIEAS membership and procurement enquiries."
        keywords="payment instructions, remittance, OPCIEAS payments, membership payment"
      />

      <SectionBanner
        title="Payment Instructions"
        tagline="Membership and procurement payments"
        image="/images/hero-bg.jpg"
        crumb="Payment Instructions"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lux border border-navy/10 bg-light-grey p-8">
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Important note</p>
              <h2 className="mt-4 font-heading text-3xl font-black text-navy">Payment details are to be confirmed before final remittance</h2>
              <p className="mt-4 font-body text-base leading-relaxed text-navy/70">
                Final payment instructions, banking details, and remittance proof guidance are subject to company confirmation and may be updated as the client-approved onboarding process is finalized.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-navy/70">
                Please do not process payment until the final approved account details are shared by the company or a dedicated onboarding contact.
              </p>
            </div>

            <div className="rounded-lux border border-gold/30 bg-gold/5 p-8">
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Checklist</p>
              <ul className="mt-5 space-y-4 font-body text-sm text-navy/75">
                <li className="flex items-start gap-3"><Wallet className="mt-0.5 h-4 w-4 text-gold" /> Confirm the correct account name and bank branch.</li>
                <li className="flex items-start gap-3"><Landmark className="mt-0.5 h-4 w-4 text-gold" /> Verify the exact invoice or membership reference.</li>
                <li className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 text-gold" /> Save remittance proof for verification.</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Step 1</p>
              <h3 className="mt-3 font-heading text-xl font-black text-navy">Request final instruction</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">Confirm the exact payment reference and purpose of the transfer with the company.</p>
            </div>
            <div className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Step 2</p>
              <h3 className="mt-3 font-heading text-xl font-black text-navy">Make the remittance</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">Use the approved bank account as provided by the authorised onboarding team.</p>
            </div>
            <div className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Step 3</p>
              <h3 className="mt-3 font-heading text-xl font-black text-navy">Submit proof</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">Upload the transfer confirmation for verification and membership onboarding.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/membership" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Return to membership <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
