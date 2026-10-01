import type { QuickFilterDefinition } from '../types/inventory';

/** Each quick filter is only rendered when current inventory has at least one match. */
export const quickFilters: QuickFilterDefinition[] = [
{ id: 'cars', label: 'Cars', filters: { bodyStyles: ['Sedan', 'Hatchback'] } },
{ id: 'suvs', label: 'SUVs', filters: { bodyStyles: ['SUV'] } },
{ id: 'trucks', label: 'Trucks', filters: { bodyStyles: ['Pickup Truck'] } },
{ id: 'under-10k', label: 'Under $10,000', filters: { tags: ['under-10k'] } },
{ id: 'fuel', label: 'Fuel Efficient', filters: { tags: ['fuel-efficient'] } },
{ id: 'third-row', label: 'Third-Row SUVs', filters: { tags: ['third-row'] } }];