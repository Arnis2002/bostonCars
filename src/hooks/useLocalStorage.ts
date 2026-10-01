import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {

      /* storage unavailable — keep in memory only */}
  }, [key, value]);

  const update = useCallback((next: T | ((prev: T) => T)) => setValue(next), []);
  return [value, update] as const;
}