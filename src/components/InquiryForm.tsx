import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { submitRFQ, submitContact } from '../lib/data';

interface Props {
  productName?: string;
  category?: string;
  compact?: boolean;
}

export default function InquiryForm({ productName, category, compact }: Props) {
  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '', country: 'India',
    category: category || '', product: productName || '', quantity: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const isRFQ = Boolean(form.category || form.product || form.quantity);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const payload = {
        ...form,
        subject: form.product ? `Inquiry: ${form.product}` : (form.category ? `Inquiry: ${form.category}` : 'General Inquiry'),
      };
      const result = isRFQ ? await submitRFQ(payload) : await submitContact(payload);
      if (result && result.success === false) {
        throw new Error(result.message || 'Submission failed');
      }
      setSuccessMessage(result?.notification_email_sent === false
        ? result.message
        : 'Our team will contact you within 24 hours.');
      setStatus('success');
      setForm({ company_name: '', contact_name: '', email: '', phone: '', country: 'India', category: category || '', product: productName || '', quantity: '', message: '' });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lux bg-green-500/10 p-8 text-center">
        <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-400" />
        <h3 className="font-heading text-lg font-bold text-navy">Thank you! Your inquiry has been submitted successfully.</h3>
        <p className={`mt-2 font-sub text-sm ${successMessage.includes('could not be delivered') ? 'text-amber-800' : 'text-navy/80'}`}>{successMessage}</p>
        <button onClick={() => setStatus('idle')} className="mt-4 rounded-full bg-white px-5 py-2 font-sub text-xs text-navy transition hover:bg-light-grey">Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 text-navy">
      {!compact && <h3 className="font-heading text-xl font-bold text-navy">Request a Quote</h3>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-1.5 font-sub text-sm font-medium text-navy">
          <span>Your Name <span className="text-red-700">*</span></span>
          <input required value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} placeholder="Enter your name" className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 font-sub text-sm font-medium text-navy">
          <span>Email <span className="text-red-700">*</span></span>
          <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Enter your email" className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 font-sub text-sm font-medium text-navy">
          <span>Phone</span>
          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Enter your phone number" className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 font-sub text-sm font-medium text-navy">
          <span>Company</span>
          <input value={form.company_name} onChange={(e) => set('company_name', e.target.value)} placeholder="Enter your company" className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 font-sub text-sm font-medium text-navy">
          <span>Product{isRFQ && <span className="text-red-700"> *</span>}</span>
          <input required={isRFQ} value={form.product} onChange={(e) => set('product', e.target.value)} placeholder="Product of interest" className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 font-sub text-sm font-medium text-navy">
          <span>Quantity{isRFQ && <span className="text-red-700"> *</span>}</span>
          <input required={isRFQ} value={form.quantity} onChange={(e) => set('quantity', e.target.value)} placeholder="Enter quantity" className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 font-sub text-sm font-medium text-navy">
        <span>Message{!isRFQ && <span className="text-red-700"> *</span>}</span>
        <textarea required={!isRFQ} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us about your requirements" rows={compact ? 2 : 3} className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 font-sub text-base text-navy placeholder:text-navy/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
      </label>
      {status === 'error' && <p role="alert" className="text-sm text-red-700">{errorMsg || 'Something went wrong. Please try again.'}</p>}
      <button type="submit" disabled={status === 'loading'} className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Submit Inquiry</>}
      </button>
    </form>
  );
}
