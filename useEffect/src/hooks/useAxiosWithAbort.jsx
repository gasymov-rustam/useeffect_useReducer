import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export const useAxiosWithAbort = (endpoint, api = axios, options) => {
  const [fetchedData, setFetchedData] = useState({
    isLoading: true,
    fetchedData: null,
    error: null,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    let data = { isLoading: true, fetchedData: null, error: null };

    (async () => {
      try {
        const response = await api.get(endpoint, {
          cancelToken: cancelToken.token,
          ...options,
        });

        const newData = await response?.data;

        data = { ...data, fetchedData: newData };
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('cancelled');
        }

        data = { ...data, error: error };
      } finally {
        setFetchedData((prev) => ({
          ...prev,
          error: data.error,
          fetchedData: data.fetchedData,
          isLoading: false,
        }));
      }
    })();

    return () => {
      cancelToken.cancel();
    };
  }, [endpoint]);

  return fetchedData;
};
