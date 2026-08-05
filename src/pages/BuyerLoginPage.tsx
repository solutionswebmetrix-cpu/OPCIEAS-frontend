import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ChevronRight, LogIn, Building2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { buyerLogin, getAuthStatus } from '../lib/data';

export default function BuyerLoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectTo = location.state?.from || '/requirements/post';

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const st = await getAuthStatus();
      if (st.authenticated && st.role === 'buyer') navigate(redirectTo, { replace: true });
    })();
  }, [navigate, redirectTo]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: '' }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    try {
      const resp = await buyerLogin({ email: form.email, password: form.password });
      if (resp?.success || resp?.authenticated) {
        setResult({ ok: true, msg: 'Login successful! Redirecting...' });
        setTimeout(() => navigate(redirectTo, { replace: true }), 900);
      } else {
        setResult({ ok: false, msg: resp?.message || resp?.error || 'Invalid email or password.' });
      }
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const Field = ({ label, icon: Icon, name, type = 'text', placeholder = '', required = false, endAdornment }: any) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Icon size={18} />
        </div>
        <input
          type={type}
          value={(form as any)[name]}
          onChange={(e) => update(name, e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 ${endAdornment ? 'pr-12' : 'pr-4'} py-3.5 rounded-xl border ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 bg-white transition`}
        />
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 pt-24 pb-16 flex items-center">
      <PageMeta title="Buyer Login | OPCIEAS" description="Sign in to your OPCIEAS buyer account to manage purchase requirements and track orders." />
      <div className="w-full max-w-md mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-800 mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <LogIn size={28} className="text-amber-300" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Welcome Back, Buyer</h1>
            <p className="text-slate-600">Sign in to access your buyer dashboard.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 px-8 py-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User size={20} /> Buyer Login
              </h2>
              <p className="text-emerald-200 text-sm mt-1">For Buyers & Procurement Teams</p>
            </div>

            <form onSubmit={onSubmit} className="p-8 space-y-5">
              <Field label="Email Address" icon={Mail} name="email" type="email" placeholder="you@company.com" required />
              <Field
                label="Password"
                icon={Lock}
                name="password"
                type={showPw ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                endAdornment={{
                  icon: showPw ? <EyeOff size={18} /> : <Eye size={18} />,
                  onClick: () => setShowPw((p) => !p),
                }}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => update('remember', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">Forgot password?</a>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-4 flex items-start gap-3 border ${result.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}
                >
                  {result.ok ? <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" /> : <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className="font-semibold text-sm">{result.ok ? 'Success' : 'Error'}</p>
                    <p className="text-sm opacity-90">{result.msg}</p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:from-emerald-900 hover:to-black transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                ) : (
                  <>Sign In to Buyer Account <ChevronRight size={18} /></>
                )}
              </button>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <p className="text-sm text-slate-600 text-center">
                  New to OPCIEAS?{' '}
                  <Link to="/buyer/register" className="text-emerald-700 font-semibold hover:text-emerald-900 inline-flex items-center gap-1">
                    Create Buyer Account <ChevronRight size={14} />
                  </Link>
                </p>
                <Link
                  to="/seller/register"
                  className="flex items-center justify-center gap-3 w-full p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center transition">
                    <Building2 size={18} className="text-amber-700" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-amber-900">Are you a Manufacturer / Seller?</p>
                    <p className="text-xs text-slate-500">Register your company to get featured</p>
                  </div>
                </Link>
                <Link
                  to="/rfq"
                  className="flex items-center justify-center gap-3 w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition">
                    <CheckCircle2 size={18} className="text-emerald-700" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-slate-900 group-hover:text-emerald-900">Quick RFQ (No Signup)</p>
                    <p className="text-xs text-slate-500">Post a one-time requirement</p>
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
