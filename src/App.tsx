import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { ToastProvider } from './contexts/ToastContext';
import { GarageProvider } from './contexts/GarageContext';
import { LeadModalProvider } from './contexts/LeadModalContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/Home';

const InventoryPage = lazy(() => import('./pages/Inventory').then((m) => ({ default: m.InventoryPage })));
const VehicleDetailsPage = lazy(() => import('./pages/VehicleDetails').then((m) => ({ default: m.VehicleDetailsPage })));
const FinancingPage = lazy(() => import('./pages/Financing').then((m) => ({ default: m.FinancingPage })));
const SellTradePage = lazy(() => import('./pages/SellTrade').then((m) => ({ default: m.SellTradePage })));
const AboutPage = lazy(() => import('./pages/About').then((m) => ({ default: m.AboutPage })));
const ReviewsPage = lazy(() => import('./pages/Reviews').then((m) => ({ default: m.ReviewsPage })));
const ContactPage = lazy(() => import('./pages/Contact').then((m) => ({ default: m.ContactPage })));
const SavedPage = lazy(() => import('./pages/Saved').then((m) => ({ default: m.SavedPage })));
const ComparePage = lazy(() => import('./pages/Compare').then((m) => ({ default: m.ComparePage })));
const LegalPage = lazy(() => import('./pages/Legal').then((m) => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFoundPage })));

function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/:slug" element={<VehicleDetailsPage />} />
          <Route path="/financing" element={<FinancingPage />} />
          <Route path="/sell-trade" element={<SellTradePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/privacy" element={<LegalPage doc="privacy" />} />
          <Route path="/terms" element={<LegalPage doc="terms" />} />
          <Route path="/accessibility" element={<LegalPage doc="accessibility" />} />
          <Route path="/disclaimers" element={<LegalPage doc="disclaimers" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Suspense>);

}

export function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ToastProvider>
          <GarageProvider>
            <LeadModalProvider>
              <SiteLayout>
                <AppRoutes />
              </SiteLayout>
            </LeadModalProvider>
          </GarageProvider>
        </ToastProvider>
      </MotionConfig>
    </BrowserRouter>);

}