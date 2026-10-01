import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export const COMPARE_LIMIT = 3;

interface GarageValue {
  savedIds: string[];
  compareIds: string[];
  recentIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => boolean;
  isComparing: (id: string) => boolean;
  toggleCompare: (id: string) => 'added' | 'removed' | 'full';
  clearCompare: () => void;
  addRecent: (id: string) => void;
}

const GarageContext = createContext<GarageValue | null>(null);

function useStoredList(key: string): [string[], React.Dispatch<React.SetStateAction<string[]>>] {
  const [list, setList] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '[]') as string[];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
    } catch {

      // Storage unavailable.
    }}, [key, list]);
  return [list, setList];
}

export function GarageProvider({ children }: {children: React.ReactNode;}) {
  const [savedIds, setSaved] = useStoredList('swas-saved');
  const [compareIds, setCompare] = useStoredList('swas-compare');
  const [recentIds, setRecent] = useStoredList('swas-recent');

  const toggleSaved = useCallback(
    (id: string) => {
      const willSave = !savedIds.includes(id);
      setSaved((prev) => willSave ? [id, ...prev] : prev.filter((x) => x !== id));
      return willSave;
    },
    [savedIds, setSaved]
  );

  const toggleCompare = useCallback(
    (id: string): 'added' | 'removed' | 'full' => {
      if (compareIds.includes(id)) {
        setCompare((prev) => prev.filter((x) => x !== id));
        return 'removed';
      }
      if (compareIds.length >= COMPARE_LIMIT) return 'full';
      setCompare((prev) => [...prev, id]);
      return 'added';
    },
    [compareIds, setCompare]
  );

  const addRecent = useCallback((id: string) => setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8)), [setRecent]);

  const value = useMemo<GarageValue>(
    () => ({
      savedIds,
      compareIds,
      recentIds,
      isSaved: (id) => savedIds.includes(id),
      toggleSaved,
      isComparing: (id) => compareIds.includes(id),
      toggleCompare,
      clearCompare: () => setCompare([]),
      addRecent
    }),
    [savedIds, compareIds, recentIds, toggleSaved, toggleCompare, addRecent, setCompare]
  );

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}

export function useGarage(): GarageValue {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error('useGarage must be used within GarageProvider');
  return ctx;
}