import React from 'react';
import { FieldShell, describedBy } from './FieldShell';
import { formatPhoneInput } from '../../utils/format';
import { cn, inputBase } from '../../utils/styles';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  hint?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'search' | 'number';
  autoComplete?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  format?: 'phone' | 'upper';
  maxLength?: number;
  min?: string;
  className?: string;
}

export function TextField({ id, label, value, onChange, error, required, hint, type = 'text', format, className, ...rest }: TextFieldProps) {
  const handle = (raw: string) => {
    if (format === 'phone') onChange(formatPhoneInput(raw));else
    if (format === 'upper') onChange(raw.toUpperCase());else
    onChange(raw);
  };

  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => handle(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-required={required}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(inputBase, error ? 'border-brand' : 'border-line')}
        {...rest} />
      
    </FieldShell>);

}