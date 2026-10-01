import { useEffect, useState } from 'react';
import { fetchInventory, getCachedInventory } from '../utils/inventoryApi';
import type { LoadStatus } from '../types/inventory';
import type { Vehicle } from '../types/vehicle';

export function useInventory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getCachedInventory() ?? []);
  const [status, setStatus] = useState<LoadStatus>(() => getCachedInventory() ? 'success' : 'loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt === 0 && getCachedInventory()) return;
    let active = true;
    setStatus('loading');
    fetchInventory().
    then((data) => {
      if (!active) return;
      setVehicles(data);
      setStatus('success');
    }).
    catch(() => active && setStatus('error'));
    return () => {
      active = false;
    };
  }, [attempt]);

  return { vehicles, status, retry: () => setAttempt((a) => a + 1) };
}