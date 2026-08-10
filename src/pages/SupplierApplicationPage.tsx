import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin, CreditCard, Landmark, FileCheck, PenTool, CalendarDays, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { apiPost } from '../lib/api';

const initialForm = {
  full_name: '',
  company_name: '',
  business_registration_number: '',
  tax_identification_number: '',
  address: '',
  phone_number: '',
  email: '',
  whatsapp_number: '',
  bank_name: '',
  account_number: '',
  ifsc_code: '',
  declaration_text: 'I/We hereby declare that only standard products, compliant with OPCIEAS norms, will be supplied through this platform.',
  signature: '',
  name_designation: '',
  application_date: '',
  password: '',
  confirm_password: '',
};

export default function SupplierApplicationPage() {
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
    const required: Array<keyof typeof initialForm> = ['full_name', 'company_name', 'business_registration_number', 'tax_identification_number', 'address', 'phone_number', 'email', 'whatsapp_number', 'bank_name', 'account_number', 'ifsc_code', 'declaration_text', 'signature', 'name_designation', 'application_date', 'password'];
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
      const resp = await apiPost('/auth/seller_register.php', form);
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
    ['Registration', form.business_registration_number || '—'],
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
      <PageMeta title="Supplier Application Form | OPCIEAS" description="Submit your supplier application with verified banking and compliance declarations to OPCIEAS." />
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} className="rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-8 py-8 text-white">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.24em] text-blue-100"><Building2 size={18} /> OPCIEAS Supplier Application Form</div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Supplier Registration & Compliance Declaration</h1>
            <p className="mt-3 max-w-3xl text-blue-50/90">Submit your profile for portal staff review. Only standard products compliant with OPCIEAS norms will be accepted through the platform.</p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-8 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
            <div className="space-y-8">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><User size={18} className="text-blue-700" /> Section A – Applicant Details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full Name" icon={User} name="full_name" />
                  <Field label="Company/Entity Name" icon={Building2} name="company_name" />
                  <Field label="Business Registration Number (GST/Trade License/Incorporation)" icon={FileCheck} name="business_registration_number" />
                  <Field label="Tax Identification Number (PAN or equivalent)" icon={CreditCard} name="tax_identification_number" />
                  <div className="md:col-span-2"><Field label="Address" icon={MapPin} name="address" /></div>
                  <Field label="Phone Number" icon={Phone} name="phone_number" type="tel" />
                  <Field label="Email" icon={Mail} name="email" type="email" />
                  <Field label="WhatsApp Number" icon={Phone} name="whatsapp_number" type="tel" />
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><Landmark size={18} className="text-amber-600" /> Section B – Banking Details</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Bank Name" icon={Landmark} name="bank_name" />
                  <Field label="Account Number" icon={CreditCard} name="account_number" />
                  <Field label="IFSC Code" icon={FileCheck} name="ifsc_code" />
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900"><PenTool size={18} className="text-emerald-700" /> Section C – Declaration & Undertaking</h2>
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
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Submission Summary</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {summary.map(([label, value]) => <li key={label} className="flex items-start justify-between gap-2"><span className="font-medium text-slate-600">{label}</span><span className="text-right text-slate-900">{value}</span></li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                <p className="font-semibold">Portal governance</p>
                <p className="mt-2">Portal staff controls registration details and supplier corrections go through admin review rather than direct seller editing.</p>
              </div>
              {result && <div className={`rounded-2xl border p-4 text-sm ${result.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}><div className="flex items-start gap-2"><span>{result.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}</span><div>{result.msg}</div></div></div>}
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">
                {loading ? 'Submitting…' : <>Submit Application <ChevronRight size={18} /></>}
              </button>
              <Link to="/buyer/application" className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Apply as Buyer <ChevronRight size={18} /></Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
