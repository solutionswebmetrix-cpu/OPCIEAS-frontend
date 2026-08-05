import Contact from '../components/Contact';
import InquiryForm from '../components/InquiryForm';

export default function ContactPage() {
  return (
    <main>
      <Contact />

      <section className="relative overflow-hidden bg-dark py-16">
        <div className="container-x px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="rounded-lux glass-navy p-6">
                <h3 className="font-heading text-xl text-white">Contact Person</h3>
                <p className="mt-2 text-white/70">Ravi</p>
                <h3 className="font-heading text-lg text-white mt-4">Phone</h3>
                <p className="text-white/70">+91 9845579049</p>
                <h3 className="font-heading text-lg text-white mt-4">Email</h3>
                <p className="text-white/70">opcieas.opcieas4@gmail.com</p>
                <h3 className="font-heading text-lg text-white mt-4">Websites</h3>
                <ul className="mt-2 text-white/70">
                  <li>opcieascommercialfurniture.com</li>
                  <li>opcieas.com</li>
                  <li>opcieas.co</li>
                </ul>
                <h3 className="font-heading text-lg text-white mt-4">Business Hours</h3>
                <p className="text-white/70">Mon–Sat 09:00–18:00</p>
              </div>
            </div>

            <div>
              <div className="rounded-lux glass-navy p-6">
                <InquiryForm />
              </div>
              <div className="mt-4 flex gap-3">
                <a href="https://wa.me/919845579049" target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
