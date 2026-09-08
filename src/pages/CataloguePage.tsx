import { useState } from 'react';
import { ArrowRight, FileText, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { submitContact } from '../lib/data';

const categories = ['Educational Furniture', 'Hostel Furniture', 'Storage Solutions', 'Commercial / Institutional Furniture'];
const initialForm = { name: '', company: '', email: '', phone: '', category: '', product: '', quantity: '', message: '' };

export default function CataloguePage() {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const openRequest = (category = '') => { setForm((current) => ({ ...current, category })); setStatus('idle'); setError(''); setIsRequestOpen(true); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    const result = await submitContact({ ...form, subject: 'Full Catalogue Request', type: 'catalogue_request', source: 'catalogue-page', product: form.product, message: `Category / Catalogue Required: ${form.category}\nProduct Requirement: ${form.product}\nQuantity: ${form.quantity}\n${form.message}` });
    if (result?.success) { setStatus('success'); setForm(initialForm); } else { setStatus('error'); setError(result?.message || 'We could not submit your request. Please try again.'); }
  };

  return (
    <>
      <PageMeta
        title="Catalogue | OPCIEAS"
        description="Request the complete OPCIEAS product catalogue for detailed product information, specifications and commercial requirements."
        keywords="OPCIEAS catalogue, furniture catalogue, institutional furniture, request catalogue"
      />
      <SectionBanner
        title="Catalogue"
        tagline="Full product catalogues available on request"
        image="/images/hero-bg.jpg"
        crumb="Catalogue"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="mb-10 grid gap-6 rounded-lux bg-navy p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold">On-demand catalogue access</p>
              <h2 className="mt-3 font-heading text-2xl font-black sm:text-3xl">Request OPCIEAS Commercial Furniture Catalogue</h2>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-white/75">Detailed product catalogues are available on request after confirming your product/category requirements.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => openRequest()} className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm"><FileText className="h-4 w-4" /> Request Full Catalogue</button>
              <Link to="/rfq" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-sub text-sm text-white hover:border-gold hover:text-gold">Request Quotation <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-center font-body text-sm leading-relaxed text-navy/65">Tell us which product category and requirements you are considering, and our team will share the relevant catalogue after review.</p>
        </div>
      </section>
      {isRequestOpen && <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-navy/70 p-4" role="dialog" aria-modal="true" aria-labelledby="catalogue-request-title">
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lux bg-white p-6 shadow-2xl sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="font-sub text-xs uppercase tracking-[0.25em] text-gold">Catalogue enquiry</p><h2 id="catalogue-request-title" className="mt-2 font-heading text-2xl font-black text-navy">Request Full Catalogue</h2></div><button type="button" onClick={() => setIsRequestOpen(false)} className="text-navy/60 hover:text-navy" aria-label="Close request form"><X className="h-6 w-6" /></button></div>
          {status === 'success' ? <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5 font-body text-sm leading-relaxed text-green-800">Thank you. Your catalogue request has been received. Our team will contact you with the relevant catalogue.</div> : <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Name *" className="form-input" />
            <input value={form.company} onChange={(event) => update('company', event.target.value)} placeholder="Company / Organization" className="form-input" />
            <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Email *" className="form-input" />
            <input value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="Phone" className="form-input" />
            <select required value={form.category} onChange={(event) => update('category', event.target.value)} className="form-input sm:col-span-2"><option value="">Required Category *</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>
            <input required value={form.product} onChange={(event) => update('product', event.target.value)} placeholder="Product Requirement *" className="form-input sm:col-span-2" />
            <input required value={form.quantity} onChange={(event) => update('quantity', event.target.value)} placeholder="Quantity *" className="form-input sm:col-span-2" />
            <textarea required value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Message *" rows={4} className="form-input sm:col-span-2" />
            {error && <p className="sm:col-span-2 font-sub text-sm text-red-600">{error}</p>}
            <button disabled={status === 'loading'} type="submit" className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm disabled:opacity-60 sm:col-span-2">{status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />} Request Catalogue</button>
          </form>}
        </div>
      </div>}
    </>
  );
}
