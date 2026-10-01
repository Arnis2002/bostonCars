export type FormErrors = Record<string, string>;

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());
export const isPhone = (s: string) => s.replace(/\D/g, '').length >= 10;
export const isVin = (s: string) => /^[A-HJ-NPR-Z0-9]{17}$/i.test(s.trim());

/** Moves focus to the first invalid field, in DOM order. */
export function focusFirstError(errors: FormErrors, order: string[]) {
  const first = order.find((key) => errors[key]);
  if (!first) return;
  window.requestAnimationFrame(() => {
    const el = document.getElementById(first) ?? document.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  });
}

export function validateContact(method: string, email: string, phone: string): FormErrors {
  const errors: FormErrors = {};
  if (method === 'email') {
    if (!email.trim()) errors.email = 'Enter an email address.';else
    if (!isEmail(email)) errors.email = 'That email address doesn’t look complete.';
  } else {
    if (!phone.trim()) errors.phone = 'Enter a phone number.';else
    if (!isPhone(phone)) errors.phone = 'Enter a 10-digit phone number.';
  }
  return errors;
}