import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { vehicles } from '../data/vehicles';

export const COMPARE_LIMIT = 3;

interface GarageValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  compareIds: string[];
  isComparing: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  compareOpen: boolean;
  setCompareOpen: (open: boolean) => void;
  notice: string;
}

const GarageContext = createContext<GarageValue | null>(null);
const knownIds = new Set(vehicles.map((v) => v.id));

export function GarageProvider({ children }: {children: React.ReactNode;}) {
  const [rawSaved, setSaved] = useLocalStorage<string[]>('bfm-demo:saved', []);
  const [rawCompare, setCompare] = useLocalStorage<string[]>('bfm-demo:compare', []);
  const [compareOpen, setCompareOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const timer = useRef<number>();

  const savedIds = useMemo(() => rawSaved.filter((id) => knownIds.has(id)), [rawSaved]);
  const compareIds = useMemo(() => rawCompare.filter((id) => knownIds.has(id)).slice(0, COMPARE_LIMIT), [rawCompare]);

  const flash = useCallback((message: string) => {
    setNotice(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNotice(''), 3200);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggleSaved = useCallback(
    (id: string) => setSaved((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]),
    [setSaved]
  );

  const toggleCompare = useCallback(
    (id: string) => {
      if (compareIds.includes(id)) {
        setCompare(compareIds.filter((x) => x !== id));
        return;
      }
      if (compareIds.length >= COMPARE_LIMIT) {
        flash(`You can compare up to ${COMPARE_LIMIT} cars. Remove one to add another.`);
        return;
      }
      setCompare([...compareIds, id]);
    },
    [compareIds, setCompare, flash]
  );

  const clearCompare = useCallback(() => {
    setCompare([]);
    setCompareOpen(false);
  }, [setCompare]);

  const value: GarageValue = {
    savedIds,
    isSaved: (id) => savedIds.includes(id),
    toggleSaved,
    compareIds,
    isComparing: (id) => compareIds.includes(id),
    toggleCompare,
    clearCompare,
    compareOpen,
    setCompareOpen,
    notice
  };

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}

export function useGarage(): GarageValue {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error('useGarage must be used inside GarageProvider');
  return ctx;
}