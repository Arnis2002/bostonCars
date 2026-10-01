import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { GarageProvider } from './contexts/GarageContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { VehicleDetail } from './pages/VehicleDetail';
import { SellTrade } from './pages/SellTrade';
import { Financing } from './pages/Financing';
import { AboutVisit } from './pages/AboutVisit';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <GarageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/:vehicleId" element={<VehicleDetail />} />
              <Route path="sell-or-trade" element={<SellTrade />} />
              <Route path="financing" element={<Financing />} />
              <Route path="about" element={<AboutVisit />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GarageProvider>
    </MotionConfig>);

}