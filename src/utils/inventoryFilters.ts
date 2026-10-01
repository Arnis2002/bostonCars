import type { Vehicle } from '../types/vehicle';
import { formatCurrency, formatNumber } from './format';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'miles-asc' | 'year-desc' | 'year-asc';

export interface InventoryFilters {
  q: string;
  makes: string[];
  bodies: string[];
  fuels: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minYear: number | null;
  maxYear: number | null;
  maxMiles: number | null;
  savedOnly: boolean;
  sort: SortKey;
}

export const defaultFilters: InventoryFilters = {
  q: '',
  makes: [],
  bodies: [],
  fuels: [],
  minPrice: null,
  maxPrice: null,
  minYear: null,
  maxYear: null,
  maxMiles: null,
  savedOnly: false,
  sort: 'recommended'
};

export const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Featured first' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'miles-asc', label: 'Mileage: lowest first' },
{ value: 'year-desc', label: 'Year: newest first' },
{ value: 'year-asc', label: 'Year: oldest first' }];


export const priceSteps = [20000, 25000, 30000, 35000, 40000, 50000, 60000, 80000];
export const mileageSteps = [10000, 25000, 40000, 60000, 80000];

function toNumber(raw: string | null): number | null {
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function toList(raw: string | null): string[] {
  return raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : [];
}

function isSort(value: string | null): value is SortKey {
  return sortOptions.some((o) => o.value === value);
}

export function parseFilters(params: URLSearchParams): InventoryFilters {
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? '',
    makes: toList(params.get('make')),
    bodies: toList(params.get('body')),
    fuels: toList(params.get('fuel')),
    minPrice: toNumber(params.get('minPrice')),
    maxPrice: toNumber(params.get('maxPrice')),
    minYear: toNumber(params.get('minYear')),
    maxYear: toNumber(params.get('maxYear')),
    maxMiles: toNumber(params.get('maxMiles')),
    savedOnly: params.get('saved') === '1',
    sort: isSort(sort) ? sort : 'recommended'
  };
}

export function filtersToParams(f: InventoryFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set('q', f.q.trim());
  if (f.makes.length) p.set('make', f.makes.join(','));
  if (f.bodies.length) p.set('body', f.bodies.join(','));
  if (f.fuels.length) p.set('fuel', f.fuels.join(','));
  if (f.minPrice) p.set('minPrice', String(f.minPrice));
  if (f.maxPrice) p.set('maxPrice', String(f.maxPrice));
  if (f.minYear) p.set('minYear', String(f.minYear));
  if (f.maxYear) p.set('maxYear', String(f.maxYear));
  if (f.maxMiles) p.set('maxMiles', String(f.maxMiles));
  if (f.savedOnly) p.set('saved', '1');
  if (f.sort !== 'recommended') p.set('sort', f.sort);
  return p;
}

export function buildInventoryHref(partial: Partial<InventoryFilters>): string {
  const qs = filtersToParams({ ...defaultFilters, ...partial }).toString();
  return qs ? `/inventory?${qs}` : '/inventory';
}

export function applyFilters(list: Vehicle[], f: InventoryFilters, savedIds: string[] = []): Vehicle[] {
  const tokens = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  return list.filter((v) => {
    if (tokens.length) {
      const hay = `${v.year} ${v.make} ${v.model} ${v.trim ?? ''} ${v.bodyStyle} ${v.fuelType}`.toLowerCase();
      if (!tokens.every((t) => hay.includes(t))) return false;
    }
    if (f.makes.length && !f.makes.includes(v.make)) return false;
    if (f.bodies.length && !f.bodies.includes(v.bodyStyle)) return false;
    if (f.fuels.length && !f.fuels.includes(v.fuelType)) return false;
    if (f.minPrice && (v.price == null || v.price < f.minPrice)) return false;
    if (f.maxPrice && (v.price == null || v.price > f.maxPrice)) return false;
    if (f.minYear && v.year < f.minYear) return false;
    if (f.maxYear && v.year > f.maxYear) return false;
    if (f.maxMiles && v.mileage > f.maxMiles) return false;
    if (f.savedOnly && !savedIds.includes(v.id)) return false;
    return true;
  });
}

export function sortVehicles(list: Vehicle[], sort: SortKey): Vehicle[] {
  const copy = [...list];
  const price = (v: Vehicle) => v.price ?? Number.POSITIVE_INFINITY;
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => price(a) - price(b));
    case 'price-desc':
      return copy.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    case 'miles-asc':
      return copy.sort((a, b) => a.mileage - b.mileage);
    case 'year-desc':
      return copy.sort((a, b) => b.year - a.year || a.mileage - b.mileage);
    case 'year-asc':
      return copy.sort((a, b) => a.year - b.year);
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export interface FilterChip {
  id: string;
  label: string;
  next: InventoryFilters;
}

export function getChips(f: InventoryFilters): FilterChip[] {
  const chips: FilterChip[] = [];
  if (f.q.trim()) chips.push({ id: 'q', label: `“${f.q.trim()}”`, next: { ...f, q: '' } });
  f.makes.forEach((m) => chips.push({ id: `make-${m}`, label: m, next: { ...f, makes: f.makes.filter((x) => x !== m) } }));
  f.bodies.forEach((b) => chips.push({ id: `body-${b}`, label: b, next: { ...f, bodies: f.bodies.filter((x) => x !== b) } }));
  f.fuels.forEach((x) => chips.push({ id: `fuel-${x}`, label: x, next: { ...f, fuels: f.fuels.filter((y) => y !== x) } }));
  if (f.minPrice) chips.push({ id: 'minPrice', label: `From ${formatCurrency(f.minPrice)}`, next: { ...f, minPrice: null } });
  if (f.maxPrice) chips.push({ id: 'maxPrice', label: `Up to ${formatCurrency(f.maxPrice)}`, next: { ...f, maxPrice: null } });
  if (f.minYear) chips.push({ id: 'minYear', label: `${f.minYear} or newer`, next: { ...f, minYear: null } });
  if (f.maxYear) chips.push({ id: 'maxYear', label: `${f.maxYear} or older`, next: { ...f, maxYear: null } });
  if (f.maxMiles) chips.push({ id: 'maxMiles', label: `Under ${formatNumber(f.maxMiles)} mi`, next: { ...f, maxMiles: null } });
  if (f.savedOnly) chips.push({ id: 'saved', label: 'Saved only', next: { ...f, savedOnly: false } });
  return chips;
}

export function clearFilters(f: InventoryFilters): InventoryFilters {
  return { ...defaultFilters, sort: f.sort };
}

export function uniqueSorted<T extends string | number>(values: T[]): T[] {
  return Array.from(new Set(values)).sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
}