import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
import { useDialog } from '../../hooks/useDialog';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';
import type { InventoryFilters } from '../../types/inventory';
import type { Vehicle } from '../../types/vehicle';

interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  filters: InventoryFilters;
  onChange: (next: InventoryFilters) => void;
  resultCount: number;
  activeCount: number;
  onClear: () => void;
}

export function MobileFilterSheet({ open, onClose, vehicles, filters, onChange, resultCount, activeCount, onClear }: MobileFilterSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, ref);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
          className="absolute inset-0 bg-navy/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden />
        
          <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-sheet-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%', transition: { duration: 0.22, ease: EASE_OUT } }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.4 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120 || info.velocity.y > 600) onClose();
          }}
          className="absolute inset-x-0 bottom-0 flex max-h-[90vh] flex-col rounded-t-2xl bg-white shadow-lift">
          
            <div className="flex justify-center pt-2.5" aria-hidden>
              <span className="h-1.5 w-10 rounded-full bg-line" />
            </div>
            <div className="flex items-center justify-between border-b border-line px-5 pb-3 pt-2">
              <h2 id="filter-sheet-title" className="text-lg font-bold text-navy">
                Filters
              </h2>
              <button type="button" onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center rounded-lg text-navy hover:bg-paper" aria-label="Close filters">
                <XIcon className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5" onPointerDown={(e) => e.stopPropagation()}>
              <FilterPanel vehicles={vehicles} filters={filters} onChange={onChange} idPrefix="sheet" />
            </div>
            <div className="pb-safe grid grid-cols-[auto_1fr] gap-3 border-t border-line bg-white px-5 py-3">
              <button type="button" onClick={onClear} disabled={activeCount === 0} className={cn(btn.outline, 'px-4')}>
                Clear all
              </button>
              <button type="button" onClick={onClose} className={btn.primary}>
                Show {resultCount} {resultCount === 1 ? 'vehicle' : 'vehicles'}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}