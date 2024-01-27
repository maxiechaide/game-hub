import { useEffect, useState } from 'react';
import apiClient from '../../services/api-client';



interface FerchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint:string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    try {
      apiClient
        .get<FerchResponse<T>>(endpoint, { signal: controller.signal })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        });
    } catch (error) {
      
      
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default useData;
