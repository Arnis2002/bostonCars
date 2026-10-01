import type { BodyStyle, ColorFamily, Drivetrain, FuelType, Transmission } from './vehicle';

export type QuickTag = 'under-10k' | 'fuel-efficient' | 'third-row' | 'family';
export type AvailabilityFilter = 'all' | 'available' | 'pending';
export type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc' | 'year-asc';
export type LoadStatus = 'loading' | 'success' | 'error';

export interface InventoryFilters {
  keyword: string;
  stockNumber: string;
  makes: string[];
  model: string;
  yearMin: number | null;
  yearMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  mileageMax: number | null;
  bodyStyles: BodyStyle[];
  transmissions: Transmission[];
  drivetrains: Drivetrain[];
  fuelTypes: FuelType[];
  colors: ColorFamily[];
  availability: AvailabilityFilter;
  tags: QuickTag[];
}

export interface FilterChip {
  id: string;
  label: string;
  clear: (filters: InventoryFilters) => InventoryFilters;
}

export interface QuickFilterDefinition {
  id: string;
  label: string;
  filters: Partial<InventoryFilters>;
}