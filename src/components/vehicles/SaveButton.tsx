import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import type { Vehicle } from '../../types/vehicle';
import { useGarage } from '../../contexts/GarageContext';
import { vehicleName } from '../../utils/format';

interface SaveButtonProps {
  vehicle: Vehicle;
  variant?: 'overlay' | 'inline';
}

export function SaveButton({ vehicle, variant = 'overlay' }: SaveButtonProps) {
  const { isSaved, toggleSaved } = useGarage();
  const saved = isSaved(vehicle.id);
  const name = vehicleName(vehicle);

  const styles =
  variant === 'overlay' ?
  'h-10 w-10 justify-center bg-paper/95 shadow-sm hover:bg-paper' :
  'h-11 gap-2 border border-line-strong bg-paper px-3.5 text-sm font-medium hover:border-ink';

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.12 }}
      onClick={() => toggleSaved(vehicle.id)}
      aria-pressed={saved}
      aria-label={variant === 'overlay' ? saved ? `Remove ${name} from saved` : `Save ${name}` : undefined}
      className={`relative z-10 inline-flex items-center rounded text-ink transition-colors duration-150 ${styles}`}>
      
      <HeartIcon className={`h-[18px] w-[18px] ${saved ? 'fill-clay text-clay' : ''}`} aria-hidden="true" />
      {variant === 'inline' && <span>{saved ? 'Saved' : 'Save'}</span>}
    </motion.button>);

}