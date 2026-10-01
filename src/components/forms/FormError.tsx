import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';
import { EASE_OUT } from '../../utils/motion';

export function FormError({ message }: {message: string;}) {
  return (
    <motion.div
      role="alert"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className="flex items-start gap-3 rounded-lg border border-brand/30 bg-brand-soft p-3.5 text-sm text-brand-dark">
      
      <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">We couldn’t send your request.</p>
        <p className="mt-0.5">
          {message} You can also call{' '}
          <a href={dealership.phone.href} className="font-semibold underline underline-offset-2">
            {dealership.phone.display}
          </a>
          .
        </p>
      </div>
    </motion.div>);

}