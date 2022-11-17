import { useState, useEffect } from 'react';

export const useFetchWithAbort = (endpoint, options) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setError(null);
      setFetchedData(null);
      try {
        const response = await fetch(endpoint, {
          ...options,
          signal: abortController.signal,
        });

        const newData = await response.json();

        setFetchedData(newData);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('cancelled');
        }

        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  return { fetchedData, isLoading, error };
};
