import React from 'react';
import { cn } from '../../utils/styles';

interface SectionHeadingProps {
  title: string;
  description?: string;
  id?: string;
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({ title, description, id, action, dark, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        <h2 id={id} className={cn('text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl', dark ? 'text-white' : 'text-navy')}>
          {title}
        </h2>
        {description && <p className={cn('mt-3 text-base leading-relaxed sm:text-lg', dark ? 'text-white/75' : 'text-muted')}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}