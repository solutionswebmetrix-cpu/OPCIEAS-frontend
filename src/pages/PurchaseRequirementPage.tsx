import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, User, Mail, Phone, MapPin, FileCheck, CheckCircle2, AlertCircle, ChevronRight, Trash2, Plus, Building, LogIn, Search, ArrowLeft, ShoppingCart, ClipboardList } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { createRequirement, deleteRequirement, fetchMyRequirements, fetchCategories, getAuthStatus, fetchProducts } from '../lib/data';
import type { Category, Product, PurchaseRequirement } from '../lib/types';

export default function PurchaseRequirementPage() {
  const [tab, setTab] = useState<'post' | 'my'>('post');
  const [auth, setAuth] = useState<any>({ authenticated: false, user: null, profile: null });
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [myRequirements, setMyRequirements] = useState<PurchaseRequirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState({
    title: '', product_name: '', category_id: '',
    required_quantity: 1, unit: 'piece' as any,
    budget_min: '', budget_max: '',
    country: 'India', state: '', city: '',
    required_by_date: '',
    description: '', specifications: '', material: '', color: '', dimensions: '',
    delivery_address: '',
    visibility: 'public' as any,
    contact_name: '', contact_email: '', contact_phone: '', company_name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductPicker, setShowProductPicker] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [st, cats, prods] = await Promise.all([
          getAuthStatus(),
          fetchCategories(),
          fetchProducts(),
        ]);
        setAuth(st);
        setCategories(cats);
        setProducts(prods);
        if (st.authenticated && st.role === 'buyer') {
          const mine = await fetchMyRequirements();
          setMyRequirements(mine);
        }
      } catch (e) {
        console.error('[PurchaseRequirementPage] init failed:', e);
      }
    })();
  }, []);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: '' }));
    setResult(null);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Requirement title is required';
    if (!form.required_quantity || form.required_quantity < 1) e.required_quantity = 'Valid quantity required';
    if (!form.description.trim() || form.description.length < 20) e.description = 'Please provide a detailed description (min 20 chars)';
    if (!form.contact_name.trim()) e.contact_name = 'Contact name is required';
    if (!form.contact_email.trim()) e.contact_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email)) e.contact_email = 'Invalid email format';
    if (!form.contact_phone.trim()) e.contact_phone = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    try {
      const specObj: any = {};
      if (form.specifications.trim()) specObj.notes = form.specifications;
      if (form.material.trim()) specObj.material = form.material;
      if (form.color.trim()) specObj.color = form.color;
      if (form.dimensions.trim()) specObj.dimensions = form.dimensions;

      const payload: any = {
        title: form.title,
        product_name: form.product_name,
        category_id: form.category_id || null,
        required_quantity: Number(form.required_quantity),
        quantity: Number(form.required_quantity),
        unit: form.unit,
        budget_min: form.budget_min ? Number(form.budget_min) : null,
        budget_max: form.budget_max ? Number(form.budget_max) : null,
        country: form.country, state: form.state, city: form.city,
        delivery_address: form.delivery_address || null,
        required_by_date: form.required_by_date || null,
        description: form.description,
        specifications: Object.keys(specObj).length ? specObj : null,
        visibility: form.visibility,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        company_name: form.company_name || null,
      };
      const resp = await createRequirement(payload);
      if (resp?.success) {
        setResult({ ok: true, msg: 'Purchase requirement submitted! Our team will review and approved requirements will be visible to verified sellers.' });
        setForm({
          title: '', product_name: '', category_id: '', required_quantity: 1, unit: 'piece',
          budget_min: '', budget_max: '', country: 'India', state: '', city: '',
          required_by_date: '', description: '', specifications: '', material: '', color: '', dimensions: '',
          delivery_address: '', visibility: 'public',
          contact_name: auth.user?.name || '', contact_email: auth.user?.email || '', contact_phone: '',
          company_name: (auth.profile as any)?.company_name || '',
        });
        if (auth.authenticated) {
          const mine = await fetchMyRequirements();
          setMyRequirements(mine);
        }
      } else {
        setResult({ ok: false, msg: resp?.message || resp?.error || 'Failed to submit. Please try again.' });
      }
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this requirement? This cannot be undone.')) return;
    try {
      const r = await deleteRequirement(id);
      if (r?.success) {
        setMyRequirements((prev) => prev.filter((x) => x.id !== id));
        setResult({ ok: true, msg: 'Requirement deleted.' });
      }
    } catch (err: any) {
      setResult({ ok: false, msg: err?.message || 'Delete failed.' });
    }
  }

  useEffect(() => {
    if (auth.authenticated) {
      update('contact_name', auth.user?.name || '');
      update('contact_email', auth.user?.email || '');
      if ((auth.profile as any)?.phone) update('contact_phone', (auth.profile as any).phone || '');
      if ((auth.profile as any)?.company_name) update('company_name', (auth.profile as any).company_name || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated]);

  const Field = ({ label, icon: Icon, name, type = 'text', placeholder = '', required = false, options, textarea = false, step, min, number = false }: any) => (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && !textarea && !options && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icon size={16} /></div>
        )}
        {textarea ? (
          <textarea
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={`w-full pl-4 pr-4 py-3 rounded-xl border text-sm ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 bg-white transition resize-none`}
          />
        ) : options ? (
          <select
            value={(form as any)[name]}
            onChange={(e) => update(name, e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 bg-white transition`}
          >
            {options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        ) : (
          <input
            type={type}
            step={step}
            min={min}
            value={(form as any)[name]}
            onChange={(e) => update(name, number ? (e.target.value === '' ? '' : Number(e.target.value)) as any : e.target.value)}
            placeholder={placeholder}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm ${errors[name] ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 bg-white transition`}
          />
        )}
      </div>
      {errors[name] && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors[name]}</p>}
    </div>
  );

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.short_desc || '').toLowerCase().includes(q);
  }).slice(0, 12);

  const unitOptions = [
    { value: 'piece', label: 'Piece / Unit' },
    { value: 'set', label: 'Set' },
    { value: 'pair', label: 'Pair' },
    { value: 'box', label: 'Box' },
    { value: 'carton', label: 'Carton' },
    { value: 'meter', label: 'Meter' },
    { value: 'square_meter', label: 'Square Meter' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-24 pb-16">
      <PageMeta title="Post Purchase Requirement | OPCIEAS" description="Post your furniture purchase requirement on OPCIEAS. Connect with verified manufacturers for bulk orders, government tenders, and procurement projects." />
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-800 mb-3 transition">
                <ArrowLeft size={14} /> Back to Products
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-3">
                <ShoppingCart size={14} /> Procurement & Tenders
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 tracking-tight">Purchase Requirements</h1>
              <p className="text-slate-600 text-lg">Post your bulk furniture needs and receive quotes from verified manufacturers across India.</p>
            </div>
            {!auth.authenticated && (
              <Link to="/buyer/login" state={{ from: '/requirements/post' }} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:from-emerald-900 hover:to-black transition">
                <LogIn size={18} /> Sign In to Track Requirements
              </Link>
            )}
          </div>

          {auth.authenticated && (
            <div className="flex items-center gap-2 mb-6 p-1 bg-slate-100 rounded-2xl w-fit">
              <button
                onClick={() => setTab('post')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${tab === 'post' ? 'bg-white shadow text-emerald-800' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Plus size={16} /> Post New Requirement
              </button>
              <button
                onClick={() => setTab('my')}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${tab === 'my' ? 'bg-white shadow text-emerald-800' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <ClipboardList size={16} /> My Requirements ({myRequirements.length})
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {tab === 'post' && (
              <motion.div key="post" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 px-6 py-4">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2"><FileCheck size={20} /> New Purchase Requirement</h2>
                      <p className="text-emerald-200 text-sm mt-0.5">Fill all mandatory fields. More details = better quotes.</p>
                    </div>
                    <div className="p-6 space-y-5">
                      <div>
                        <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                          <span>1 · What do you need?</span>
                          <button type="button" onClick={() => setShowProductPicker((p) => !p)} className="text-emerald-700 font-semibold hover:text-emerald-900 inline-flex items-center gap-1 normal-case tracking-normal">
                            <Search size={14} /> Pick from catalog
                          </button>
                        </h3>
                        <AnimatePresence>
                          {showProductPicker && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-4 overflow-hidden">
                              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="relative mb-3">
                                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products (e.g. office desk, school bench, locker, bed, rack)..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                                </div>
                                {filteredProducts.length > 0 && (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                                    {filteredProducts.map((p) => (
                                      <button type="button" key={p.id}
                                        onClick={() => { update('product_name', p.name); update('title', `Need: ${p.name}`); setShowProductPicker(false); if (p.category_id) update('category_id', p.category_id); }}
                                        className="text-left p-2.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition group">
                                        <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 line-clamp-2">{p.name}</p>
                                      </button>
                                    ))}
                                  </div>
                                )}
                                {searchQuery && filteredProducts.length === 0 && (
                                  <p className="text-xs text-slate-500">No matches — proceed to fill manually below.</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Field label="Requirement Title" icon={Package} name="title" placeholder="e.g. 500 Workstations for Corporate Office" required />
                          <Field label="Product Name (if specific)" icon={Package} name="product_name" placeholder="e.g. Executive Office Desk" />
                          <Field label="Category" icon={Building} name="category_id" options={[
                            { value: '', label: '— Select Category —' },
                            ...categories.map((c) => ({ value: c.id, label: c.name })),
                          ]} />
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Quantity Required" icon={Plus} name="required_quantity" type="number" min="1" number required />
                            <Field label="Unit" icon={Package} name="unit" options={unitOptions} />
                          </div>
                          <Field label="Budget Min (₹, optional)" icon={FileCheck} name="budget_min" type="number" min="0" step="0.01" number />
                          <Field label="Budget Max (₹, optional)" icon={FileCheck} name="budget_max" type="number" min="0" step="0.01" number />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">2 · Specifications & Description</h3>
                        <div className="space-y-4">
                          <Field label="Detailed Description" name="description" textarea placeholder="Describe in detail: intended use, finish preferences, durability requirements, dimensions, compliance / standards needed (e.g. BIS, ISO), tender reference, installation, delivery terms, etc. Be specific — this directly helps manufacturers quote accurately." required />
                          <div className="grid md:grid-cols-2 gap-4">
                            <Field label="Material Preference" icon={FileCheck} name="material" placeholder="e.g. Mild Steel + Laminate Top" />
                            <Field label="Color / Finish" icon={FileCheck} name="color" placeholder="e.g. Walnut Brown, Powder Coated Black" />
                            <Field label="Dimensions (approx)" icon={FileCheck} name="dimensions" placeholder="e.g. 1800W × 900D × 750H mm" />
                            <Field label="Required / Delivery Date" icon={FileCheck} name="required_by_date" type="date" />
                          </div>
                          <Field label="Additional Specifications / Notes" name="specifications" textarea placeholder="Certifications, drawings, standards, packing, brand preference, accessories, etc." />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">3 · Delivery Location</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Field label="Country" icon={MapPin} name="country" />
                          <Field label="State / Region" icon={MapPin} name="state" placeholder="e.g. Maharashtra, Delhi NCR" />
                          <Field label="City" icon={MapPin} name="city" placeholder="e.g. Mumbai" />
                          <div />
                          <div className="md:col-span-2">
                            <Field label="Full Delivery Address (optional)" icon={MapPin} name="delivery_address" placeholder="Site address, landmark, PIN, etc." />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">4 · Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Field label="Company / Organization" icon={Building} name="company_name" placeholder="Optional" />
                          <div />
                          <Field label="Contact Person Name" icon={User} name="contact_name" placeholder="Full name" required />
                          <Field label="Official Email" icon={Mail} name="contact_email" type="email" placeholder="procurement@company.com" required />
                          <Field label="Phone / Mobile" icon={Phone} name="contact_phone" placeholder="+91 ..." required />
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Visibility</label>
                            <select value={form.visibility} onChange={(e) => update('visibility', e.target.value)}
                              className="w-full pl-4 pr-4 py-3 rounded-xl border text-sm border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white transition">
                              <option value="public">🌐 Public — all sellers</option>
                              <option value="verified_sellers">✓ Verified sellers only</option>
                              <option value="invited_only">✉ Invited sellers</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {result && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                          className={`rounded-xl p-4 flex items-start gap-3 border text-sm ${result.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                          {result.ok ? <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" /> : <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />}
                          <div>
                            <p className="font-semibold">{result.ok ? 'Submitted' : 'Error'}</p>
                            <p className="opacity-90">{result.msg}</p>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 max-w-sm">
                          🔒 Your details are shared only with approved sellers. Admin moderates all requirements to prevent spam.
                        </p>
                        <button type="submit" disabled={loading}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:from-emerald-900 hover:to-black transition disabled:opacity-60">
                          {loading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>)
                            : (<>Submit Purchase Requirement <ChevronRight size={18} /></>)}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <aside className="space-y-5">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-600" /> Why Post Here?</h3>
                    <ul className="space-y-3 text-sm text-slate-700">
                      {[
                        '📨 One post → Multiple verified manufacturer quotes',
                        '🏛 Used by Government, PSUs, and Corporate procurement',
                        '✅ Admin verifies and approves all requirements',
                        '🏭 Pre-qualified sellers with GST / PAN on record',
                        '💰 No commission on direct buyer-seller deals',
                        '📄 Tender-ready technical specs support',
                      ].map((t) => (
                        <li key={t} className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-200 p-6">
                    <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2"><FileCheck size={18} /> Tips for Fast Quotes</h3>
                    <ol className="space-y-2 text-sm text-amber-900/90 list-decimal list-inside">
                      <li>Always add a realistic budget range</li>
                      <li>Specify exact dimensions & finishes</li>
                      <li>Mention tender / project reference if any</li>
                      <li>Upload sketches when possible (coming soon)</li>
                    </ol>
                  </div>
                  <Link to="/contact" className="block p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 bg-white transition group">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-900 mb-1 flex items-center gap-2">Need Help? <ChevronRight size={16} /></h4>
                    <p className="text-sm text-slate-600 group-hover:text-emerald-900/80">Talk to our procurement team directly.</p>
                  </Link>
                </aside>
              </motion.div>
            )}

            {tab === 'my' && auth.authenticated && (
              <motion.div key="my" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                {myRequirements.length === 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xl shadow-slate-200/50">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
                      <ClipboardList size={36} className="text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No requirements posted yet</h3>
                    <p className="text-slate-600 mb-5 max-w-md mx-auto">Post your first purchase requirement to start receiving quotes from verified sellers.</p>
                    <button onClick={() => setTab('post')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-semibold shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:from-emerald-900 hover:to-black transition">
                      <Plus size={18} /> Post Your First Requirement
                    </button>
                  </div>
                )}
                {myRequirements.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/40 p-6 hover:shadow-xl transition">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            r.status === STATUS_APPROVED ? 'bg-emerald-100 text-emerald-800' :
                            r.status === STATUS_PENDING ? 'bg-amber-100 text-amber-800' :
                            r.status === STATUS_REJECTED || r.status === STATUS_FAKE ? 'bg-red-100 text-red-800' :
                            r.status === STATUS_DELETED || r.status === STATUS_CLOSED ? 'bg-slate-100 text-slate-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {r.status || 'Pending'}
                          </span>
                          <span className="text-xs text-slate-500">
                            #{r.id} · Posted {r.created_at ? new Date(String(r.created_at)).toLocaleDateString() : '—'}
                          </span>
                          <span className="text-xs text-slate-500">· {r.required_quantity} {r.unit}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{r.title}</h3>
                        {r.product_name && <p className="text-sm text-emerald-700 font-semibold mb-2">Product: {r.product_name}</p>}
                        <p className="text-sm text-slate-600 line-clamp-2">{r.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4 text-xs text-slate-500">
                          {r.budget_min || r.budget_max ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                              💰 Budget: {r.budget_min ? `₹${Number(r.budget_min).toLocaleString('en-IN')}` : ''} {r.budget_max ? ` – ₹${Number(r.budget_max).toLocaleString('en-IN')}` : ''}
                            </span>
                          ) : null}
                          {r.city || r.state || r.country ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                              <MapPin size={12} /> {[r.city, r.state, r.country].filter(Boolean).join(', ')}
                            </span>
                          ) : null}
                          {r.required_by_date ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-semibold">
                              Need by {new Date(String(r.required_by_date)).toLocaleDateString()}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-3">
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-1">Quotes received</p>
                          <p className="text-2xl font-bold text-slate-900">{r.total_quotes_received || 0}</p>
                        </div>
                        {(r.status !== STATUS_DELETED) && (
                          <button onClick={() => onDelete(String(r.id))} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-red-700 text-sm font-semibold hover:bg-red-50 transition">
                            <Trash2 size={14} /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

const STATUS_PENDING = 'Pending';
const STATUS_APPROVED = 'Approved';
const STATUS_REJECTED = 'Rejected';
const STATUS_DELETED = 'Deleted';
const STATUS_CLOSED = 'Closed';
const STATUS_FAKE = 'Fake';
