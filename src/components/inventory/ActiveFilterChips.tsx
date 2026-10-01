import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { EASE_OUT } from '../../utils/motion';
import type { FilterChip } from '../../types/inventory';

interface ActiveFilterChipsProps {
  chips: FilterChip[];
  onRemove: (chip: FilterChip) => void;
  onClear: () => void;
}

export function ActiveFilterChips({ chips, onRemove, onClear }: ActiveFilterChipsProps) {
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 pt-4" aria-label="Active filters">
      <AnimatePresence initial={false} mode="popLayout">
        {chips.map((chip) =>
        <motion.button
          key={chip.id}
          layout
          type="button"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18, ease: EASE_OUT }}
          onClick={() => onRemove(chip)}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-navy px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-navy-800"
          aria-label={`Remove filter: ${chip.label}`}>
          
            {chip.label}
            <XIcon className="h-3.5 w-3.5" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
      <button type="button" onClick={onClear} className="min-h-[36px] px-2 text-sm font-semibold text-brand hover:text-brand-dark">
        Clear filters
      </button>
    </div>);

}