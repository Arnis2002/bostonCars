import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import { Dialog } from '../Dialog';
import { VehiclePhoto } from '../VehiclePhoto';
import { useGarage } from '../../contexts/GarageContext';
import { vehicles } from '../../data/vehicles';
import type { Vehicle } from '../../types/vehicle';
import { formatMiles, formatPrice, orUnknown, vehicleName } from '../../utils/format';

const rows: {label: string;value: (v: Vehicle) => string;best?: (list: Vehicle[]) => string | null;}[] = [
{
  label: 'Price',
  value: (v) => formatPrice(v.price),
  best: (l) => {
    const priced = l.filter((v) => v.price != null);
    return priced.length > 1 ? priced.reduce((a, b) => (a.price ?? 0) <= (b.price ?? 0) ? a : b).id : null;
  }
},
{ label: 'Year', value: (v) => String(v.year), best: (l) => l.reduce((a, b) => a.year >= b.year ? a : b).id },
{ label: 'Mileage', value: (v) => formatMiles(v.mileage), best: (l) => l.reduce((a, b) => a.mileage <= b.mileage ? a : b).id },
{ label: 'Trim', value: (v) => orUnknown(v.trim) },
{ label: 'Body style', value: (v) => v.bodyStyle },
{ label: 'Drivetrain', value: (v) => orUnknown(v.drivetrain) },
{ label: 'Fuel type', value: (v) => v.fuelType },
{ label: 'Engine', value: (v) => orUnknown(v.engine) },
{ label: 'Transmission', value: (v) => orUnknown(v.transmission) },
{ label: 'Exterior', value: (v) => orUnknown(v.exteriorColor) },
{ label: 'Title status', value: (v) => orUnknown(v.titleStatus, 'Not provided — ask') },
{ label: 'Disclosures', value: (v) => v.disclosures.length ? v.disclosures.join(' ') : 'None listed' }];


export function CompareDialog() {
  const { compareIds, compareOpen, setCompareOpen, toggleCompare } = useGarage();
  const list = compareIds.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v));
  const close = () => setCompareOpen(false);

  return (
    <Dialog open={compareOpen && list.length > 0} onClose={close} labelledBy="compare-title" panelClassName="flex max-h-[92vh] w-full max-w-5xl flex-col rounded-t-md bg-ivory sm:rounded-md">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
        <div>
          <h2 id="compare-title" className="font-serif text-2xl">Compare vehicles</h2>
          <p className="text-sm text-ink-soft">“Not listed” means the information wasn’t provided for that car.</p>
        </div>
        <button type="button" onClick={close} data-autofocus className="inline-flex h-11 w-11 items-center justify-center rounded" aria-label="Close comparison">
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="overflow-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
          <caption className="sr-only">Side-by-side comparison of selected vehicles</caption>
          <thead>
            <tr>
              <td className="w-36 p-4" />
              {list.map((v) =>
              <th key={v.id} scope="col" className="p-4 align-top font-normal">
                  <div className="aspect-[4/3] overflow-hidden rounded">
                    <VehiclePhoto photo={v.photos[0]} sizes="280px" widths={[480]} className="h-full w-full object-cover" />
                  </div>
                  <Link to={`/inventory/${v.id}`} onClick={close} className="mt-3 block text-[16px] font-semibold hover:underline">
                    {vehicleName(v)}
                  </Link>
                  <button type="button" onClick={() => toggleCompare(v.id)} className="mt-1 text-sm text-ink-soft underline underline-offset-2 hover:text-ink">
                    Remove
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const bestId = row.best && list.length > 1 ? row.best(list) : null;
              return (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="p-4 align-top text-[13px] font-medium text-ink-soft">{row.label}</th>
                  {list.map((v) => {
                    const val = row.value(v);
                    const unknown = val.startsWith('Not ');
                    return (
                      <td key={v.id} className={`p-4 align-top tnum ${unknown ? 'text-ink-soft' : ''} ${bestId === v.id ? 'font-semibold' : ''}`}>
                        {val}
                        {bestId === v.id && <span className="ml-2 text-xs font-medium text-forest">{row.label === 'Price' ? 'Lowest' : row.label === 'Year' ? 'Newest' : 'Lowest'}</span>}
                      </td>);

                  })}
                </tr>);

            })}
          </tbody>
        </table>
      </div>
    </Dialog>);

}