import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2Icon, InfoIcon, AlertTriangleIcon, XIcon } from 'lucide-react';
import { EASE_OUT } from '../../utils/motion';

export interface Toast {
  id: number;
  title: string;
  description?: string;
  tone?: 'success' | 'info' | 'error';
  action?: {label: string;to: string;};
}

interface ToastNotificationProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

const ICONS = {
  success: <CheckCircle2Icon className="h-5 w-5 text-emerald-600" aria-hidden />,
  info: <InfoIcon className="h-5 w-5 text-navy" aria-hidden />,
  error: <AlertTriangleIcon className="h-5 w-5 text-brand" aria-hidden />
};

export function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex flex-col items-center gap-2 px-3 sm:inset-x-auto sm:right-4 sm:top-4 sm:items-end">
      
      <AnimatePresence initial={false}>
        {toasts.map((t) =>
        <motion.div
          key={t.id}
          layout
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-line bg-white p-3.5 shadow-lift"
          role="status">
          
            <span className="mt-0.5 shrink-0">{ICONS[t.tone ?? 'success']}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-muted">{t.description}</p>}
              {t.action &&
            <Link to={t.action.to} onClick={() => onDismiss(t.id)} className="mt-1.5 inline-block text-sm font-semibold text-brand hover:text-brand-dark">
                  {t.action.label}
                </Link>
            }
            </div>
            <button
            type="button"
            onClick={() => onDismiss(t.id)}
            className="-m-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-md text-muted transition-colors duration-150 hover:bg-paper hover:text-ink"
            aria-label="Dismiss notification">
            
              <XIcon className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}