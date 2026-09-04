import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Video, Calendar, Send } from 'lucide-react';
import { submitContact } from '../lib/data';

const initialForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  requirement: 'General inquiry',
  category: '',
  quantity: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const updateField = (key: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.company.trim()) nextErrors.company = 'Company or organisation is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Valid email is required.';
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required.';
    if (!form.message.trim()) nextErrors.message = 'Message is required.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setServerMessage('Please complete the required fields before sending your enquiry.');
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await submitContact({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        product: form.requirement,
        category: form.category,
        quantity: form.quantity,
        message: form.message,
        subject: 'Website enquiry',
      });

      if (response && response.success !== false) {
        setStatus('success');
        setServerMessage('Your enquiry has been sent successfully. Our team will respond shortly.');
        setForm(initialForm);
      } else {
        setStatus('error');
        setServerMessage(response?.message || 'The enquiry form is ready, but the backend endpoint is not currently available in this environment.');
      }
    } catch (error: any) {
      setStatus('error');
      setServerMessage(error?.message || 'The enquiry form is ready, but the backend endpoint is not currently available in this environment.');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-light-grey py-32">
      <div className="absolute inset-0 blueprint-bg opacity-20" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Contact</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
            Let's Build Together
          </motion.h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            {[
              { icon: MapPin, title: 'Head Office', lines: ['OPCIEAS Pvt. Ltd.', 'Faridabad, Haryana, India'] },
              { icon: Phone, title: 'Contact Person', lines: ['Ravi'] },
              { icon: Phone, title: 'Phone', lines: ['+91 9845579049'] },
              { icon: Mail, title: 'Email', lines: ['opcieas.opcieas4@gmail.com'] },
              { icon: Video, title: 'Websites', lines: ['www.opcieascommercialfurniture.com', 'www.opcieas.com', 'www.opcieas.co'] },
              { icon: Calendar, title: 'Business Hours', lines: ['Mon - Sat: 09:00 AM - 06:00 PM', 'Sun: Closed'] },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-lux glass-navy p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><c.icon className="h-6 w-6" /></div>
                <div>
                  <p className="font-heading text-sm font-bold text-white">{c.title}</p>
                  {c.lines.map((l) => <p key={l} className="font-body text-sm text-white/80">{l}</p>)}
                </div>
              </div>
            ))}

            {/* Meeting options */}
            <div className="rounded-lux glass-navy p-5">
              <p className="mb-3 font-heading text-sm font-bold text-white">Instant Support</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: MapPin, label: 'Google Maps', href: 'https://maps.google.com/?q=OPCIEAS%20Faridabad%20Haryana%20India' },
                  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919845579049' },
                  { icon: Phone, label: 'Call Now', href: 'tel:+919845579049' },
                  { icon: Mail, label: 'Email', href: 'mailto:opcieas.opcieas4@gmail.com' },
                  { icon: Calendar, label: 'Request Quote', href: '/rfq' },
                  { icon: Video, label: 'Live Chat', href: '/contact' },
                ].map((m) => (
                  <a key={m.label} href={m.href} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-sub text-xs text-white/85 transition hover:border-gold hover:text-gold">
                    <m.icon className="h-3.5 w-3.5" /> {m.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — map + quick form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <div className="overflow-hidden rounded-lux glass-navy">
              <iframe
                title="OPCIEAS Location"
                src="https://maps.google.com/maps?q=OPCIEAS%20Faridabad%20Haryana%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
              />
            </div>

            <form onSubmit={handleSubmit} className="rounded-lux border border-navy/10 bg-white p-6 shadow-sm">
              <p className="mb-4 font-heading text-sm font-bold text-navy">Enquiry / Contact Form</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-navy/75">
                  Name
                  <input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your name" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                  {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
                </label>
                <label className="text-sm text-navy/75">
                  Company / Organisation
                  <input value={form.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Organisation name" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                  {errors.company && <span className="mt-1 block text-xs text-red-600">{errors.company}</span>}
                </label>
                <label className="text-sm text-navy/75">
                  Email
                  <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email address" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                  {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email}</span>}
                </label>
                <label className="text-sm text-navy/75">
                  Phone
                  <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="Phone number" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                  {errors.phone && <span className="mt-1 block text-xs text-red-600">{errors.phone}</span>}
                </label>
                <label className="text-sm text-navy/75">
                  Requirement
                  <input value={form.requirement} onChange={(e) => updateField('requirement', e.target.value)} placeholder="Requirement" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                </label>
                <label className="text-sm text-navy/75">
                  Product / Category
                  <input value={form.category} onChange={(e) => updateField('category', e.target.value)} placeholder="Product or category" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                </label>
                <label className="text-sm text-navy/75">
                  Quantity
                  <input value={form.quantity} onChange={(e) => updateField('quantity', e.target.value)} placeholder="Estimated quantity" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                </label>
                <div className="sm:col-span-2">
                  <label className="text-sm text-navy/75">
                    Message
                    <textarea value={form.message} onChange={(e) => updateField('message', e.target.value)} rows={5} placeholder="Tell us about your requirement" className="mt-1 w-full rounded-xl border border-navy/10 bg-light-grey px-4 py-3 font-body text-sm text-navy outline-none focus:border-gold" />
                    {errors.message && <span className="mt-1 block text-xs text-red-600">{errors.message}</span>}
                  </label>
                </div>
              </div>

              {status !== 'idle' && (
                <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
                  {serverMessage}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn-gold mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm disabled:opacity-70">
                {status === 'loading' ? 'Sending...' : 'Submit Enquiry'}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
