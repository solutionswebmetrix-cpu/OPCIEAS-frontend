import Gallery from '../components/Gallery';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function GalleryPage() {
  return (
    <main>
      <SectionBanner
        title="OPCIEAS Gallery"
        tagline="A visual tour of our manufacturing, products and project deliveries"
        image={IMG.heroBg}
        crumb="Gallery"
        crumbTo="/gallery"
      />
      <Gallery />
    </main>
  );
}
