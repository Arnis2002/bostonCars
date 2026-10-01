import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/styles';

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  activeCount?: number;
  children: React.ReactNode;
}

export function FilterSection({ title, defaultOpen = true, activeCount = 0, children }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[52px] w-full items-center justify-between gap-3 text-left text-[15px] font-semibold text-navy">
          
          <span className="flex items-center gap-2">
            {title}
            {activeCount > 0 &&
            <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-navy px-1.5 text-[11px] font-bold text-white tabular">{activeCount}</span>
            }
          </span>
          <ChevronDownIcon className={cn('h-4 w-4 text-muted transition-transform duration-200 ease-out', open && 'rotate-180')} aria-hidden />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="overflow-hidden">
          
            <div className="pb-4">{children}</div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}