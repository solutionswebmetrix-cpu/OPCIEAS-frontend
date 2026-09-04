import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LiveChatWidget from './components/LiveChatWidget';
import SplashScreen from './components/SplashScreen';
import RFQ from './components/RFQ';
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import IndustryPage from './pages/IndustryPage';
import CompanyPage from './pages/CompanyPage';
import CompanyAboutPage from './pages/CompanyAboutPage';
import ExportPage from './pages/ExportPage';
import GalleryPage from './pages/GalleryPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import CompliancePage from './pages/CompliancePage';
import FurniturePage from './pages/FurniturePage';
import TechnologyPage from './pages/TechnologyPage';
import AgriculturePage from './pages/AgriculturePage';
import SocialServicesPage from './pages/SocialServicesPage';
import NotFoundPage from './pages/NotFoundPage';
import CareersPage from './pages/CareersPage';
import BuyerRegisterPage from './pages/BuyerRegisterPage';
import BuyerLoginPage from './pages/BuyerLoginPage';
import BuyerApplicationPage from './pages/BuyerApplicationPage';
import SellerRegisterPage from './pages/SellerRegisterPage';
import SupplierApplicationPage from './pages/SupplierApplicationPage';
import PurchaseRequirementPage from './pages/PurchaseRequirementPage';
import InitiativePage from './pages/InitiativePage';
import ManufacturingPage from './pages/ManufacturingPage';
import QualityPage from './pages/QualityPage';
import AllIndustriesPage from './pages/AllIndustriesPage';
import GovernmentTendersPage from './pages/GovernmentTendersPage';
import SupplierPage from './pages/SupplierPage';
import BuyerPage from './pages/BuyerPage';
import CommunityImpactPage from './pages/CommunityImpactPage';
import TechBusinessPromotionPage from './pages/TechBusinessPromotionPage';
import FurnitureTextilesPage from './pages/FurnitureTextilesPage';
import MembershipPage from './pages/MembershipPage';
import CataloguePage from './pages/CataloguePage';
import PaymentInstructionsPage from './pages/PaymentInstructionsPage';
import BusinessVerticalPage from './pages/BusinessVerticalPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [skipSplash, setSkipSplash] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('opcieas_intro_played') === 'true') {
      setSkipSplash(true);
    }
  }, []);

  const handleSplashComplete = () => setSkipSplash(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!skipSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/furniture" element={<FurniturePage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/tech-business-promotion" element={<TechBusinessPromotionPage />} />
          <Route path="/furniture-textiles" element={<FurnitureTextilesPage />} />
          <Route path="/agriculture" element={<AgriculturePage />} />
          <Route path="/social-services" element={<SocialServicesPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/payment-instructions" element={<PaymentInstructionsPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/presentation" element={<Navigate to="/opcieas-presentation.html" replace />} />
          <Route path="/community-impact" element={<CommunityImpactPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/buyer" element={<BuyerPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/vertical/:verticalSlug" element={<BusinessVerticalPage />} />
          <Route path="/products/category/:slug" element={<ProductCategoryPage />} />
          <Route path="/products/:slug" element={<ProductCategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/category/:slug" element={<ProductCategoryPage />} />
          <Route path="/service/:slug" element={<InitiativePage />} />
          <Route path="/page/:slug" element={<CompanyPage />} />
          <Route path="/rfq" element={<RFQ />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/manufacturing" element={<ManufacturingPage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/industries" element={<AllIndustriesPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/government-tenders" element={<GovernmentTendersPage />} />
          <Route path="/company/about" element={<CompanyAboutPage />} />
          <Route path="/company/:page" element={<CompanyPage />} />
          <Route path="/about" element={<CompanyAboutPage />} />
          <Route path="/about/:page" element={<CompanyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/company/careers" element={<CareersPage />} />
          <Route path="/company/careers/:slug" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<CareersPage />} />
          <Route path="/initiatives/:slug" element={<InitiativePage />} />
          <Route path="/initiative/:slug" element={<InitiativePage />} />
          <Route path="/buyer/register" element={<BuyerRegisterPage />} />
          <Route path="/buyer/login" element={<BuyerLoginPage />} />
          <Route path="/buyer/application" element={<BuyerApplicationPage />} />
          <Route path="/seller/register" element={<SellerRegisterPage />} />
          <Route path="/seller/application" element={<SupplierApplicationPage />} />
          <Route path="/requirements" element={<PurchaseRequirementPage />} />
          <Route path="/requirements/post" element={<PurchaseRequirementPage />} />
          <Route path="/requirements/my" element={<PurchaseRequirementPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <LiveChatWidget />
    </BrowserRouter>
  );
}
