import React from 'react';

interface HoneypotProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

/** Spam-protection placeholder: hidden field bots fill in. Swap for reCAPTCHA / Turnstile in production. */
export function Honeypot({ id, value, onChange }: HoneypotProps) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={`${id}-website`}>Leave this field empty</label>
      <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>);

}