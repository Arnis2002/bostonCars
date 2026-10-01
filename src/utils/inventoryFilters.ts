import type { FilterChip, InventoryFilters, QuickTag, SortKey } from '../types/inventory';
import type { Vehicle } from '../types/vehicle';
import { formatCurrency, formatNumber } from './format';

export const PAGE_SIZE = 9;

export function emptyFilters(): InventoryFilters {
  return {
    keyword: '',
    stockNumber: '',
    makes: [],
    model: '',
    yearMin: null,
    yearMax: null,
    priceMin: null,
    priceMax: null,
    mileageMax: null,
    bodyStyles: [],
    transmissions: [],
    drivetrains: [],
    fuelTypes: [],
    colors: [],
    availability: 'all',
    tags: []
  };
}

export const QUICK_TAG_LABELS: Record<QuickTag, string> = {
  'under-10k': 'Under $10,000',
  'fuel-efficient': 'Fuel efficient',
  'third-row': 'Third-row SUVs',
  family: 'Family vehicles'
};

export function matchesTag(v: Vehicle, tag: QuickTag): boolean {
  switch (tag) {
    case 'under-10k':
      return v.price !== null && v.price < 10000;
    case 'fuel-efficient':
      return (v.highwayMPG ?? 0) >= 32;
    case 'third-row':
      return v.bodyStyle === 'SUV' && v.seating >= 7;
    case 'family':
      return v.bodyStyle === 'Minivan' || v.bodyStyle === 'SUV';
    default:
      return true;
  }
}

export function applyFilters(vehicles: Vehicle[], f: InventoryFilters): Vehicle[] {
  const words = f.keyword.toLowerCase().split(/\s+/).filter(Boolean);
  const stock = f.stockNumber.trim().toLowerCase();

  return vehicles.filter((v) => {
    if (v.status === 'sold') return false;
    if (words.length) {
      const haystack = `${v.year} ${v.make} ${v.model} ${v.trim} ${v.bodyStyle} ${v.exteriorColor} ${v.features.join(' ')}`.toLowerCase();
      if (!words.every((w) => haystack.includes(w))) return false;
    }
    if (stock && !v.stockNumber.toLowerCase().includes(stock) && !v.vin.toLowerCase().endsWith(stock)) return false;
    if (f.makes.length && !f.makes.includes(v.make)) return false;
    if (f.model && v.model !== f.model) return false;
    if (f.yearMin !== null && v.year < f.yearMin) return false;
    if (f.yearMax !== null && v.year > f.yearMax) return false;
    if (f.priceMin !== null && (v.price === null || v.price < f.priceMin)) return false;
    if (f.priceMax !== null && (v.price === null || v.price > f.priceMax)) return false;
    if (f.mileageMax !== null && v.mileage > f.mileageMax) return false;
    if (f.bodyStyles.length && !f.bodyStyles.includes(v.bodyStyle)) return false;
    if (f.transmissions.length && !f.transmissions.includes(v.transmission)) return false;
    if (f.drivetrains.length && !f.drivetrains.includes(v.drivetrain)) return false;
    if (f.fuelTypes.length && !f.fuelTypes.includes(v.fuelType)) return false;
    if (f.colors.length && !f.colors.includes(v.exteriorColorFamily)) return false;
    if (f.availability !== 'all' && v.status !== f.availability) return false;
    if (f.tags.length && !f.tags.every((t) => matchesTag(v, t))) return false;
    return true;
  });
}

export function sortVehicles(vehicles: Vehicle[], sort: SortKey): Vehicle[] {
  const list = [...vehicles];
  const priceOf = (v: Vehicle, fallback: number) => v.price === null ? fallback : v.price;
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => priceOf(a, Infinity) - priceOf(b, Infinity));
    case 'price-desc':
      return list.sort((a, b) => priceOf(b, -Infinity) - priceOf(a, -Infinity));
    case 'mileage-asc':
      return list.sort((a, b) => a.mileage - b.mileage);
    case 'year-desc':
      return list.sort((a, b) => b.year - a.year || a.mileage - b.mileage);
    case 'year-asc':
      return list.sort((a, b) => a.year - b.year);
    case 'newest':
    default:
      return list.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
  }
}

