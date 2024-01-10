import { useEffect, useState } from 'react';
import apiClient from '../../services/api-client';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string; //api doc
  parent_platforms: { platform: Platform }[];
  metacritic: never;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true)

    try {
      apiClient
        .get<FetchGamesResponse>('/games', { signal: controller.signal })
        .then((res) => {
          setGames(res.data.results);
          setLoading(false)
        } 
        );
    } catch (err) {
      console.log('fallo algo');
      setLoading(false)
    }

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
