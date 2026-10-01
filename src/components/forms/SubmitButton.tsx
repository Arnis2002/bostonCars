import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { btn, cn } from '../../utils/styles';

interface SubmitButtonProps {
  submitting: boolean;
  label: string;
  submittingLabel?: string;
  className?: string;
}

export function SubmitButton({ submitting, label, submittingLabel = 'Sending…', className }: SubmitButtonProps) {
  return (
    <button type="submit" disabled={submitting} aria-disabled={submitting} className={cn(btn.primary, 'w-full sm:w-auto', className)}>
      {submitting && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden />}
      {submitting ? submittingLabel : label}
    </button>);

}