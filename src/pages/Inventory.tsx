import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchXIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FilterSidebar } from '../components/inventory/FilterSidebar';
import { MobileFilterSheet } from '../components/inventory/MobileFilterSheet';
import { SortToolbar } from '../components/inventory/SortToolbar';
import { ActiveFilterChips } from '../components/inventory/ActiveFilterChips';
import { VehicleCard } from '../components/inventory/VehicleCard';
import { LoadingSkeleton } from '../components/inventory/LoadingSkeleton';
import { RecentlyViewed } from '../components/inventory/RecentlyViewed';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { useInventory } from '../hooks/useInventory';
import { useInventoryFilters } from '../hooks/useInventoryFilters';
import { useSeo } from '../hooks/useSeo';
import { disclaimers } from '../data/legal';
import { PAGE_SIZE, applyFilters, getFilterChips, sortVehicles } from '../utils/inventoryFilters';
import { breadcrumbSchema } from '../utils/schema';
import { EASE_OUT } from '../utils/motion';
import { btn, cn, container } from '../utils/styles';

export function InventoryPage() {
  const { vehicles, status, retry } = useInventory();
  const { filters, sort, paramsKey, setFilters, setSort, clear } = useInventoryFilters();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const results = useMemo(() => sortVehicles(applyFilters(vehicles, filters), sort), [vehicles, filters, sort]);
  const chips = useMemo(() => getFilterChips(filters), [filters]);

  useEffect(() => setVisible(PAGE_SIZE), [paramsKey]);

  useSeo({
    title: 'Used Car, Truck & SUV Inventory in Grove City, OH | Southwest Auto Sale',
    description: 'Browse current pre-owned inventory at Southwest Auto Sale in Grove City, Ohio. Filter by make, price, mileage and body style, then check availability or start a financing request.',
    path: '/inventory',
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Inventory', path: '/inventory' }])]
  });

  const loading = status === 'loading';
  const shown = results.slice(0, visible);

  return (
    <>
    <PageTransition>
      <div className="border-b border-line bg-paper">
        <div className={cn(container, 'py-6 lg:py-8')}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Inventory' }]} />
          <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">Used cars, trucks & SUVs for sale in Grove City, OH</h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            Dependable pre-owned vehicles for drivers across Grove City, Columbus and Central Ohio. Save favorites, compare up to three and check availability in a few taps.
          </p>
        </div>
      </div>

      <div className={cn(container, 'flex gap-8 pb-16 lg:pt-6')}>
        <FilterSidebar vehicles={vehicles} filters={filters} onChange={(f) => setFilters(f)} activeCount={chips.length} onClear={clear} />

        <div className="min-w-0 flex-1">
          <SortToolbar
              count={results.length}
              total={vehicles.length}
              loading={loading}
              sort={sort}
              onSort={setSort}
              onOpenFilters={() => setSheetOpen(true)}
              activeCount={chips.length} />
            
          <ActiveFilterChips chips={chips} onRemove={(chip) => setFilters(chip.clear(filters))} onClear={clear} />

          <div className="mt-5">
            {status === 'error' && <ErrorState onRetry={retry} />}

            {loading &&
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <LoadingSkeleton count={6} />
              </div>
              }

            {status === 'success' && results.length === 0 &&
              <EmptyState
                icon={SearchXIcon}
                title="No vehicles match those filters"
                message="Try removing a filter or widening your price and mileage range. Or tell us what you’re looking for and our team can help search.">
                
                <button type="button" onClick={clear} className={btn.navy}>
                  Clear all filters
                </button>
                <Link to="/contact?reason=Vehicle%20Finder" className={btn.outline}>
                  Use our vehicle finder
                </Link>
              </EmptyState>
              }

            {status === 'success' && results.length > 0 &&
              <>
                <motion.ul layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {shown.map((v, i) =>
                    <motion.li
                      key={v.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}>
                      
                        <VehicleCard vehicle={v} priority={i < 3} />
                      </motion.li>
                    )}
                  </AnimatePresence>
                </motion.ul>

                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className="text-sm text-muted tabular">
                    Showing {shown.length} of {results.length}
                  </p>
                  {shown.length < results.length &&
                  <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className={btn.outline}>
                      Show more vehicles
                    </button>
                  }
                </div>
              </>
              }
          </div>

          <p className="mt-10 text-xs leading-relaxed text-muted">{disclaimers.price}</p>

          <RecentlyViewed vehicles={vehicles} />

          <section aria-labelledby="local-title" className="mt-14 border-t border-line pt-10">
            <h2 id="local-title" className="text-xl font-bold text-navy">
              Shopping for a used vehicle near Columbus?
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
              Southwest Auto Sale has served Grove City and Central Ohio since 2014 from our lot at 2140 Harrisburg Pike. We help drivers from Columbus, Hilliard, Upper Arlington, Lincoln Village, Bexley and nearby communities find practical used cars, pickup trucks and SUVs — with{' '}
              <Link to="/financing" className="font-medium text-navy underline underline-offset-2">
                financing options
              </Link>{' '}
              for a range of credit situations and{' '}
              <Link to="/sell-trade" className="font-medium text-navy underline underline-offset-2">
                trade-in appraisals
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </PageTransition>

      <MobileFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        vehicles={vehicles}
        filters={filters}
        onChange={(f) => setFilters(f)}
        resultCount={results.length}
        activeCount={chips.length}
        onClear={clear} />
      
    </>);

}