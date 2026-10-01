import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { useGarage } from '../../contexts/GarageContext';
import { btn } from '../../utils/styles';
import type { LoadStatus } from '../../types/inventory';
import type { Vehicle } from '../../types/vehicle';

interface SavedVehiclesProps {
  vehicles: Vehicle[];
  status: LoadStatus;
}

export function SavedVehicles({ vehicles, status }: SavedVehiclesProps) {
  const { savedIds } = useGarage();
  const saved = savedIds.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v));

  if (status === 'loading') {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <LoadingSkeleton count={Math.max(1, Math.min(savedIds.length, 4))} />
      </div>);

  }

  if (!saved.length) {
    return (
      <EmptyState icon={HeartIcon} title="No saved vehicles yet" message="Tap the heart on any vehicle to save it here. Saved vehicles stay on this device so you can come back and compare later.">
        <Link to="/inventory" className={btn.primary}>
          Browse Inventory
        </Link>
      </EmptyState>);

  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {saved.map((v) =>
      <li key={v.id}>
          <VehicleCard vehicle={v} />
        </li>
      )}
    </ul>);

}