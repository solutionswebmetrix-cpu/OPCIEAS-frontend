import PageMeta from '../components/PageMeta';
import Hero from '../components/Hero';
import HomepageIntro from '../components/HomepageIntro';
import WhyChooseUs from '../components/WhyChooseUs';
import Manufacturing from '../components/Manufacturing';
import Products from '../components/Products';
import Industries from '../components/Industries';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import HomepageFurnitureSequence from '../components/HomepageFurnitureSequence';
import HomepageHostelSequence from '../components/HomepageHostelSequence';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Cpu, Building2, Heart, Ship, Globe, FileCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBusinessVerticalImages, type BusinessVerticalKey } from '../lib/businessVerticalImages';

import educationalFurnitureImage from '../assets/Educational Furniture.png';
import schoolFurnitureImage from '../assets/School Furniture.png';
import hostelFurnitureImage from '../assets/Hostel Furniture.png';
import industrialStorageImage from '../assets/Warehouse Racks.png';
import bathroomCollectionImage from '../assets/Bathroom Storage.png';
import letterBoxImage from '../assets/Letter Boxes.png';

function BusinessVerticalImage({ title, category }: { title: string; category: BusinessVerticalKey }) {
  const images = getBusinessVerticalImages(category);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [images.length, paused]);

  return (
    <div
      className="relative h-52 overflow-hidden rounded-t-lux bg-light-grey"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`${title} ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
          {images.map((image, index) => (
            <span key={image} className={`h-1.5 w-1.5 rounded-full ${index === activeIndex ? 'bg-gold' : 'bg-white/75'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [selectedResponse, setSelectedResponse] = useState<'YES' | 'NO' | null>(null);

  const buyerPositioning = [
    'DIRECT / FACTORY SUPPLY',
    'BULK ORDERS',
    'INSTITUTIONAL PROJECTS',
    'GOVERNMENT TENDERS',
    'EXPORT SUPPLY',
  ];

  const collectionCards = [
    {
      title: 'Educational Furniture',
      image: educationalFurnitureImage,
      description: 'Classroom, lecture, and higher-education furniture for schools, colleges, and teaching spaces.',
      link: '/products/category/educational-furniture',
    },
    {
      title: 'School Furniture',
      image: schoolFurnitureImage,
      description: 'Student desks, classroom seating and practical learning furniture for school environments.',
      link: '/products/category/school-furniture',
    },
    {
      title: 'Hostel Furniture',
      image: hostelFurnitureImage,
      description: 'Durable hostel and dormitory furniture designed for compact, high-use occupancy layouts.',
      link: '/products/category/hostel-furniture',
    },
    {
      title: 'Industrial Storage',
      image: industrialStorageImage,
      description: 'Steel storage solutions, racks, lockers and warehouse-ready systems for bulk operations.',
      link: '/products/category/industrial-storage',
    },
    {
      title: 'Bathroom Collection',
      image: bathroomCollectionImage,
      description: 'Practical bathroom and utility storage for institutional and commercial environments.',
      link: '/products/category/bathroom-collection',
    },
    {
      title: 'Letter Box',
      image: letterBoxImage,
      description: 'Secure letter and mailbox solutions for institutional and community-facing projects.',
      link: '/products/category/letter-boxes',
    },
  ];

  const buyerUseCases = [
    'GOVERNMENT TENDERS',
    'EDUCATIONAL INSTITUTIONS',
    'SCHOOLS & COLLEGES',
    'HOSTELS',
    'INSTITUTIONAL PROJECTS',
    'COMMERCIAL PROJECTS',
    'INTERNATIONAL BUYERS',
  ];

  return (
    <div className="homepage">
      <PageMeta
        title="OPCIEAS Pvt. Ltd. | Institutional Furniture & Bulk Supply"
        description="OPCIEAS supplies bulk institutional furniture, educational furniture, industrial storage, and custom project manufacturing for government and export buyers."
        keywords="OPCIEAS, institutional furniture, educational furniture, storage solutions, bulk supply, government tenders, export buyers"
      />

      <Hero />

      <section className="border-y border-navy/5 bg-white py-4">
        <div className="container-x px-6">
          <div className="grid gap-3 md:grid-cols-5">
            {buyerPositioning.map((item) => (
              <div key={item} className="rounded-full border border-navy/10 bg-light-grey px-4 py-3 text-center font-sub text-[10px] uppercase tracking-[0.25em] text-navy/75">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="what-we-manufacture" className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-x px-6">
          <div className="mb-8 text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">What We Manufacture</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Commercial furniture and institutional supply built for bulk projects.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {collectionCards.map((item) => (
              <Link key={item.title} to={item.link} className="group overflow-hidden rounded-lux border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-64 overflow-hidden bg-light-grey p-3">
                  <img src={item.image} alt={item.title} className="h-full w-full rounded-[14px] object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                </div>
                <div className="flex min-h-[12rem] flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-2xl font-black text-navy">{item.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-navy/70">{item.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-sub text-sm font-semibold text-gold">
                    View Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomepageFurnitureSequence />

      <Products />

      <Manufacturing />

      <section className="border-t border-navy/10 bg-light-grey py-10 sm:py-12 lg:py-14">
        <div className="container-x px-6">
          <div className="mb-7 text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Custom / Project Supply</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Custom dimensions, project requirements and bulk production support.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {[
              'Custom Dimensions',
              'Project Requirements',
              'Bulk Production',
              'Institutional Supply',
              'OEM / Custom Production',
            ].map((item) => (
              <div key={item} className="rounded-lux border border-navy/10 bg-white p-5 text-center shadow-sm">
                <p className="font-sub text-[10px] uppercase tracking-[0.28em] text-gold">Project</p>
                <h3 className="mt-3 font-heading text-xl font-black text-navy">{item}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/rfq" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 font-sub text-sm">
              Request Custom Manufacturing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <HomepageHostelSequence />

      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-x px-6">
          <div className="mb-7 text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Who We Serve</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Buyer use cases and institutional project categories.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {buyerUseCases.map((item) => (
              <div key={item} className="rounded-lux border border-navy/10 bg-light-grey p-5 text-center font-sub text-xs uppercase tracking-[0.22em] text-navy/75 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Industries />

      <section className="bg-[#F0F4F9] py-10 sm:py-12 lg:py-14">
        <div className="container-x px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">For International Buyers</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Bulk institutional furniture supply and export-oriented manufacturing support.</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-navy/70">
              OPCIEAS provides commercial furniture, school and hostel systems, and custom supply support for institutional and export-focused procurement projects.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              'Requirement',
              'Product / Specification Review',
              'Sample / Approval',
              'Bulk Manufacturing',
              'Quality Inspection',
              'Packing & Logistics',
            ].map((step, index) => (
              <div key={step} className="rounded-lux border border-navy/10 bg-white p-5 shadow-sm">
                <p className="font-sub text-[10px] uppercase tracking-[0.28em] text-gold">0{index + 1}</p>
                <h3 className="mt-3 font-heading text-xl font-black text-navy">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageIntro />

      <WhyChooseUs />

      <section className="relative overflow-hidden bg-light-grey py-12 sm:py-14 lg:py-16">
        <div className="container-x relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-sub text-xs uppercase tracking-[0.35em] text-gold">Request Quote</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-navy sm:text-4xl">Request a bulk quote for your next institutional or export requirement.</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-navy/75">
              Share your product requirement, quantity, project type, specification, location, sample need and message to receive a commercial response.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link to="/rfq" className="btn-gold flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm">
                Request Bulk Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/catalogue" className="btn-ghost flex items-center gap-2 rounded-full px-8 py-3 font-sub text-sm">
                <FileText className="h-4 w-4" /> Request Full Catalogue
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
