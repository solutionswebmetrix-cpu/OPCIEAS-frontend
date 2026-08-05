import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin, Globe, FileCheck, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronRight, Factory } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { sellerRegister, getAuthStatus } from '../lib/data';

export default function SellerRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [form, setForm] = useState({
    name: '', email: '', phone: '', alternate_phone: '', password: '', confirm_password: '',
    company_name: '', company_logo: null as File | null, gst_number: '', pan_number: '', registration_number: '',
    business_type: 'manufacturer', description: '',
    address_line1: '', address_line2: '', city: '', state: '', country: 'India', pincode: '',
    website: '', established_year: '', total_employees: '', annual_turnover: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const st = await getAuthStatus();
      if (st.authenticated && st.role === 'buyer') navigate('/');
    })();
  }, [navigate]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: '' }));
  }

  function validateStep(s: number) {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Contact person name is required';
      if (!form.email.trim()) e.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
      if (!form.phone.trim()) e.phone = 'Phone number is required';
      if (!form.password) e.password = 'Password is required';
      else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
      if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    }
    if (s === 2) {
      if (!form.company_name.trim()) e.company_name = 'Company name is required';
      if (!form.business_type) e.business_type = 'Business type is required';
      if (!form.city.trim()) e.city = 'City is required';
      if (!form.state.trim()) e.state = 'State is required';
      if (!form.country.trim()) e.country = 'Country is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(totalSteps, s + 1));
  }
  function prev() { setStep((s) => Math.max(1, s - 1)); }

  async function onFinalSubmit() {
    if (!validateStep(step)) return;
    setLoading(true);
    setResult(null);
    try {
      const resp = await sellerRegister({
        name: form.name, email: form.email, phone: form.phone,
        alternate_phone: form.alternate_phone, password: form.password,
        company_name: form.company_name, gst_number: form.gst_number,
        pan_number: form.pan_number, registration_number: form.registration_number,
        business_type: form.business_type, description: form.description,
        address_line1: form.address_line1, address_line2: form.address_line2,
        city: form.city, state: form.state, country: form.country, pincode: form.pincode,
        website: form.website, established_year: form.established_year,
        total_employees: form.total_employees, annual_turnover: form.annual_turnover,
      });
      if (resp?.success) {
        setResult({ ok: true, msg: 'Seller registration submitted! Our team will review your application and contact you shortly.' });
        setTimeout(() => navigate('/'), 2500);
      } else {
        setResult({ ok: false, msg: resp?.message || resp?.error || 'Registration failed. Please try again.' });
      }
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const Field = ({ label, icon: Icon, name, type = 'text', placeholder = '', required = false, options, textarea = false, endAdornment }: any) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && !textarea && !options && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon size={18} /></div>
        )}
        {textarea ? (
          <textarea
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={`w-full pl-4 pr-4 py-3 rounded-xl border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 bg-white transition resize-none`}
          />
        ) : options ? (
          <select
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 bg-white transition`}
          >
            {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ) : (
          <input
            type={type}
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            placeholder={placeholder}
            className={`w-full pl-10 ${endAdornment ? 'pr-12' : 'pr-4'} py-3 rounded-xl border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 bg-white transition`}
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

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition ${
            s === step ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' :
            s < step ? 'bg-emerald-600 text-white' :
            'bg-slate-200 text-slate-500'
          }`}>
            {s < step ? <CheckCircle2 size={20} /> : s}
          </div>
          {s < 3 && <div className={`w-10 md:w-20 h-1 rounded-full transition ${s < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 pt-24 pb-16">
      <PageMeta title="Seller / Manufacturer Registration | OPCIEAS" description="Register as a seller or manufacturer on OPCIEAS. Submit your company profile for admin approval and start featuring your furniture products." />
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
              <Factory size={16} /> Manufacturer / Seller Registration
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">Partner With OPCIEAS</h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Join our verified network of manufacturers. Submit your profile for admin review. Upon approval, our team will list and manage your products.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Building2 size={24} /> Company Registration
                </h2>
                <p className="text-amber-100 text-sm mt-1">Step {step} of {totalSteps} — Fill in all details for faster approval</p>
              </div>
              <div className="hidden md:block w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <FileCheck size={32} className="text-white" />
              </div>
            </div>

            <div className="p-8">
              <StepIndicator />

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Step 1 — Contact Person & Account</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Authorized Contact Person" icon={User} name="name" placeholder="Full name of signatory" required />
                    <Field label="Official Email" icon={Mail} name="email" type="email" placeholder="name@company.com" required />
                    <Field label="Primary Phone" icon={Phone} name="phone" placeholder="+91 98765 43210" required />
                    <Field label="Alternate Phone" icon={Phone} name="alternate_phone" placeholder="Landline / secondary mobile" />
                    <Field
                      label="Account Password"
                      icon={Lock}
                      name="password"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      required
                      endAdornment={{ icon: showPw ? <EyeOff size={18} /> : <Eye size={18} />, onClick: () => setShowPw((p) => !p) }}
                    />
                    <Field label="Confirm Password" icon={Lock} name="confirm_password" type={showPw ? 'text' : 'password'} placeholder="Re-enter password" required />
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <p className="text-sm text-amber-900"><strong className="font-semibold">💡 Note:</strong> After submission, your account will be under review. Admin may request additional company documents (GST, PAN, IEC, factory photos, certifications) via email for verification.</p>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Step 2 — Company Details & Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Company Name (Legal)" icon={Building2} name="company_name" placeholder="e.g. OPCIEAS Pvt Ltd" required />
                    <Field label="Business Type" icon={Factory} name="business_type" required options={[
                      { value: 'manufacturer', label: 'Manufacturer / Factory' },
                      { value: 'wholesaler', label: 'Wholesaler / Distributor' },
                      { value: 'retailer', label: 'Retailer / Dealer' },
                      { value: 'distributor', label: 'Authorized Distributor' },
                      { value: 'exporter', label: 'Exporter' },
                      { value: 'importer', label: 'Importer / Trading' },
                    ]} />
                    <Field label="GST Number" icon={FileCheck} name="gst_number" placeholder="22AAAAA0000A1Z5" />
                    <Field label="PAN Number" icon={FileCheck} name="pan_number" placeholder="AAAAA0000A" />
                    <Field label="Company Registration No." icon={FileCheck} name="registration_number" placeholder="ROC / UDYAM / MSME" />
                    <Field label="Website (optional)" icon={Globe} name="website" placeholder="https://www.yourcompany.com" />
                    <Field label="Established Year" icon={Factory} name="established_year" placeholder="e.g. 2005" />
                    <Field label="Total Employees" icon={User} name="total_employees" options={[
                      { value: '', label: '— Select Range —' },
                      { value: '1-10', label: '1–10' },
                      { value: '11-50', label: '11–50' },
                      { value: '51-100', label: '51–100' },
                      { value: '101-250', label: '101–250' },
                      { value: '251-500', label: '251–500' },
                      { value: '500+', label: '500+' },
                    ]} />
                    <Field label="Country" icon={MapPin} name="country" required />
                    <Field label="State / Region" icon={MapPin} name="state" placeholder="State / UT" required />
                    <Field label="City" icon={MapPin} name="city" placeholder="City" required />
                    <Field label="PIN / Postal Code" icon={MapPin} name="pincode" placeholder="110001" />
                    <div className="md:col-span-2">
                      <Field label="Factory / Office Address" icon={MapPin} name="address_line1" placeholder="Street, plot no., area" />
                    </div>
                    <div className="md:col-span-2">
                      <Field label="Address Line 2 (optional)" icon={MapPin} name="address_line2" placeholder="Landmark, building, etc." />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Step 3 — Business Profile & Final Review</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Field label="Annual Turnover (optional)" icon={FileCheck} name="annual_turnover" placeholder="e.g. ₹5–10 Cr" />
                    <div />
                  </div>
                  <Field label="Company Description / Product Range" name="description" textarea placeholder="Tell us about your manufacturing capabilities, product categories, key markets served, certifications held, and any specializations (e.g. modular office, school furniture, industrial storage, exports, etc.)... This helps admin fast-track your review." />

                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><FileCheck size={18} className="text-amber-600" /> Summary</h4>
                      <ul className="space-y-1.5 text-sm text-slate-700">
                        <li>• Contact: <strong>{form.name || '—'}</strong></li>
                        <li>• Email: <strong>{form.email || '—'}</strong></li>
                        <li>• Phone: <strong>{form.phone || '—'}</strong></li>
                        <li>• Company: <strong>{form.company_name || '—'}</strong></li>
                        <li>• Type: <strong className="capitalize">{form.business_type || '—'}</strong></li>
                        <li>• Location: <strong>{[form.city, form.state, form.country].filter(Boolean).join(', ') || '—'}</strong></li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-600" /> Approval Workflow</h4>
                      <ol className="space-y-1.5 text-sm text-emerald-900 list-decimal list-inside">
                        <li>Admin reviews your profile</li>
                        <li>May request more documents via email</li>
                        <li>Documents verified (GST, PAN, certificates)</li>
                        <li>Profile approved — your products get published</li>
                      </ol>
                      <p className="mt-3 text-xs text-emerald-800/80">You will receive email notifications at each stage. Your products are managed by the admin team.</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none p-4 rounded-xl border border-slate-200 hover:border-amber-300 bg-slate-50 transition">
                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
                    <span className="text-sm text-slate-700">
                      I hereby confirm that all information provided is accurate and belongs to my company. I understand that OPCIEAS admin may request additional identity/address proof documents, and any false information may result in rejection.<strong className="text-slate-900"> Admin manages all product listings; sellers do not get dashboard access.</strong>
                    </span>
                  </label>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 rounded-xl p-4 flex items-start gap-3 border ${result.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}
                >
                  {result.ok ? <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" /> : <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="font-semibold text-sm">{result.ok ? 'Application Submitted' : 'Error'}</p>
                    <p className="text-sm opacity-90">{result.msg}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-8 pt-6 border-t border-slate-100">
                <div>
                  {step > 1 ? (
                    <button type="button" onClick={prev} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition">
                      ← Back
                    </button>
                  ) : (
                    <Link to="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition">
                      ← Back to Home
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Link to="/buyer/register" className="text-sm text-emerald-700 font-semibold hover:text-emerald-900 hidden md:inline-flex items-center gap-1">
                    Looking to Buy? Register as Buyer <ChevronRight size={14} />
                  </Link>
                  {step < totalSteps ? (
                    <button type="button" onClick={next} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold shadow-lg shadow-amber-700/20 hover:shadow-amber-700/30 hover:from-amber-700 hover:to-amber-800 transition">
                      Continue <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button type="button" onClick={onFinalSubmit} disabled={loading} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:from-emerald-900 hover:to-black transition disabled:opacity-60">
                      {loading ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Application <CheckCircle2 size={18} /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
