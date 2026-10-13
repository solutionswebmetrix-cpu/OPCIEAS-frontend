import Contact from '../components/Contact';
import InquiryForm from '../components/InquiryForm';
import SectionBanner from '../components/SectionBanner';
import { MapPin, Phone, Mail, MessageCircle, Calendar } from 'lucide-react';
import { IMG } from '../lib/images';

export default function ContactPage() {
  return (
    <main>
      <SectionBanner
        title="Contact OPCIEAS"
        tagline="Get in touch for bulk supply, custom requirements and institutional partnerships"
        image={IMG.aboutFactory}
        crumb="Contact"
        crumbTo="/contact"
      />
      <Contact />

      <section className="relative overflow-hidden bg-white py-16">
        <div className="container-x px-6">
          <div className="mb-10 text-center">
            <p className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Request a Quote</p>
            <h2 className="mt-3 font-heading text-3xl font-black text-navy sm:text-4xl">Bulk Supply & Custom Requirements</h2>
            <p className="mx-auto mt-3 max-w-2xl text-navy/70">Share your product specifications, quantity and delivery timeline. Our export and institutional supply team will respond with a detailed quote.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-5">
              <div className="rounded-lux border border-navy/10 bg-light-grey p-6">
                <h3 className="font-heading text-lg font-bold text-navy">Quick Contact</h3>
                <p className="mt-1 text-sm text-navy/70">Reach us directly through any of the channels below.</p>
                <div className="mt-5 space-y-4">
                  <a href="tel:+919845579049" className="flex items-center gap-3 text-navy/80 hover:text-gold">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Phone className="h-5 w-5" /></span>
                    <span className="font-body text-sm">+91 9845579049</span>
                  </a>
                  <a href="mailto:opcieas.opcieas4@gmail.com" className="flex items-center gap-3 text-navy/80 hover:text-gold">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Mail className="h-5 w-5" /></span>
                    <span className="font-body text-sm">opcieas.opcieas4@gmail.com</span>
                  </a>
                  <a href="https://www.google.com/maps/search/?api=1&query=SY+No+76+SITE+No+136+HOMMA+DEVANAHALLI+CK+PALAYA+ROAD+Bengaluru+560083+Karnataka+India" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-navy/80 hover:text-gold">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><MapPin className="h-5 w-5" /></span>
                    <span className="font-body text-sm">Bengaluru, Karnataka, India</span>
                  </a>
                  <div className="flex items-center gap-3 text-navy/80">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Calendar className="h-5 w-5" /></span>
                    <span className="font-body text-sm">Mon - Sat: 09:00 AM - 06:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lux border border-navy/10 bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-navy">WhatsApp Inquiry</h3>
                <p className="mt-1 text-sm text-navy/70">Chat with our team instantly for quick answers and product details.</p>
                <a href="https://wa.me/919845579049" target="_blank" rel="noreferrer" className="btn-gold mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>

            <div>
              <div className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
