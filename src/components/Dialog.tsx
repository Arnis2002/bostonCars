import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

type DialogVariant = 'center' | 'drawer-right' | 'drawer-left' | 'fullscreen';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  variant?: DialogVariant;
  panelClassName?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const FOCUSABLE =
'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EASE = [0.23, 1, 0.32, 1] as const;

const layout: Record<DialogVariant, string> = {
  center: 'items-end sm:items-center justify-center sm:p-6',
  'drawer-right': 'justify-end',
  'drawer-left': 'justify-start',
  fullscreen: ''
};

const motionFor: Record<DialogVariant, {initial: object;animate: object;exit: object;}> = {
  center: { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } },
  'drawer-right': { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  'drawer-left': { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  fullscreen: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
};

export function Dialog({ open, onClose, labelledBy, variant = 'center', panelClassName = '', onKeyDown, children }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const target = panel.querySelector<HTMLElement>('[data-autofocus]') ?? panel.querySelector<HTMLElement>(FOCUSABLE);
      (target ?? panel).focus();
    }, 30);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open &&
      <div className={`fixed inset-0 z-[70] flex ${layout[variant]}`}>
          <motion.div
          aria-hidden="true"
          className={`absolute inset-0 ${variant === 'fullscreen' ? 'bg-ink' : 'bg-ink/55'}`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }} />
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={`relative focus:outline-none ${panelClassName}`}
          {...motionFor[variant]}
          transition={{ duration: 0.24, ease: EASE }}>
          
            {children}
          </motion.div>
        </div>
      }
    </AnimatePresence>,
    document.body
  );
}