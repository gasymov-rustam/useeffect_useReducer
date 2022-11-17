let abortController = null;

export const fetchWithAbortController = async (endpoint, options) => {
  let fetchedData = { isLoading: true, data: null, error: null };

  if (abortController) {
    console.log('cancel');
    abortController.abort();
  }

  abortController = new AbortController();

  try {
    const response = await fetch(endpoint, {
      ...options,
      signal: abortController.signal,
    });

    const newData = await response.json();

    fetchedData = { ...fetchedData, data: newData };
    abortController = null;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('cancelled');
    }

    fetchedData = { ...fetchedData, error: error };
  } finally {
    fetchedData = { ...fetchedData, isLoading: false };
  }

  return fetchedData;
};
