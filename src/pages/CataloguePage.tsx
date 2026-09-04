import { useMemo } from 'react';
import { Download, ExternalLink, FileText, Loader2 } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';

const catalogueFiles = [
  'EDUCATION FIRNITURE CATALOGUE (1)_compressed.pdf',
  'EDUCATIONAL KID’s SAFETY FURNITURE WITH PLASTIC - CATALOGUE (2)_compressed.pdf',
  'OFFICE FURNITURE CATALOGUE (1)-compressed.pdf',
  'OPCIEAS  RACK CATALOGUE-compressed.pdf',
  'OPCIEAS ALMIRAH CATALOGUE (1)_compressed.pdf',
  'OPCIEAS OFFICE WORKSTATION CATALOGUE-compressed.pdf',
  'OPCIEAS STADIUM CHAIRS CATALOGUE_compressed.pdf',
  'OPCIEAS TABLE CATALOGUE (1) (1).pdf',
  'Opcieas Textiles Catalogue-compressed.pdf',
  'Trusted Institutional Furniture Solutions (2)_compressed.pdf',
];

const catalogueMap = catalogueFiles.map((name, index) => {
  const slug = name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim();

  return {
    id: `${slug}-${index}`,
    name,
    url: new URL(`../assets/Catalogue/${name}`, import.meta.url).href,
    category: index < 2 ? 'Educational Furniture' : index < 4 ? 'Storage' : index < 7 ? 'Institutional Furniture' : index < 9 ? 'Textiles' : 'Other Catalogue',
    description: 'Official OPCIEAS catalogue document for institutional supply and procurement reference.',
  };
});

export default function CataloguePage() {
  const grouped = useMemo(() => {
    return catalogueMap.reduce<Record<string, typeof catalogueMap>>((acc, item) => {
      acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
      return acc;
    }, {});
  }, []);

  return (
    <>
      <PageMeta
        title="Catalogue | OPCIEAS"
        description="Download OPCIEAS catalogues and product reference PDFs for institutional furniture, storage, textiles and related business solutions."
        keywords="OPCIEAS catalogue, furniture catalogue, PDF catalogue, institutional furniture catalogue, download catalogue"
      />
      <SectionBanner
        title="Catalogue"
        tagline="Official OPCIEAS product catalogues and publication sheets"
        image="/images/hero-bg.jpg"
        crumb="Catalogue"
        crumbTo="/"
      />

      <section className="bg-white py-20">
        <div className="container-x px-6">
          <div className="mb-8 flex items-center gap-3 rounded-lux border border-gold/30 bg-gold/5 p-4 text-sm text-navy/80">
            <FileText className="h-5 w-5 text-gold" />
            All catalogue PDFs are preserved in their original file names and are available for viewing and download.
          </div>

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h2 className="mb-6 font-heading text-2xl font-black text-navy">{category}</h2>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <article key={item.id} className="rounded-lux border border-navy/10 bg-light-grey p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="flex h-20 items-center justify-center rounded-xl border border-gold/20 bg-white text-gold">
                      <FileText className="h-10 w-10" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-navy">{item.name}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-navy/70">{item.description}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 font-sub text-xs text-white">
                        <ExternalLink className="h-4 w-4" /> Open Catalogue
                      </a>
                      <a href={item.url} download={item.name} className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-4 py-2.5 font-sub text-xs text-navy">
                        <Download className="h-4 w-4" /> Download PDF
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-center">
            <a href="/opcieas-presentation.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-3 font-sub text-sm text-navy">
              Open Presentation <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
