import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items, dark = false }: {items: Crumb[];dark?: boolean;}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1 text-sm', dark ? 'text-white/70' : 'text-muted')}>
        {items.map((item, i) =>
        <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRightIcon className={cn('h-3.5 w-3.5', dark ? 'text-white/40' : 'text-muted/60')} aria-hidden />}
            {item.to ?
          <Link to={item.to} className={cn('rounded px-0.5 py-1 transition-colors duration-150', dark ? 'hover:text-white' : 'hover:text-navy')}>
                {item.label}
              </Link> :

          <span aria-current="page" className={cn('px-0.5 py-1 font-medium', dark ? 'text-white' : 'text-ink')}>
                {item.label}
              </span>
          }
          </li>
        )}
      </ol>
    </nav>);

}