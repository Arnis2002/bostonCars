import React, { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { SearchSelect } from './SearchSelect';
import { QuickFilters } from './QuickFilters';
import { priceSteps, mileageSteps } from '../../data/formOptions';
import { applyFilters, emptyFilters, inventoryHref } from '../../utils/inventoryFilters';
import { formatCurrency, formatNumber } from '../../utils/format';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';
import type { InventoryFilters } from '../../types/inventory';
import type { BodyStyle, Vehicle } from '../../types/vehicle';

const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

export function InventorySearch({ vehicles }: {vehicles: Vehicle[];}) {
  const navigate = useNavigate();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [mileageMax, setMileageMax] = useState('');
  const [body, setBody] = useState('');

  const makes = useMemo(() => unique(vehicles.map((v) => v.make)).sort(), [vehicles]);
  const models = useMemo(() => unique(vehicles.filter((v) => !make || v.make === make).map((v) => v.model)).sort(), [vehicles, make]);
  const years = useMemo(() => unique(vehicles.map((v) => v.year)).sort((a, b) => b - a), [vehicles]);
  const bodies = useMemo(() => unique(vehicles.map((v) => v.bodyStyle)).sort(), [vehicles]);

  const filters: InventoryFilters = {
    ...emptyFilters(),
    makes: make ? [make] : [],
    model,
    yearMin: yearMin ? Number(yearMin) : null,
    priceMax: priceMax ? Number(priceMax) : null,
    mileageMax: mileageMax ? Number(mileageMax) : null,
    bodyStyles: body ? [body as BodyStyle] : []
  };
  const matches = applyFilters(vehicles, filters).length;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(inventoryHref(filters));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT }}
      className="rounded-2xl border border-line bg-white p-4 shadow-lift sm:p-5">
      
      <form onSubmit={onSubmit} role="search" aria-label="Search inventory">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="text-base font-bold text-navy sm:text-lg">Find your next vehicle</h2>
          <p className="text-sm text-muted tabular" aria-live="polite">
            {vehicles.length ? `${matches} ${matches === 1 ? 'vehicle matches' : 'vehicles match'}` : 'Loading inventory…'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-[repeat(6,minmax(0,1fr))_auto] xl:items-end">
          <SearchSelect
            id="hs-make"
            label="Make"
            anyLabel="Any make"
            value={make}
            onChange={(v) => {
              setMake(v);
              setModel('');
            }}
            options={makes} />
          
          <SearchSelect id="hs-model" label="Model" anyLabel="Any model" value={model} onChange={setModel} options={models} />
          <SearchSelect id="hs-year" label="Min. year" anyLabel="Any year" value={yearMin} onChange={setYearMin} options={years.map((y) => ({ value: String(y), label: `${y} or newer` }))} />
          <SearchSelect id="hs-price" label="Max. price" anyLabel="Any price" value={priceMax} onChange={setPriceMax} options={priceSteps.map((p) => ({ value: String(p), label: `Up to ${formatCurrency(p)}` }))} />
          <SearchSelect id="hs-miles" label="Max. mileage" anyLabel="Any mileage" value={mileageMax} onChange={setMileageMax} options={mileageSteps.map((m) => ({ value: String(m), label: `Under ${formatNumber(m)} mi` }))} />
          <SearchSelect id="hs-body" label="Body style" anyLabel="Any style" value={body} onChange={setBody} options={bodies} />
          <button type="submit" className={cn(btn.primary, 'col-span-2 h-12 md:col-span-3 xl:col-span-1')}>
            <SearchIcon className="h-4 w-4" aria-hidden />
            Search Inventory
          </button>
        </div>
      </form>
      <div className="mt-4 border-t border-line pt-3">
        <QuickFilters vehicles={vehicles} />
      </div>
    </motion.div>);

}