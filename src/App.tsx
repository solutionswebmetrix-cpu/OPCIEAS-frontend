import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import SellerRegisterPage from './pages/SellerRegisterPage';
import PurchaseRequirementPage from './pages/PurchaseRequirementPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [skipSplash, setSkipSplash] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('opcieas_intro') === 'played') {
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
          <Route path="/agriculture" element={<AgriculturePage />} />
          <Route path="/social-services" element={<SocialServicesPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:slug" element={<ProductCategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/rfq" element={<RFQ />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/company/:page" element={<CompanyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/buyer/register" element={<BuyerRegisterPage />} />
          <Route path="/buyer/login" element={<BuyerLoginPage />} />
          <Route path="/seller/register" element={<SellerRegisterPage />} />
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
