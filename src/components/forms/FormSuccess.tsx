import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';

interface FormSuccessProps {
  title: string;
  message: string;
  onReset?: () => void;
  resetLabel?: string;
  onDone?: () => void;
  doneLabel?: string;
}

export function FormSuccess({ title, message, onReset, resetLabel = 'Send another request', onDone, doneLabel = 'Done' }: FormSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="flex flex-col items-center py-6 text-center">
      
      <motion.span
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.12, ease: EASE_OUT }} />
        </svg>
      </motion.span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-xl font-bold text-navy focus:outline-none">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{message}</p>
      <div className="mt-6 flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row">
        {onDone &&
        <button type="button" onClick={onDone} className={btn.navy}>
            {doneLabel}
          </button>
        }
        <a href={dealership.phone.href} className={btn.outline}>
          <PhoneIcon className="h-4 w-4" aria-hidden />
          Call {dealership.phone.display}
        </a>
        {onReset &&
        <button type="button" onClick={onReset} className={cn(btn.ghost)}>
            {resetLabel}
          </button>
        }
      </div>
    </motion.div>);

}