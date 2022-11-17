import axios from 'axios';

let cancelToken = null;

export const fetchWithAXiosCancel = async (endpoint, api = axios, options) => {
  let fetchedData = { isLoading: true, data: null, error: null };

  if (cancelToken) {
    cancelToken.cancel();
  }

  cancelToken = axios.CancelToken.source();

  try {
    const response = await api.get(endpoint, {
      cancelToken: cancelToken.token,
      ...options,
    });

    const newData = await response.data;

    fetchedData = { ...fetchedData, data: newData };
    cancelToken = null;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('cancelled');
    }

    fetchedData = { ...fetchedData, error: error };
  } finally {
    fetchedData = { ...fetchedData, isLoading: false };
  }

  return fetchedData;
};
