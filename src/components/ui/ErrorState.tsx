import React from 'react';
import { RefreshCwIcon, WifiOffIcon, PhoneIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';
import { btn } from '../../utils/styles';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ title = 'We couldn’t load inventory', message = 'Something interrupted the connection. Please try again — or call us and we’ll check what’s on the lot for you.', onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand-dark">
        <WifiOffIcon className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-lg font-bold text-navy">{title}</h2>
      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">{message}</p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={onRetry} className={btn.navy}>
          <RefreshCwIcon className="h-4 w-4" aria-hidden />
          Try again
        </button>
        <a href={dealership.phone.href} className={btn.outline}>
          <PhoneIcon className="h-4 w-4" aria-hidden />
          Call {dealership.phone.display}
        </a>
      </div>
    </div>);

}