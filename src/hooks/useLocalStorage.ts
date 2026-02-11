import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
  }, [key, storedValue]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const newVal = value instanceof Function ? value(prev) : value;
      return newVal;
    });
  }, []);

  return [storedValue, setValue] as const;
}

// Generic CRUD hook
export function useCRUD<T extends { id: string }>(key: string, initialData: T[]) {
  const [items, setItems] = useLocalStorage<T[]>(key, initialData);

  const create = useCallback((item: T) => {
    setItems(prev => [...prev, item]);
  }, [setItems]);

  const update = useCallback((id: string, updates: Partial<T>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, [setItems]);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, [setItems]);

  const getById = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  return { items, setItems, create, update, remove, getById };
}
