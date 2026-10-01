import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useGarage, COMPARE_LIMIT } from '../../contexts/GarageContext';
import { vehicles } from '../../data/vehicles';
import { VehiclePhoto } from '../VehiclePhoto';
import { vehicleName } from '../../utils/format';

export function CompareTray() {
  const { compareIds, toggleCompare, clearCompare, setCompareOpen, notice } = useGarage();
  const { pathname } = useLocation();
  const selected = compareIds.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  const onDetail = /^\/inventory\/.+/.test(pathname);

  return (
    <>
      <div aria-live="polite" className="sr-only">{notice}</div>
      <AnimatePresence>
        {notice &&
        <div key="notice" className={`pointer-events-none fixed inset-x-4 z-50 flex justify-center ${selected.length ? 'bottom-28' : 'bottom-6'}`}>
            <motion.p
            aria-hidden="true"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="max-w-md rounded bg-ink px-4 py-3 text-sm text-ivory shadow-card">
            
              {notice}
            </motion.p>
          </div>
        }
      </AnimatePresence>
      <AnimatePresence>
        {selected.length > 0 &&
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className={`fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl rounded border border-line-strong bg-paper p-2.5 shadow-card sm:inset-x-6 ${onDetail ? 'hidden lg:block' : ''}`}
          role="region"
          aria-label="Vehicles selected for comparison">
          
            <div className="flex items-center gap-3">
              <ul className="flex min-w-0 flex-1 gap-2">
                {selected.map((v) =>
              <li key={v.id} className="relative flex min-w-0 items-center gap-2 rounded bg-ivory pr-1 sm:pr-2">
                    <div className="h-11 w-14 shrink-0 overflow-hidden rounded-sm">
                      <VehiclePhoto photo={v.photos[0]} sizes="56px" widths={[160]} className="h-full w-full object-cover" />
                    </div>
                    <span className="hidden min-w-0 truncate text-[13px] font-medium md:block">{vehicleName(v)}</span>
                    <button
                  type="button"
                  onClick={() => toggleCompare(v.id)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink-soft hover:text-ink"
                  aria-label={`Remove ${vehicleName(v)} from comparison`}>
                  
                      <XIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
              )}
                {Array.from({ length: COMPARE_LIMIT - selected.length }).map((_, i) =>
              <li key={`empty-${i}`} className="hidden h-11 w-14 rounded-sm border border-dashed border-line-strong sm:block" aria-hidden="true" />
              )}
              </ul>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" onClick={clearCompare} className="hidden h-10 px-2 text-sm text-ink-soft hover:text-ink sm:inline-flex sm:items-center">
                  Clear
                </button>
                <button
                type="button"
                onClick={() => setCompareOpen(true)}
                disabled={selected.length < 2}
                className="inline-flex h-11 items-center rounded bg-forest px-4 text-sm font-medium text-ivory transition-colors duration-150 hover:bg-forest-deep disabled:bg-ink/40">
                
                  Compare {selected.length}
                </button>
              </div>
            </div>
            {selected.length < 2 && <p className="px-1 pt-1.5 text-xs text-ink-soft">Pick at least one more car to compare.</p>}
          </motion.div>
        }
      </AnimatePresence>
    </>);

}