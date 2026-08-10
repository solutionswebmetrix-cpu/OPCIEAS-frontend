import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin, FileCheck, PenTool, CalendarDays, CheckCircle2, AlertCircle, ChevronRight, ShoppingCart } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { apiPost } from '../lib/api';

const initialForm = {
  full_name: '',
  company_name: '',
  business_registration_number: '',
  address: '',
  phone_number: '',
  email: '',
  whatsapp_number: '',
  business_purpose: '',
  preferred_categories: '',
  declaration_text: 'I/We hereby declare that my/our registration is genuine and for authentic business purposes, in compliance with OPCIEAS norms.',
  signature: '',
  name_designation: '',
  application_date: '',
  password: '',
  confirm_password: '',
};

export default function BuyerApplicationPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const required: Array<keyof typeof initialForm> = ['full_name', 'address', 'phone_number', 'email', 'business_purpose', 'declaration_text', 'signature', 'name_designation', 'application_date', 'password'];
    required.forEach((key) => {
      if (!String(form[key]).trim()) e[key] = 'This field is required';
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!/^\+?[0-9\s\-()]{7,15}$/.test(form.phone_number)) e.phone_number = 'Invalid phone number';
    if (!/^\+?[0-9\s\-()]{7,15}$/.test(form.whatsapp_number)) e.whatsapp_number = 'Invalid WhatsApp number';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    try {
      const payload = { ...form, preferred_categories: form.preferred_categories.split(',').map((item) => item.trim()).filter(Boolean) };
      const resp = await apiPost('/auth/buyer_register.php', payload);
      setResult({ ok: !!resp?.success, msg: resp?.message || 'Submission failed' });
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => [
    ['Applicant', form.full_name || '—'],
    ['Company', form.company_name || '—'],
    ['Business Purpose', form.business_purpose || '—'],
    ['Phone', form.phone_number || '—'],
    ['Email', form.email || '—'],
  ], [form]);

  const Field = ({ label, icon: Icon, name, type = 'text', required = true, textarea = false }: any) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}{required ? <span className="text-red-500"> *</span> : null}</label>
      <div className="relative">
        {Icon && !textarea && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon size={18} /></div>}
        {textarea ? (
          <textarea value={form[name as keyof typeof form]} onChange={(e) => update(name, e.target.value)} rows={4} className={`w-full ${Icon ? 'pl-4' : 'pl-4'} pr-4 py-3 rounded-xl border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 bg-white transition`} />
        ) : (
          <input type={type} value={form[name as keyof typeof form]} onChange={(e) => update(name, e.target.value)} className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 bg-white transition`} />
        )}
      </div>
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <PageMeta title="Buyer Application Form | OPCIEAS" description="Submit your buyer application for review and access to the OPCIEAS procurement portal." />
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} className="rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-8 py-8 text-white">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.24em] text-amber-50"><ShoppingCart size={18} /> OPCIEAS Buyer Application Form</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Buyer Registration & Governance Review</h1>
            <p className="mt-3 max-w-3xl text-amber-50/90">Submit your profile for procurement review. All applications are screened for authenticity, compliance, and fit for the OPCIEAS network.</p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-8 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
            <div className="space-y-8">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><User size={18} className="text-amber-700" /> Section A – Buyer Profile</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" icon={User} name="full_name" />
                  <Field label="Company/Entity Name" icon={Building2} name="company_name" />
                  <Field label="Business Registration Number (if applicable)" icon={FileCheck} name="business_registration_number" required={false} />
                  <Field label="Address" icon={MapPin} name="address" />
                  <Field label="Phone Number" icon={Phone} name="phone_number" type="tel" />
                  <Field label="Email" icon={Mail} name="email" type="email" />
                  <Field label="WhatsApp Number" icon={Phone} name="whatsapp_number" type="tel" required={false} />
                  <Field label="Preferred Categories" icon={ShoppingCart} name="preferred_categories" required={false} />
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><FileCheck size={18} className="text-blue-700" /> Section B – Purpose & Declaration</h2>
                <Field label="Business Purpose" icon={FileCheck} name="business_purpose" textarea />
                <Field label="Declaration" icon={FileCheck} name="declaration_text" textarea required={false} />
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Field label="Signature" icon={PenTool} name="signature" />
                  <Field label="Name & Designation" icon={User} name="name_designation" />
                  <Field label="Date" icon={CalendarDays} name="application_date" type="date" />
                  <Field label="Password" icon={FileCheck} name="password" type="password" />
                  <Field label="Confirm Password" icon={FileCheck} name="confirm_password" type="password" />
                </div>
              </section>
            </div>
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Submission Summary</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {summary.map(([label, value]) => <li key={label} className="flex items-start justify-between gap-2"><span className="font-medium text-slate-600">{label}</span><span className="text-right text-slate-900">{value}</span></li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
                <p className="font-semibold">Governance note</p>
                <p className="mt-2">Buyers are reviewed by portal staff before access is activated. Verified business purpose and declaration statements are required.</p>
              </div>
              {result && <div className={`rounded-2xl border p-4 text-sm ${result.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}><div className="flex items-start gap-2"><span>{result.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</span><div>{result.msg}</div></div></div>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:opacity-60">
                {loading ? 'Submitting…' : <>Submit Application <ChevronRight size={18} /></>}
              </button>
              <Link to="/seller/application" className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Apply as Supplier <ChevronRight size={18} /></Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
