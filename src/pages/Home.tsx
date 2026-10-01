import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { Hero } from '../components/home/Hero';
import { InventorySearch } from '../components/home/InventorySearch';
import { TrustStrip } from '../components/home/TrustStrip';
import { FeaturedInventory } from '../components/home/FeaturedInventory';
import { BodyStyleSelector } from '../components/home/BodyStyleSelector';
import { FinancingCTA } from '../components/home/FinancingCTA';
import { HowItWorks } from '../components/home/HowItWorks';
import { VehicleFinder } from '../components/home/VehicleFinder';
import { TradeInCTA } from '../components/home/TradeInCTA';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { LocationSection } from '../components/home/LocationSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { container } from '../utils/styles';

export function HomePage() {
  const { vehicles, status, retry } = useInventory();

  useSeo({
    title: 'Used Cars, Trucks & SUVs in Grove City, OH | Southwest Auto Sale',
    description:
    'Shop dependable pre-owned cars, trucks and SUVs at Southwest Auto Sale in Grove City, Ohio. Browse inventory, explore financing options or call (614) 594-2940.',
    path: '/'
  });

  return (
    <PageTransition>
      <Hero />
      <div className={`${container} relative z-10 -mt-20 lg:-mt-24`}>
        <InventorySearch vehicles={vehicles} />
      </div>
      <TrustStrip />
      <FeaturedInventory vehicles={vehicles} status={status} onRetry={retry} />
      <BodyStyleSelector vehicles={vehicles} />
      <FinancingCTA />
      <HowItWorks />
      <VehicleFinder />
      <TradeInCTA />
      <ReviewsSection />
      <LocationSection />
      <FinalCTA />
    </PageTransition>);

}