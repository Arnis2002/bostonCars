import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/styles';

interface FavoriteButtonProps {
  saved: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}

export function FavoriteButton({ saved, onToggle, label, className }: FavoriteButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.12 }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved vehicles` : `Save ${label}`}
      className={cn(
        'grid h-11 w-11 place-items-center rounded-full bg-white/95 text-navy shadow-sm ring-1 ring-black/5 transition-colors duration-150 hover:bg-white',
        className
      )}>
      
      <motion.span
        key={saved ? 'on' : 'off'}
        initial={{ scale: saved ? 0.7 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.28, ease: EASE_OUT, type: 'spring', stiffness: 520, damping: 18 }}
        className="grid place-items-center">
        
        <HeartIcon className={cn('h-5 w-5', saved ? 'fill-brand text-brand' : 'text-navy')} aria-hidden />
      </motion.span>
    </motion.button>);

}