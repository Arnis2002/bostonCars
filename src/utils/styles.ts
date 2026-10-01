import { twMerge } from 'tailwind-merge';

export function cn(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}

const btnBase =
'inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap min-h-[44px] px-5 text-[15px] transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none';

export const btn = {
  primary: `${btnBase} bg-brand text-white hover:bg-brand-dark`,
  navy: `${btnBase} bg-navy text-white hover:bg-navy-800`,
  outline: `${btnBase} border border-line bg-white text-navy hover:border-navy/40 hover:bg-paper`,
  outlineDark: `${btnBase} border border-white/30 text-white hover:bg-white/10 hover:border-white/60`,
  white: `${btnBase} bg-white text-navy hover:bg-paper`,
  ghost: `${btnBase} px-3 text-navy hover:bg-paper`
};

export const inputBase =
'block w-full min-h-[46px] rounded-lg border bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy';

export const container = 'mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8';