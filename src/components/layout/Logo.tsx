import React from 'react';
import { cn } from '../../utils/styles';

interface LogoProps {
  variant?: 'dark' | 'light';
  compact?: boolean;
  className?: string;
}

/** Placeholder wordmark — replace with the dealership's approved logo files when supplied. */
export function Logo({ variant = 'dark', compact = false, className }: LogoProps) {
  const light = variant === 'light';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 40 40"
        className={cn('shrink-0 transition-[width,height] duration-200 ease-out', compact ? 'h-8 w-8' : 'h-10 w-10')}
        aria-hidden="true">
        
        <rect width="40" height="40" rx="9" fill={light ? '#FFFFFF' : '#0B1B32'} />
        <path d="M9 33 L17.2 9.5" stroke={light ? '#0B1B32' : '#FFFFFF'} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M31 33 L22.8 9.5" stroke={light ? '#0B1B32' : '#FFFFFF'} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M20 31 L20 27 M20 23 L20 19.5 M20 16.5 L20 14" stroke="#D62828" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M20 4.5 L22 9 L20 8 L18 9 Z" fill="#D62828" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn('font-extrabold tracking-[0.06em]', compact ? 'text-[15px]' : 'text-[17px]', light ? 'text-white' : 'text-navy')}>
          SOUTHWEST
        </span>
        <span className="mt-1 flex items-center gap-1.5">
          <span className="h-[2px] w-3 bg-brand" />
          <span className={cn('text-[10.5px] font-bold tracking-[0.22em]', light ? 'text-white/80' : 'text-steel')}>AUTO SALE</span>
        </span>
      </span>
      <span className="sr-only">Southwest Auto Sale — home</span>
    </span>);

}