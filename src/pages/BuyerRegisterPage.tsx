import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, MapPin, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { buyerRegister, getAuthStatus } from '../lib/data';

export default function BuyerRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm_password: '',
    company_name: '', country: 'India', city: '', state: '', pincode: '',
    business_type: 'individual', address_line1: '', gst_number: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const st = await getAuthStatus();
      if (st.authenticated && st.role === 'buyer') navigate('/requirements/post');
    })();
  }, [navigate]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: '' }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    try {
      const resp = await buyerRegister({
        name: form.name, email: form.email, phone: form.phone,
        password: form.password, company_name: form.company_name,
        country: form.country, city: form.city, state: form.state,
        pincode: form.pincode, business_type: form.business_type,
        address_line1: form.address_line1, gst_number: form.gst_number,
      });
      if (resp?.success) {
        setResult({ ok: true, msg: 'Registration successful! Please log in.' });
        setTimeout(() => navigate('/buyer/login'), 1200);
      } else {
        setResult({ ok: false, msg: resp?.message || resp?.error || 'Registration failed. Please try again.' });
      }
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const Field = ({ label, icon: Icon, name, type = 'text', placeholder = '', required = false, options, endAdornment }: any) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Icon size={18} />
        </div>
        {options ? (
          <select
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 bg-white transition`}
          >
            {options.map((o: any) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            placeholder={placeholder}
            className={`w-full pl-10 ${endAdornment ? 'pr-12' : 'pr-4'} py-3 rounded-lg border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 bg-white transition`}
          />
        )}
        {endAdornment && (
          <button type="button" onClick={() => endAdornment.onClick?.()} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {endAdornment.icon}
          </button>
        )}
      </div>
      {errors[name] && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 pt-24 pb-16">
      <PageMeta title="Buyer Registration | OPCIEAS" description="Create a buyer account on OPCIEAS to post purchase requirements and RFQs for commercial furniture." />
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-4">
              <CheckCircle2 size={16} /> Verified Buyer Account
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">Buyer Registration</h1>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">Post purchase requirements, request quotes, and connect with verified manufacturers.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Create Buyer Account</h2>
                <p className="text-emerald-200 text-sm mt-1">All fields marked with * are required</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <User size={32} className="text-amber-300" />
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="p-8 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Full Name" icon={User} name="name" placeholder="John Doe" required />
                  <Field label="Email Address" icon={Mail} name="email" type="email" placeholder="john@company.com" required />
                  <Field label="Phone Number" icon={Phone} name="phone" placeholder="+91 98765 43210" required />
                  <Field label="Business Type" icon={Building} name="business_type" required options={[
                    { value: 'individual', label: 'Individual' },
                    { value: 'corporate', label: 'Corporate / Company' },
                    { value: 'government', label: 'Government / PSU' },
                    { value: 'educational', label: 'Educational Institution' },
                    { value: 'hospital', label: 'Hospital / Healthcare' },
                    { value: 'hotel', label: 'Hotel / Hospitality' },
                    { value: 'other', label: 'Other' },
                  ]} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Company Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Company / Organization" icon={Building} name="company_name" placeholder="Company name (optional)" />
                  <Field label="GST Number (optional)" icon={CheckCircle2} name="gst_number" placeholder="22AAAAA0000A1Z5" />
                  <Field label="Country" icon={MapPin} name="country" required />
                  <Field label="State" icon={MapPin} name="state" placeholder="State / Region" />
                  <Field label="City" icon={MapPin} name="city" placeholder="City" />
                  <Field label="PIN / Postal Code" icon={MapPin} name="pincode" placeholder="110001" />
                  <div className="md:col-span-2">
                    <Field label="Address" icon={MapPin} name="address_line1" placeholder="Street address, office number (optional)" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Account Security</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Create Password"
                    icon={Lock}
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    required
                    endAdornment={{
                      icon: showPw ? <EyeOff size={18} /> : <Eye size={18} />,
                      onClick: () => setShowPw((p) => !p),
                    }}
                  />
                  <Field label="Confirm Password" icon={Lock} name="confirm_password" type={showPw ? 'text' : 'password'} placeholder="Re-enter password" required />
                </div>
                <p className="text-xs text-slate-500 mt-3">Use a strong password with uppercase, lowercase, numbers, and symbols for best security.</p>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-4 flex items-start gap-3 border ${result.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}
                >
                  {result.ok ? <CheckCircle2 size={20} className="text-emerald-600 mt-0.5" /> : <AlertCircle size={20} className="text-red-600 mt-0.5" />}
                  <div>
                    <p className="font-semibold text-sm">{result.ok ? 'Success' : 'Error'}</p>
                    <p className="text-sm opacity-90">{result.msg}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
                <p className="text-sm text-slate-600">
                  Already registered?{' '}
                  <Link to="/buyer/login" className="text-emerald-700 font-semibold hover:text-emerald-900 inline-flex items-center gap-1">
                    Sign in as Buyer <ChevronRight size={16} />
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:from-emerald-900 hover:to-black transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Registering...</>
                  ) : (
                    <>Create Buyer Account <ChevronRight size={18} /></>
                  )}
                </button>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
                <Link to="/seller/register" className="group p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center transition">
                    <Building size={22} className="text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-amber-900">Are you a Seller?</p>
                    <p className="text-sm text-slate-500">Register your company instead</p>
                  </div>
                </Link>
                <Link to="/rfq" className="group p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition">
                    <CheckCircle2 size={22} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-emerald-900">Quick RFQ Form</p>
                    <p className="text-sm text-slate-500">Post requirement without signup</p>
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
