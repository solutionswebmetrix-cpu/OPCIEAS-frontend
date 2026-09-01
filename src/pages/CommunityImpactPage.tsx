import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, Sun, Fish, Users, TreePine, Award } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import Gallery from '../components/Gallery';
import { IMG } from '../lib/images';

export default function CommunityImpactPage() {
  const initiatives = [
    {
      icon: Users,
      title: 'Self Help Groups',
      desc: 'Empowering women and grassroots collectives through SHG formation, savings discipline, micro-enterprise enablement, and financial literacy that build financial independence.',
      stats: 'Supporting 100+ SHGs',
    },
    {
      icon: Leaf,
      title: 'Village Development',
      desc: 'Upgrading rural infrastructure through participatory planning—water and sanitation, community buildings, livelihood support systems, and sustainable local development.',
      stats: '50+ villages supported',
    },
    {
      icon: Sun,
      title: 'Solar Adoption',
      desc: 'Bringing clean, reliable electricity through rooftop solar, off-grid systems, solar street lighting, and solar-powered community centres—reducing energy poverty and advancing renewable vision.',
      stats: '10,000+ lives impacted',
    },
    {
      icon: Fish,
      title: 'Aquaculture & Fisheries',
      desc: 'Supporting coastal and inland communities with technical guidance, quality inputs, market linkages, and sustainable harvesting practices—protecting livelihoods and ecosystems.',
      stats: '2,000+ farmers trained',
    },
    {
      icon: Heart,
      title: 'Elder Lifestyle',
      desc: 'Creating dignified living environments for seniors—companionship, wellness programmes, accessible infrastructure, and age-friendly community spaces for secure and active living.',
      stats: '500+ elders supported',
    },
    {
      icon: TreePine,
      title: 'Sustainable Prosperity',
      desc: 'Ensuring outcomes are socially equitable, economically viable, and ecologically regenerative—for today, tomorrow, and generations to come.',
      stats: 'Long-term impact focus',
    },
  ];

  const impact_areas = [
    {
      category: 'Economic Empowerment',
      items: [
        'Micro-enterprise startup support',
        'Market linkage for farmers and producers',
        'Women economic participation',
        'Skill development and training',
      ],
    },
    {
      category: 'Social Development',
      items: [
        'Community infrastructure',
        'Water and sanitation access',
        'Education and literacy support',
        'Healthcare awareness programmes',
      ],
    },
    {
      category: 'Environmental Sustainability',
      items: [
        'Renewable energy adoption',
        'Sustainable aquaculture',
        'Natural resource management',
        'Climate resilience building',
      ],
    },
    {
      category: 'Quality of Life',
      items: [
        'Elder care and dignity',
        'Child welfare programmes',
        'Safety and security initiatives',
        'Community wellness activities',
      ],
    },
  ];

  const metrics = [
    { number: '50+', label: 'Villages Impacted' },
    { number: '10K+', label: 'Direct Beneficiaries' },
    { number: '20+', label: 'Initiative Types' },
    { number: '100%', label: 'Community-Led' },
  ];

  return (
    <>
      <PageMeta
        title="Community Impact & Social Services | OPCIEAS"
        description="OPCIEAS Social Services Division: Rural development, self-help groups, solar adoption, aquaculture, fisheries, elder care. Community-led sustainable prosperity for rural and coastal India."
        keywords="social services, community development, rural development, sustainable agriculture, solar energy, elder care, social impact"
      />

      {/* Banner */}
      <SectionBanner
        title="Community Impact & Social Services"
        tagline="Community-Led • Sustainable Development • Social Prosperity"
        image={IMG.heroBg}
        crumb="Community Impact"
        crumbTo="/"
      />

      {/* Vision Statement */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-[100px] animate-float" />
          <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-navy-3/10 blur-[120px] animate-float-slow" />
        </div>

        <div className="container-x relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Our Mission
            </motion.p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl xl:text-5xl">
              Sustainable Prosperity for Rural & Coastal Communities
            </h2>
            <p className="mt-8 font-body text-lg leading-relaxed text-navy/75">
              OPCIEAS Social Services division is dedicated to community-led, sustainable development. We believe in empowering people through initiatives that build financial independence, upgrade infrastructure, provide clean energy access, strengthen agricultural livelihoods, and ensure dignity for every generation.
            </p>
            <p className="mt-6 font-body text-lg font-semibold text-navy">
              <span className="text-gold">Every intervention is measured by its ability to deliver</span><br />
              <span className="italic">Socially just, economically viable, ecologically regenerative outcomes.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-lux border border-border-grey bg-white p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-heading font-black text-gold mb-2">{metric.number}</div>
                <p className="font-heading text-lg font-bold text-navy">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Core Initiatives */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Our Initiatives
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Six Pillars of Community Development
            </motion.h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((init, i) => {
              const Icon = init.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-lux border border-border-grey bg-gradient-to-br from-white to-blue-50/30 p-8 transition-all duration-300 hover:border-gold hover:shadow-lg"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/5 transition-all group-hover:bg-gold/10" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/15 text-gold transition-all group-hover:bg-gold/25">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-navy">{init.title}</h3>
                    <p className="mt-3 font-body text-sm text-navy/70 leading-relaxed">{init.desc}</p>
                    <p className="mt-4 font-sub text-xs font-semibold text-gold uppercase">{init.stats}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Areas Grid */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Thematic Areas
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Comprehensive Development Focus
            </motion.h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impact_areas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lux border border-border-grey bg-white p-8 hover:shadow-lg transition-all"
              >
                <h3 className="font-heading text-lg font-bold text-gold mb-4">{area.category}</h3>
                <ul className="space-y-3">
                  {area.items.map((item, j) => (
                    <li key={j} className="flex gap-3 font-body text-sm text-navy/70">
                      <span className="text-gold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community-Led Approach */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sub text-xs uppercase tracking-[0.3em] text-gold mb-4">
                Our Philosophy
              </p>
              <h2 className="font-heading text-3xl font-black text-navy sm:text-4xl mb-6">
                Community-Led Development
              </h2>
              <p className="font-body text-navy/75 leading-relaxed mb-6">
                Every initiative begins with community voices. We listen to local needs, respect traditional knowledge, and work with local leaders, self-help groups, and grassroots organizations to design and implement solutions.
              </p>
              <ul className="space-y-4">
                {[
                  'Participatory planning with community involvement',
                  'Local leadership and ownership of projects',
                  'Respect for cultural and social contexts',
                  'Transparency in planning and execution',
                  'Accountability to community stakeholders',
                  'Long-term sustainability focus, not quick fixes',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-navy/70">
                    <Award className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-lux overflow-hidden border border-border-grey bg-gradient-to-br from-gold/10 to-blue-50/50"
            >
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Heart className="h-20 w-20 text-gold/60 mx-auto mb-4" />
                  <p className="font-body text-navy/60 italic">
                    "Community-led sustainable development ensures that prosperity is shared, equitable, and rooted in local wisdom and aspirations."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative overflow-hidden bg-light-grey py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sub text-xs uppercase tracking-[0.3em] text-gold"
            >
              Impact Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl"
            >
              Community Impact Gallery
            </motion.h2>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Support Community Development */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="container-x px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lux border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-8 sm:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <Heart className="h-6 w-6 text-gold" />
                <h3 className="font-heading text-xl font-bold text-navy">Support Our Initiatives</h3>
              </div>
              <p className="font-body text-navy/75 leading-relaxed mb-6">
                OPCIEAS Social Services invites partnerships, sponsorships, and collaborations from corporations, foundations, governments, and individuals committed to sustainable rural development and community empowerment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-sub text-sm font-semibold text-navy hover:bg-gold/90 transition-all"
                >
                  Become a Partner <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-6 py-3 font-sub text-sm font-semibold text-navy hover:bg-gold/10 transition-all"
                >
                  Learn More About Initiatives
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-navy/95 py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px] animate-float-slow" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/10 blur-[120px] animate-float" />
        </div>

        <div className="container-x relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading text-3xl font-black text-white sm:text-4xl xl:text-5xl">
              Join Us in Building Sustainable Prosperity
            </h2>
            <p className="mt-4 font-body text-lg text-white/85">
              Connect with our community development initiatives, support rural transformation, and create lasting impact.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="btn-gold flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/social-services"
                className="btn-white-ghost flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm"
              >
                Explore Social Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
