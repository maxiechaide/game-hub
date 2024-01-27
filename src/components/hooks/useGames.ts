import useData from './useData';

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



const useGames = () => useData<Game>("/games")

export default useGames;