const listParam = (p: URLSearchParams, key: string) => p.get(key)?.split(',').filter(Boolean) ?? [];
const numParam = (p: URLSearchParams, key: string) => {
  const raw = p.get(key);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

export function paramsToFilters(p: URLSearchParams): InventoryFilters {
  const availability = p.get('status');
  return {
    keyword: p.get('q') ?? '',
    stockNumber: p.get('stock') ?? '',
    makes: listParam(p, 'make'),
    model: p.get('model') ?? '',
    yearMin: numParam(p, 'yearMin'),
    yearMax: numParam(p, 'yearMax'),
    priceMin: numParam(p, 'priceMin'),
    priceMax: numParam(p, 'priceMax'),
    mileageMax: numParam(p, 'mileageMax'),
    bodyStyles: listParam(p, 'body') as InventoryFilters['bodyStyles'],
    transmissions: listParam(p, 'trans') as InventoryFilters['transmissions'],
    drivetrains: listParam(p, 'drive') as InventoryFilters['drivetrains'],
    fuelTypes: listParam(p, 'fuel') as InventoryFilters['fuelTypes'],
    colors: listParam(p, 'color') as InventoryFilters['colors'],
    availability: availability === 'available' || availability === 'pending' ? availability : 'all',
    tags: listParam(p, 'tags') as QuickTag[]
  };
}

export function filtersToParams(f: InventoryFilters, sort?: SortKey): URLSearchParams {
  const p = new URLSearchParams();
  const setList = (k: string, v: string[]) => v.length && p.set(k, v.join(','));
  const setNum = (k: string, v: number | null) => v !== null && p.set(k, String(v));
  if (f.keyword.trim()) p.set('q', f.keyword.trim());
  if (f.stockNumber.trim()) p.set('stock', f.stockNumber.trim());
  setList('make', f.makes);
  if (f.model) p.set('model', f.model);
  setNum('yearMin', f.yearMin);
  setNum('yearMax', f.yearMax);
  setNum('priceMin', f.priceMin);
  setNum('priceMax', f.priceMax);
  setNum('mileageMax', f.mileageMax);
  setList('body', f.bodyStyles);
  setList('trans', f.transmissions);
  setList('drive', f.drivetrains);
  setList('fuel', f.fuelTypes);
  setList('color', f.colors);
  if (f.availability !== 'all') p.set('status', f.availability);
  setList('tags', f.tags);
  if (sort && sort !== 'newest') p.set('sort', sort);
  return p;
}

export function inventoryHref(partial: Partial<InventoryFilters> = {}): string {
  const qs = filtersToParams({ ...emptyFilters(), ...partial }).toString();
  return qs ? `/inventory?${qs}` : '/inventory';
}

export function getFilterChips(f: InventoryFilters): FilterChip[] {
  const chips: FilterChip[] = [];
  if (f.keyword) chips.push({ id: 'q', label: `“${f.keyword}”`, clear: (x) => ({ ...x, keyword: '' }) });
  if (f.stockNumber) chips.push({ id: 'stock', label: `Stock ${f.stockNumber}`, clear: (x) => ({ ...x, stockNumber: '' }) });
  f.makes.forEach((m) => chips.push({ id: `make-${m}`, label: m, clear: (x) => ({ ...x, makes: x.makes.filter((i) => i !== m), model: '' }) }));
  if (f.model) chips.push({ id: 'model', label: f.model, clear: (x) => ({ ...x, model: '' }) });
  if (f.yearMin !== null || f.yearMax !== null) {
    const label = f.yearMin !== null && f.yearMax !== null ? `${f.yearMin}–${f.yearMax}` : f.yearMin !== null ? `${f.yearMin} or newer` : `${f.yearMax} or older`;
    chips.push({ id: 'year', label, clear: (x) => ({ ...x, yearMin: null, yearMax: null }) });
  }
  if (f.priceMin !== null || f.priceMax !== null) {
    const label =
    f.priceMin !== null && f.priceMax !== null ?
    `${formatCurrency(f.priceMin)}–${formatCurrency(f.priceMax)}` :
    f.priceMax !== null ?
    `Under ${formatCurrency(f.priceMax)}` :
    `${formatCurrency(f.priceMin as number)}+`;
    chips.push({ id: 'price', label, clear: (x) => ({ ...x, priceMin: null, priceMax: null }) });
  }
  if (f.mileageMax !== null) chips.push({ id: 'miles', label: `Under ${formatNumber(f.mileageMax)} mi`, clear: (x) => ({ ...x, mileageMax: null }) });
  f.bodyStyles.forEach((b) => chips.push({ id: `body-${b}`, label: b, clear: (x) => ({ ...x, bodyStyles: x.bodyStyles.filter((i) => i !== b) }) }));
  f.transmissions.forEach((t) => chips.push({ id: `trans-${t}`, label: t, clear: (x) => ({ ...x, transmissions: x.transmissions.filter((i) => i !== t) }) }));
  f.drivetrains.forEach((d) => chips.push({ id: `drive-${d}`, label: d, clear: (x) => ({ ...x, drivetrains: x.drivetrains.filter((i) => i !== d) }) }));
  f.fuelTypes.forEach((u) => chips.push({ id: `fuel-${u}`, label: u, clear: (x) => ({ ...x, fuelTypes: x.fuelTypes.filter((i) => i !== u) }) }));
  f.colors.forEach((c) => chips.push({ id: `color-${c}`, label: `${c} exterior`, clear: (x) => ({ ...x, colors: x.colors.filter((i) => i !== c) }) }));
  if (f.availability !== 'all') chips.push({ id: 'status', label: f.availability === 'available' ? 'Available now' : 'Sale pending', clear: (x) => ({ ...x, availability: 'all' }) });
  f.tags.forEach((t) => chips.push({ id: `tag-${t}`, label: QUICK_TAG_LABELS[t], clear: (x) => ({ ...x, tags: x.tags.filter((i) => i !== t) }) }));
  return chips;
}

export function countBy<T extends string>(vehicles: Vehicle[], pick: (v: Vehicle) => T): Map<T, number> {
  const map = new Map<T, number>();
  vehicles.forEach((v) => map.set(pick(v), (map.get(pick(v)) ?? 0) + 1));
  return map;
}