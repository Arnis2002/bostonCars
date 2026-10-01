const base =
'inline-flex items-center justify-center gap-2 rounded font-medium whitespace-nowrap transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50';

export const btn = {
  primary: `${base} h-12 px-5 text-[15px] bg-forest text-ivory hover:bg-forest-deep`,
  secondary: `${base} h-12 px-5 text-[15px] border border-ink/70 text-ink hover:bg-ink hover:text-ivory`,
  light: `${base} h-12 px-5 text-[15px] bg-ivory text-ink hover:bg-paper`,
  outlineLight: `${base} h-12 px-5 text-[15px] border border-ivory/60 text-ivory hover:bg-ivory hover:text-ink`,
  small: `${base} h-10 px-3.5 text-sm border border-line-strong bg-paper text-ink hover:border-ink`
};

export const textLink =
'font-medium text-forest underline decoration-forest/30 underline-offset-4 transition-colors duration-150 hover:decoration-forest';

export const container = 'mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10';