import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SavedVehicles } from '../components/inventory/SavedVehicles';
import { RecentlyViewed } from '../components/inventory/RecentlyViewed';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { cn, container } from '../utils/styles';

export function SavedPage() {
  const { vehicles, status } = useInventory();

  useSeo({ title: 'Saved Vehicles | Southwest Auto Sale', description: 'Your saved vehicles at Southwest Auto Sale in Grove City, OH.', path: '/saved', noindex: true });

  return (
    <PageTransition>
      <div className={cn(container, 'py-8 lg:py-12')}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Saved vehicles' }]} />
        <h1 className="mb-8 mt-2 text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">Saved vehicles</h1>
        <SavedVehicles vehicles={vehicles} status={status} />
        <RecentlyViewed vehicles={vehicles} />
      </div>
    </PageTransition>);

}