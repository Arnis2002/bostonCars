import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { emptyFilters, filtersToParams, paramsToFilters } from '../utils/inventoryFilters';
import type { InventoryFilters, SortKey } from '../types/inventory';

const SORT_KEYS: SortKey[] = ['newest', 'price-asc', 'price-desc', 'mileage-asc', 'year-desc', 'year-asc'];

/** URL is the source of truth so every filtered view has a shareable, indexable address. */
export function useInventoryFilters() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => paramsToFilters(params), [params]);
  const rawSort = params.get('sort') as SortKey | null;
  const sort: SortKey = rawSort && SORT_KEYS.includes(rawSort) ? rawSort : 'newest';

  const setFilters = useCallback(
    (next: InventoryFilters, nextSort: SortKey = sort) => setParams(filtersToParams(next, nextSort), { replace: true }),
    [setParams, sort]
  );

  return {
    filters,
    sort,
    paramsKey: params.toString(),
    setFilters,
    setSort: (s: SortKey) => setFilters(filters, s),
    clear: () => setFilters(emptyFilters(), sort)
  };
}