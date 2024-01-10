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

  useEffect(() => {
    const controller = new AbortController();

    try {
      apiClient
        .get<FetchGamesResponse>('/games', { signal: controller.signal })
        .then((res) => setGames(res.data.results));
    } catch (err) {
      console.log('fallo algo');
    }

    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
