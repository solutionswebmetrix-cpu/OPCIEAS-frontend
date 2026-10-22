import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SectionBanner from '../components/SectionBanner';
import { IMG } from '../lib/images';

export default function TechBusinessPromotionPage() {
  return (
    <>
      <PageMeta
        title="Tech Business Promotion | OPCIEAS"
        description="OPCIEAS Tech Business Promotion connects governance, industrial promotion, transparency, trust, compliance, business networking, export promotion and quality standards."
        keywords="tech business promotion, portal governance, industrial promotion, transparency, trust, compliance, export promotion, quality standards"
      />
      <SectionBanner
        title="Tech Business Promotion"
        tagline="Portal Governance • Industrial Promotion • Transparency • Trust • Compliance • Business Networking • Export Promotion • Quality Standards"
        image={IMG.heroProduct}
        crumb="Tech Business Promotion"
        crumbTo="/"
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-x px-4 sm:px-6">
          <article className="mx-auto max-w-5xl text-navy">
            <h2 className="break-words font-heading text-3xl font-black leading-tight text-navy sm:text-4xl">
              A New Era for Indian Industrialists
            </h2>
            <div className="mt-5 h-1 w-20 rounded-full bg-accent-blue" aria-hidden="true" />

            <section className="mt-9">
              <h3 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-[26px]">The Present Reality</h3>
              <p className="mt-5 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">Dear Industrialist, Fellow Friend, and Seller,</p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                Our shared experiences have forced us to rethink how we do business and overcome the hardships we have faced for decades. Across India, manufacturers and industrialists have long depended on traditional advertisement portals that allow anyone to post buy leads -whether genuine or fabricated. Many of these so-called leads turn out to be minor retail needs or non-serious inquiries, yet platforms continue to circulate them simply to drive revenue.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                We have spent years following their instructions, only to find that the numbers provided were irrelevant, misleading, or purely retail and totally unsuitable for a manufacturer. Despite the lack of genuine returns, these portals return year after year to collect heavy annual subscriptions.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                We are not just a portal; we are fellow industrialists who have navigated these challenges for decades. Under visionary leadership, we are bringing changes that no traditional advertising or service Company has ever offered. If we do not unite for our own sake, no one else will. Coming together is the only remedy to grow our businesses, support our families, and strengthen our nation. This is the time to rise.
              </p>
              <blockquote className="mt-6 rounded-lg border-l-4 border-accent-blue bg-[#EAF1F8] px-5 py-5 font-body text-base leading-[1.75] text-navy sm:px-7 sm:text-[17px]">
                “Our digital platform uses smart matchmaking to seamlessly coordinate shared manpower, pooled procurement, and cross-facility manufacturing in real time.”
              </blockquote>
              <p className="mt-5 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                Because rewriting the fate of the Indian industry requires immense teamwork and joint resources, your wholehearted cooperation is everything. While a few are ready to step into the mainstream, we cannot achieve this transformation alone. As promised under our founding initiative, no subscription fees will be collected during this initial setup phase while we build our verified manufacturing base say the minimum number of memberships are confirmed.
              </p>
            </section>

            <section className="mt-11 border-t border-navy/10 pt-8">
              <h3 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-[26px]">Material Ad Production</h3>
              <h4 className="mt-4 font-heading text-xl font-bold leading-tight text-navy sm:text-2xl">Our Quality &amp; Market Standards</h4>
              <ul className="mt-5 list-disc space-y-4 pl-6 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <li>
                  <strong className="font-bold text-navy">Premium Sourcing &amp; Packaging:</strong> We source premium steel through long-term partnerships with India's leading producers, complemented by engineered wooden boards. By securing plywood below local market prices and providing specialized packaging, including multi-layered corrugated boxes, bubble packs, film packs, and related accessories
                </li>
              </ul>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Smart Manpower Sharing:</strong> Industry projects often experience lulls or idle periods lasting up to three months. Rather than letting valuable labor go to waste, we facilitate manpower sharing among industrialists.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">The Benefit:</strong> The lending employer recovers salary expenses while keeping their team engaged, the host industry gains experienced service without extra overhead to meet tight deadlines, and units with downtime can even allow partner companies to operate within their approved premises. This fosters a true cooperative bond where large and small units move forward together.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Direct Savings &amp; Trust:</strong> By cutting costs significantly through collective procurement, manpower pooling, and streamlined production processes, we pass direct savings on to the buyer. Backed by uncompromised quality, clear specifications, and superior packaging, we are reinstating the solid bond of trust between buyers and sellers that has been missing from the market for years.
              </p>
            </section>

            <section className="mt-11 border-t border-navy/10 pt-8">
              <h3 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-[26px]">Automated Registration Acknowledgment</h3>
              <p className="mt-2 font-body text-sm font-semibold leading-relaxed text-navy/75 sm:text-base">
                (For instant deployment via Email or WhatsApp upon registration)
              </p>
              <div className="mt-5 break-words rounded-lux border border-navy/15 bg-light-grey p-5 font-body text-base leading-[1.75] text-navy/80 sm:p-7">
                <p className="font-semibold text-navy">Subject: Welcome to the OPCIEAS Verified Network!</p>
                <p className="mt-4">Dear [Contact Person Name],</p>
                <p className="mt-4">Thank you for registering [Company Name] with OPCIEAS. We have successfully received your company details along with your confirmation to join our verified network.</p>
                <p className="mt-4">As part of our founding initiative, subscription fees will be collected only after we achieve the minimum required memberships. This means that building each category in our portal depends on your wholehearted cooperation. Your participation is vital - while some are ready to step into the mainstream, lasting change for Indian industry requires collective effort. Together, we can overcome financial challenges and create a stronger future through teamwork.</p>
                <p className="mt-4">Our team is currently reviewing your profile. Once we verify it, we'll add your company to our directory and notify you.</p>
                <p className="mt-4">Best regards,<br />Team OPCIEAS <a className="font-semibold text-accent-blue underline underline-offset-2" href="http://www.opcieas.co/">[www.opcieas.co]</a></p>
              </div>
            </section>

            <section className="mt-11 border-t border-navy/10 pt-8">
              <h3 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-[26px]">World-Class Manufacturing &amp; Global Reach</h3>
              <p className="mt-5 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                By putting these collaborative processes into action, we elevate our manufacturing to world-class standards, enabling all participating factories to produce items of uniform, unique quality.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Eliminating Counterproductive Competition:</strong> This cooperative model replaces cutthroat internal competition with mutual growth, stabilizes price fluctuations, and builds a collective mindset that completely eliminates substandard products.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Entering Global Markets:</strong> With operational issues resolved through quality materials and shared resources, we can successfully compete in export and global markets without compromising on price, quality, or packaging. Every raw material batch undergoes strict pre-production screening.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Regaining Market Presence:</strong> Targeting both domestic and global markets simultaneously allows us to overcome outdated practices, recover past losses to a great extent, and re-establish our market leadership both internally and externally.
              </p>
            </section>

            <section className="mt-11 border-t border-navy/10 pt-8">
              <h3 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-[26px]">Registration &amp; Verification Guidelines</h3>
              <p className="mt-5 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                By submitting your key company details, you transition from a passive visitor into a qualified, registered member.
              </p>
              <h4 className="mt-7 font-heading text-lg font-bold text-navy sm:text-xl">For Manufacturers &amp; Sellers:</h4>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">The Undertaking:</strong> We insist on a formal declaration or undertaking from manufacturers and sellers to supply high-quality products at competitive prices. Bulk purchasing and bulk orders result in major cost savings, allowing sellers to pass direct discounts on to buyers.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Quality Packaging:</strong> Strict adherence to accepted packaging standards prevents disputes and solidifies positive relations between the seller and buyer.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Independent Financials:</strong> All financial transactions take place strictly between the buyer and the seller. The portal plays no part in your financial settlements.
              </p>
              <h4 className="mt-7 font-heading text-lg font-bold text-navy sm:text-xl">For B2B Buyers:</h4>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Easy Registration:</strong> B2B buyers and institutions can register freely by providing company details along with personal contact information (Name, Phone, WhatsApp, E-mail, and a government issued Photo Identification card).
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                <strong className="font-bold text-navy">Active Status:</strong> You remain a permanent member as long as you place an order at least once every 12 months. Inactive profiles are automatically cleared to optimize resources, with reinstatement available on an extra fee.
              </p>
            </section>

            <section className="mt-11 border-t border-navy/10 pt-8">
              <h3 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-[26px]">Zero Tolerance for Misuse</h3>
              <p className="mt-5 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                To protect our community of serious business owners, any misuse of the portal by a seller or buyer - including fake documents, false information, or fraudulent buy requests - will result in the immediate and permanent deletion of their account with no option for reinstatement.
              </p>
              <p className="mt-4 font-body text-base leading-[1.75] text-navy/80 sm:text-[17px]">
                Suppliers on our portal focus entirely on regular business, high-quality products, and ultimate buyer satisfaction. Join us today to help lift the Indian industrial sector to unprecedented heights!
              </p>
            </section>
          </article>

          <div className="mx-auto mt-12 flex max-w-5xl flex-col items-stretch justify-center gap-4 border-t border-navy/10 pt-8 sm:flex-row sm:items-center">
            <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-sub text-base">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/rfq" className="btn-ghost inline-flex items-center justify-center rounded-full px-7 py-3 font-sub text-base">
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
