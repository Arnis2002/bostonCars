import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';

const KEY = 'swas-cookie-choice';

export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = window.setTimeout(() => setShow(true), 1200);
        return () => window.clearTimeout(t);
      }
    } catch {

      // Storage unavailable.
    }return undefined;
  }, []);

  const choose = (choice: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {

      // ignore
    }setShow(false);
  };

  return (
    <AnimatePresence>
      {show &&
      <motion.div
        role="region"
        aria-label="Cookie notice"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16, transition: { duration: 0.16 } }}
        transition={{ duration: 0.26, ease: EASE_OUT }}
        className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-[35] rounded-xl border border-line bg-white p-4 shadow-lift md:inset-x-auto md:bottom-5 md:left-5 md:max-w-sm">
        
          <p className="text-sm leading-relaxed text-steel">
            We use essential cookies to run this site and optional cookies to understand how it’s used.{' '}
            <Link to="/privacy" className="font-medium text-navy underline underline-offset-2">
              Learn more
            </Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose('accepted')} className={cn(btn.navy, 'flex-1 text-sm')}>
              Accept
            </button>
            <button type="button" onClick={() => choose('essential')} className={cn(btn.outline, 'flex-1 text-sm')}>
              Essential only
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}