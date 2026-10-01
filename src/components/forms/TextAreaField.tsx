import React from 'react';
import { FieldShell, describedBy } from './FieldShell';
import { cn, inputBase } from '../../utils/styles';

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function TextAreaField({ id, label, value, onChange, error, required, hint, placeholder, rows = 3, className }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputBase, 'resize-y py-3 leading-relaxed', error ? 'border-brand' : 'border-line')} />
      
    </FieldShell>);

}