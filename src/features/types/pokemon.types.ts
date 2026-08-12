export type PokemonItem = {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string | null;
  };
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type PokemonPage = {
  items: PokemonItem[];
  nextOffset: number | null;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: PokemonType[];
  stats: PokemonStat[];
};