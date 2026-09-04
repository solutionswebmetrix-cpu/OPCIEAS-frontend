import { useState } from 'react';
import { ArrowRight, CheckCircle2, Landmark, ShieldCheck, Upload, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';

export default function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageMeta
        title="Membership | OPCIEAS"
        description="Join OPCIEAS membership to access accredited business opportunities, buyer support, supplier visibility and institutional engagement."
        keywords="OPCIEAS membership, annual subscription, buyer registration, supplier registration, business membership"
      />
      <SectionBanner
        title="Membership"
        tagline="Membership Purpose • Membership Benefits • Annual Subscription • Registration & Support"
        image={"/images/hero-bg.jpg"}
        crumb="Membership"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">Purpose</p>
              <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Build trusted institutional access and growth opportunities</h2>
              <p className="mt-5 font-body text-base leading-relaxed text-navy/70">
                OPCIEAS membership helps buyers, suppliers and institutions connect within a transparent and accountable ecosystem. Membership creates a credible pathway for business growth, supplier verification, buyer access and institutional collaboration.
              </p>

              <div className="mt-8 rounded-lux border-2 border-gold/40 bg-gradient-to-r from-gold/10 to-white p-6 shadow-sm">
                <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Annual Subscription Benefit</p>
                <h3 className="mt-3 font-heading text-2xl font-black text-navy">Annual subscription access with priority engagement and onboarding support</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">
                  Membership details, fees, and remittance instructions are to be confirmed by the company and updated in the admin/content system as final client-approved information becomes available.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                {[
                  'Verified buyer and supplier ecosystem',
                  'Subscription and onboarding guidance',
                  'Institutional procurement visibility',
                  'Registration and KYC support guidance',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-light-grey p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-gold" />
                    <span className="font-body text-sm text-navy/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Membership Registration</p>
              <h3 className="mt-3 font-heading text-2xl font-black text-navy">Register Your Interest</h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-navy/70">
                  Full Name
                  <input required className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-3 py-2.5 outline-none focus:border-gold" />
                </label>
                <label className="text-sm text-navy/70">
                  Company / Entity
                  <input required className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-3 py-2.5 outline-none focus:border-gold" />
                </label>
                <label className="text-sm text-navy/70 sm:col-span-2">
                  Email
                  <input type="email" required className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-3 py-2.5 outline-none focus:border-gold" />
                </label>
                <label className="text-sm text-navy/70">
                  Phone
                  <input required className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-3 py-2.5 outline-none focus:border-gold" />
                </label>
                <label className="text-sm text-navy/70">
                  Membership Type
                  <select defaultValue="Buyer" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-3 py-2.5 outline-none focus:border-gold">
                    <option>Buyer</option>
                    <option>Supplier</option>
                    <option>Institution / Partner</option>
                  </select>
                </label>
                <label className="text-sm text-navy/70 sm:col-span-2">
                  Business Purpose
                  <textarea rows={4} className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-3 py-2.5 outline-none focus:border-gold" />
                </label>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-navy/10 bg-light-grey p-4">
                  <div className="flex items-center gap-2 text-navy"><Landmark className="h-4 w-4 text-gold" /> Payment / Remittance</div>
                  <p className="mt-2 text-sm text-navy/70">Follow the final approved payment instructions and upload remittance proof as part of the membership onboarding workflow.</p>
                  <Link to="/payment-instructions" className="mt-3 inline-flex text-sm text-gold">View payment instructions</Link>
                </div>
                <div className="rounded-2xl border border-navy/10 bg-light-grey p-4">
                  <div className="flex items-center gap-2 text-navy"><Upload className="h-4 w-4 text-gold" /> Proof Upload</div>
                  <p className="mt-2 text-sm text-navy/70">Upload remittance or proof of payment for verification and support processing.</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-gold/30 bg-gold/5 p-3 text-sm text-navy/75">
                <Wallet className="h-4 w-4 text-gold" />
                Membership fees and banking details are placeholders until final client-approved content is supplied.
              </div>

              <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 font-sub text-sm text-white">
                Submit Membership Request <ArrowRight className="h-4 w-4" />
              </button>

              {submitted && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                  Your membership request has been recorded. Our team will contact you for verification and onboarding.
                </div>
              )}
            </form>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-lux border border-navy/10 bg-light-grey p-6">
              <ShieldCheck className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">Membership Benefits</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">Business visibility, procurement access, verified onboarding and institutional trust.</p>
            </div>
            <div className="rounded-lux border border-navy/10 bg-light-grey p-6">
              <Landmark className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">Subscription Process</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">Submit details, confirm membership type, complete payment and provide verification documents.</p>
            </div>
            <div className="rounded-lux border border-navy/10 bg-light-grey p-6">
              <Upload className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy">Proof Upload</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">Share supporting documents and remittance proof for secure onboarding and compliance review.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/buyer" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Buyer Registration <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
