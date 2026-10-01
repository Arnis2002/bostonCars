import React from 'react';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';

export function DemoFormNotice({ finance = false }: {finance?: boolean;}) {
  return (
    <div className="flex flex-col gap-1.5 text-xs text-muted sm:flex-row sm:items-center sm:gap-4">
      <span className="inline-flex items-center gap-1.5">
        <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden />
        Protected by spam filtering
      </span>
      <span className="inline-flex items-center gap-1.5">
        <LockIcon className="h-3.5 w-3.5" aria-hidden />
        {finance ? 'Demo preview — not a live credit application. No information is sent.' : 'Demo preview — submissions are not sent.'}
      </span>
    </div>);

}