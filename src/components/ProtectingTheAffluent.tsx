
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Lock, Smile, CheckCircle, UserCheck, Users, Building } from 'lucide-react';

const features = [
  { icon: Heart, title: 'Dignity', desc: 'Upholding dignity and respect for every individual.' },
  { icon: ShieldCheck, title: 'Safety', desc: 'Ensuring a safe and secure environment at all times.' },
  { icon: Lock, title: 'Privacy', desc: 'Maintaining strict confidentiality and privacy.' },
  { icon: Smile, title: 'Wellness', desc: 'Focusing on holistic well-being and quality of life.' },
  { icon: CheckCircle, title: 'Legal Transparency', desc: 'Operating with complete legal transparency and compliance.' },
  { icon: UserCheck, title: 'Quality Care', desc: 'Delivering compassionate and high-quality care services.' },
  { icon: Users, title: 'Companionship', desc: 'Fostering meaningful connections and companionship.' },
  { icon: Building, title: 'Daily Support', desc: 'Providing reliable daily support and assistance.' },
  { icon: ShieldCheck, title: 'Compliance', desc: 'Adhering to all regulatory standards and best practices.' }
];

export default function ProtectingTheAffluent() {
  return (
    <section className="relative overflow-hidden bg-dark py-24">
      <div className="container-x relative px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="font-sub text-sm uppercase tracking-[0.3em] text-gold"
          >
            Our Commitment
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl"
          >
            Protecting & Supporting
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lux glass p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold mb-6">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="font-body text-sm text-white/60">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
