import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { XIcon, ColumnsIcon } from 'lucide-react';
import { useGarage, COMPARE_LIMIT } from '../../contexts/GarageContext';
import { useInventory } from '../../hooks/useInventory';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';
import { vehicleTitle } from '../../utils/format';

export function CompareTray() {
  const { pathname } = useLocation();
  const { compareIds, toggleCompare, clearCompare } = useGarage();
  const { vehicles } = useInventory();
  const selected = compareIds.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const visible = selected.length > 0 && pathname !== '/compare';

  return (
    <AnimatePresence>
      {visible &&
      <motion.aside
        aria-label="Compare vehicles"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0, transition: { duration: 0.16 } }}
        transition={{ duration: 0.26, ease: EASE_OUT }}
        className="fixed inset-x-3 bottom-[calc(72px+env(safe-area-inset-bottom))] z-30 mx-auto max-w-2xl rounded-2xl border border-line bg-white p-3 shadow-lift md:bottom-5">
        
          <div className="flex items-center gap-3">
            <ul className="flex min-w-0 flex-1 items-center gap-2">
              {Array.from({ length: COMPARE_LIMIT }).map((_, i) => {
              const v = selected[i];
              return (
                <li key={v?.id ?? `empty-${i}`} className={cn('relative h-12 w-16 shrink-0 overflow-hidden rounded-lg sm:w-20', !v && 'border border-dashed border-line')}>
                    {v &&
                  <>
                        <img src={v.images[0].src} alt={vehicleTitle(v)} className="h-full w-full object-cover" />
                        <button
                      type="button"
                      onClick={() => toggleCompare(v.id)}
                      className="absolute right-0.5 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-ink/80 text-white"
                      aria-label={`Remove ${vehicleTitle(v)} from compare`}>
                      
                          <XIcon className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </>
                  }
                  </li>);

            })}
              <li className="hidden min-w-0 pl-1 text-sm text-muted sm:block">
                <span className="font-semibold text-ink">{selected.length}</span> of {COMPARE_LIMIT} selected
              </li>
            </ul>
            <button type="button" onClick={clearCompare} className="hidden min-h-[44px] px-2 text-sm font-medium text-muted hover:text-ink sm:block">
              Clear
            </button>
            <Link to="/compare" className={cn(btn.navy, 'px-4 text-sm', selected.length < 2 && 'pointer-events-none opacity-50')} aria-disabled={selected.length < 2}>
              <ColumnsIcon className="h-4 w-4" aria-hidden />
              Compare{selected.length > 1 ? ` (${selected.length})` : ''}
            </Link>
          </div>
        </motion.aside>
      }
    </AnimatePresence>);

}