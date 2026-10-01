import React from 'react';
import { Link } from 'react-router-dom';
import { ColumnsIcon, XIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { EmptyState } from '../components/ui/EmptyState';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { useGarage } from '../contexts/GarageContext';
import { useLeadModal } from '../contexts/LeadModalContext';
import { disclaimers } from '../data/legal';
import { formatMPG, formatMileage, formatPrice, vehicleTitle } from '../utils/format';
import { btn, cn, container } from '../utils/styles';
import type { Vehicle } from '../types/vehicle';

const ROWS: [string, (v: Vehicle) => string][] = [
['Price', (v) => formatPrice(v.price)],
['Mileage', (v) => formatMileage(v.mileage)],
['Year', (v) => String(v.year)],
['Body style', (v) => v.bodyStyle],
['Engine', (v) => v.engine],
['Transmission', (v) => v.transmission],
['Drivetrain', (v) => v.drivetrain],
['Fuel type', (v) => v.fuelType],
['Fuel economy', (v) => formatMPG(v)],
['Seating', (v) => `${v.seating} passengers`],
['Exterior', (v) => v.exteriorColor],
['Interior', (v) => v.interiorColor],
['Stock #', (v) => v.stockNumber]];


export function ComparePage() {
  const { vehicles, status } = useInventory();
  const { compareIds, toggleCompare, clearCompare } = useGarage();
  const { openAvailability } = useLeadModal();
  const selected = compareIds.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v));

  useSeo({ title: 'Compare Vehicles | Southwest Auto Sale', description: 'Compare up to three pre-owned vehicles side by side.', path: '/compare', noindex: true });

  return (
    <PageTransition>
      <div className={cn(container, 'py-8 lg:py-12')}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Inventory', to: '/inventory' }, { label: 'Compare' }]} />
        <div className="mb-8 mt-2 flex items-end justify-between gap-4">
          <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">Compare vehicles</h1>
          {selected.length > 0 &&
          <button type="button" onClick={clearCompare} className="min-h-[44px] px-2 text-sm font-semibold text-brand hover:text-brand-dark">
              Clear all
            </button>
          }
        </div>

        {status === 'loading' && <div className="h-96 animate-pulse rounded-2xl bg-line/60" aria-busy="true" />}

        {status !== 'loading' && selected.length === 0 &&
        <EmptyState icon={ColumnsIcon} title="Nothing to compare yet" message="Check “Compare” on up to three vehicles in our inventory to see them side by side.">
            <Link to="/inventory" className={btn.primary}>
              Browse Inventory
            </Link>
          </EmptyState>
        }

        {selected.length > 0 &&
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
              <caption className="sr-only">Side-by-side comparison of selected vehicles</caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 w-32 bg-white sm:w-44">
                    <span className="sr-only">Specification</span>
                  </th>
                  {selected.map((v) =>
                <th key={v.id} scope="col" className="px-3 pb-4 align-top font-normal">
                      <div className="relative overflow-hidden rounded-xl bg-paper">
                        <img src={v.images[0].src} alt={v.images[0].alt} className="aspect-[4/3] w-full object-cover" />
                        <button
                      type="button"
                      onClick={() => toggleCompare(v.id)}
                      className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-card"
                      aria-label={`Remove ${vehicleTitle(v)} from comparison`}>
                      
                          <XIcon className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      <Link to={`/inventory/${v.slug}`} className="mt-3 block font-bold leading-snug text-navy hover:text-brand-dark">
                        {vehicleTitle(v)}
                      </Link>
                      <p className="text-sm text-muted">{v.trim}</p>
                    </th>
                )}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, get]) =>
              <tr key={label} className="border-t border-line">
                    <th scope="row" className="sticky left-0 z-10 bg-white py-3 pr-3 text-sm font-medium text-muted">
                      {label}
                    </th>
                    {selected.map((v) =>
                <td key={v.id} className={cn('px-3 py-3 text-[15px] text-ink', label === 'Price' && 'text-lg font-bold')}>
                        {get(v)}
                      </td>
                )}
                  </tr>
              )}
                <tr className="border-t border-line">
                  <th scope="row" className="sticky left-0 z-10 bg-white" />
                  {selected.map((v) =>
                <td key={v.id} className="px-3 pt-4">
                      <button type="button" onClick={() => openAvailability(v)} className={cn(btn.primary, 'w-full text-sm')}>
                        Check Availability
                      </button>
                    </td>
                )}
                </tr>
              </tbody>
            </table>
          </div>
        }

        {selected.length > 0 && selected.length < 3 &&
        <p className="mt-6 text-[15px] text-muted">
            You can add {3 - selected.length} more.{' '}
            <Link to="/inventory" className="font-semibold text-navy underline underline-offset-2">
              Back to inventory
            </Link>
          </p>
        }
        <p className="mt-8 text-xs leading-relaxed text-muted">{disclaimers.price}</p>
      </div>
    </PageTransition>);

}