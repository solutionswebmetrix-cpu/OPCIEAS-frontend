import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Upload, Send, Loader2, CheckCircle, Check, ChevronLeft, Mail } from 'lucide-react';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';
import { fetchCareers, fetchCareer, submitJobApplication, type Career } from '../lib/data';

export default function CareersPage() {
  const { slug } = useParams<{ slug: string }>();
  const [jobs, setJobs] = useState<Career[]>([]);
  const [selected, setSelected] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', resume_url: '', cover_letter: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    (async () => {
      const j = await fetchCareers();
      setJobs(j);
      if (slug) {
        const s = j.find((x) => x.slug === slug) || await fetchCareer(slug);
        setSelected(s);
      }
      setLoading(false);
    })();
  }, [slug]);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitJobApplication({ ...form, job_id: selected?.id || '' });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', resume_url: '', cover_letter: '' });
    } catch { setStatus('error'); }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-navy"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>;

  return (
    <>
      <SectionBanner title="Careers" tagline="Join the OPCIEAS team" image={IMG.heroBg} crumb="Careers" crumbTo="/company/careers" />

      {/* Job listings or detail */}
      <section className="bg-white py-20">
        <div className="container-x px-6">
          {selected ? (
            <div>
              <Link to="/company/careers" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 font-sub text-sm text-navy/60 hover:text-gold"><ChevronLeft className="h-4 w-4" /> Back to Openings</Link>
              <div className="mt-6 grid gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="font-heading text-3xl font-black text-navy">{selected.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-4 font-sub text-sm text-navy/60">
                    {selected.department && <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {selected.department}</span>}
                    {selected.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {selected.location}</span>}
                    {selected.type && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {selected.type}</span>}
                    {selected.experience && <span className="flex items-center gap-1"><Check className="h-4 w-4" /> {selected.experience}</span>}
                  </div>
                  {selected.description && <p className="mt-6 font-body text-sm leading-relaxed text-navy/70">{selected.description}</p>}
                  {selected.requirements?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-heading text-lg font-bold text-navy">Requirements</h3>
                      <ul className="mt-3 space-y-2">
                        {selected.requirements.map((r, i) => <li key={i} className="flex items-start gap-2 font-sub text-sm text-navy/70"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" /> {r}</li>)}
                      </ul>
                    </div>
                  )}
                  <div className="mt-8 rounded-lux bg-navy/5 p-6">
                    <h3 className="font-heading text-base font-bold text-navy">HR Contact</h3>
                    <p className="mt-2 font-sub text-sm text-navy/60">For queries, contact our HR team:</p>
                    <a href="mailto:hr@opcieas.com" className="mt-2 inline-flex items-center gap-2 font-sub text-sm text-gold"><Mail className="h-4 w-4" /> hr@opcieas.com</a>
                  </div>
                </div>

                {/* Apply form */}
                <div className="rounded-lux bg-navy p-8">
                  {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="mb-3 h-12 w-12 text-green-400" />
                      <h3 className="font-heading text-lg font-bold text-white">Application Submitted!</h3>
                      <p className="mt-2 font-sub text-sm text-white/60">Our HR team will review and contact you.</p>
                      <button onClick={() => setStatus('idle')} className="mt-4 rounded-full bg-white/10 px-5 py-2 font-sub text-xs text-white hover:bg-white/20">Submit Another</button>
                    </div>
                  ) : (
                    <form onSubmit={apply} className="space-y-3">
                      <h3 className="font-heading text-xl font-bold text-white">Apply for this Position</h3>
                      <input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full Name *" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                      <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email *" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                      <input required value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Phone *" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                      <input value={form.resume_url} onChange={(e) => set('resume_url', e.target.value)} placeholder="Resume URL (Google Drive / Dropbox link)" className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                      <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10">
                        <Upload className="h-4 w-4 text-gold" />
                        <span className="font-sub text-xs text-white/50">Upload resume to Google Drive / Dropbox and paste the link above</span>
                      </div>
                      <textarea value={form.cover_letter} onChange={(e) => set('cover_letter', e.target.value)} placeholder="Cover Letter" rows={4} className="w-full rounded-xl bg-white/5 px-4 py-2.5 font-sub text-sm text-white placeholder-white/30 outline-none ring-1 ring-white/10 focus:ring-gold" />
                      <button type="submit" disabled={status === 'loading'} className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
                        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="h-4 w-4" /> Submit Application</>}
                      </button>
                      {status === 'error' && <p className="text-center font-sub text-xs text-red-400">Something went wrong. Please try again.</p>}
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h2 className="mb-8 font-heading text-2xl font-black text-navy sm:text-3xl">Current Openings</h2>
              {jobs.length === 0 ? (
                <div className="py-20 text-center"><p className="font-sub text-sm text-navy/50">No openings at this time. Please check back later.</p></div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((j, i) => (
                    <motion.div key={j.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                      <Link to={`/company/careers/${j.slug}`} className="group flex flex-col gap-3 rounded-lux bg-navy/5 p-6 transition hover:bg-navy/10 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-heading text-lg font-bold text-navy">{j.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-4 font-sub text-xs text-navy/60">
                            {j.department && <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {j.department}</span>}
                            {j.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {j.location}</span>}
                            {j.type && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {j.type}</span>}
                            {j.experience && <span className="flex items-center gap-1"><Check className="h-3 w-3" /> {j.experience}</span>}
                          </div>
                        </div>
                        <span className="flex items-center gap-1 font-sub text-sm text-gold transition group-hover:gap-2">View & Apply <ArrowRight className="h-4 w-4" /></span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
