import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

interface Genre {
  id: number,
  name: string,
}

interface FetchGenresResponse{
  count:number,
  results:Genre[]
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    try {
      apiClient
        .get<FetchGenresResponse>('/genres', { signal: controller.signal })
        .then((res) => {
          setGenres(res.data.results);
          setLoading(false);
        });
    } catch (err) {
      console.log('fallo algo');
      setLoading(false);
      
    }

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
