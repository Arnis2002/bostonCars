export interface FieldRule {
  label: string;
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  vinOrPlate?: boolean;
  vin?: boolean;
  mustBeChecked?: boolean;
  numeric?: {min?: number;max?: number;};
  custom?: (value: string) => string | null;
  message?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VIN = /^[A-HJ-NPR-Z0-9]{17}$/i;
const PLATE = /^[A-Z0-9 -]{2,8}$/i;

export function validateField(value: string | boolean | undefined, rule: FieldRule): string | null {
  if (rule.mustBeChecked) {
    return value === true ? null : rule.message ?? 'Please check this box to continue.';
  }

  const str = String(value ?? '').trim();

  if (rule.required && !str) {
    return rule.message ?? `${rule.label} is required.`;
  }
  if (!str) return null;

  if (rule.email && !EMAIL.test(str)) return 'Enter a valid email address, like name@example.com.';

  if (rule.phone) {
    const digits = str.replace(/\D/g, '');
    const normalized = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
    if (normalized.length !== 10) return 'Enter a 10-digit phone number.';
  }

  if (rule.vin && !VIN.test(str)) return 'A VIN is 17 characters and never uses the letters I, O or Q.';

  if (rule.vinOrPlate && !VIN.test(str) && !PLATE.test(str)) {
    return 'Enter a 17-character VIN or a license plate (2–8 characters).';
  }

  if (rule.numeric) {
    const n = Number(str.replace(/,/g, ''));
    if (!Number.isFinite(n)) return `${rule.label} must be a number.`;
    if (rule.numeric.min !== undefined && n < rule.numeric.min) return `${rule.label} must be at least ${rule.numeric.min.toLocaleString()}.`;
    if (rule.numeric.max !== undefined && n > rule.numeric.max) return `${rule.label} must be ${rule.numeric.max.toLocaleString()} or less.`;
  }

  if (rule.custom) return rule.custom(str);

  return null;
}