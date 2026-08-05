import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitRFQ } from '../lib/data';

const categories = [
  'Office Furniture', 'Educational Furniture', 'School Furniture', 'Hostel Furniture',
  'Hotel Furniture', 'Hospital Furniture', 'Industrial Furniture', 'Storage Systems',
  'Steel Furniture', 'Warehouse Racks', 'Library Furniture', 'Auditorium Chairs',
];

export default function RFQ() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    country: '', city: '', gst: '', category: '', product: '',
    quantity: '', budget: '', expected_delivery: '', message: '',
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact_name || !form.email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const result = await submitRFQ(form);
      if (result && result.success === false) {
        throw new Error(result.message || 'Submission failed');
      }
      setStatus('success');
      setForm({ company_name: '', contact_name: '', email: '', phone: '', country: '', city: '', gst: '', category: '', product: '', quantity: '', budget: '', expected_delivery: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong. Please try again or contact us directly.');
      setStatus('error');
    }
  };

  return (
    <section id="rfq" className="relative overflow-hidden bg-dark py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="container-x relative px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-sub text-sm uppercase tracking-[0.3em] text-gold">Request For Quotation</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
            Tell Us About Your Project
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 font-body text-sm text-white/60">
            Share your requirements and our team will respond with a detailed quotation within 24 hours.
          </motion.p>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-lux glass-navy p-8 luxury-shadow sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company Name" value={form.company_name} onChange={(v) => set('company_name', v)} />
            <Field label="Contact Name *" value={form.contact_name} onChange={(v) => set('contact_name', v)} required />
            <Field label="Email *" type="email" value={form.email} onChange={(v) => set('email', v)} required />
            <Field label="Phone" value={form.phone} onChange={(v) => set('phone', v)} />
            <Field label="Country" value={form.country} onChange={(v) => set('country', v)} />
            <Field label="City" value={form.city} onChange={(v) => set('city', v)} />
            <Field label="GST Number" value={form.gst} onChange={(v) => set('gst', v)} />
            <div>
              <label className="mb-1.5 block font-sub text-xs text-white/60">Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-xl border border-white/10 bg-navy/50 px-4 py-3 font-body text-sm text-white outline-none focus:border-gold">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Product" value={form.product} onChange={(v) => set('product', v)} />
            <Field label="Quantity" value={form.quantity} onChange={(v) => set('quantity', v)} />
            <Field label="Project Budget" value={form.budget} onChange={(v) => set('budget', v)} />
            <Field label="Expected Delivery" value={form.expected_delivery} onChange={(v) => set('expected_delivery', v)} />
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block font-sub text-xs text-white/60">Message / Requirements</label>
            <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={4} className="w-full rounded-xl border border-white/10 bg-navy/50 px-4 py-3 font-body text-sm text-white outline-none focus:border-gold" placeholder="Describe your project requirements..." />
          </div>

          {/* Upload placeholders */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {['Tender PDF', 'Drawing / CAD', 'Reference Images'].map((u) => (
              <div key={u} className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-navy/30 p-4 transition hover:border-gold hover:bg-gold/5">
                <Upload className="h-5 w-5 text-gold" />
                <span className="font-sub text-xs text-white/70">{u}</span>
              </div>
            ))}
          </div>

          <button type="submit" disabled={status === 'loading'} className="btn-gold mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-sub text-sm disabled:opacity-60">
            {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="h-4 w-4" /> Submit Request</>}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-3 rounded-xl border border-green-400/30 bg-green-500/10 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <p className="font-sub text-sm text-green-300">Thank you! Your inquiry has been submitted successfully.</p>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="font-sub text-sm text-red-300">{errorMsg || 'Something went wrong. Please try again or contact us directly.'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block font-sub text-xs text-white/60">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full rounded-xl border border-white/10 bg-navy/50 px-4 py-3 font-body text-sm text-white outline-none transition focus:border-gold" />
    </div>
  );
}
