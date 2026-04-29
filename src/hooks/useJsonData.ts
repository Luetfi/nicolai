import { useEffect, useState } from 'react';

interface JsonDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useJsonData<T>(url: string): JsonDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetch(url, { cache: 'no-store', signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Fetch ${url} failed: ${res.status}`);
        }
        return res.json() as Promise<T>;
      })
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
