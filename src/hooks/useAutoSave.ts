import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoSave<T extends Record<string, unknown>>(key: string, data: T, intervalMs = 5000) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dataRef = useRef(data);

  useEffect(() => { dataRef.current = data; }, [data]);

  // Check for existing draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(`draft_${key}`);
    if (draft) setHasDraft(true);
  }, [key]);

  const save = useCallback(() => {
    localStorage.setItem(`draft_${key}`, JSON.stringify(dataRef.current));
    setLastSaved(new Date());
    setHasDraft(true);
  }, [key]);

  const clear = useCallback(() => {
    localStorage.removeItem(`draft_${key}`);
    setLastSaved(null);
    setHasDraft(false);
  }, [key]);

  const load = useCallback((): T | null => {
    const draft = localStorage.getItem(`draft_${key}`);
    return draft ? JSON.parse(draft) : null;
  }, [key]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(save, intervalMs);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [save, intervalMs]);

  return { lastSaved, hasDraft, save, clear, load };
}
