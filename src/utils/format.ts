import type { Vehicle } from '../types/vehicle';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('en-US');

export function formatPrice(price: number | null): string {
  return price === null ? 'Contact for Price' : currency.format(price);
}

export function formatCurrency(value: number): string {
  return currency.format(value);
}

export function formatMileage(miles: number): string {
  return `${number.format(miles)} mi`;
}

export function formatNumber(value: number): string {
  return number.format(value);
}

export function vehicleTitle(v: Pick<Vehicle, 'year' | 'make' | 'model'>): string {
  return `${v.year} ${v.make} ${v.model}`;
}

export function vehicleFullTitle(v: Pick<Vehicle, 'year' | 'make' | 'model' | 'trim'>): string {
  return `${v.year} ${v.make} ${v.model} ${v.trim}`;
}

export function formatMPG(v: Pick<Vehicle, 'cityMPG' | 'highwayMPG'>): string {
  if (v.cityMPG === null || v.highwayMPG === null) return 'Not available';
  return `${v.cityMPG} city / ${v.highwayMPG} hwy`;
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}