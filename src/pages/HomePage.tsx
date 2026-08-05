import PageMeta from '../components/PageMeta';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Manufacturing from '../components/Manufacturing';
import Products from '../components/Products';
import Industries from '../components/Industries';
import GovernmentTender from '../components/GovernmentTender';
import Export from '../components/Export';
import QualityControl from '../components/QualityControl';
import Clients from '../components/Clients';
import Gallery from '../components/Gallery';
import Certificates from '../components/Certificates';
import Testimonials from '../components/Testimonials';
import RFQ from '../components/RFQ';
import Contact from '../components/Contact';
import QualityCommitment from '../components/QualityCommitment';
import MarketsServed from '../components/MarketsServed';
import ProtectingTheAffluent from '../components/ProtectingTheAffluent';

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="OPCIEAS | Premium Commercial Furniture Manufacturer"
        description="OPCIEAS is a premium commercial furniture manufacturer specializing in government tenders, corporate interiors, institutional projects, and export-ready furniture solutions."
        keywords="commercial furniture manufacturer, government tender furniture, export furniture, corporate interiors, institutional furniture, educational furniture, office furniture, industrial storage"
      />
      <Hero />
      <About />
      <WhyChooseUs />
      <Manufacturing />
      <Products />
      <Industries />
      <MarketsServed />
      <GovernmentTender />
      <Export />
      <QualityCommitment />
      <QualityControl />
      <Clients />
      <Gallery />
      <Certificates />
      <Testimonials />
      <ProtectingTheAffluent />
      <RFQ />
      <Contact />
    </>
  );
}
