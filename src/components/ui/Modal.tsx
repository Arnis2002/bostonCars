import React, { useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'md' | 'lg';
}

export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  useDialog(open, onClose, panelRef);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
          className="absolute inset-0 bg-navy/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden />
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          tabIndex={-1}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.16 } }}
          transition={{ duration: 0.26, ease: EASE_OUT }}
          className={cn(
            'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift focus:outline-none sm:rounded-2xl',
            size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg'
          )}>
          
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <h2 id={titleId} className="text-lg font-bold text-navy">
                  {title}
                </h2>
                {description &&
              <p id={descId} className="mt-0.5 text-sm text-muted">
                    {description}
                  </p>
              }
              </div>
              <button
              type="button"
              onClick={onClose}
              className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-150 hover:bg-paper hover:text-ink"
              aria-label="Close dialog">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}