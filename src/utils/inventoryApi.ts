import { inventory } from '../data/inventory';
import type { Vehicle } from '../types/vehicle';

/**
 * Inventory data layer. Swap the body of `loadFromSource` for the dealership's inventory provider,
 * DMS export or a custom .NET / Node.js API — the UI only depends on the `Vehicle` shape.
 */
let cache: Vehicle[] | null = null;
let pending: Promise<Vehicle[]> | null = null;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadFromSource(): Promise<Vehicle[]> {
  await wait(550);
  // Never surface sold units as available.
  return inventory.filter((v) => v.status !== 'sold');
}

export function fetchInventory(): Promise<Vehicle[]> {
  if (cache) return Promise.resolve(cache);
  if (!pending) {
    pending = loadFromSource().
    then((data) => {
      cache = data;
      return data;
    }).
    finally(() => {
      pending = null;
    });
  }
  return pending;
}

export function getCachedInventory(): Vehicle[] | null {
  return cache;
}