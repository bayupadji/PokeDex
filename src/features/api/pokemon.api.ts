import type {
  PokemonDetail,
  PokemonItem,
  PokemonListResponse
} from '../types/pokemon.types';

const POKE_API_URL =
  'https://pokeapi.co/api/v2';

// Fetch a list of Pokémon with pagination
export async function getPokemonList(
  limit = 20,
  offset = 0,
): Promise<PokemonItem[]> {
  const response = await fetch(
    `${POKE_API_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon');
  }

  const data: PokemonListResponse =
    await response.json();

  return data.results.map((pokemon) => {
    const id = pokemon.url
      .split('/')
      .filter(Boolean)
      .pop();

    return {
      id: Number(id),
      name: pokemon.name,
      url: pokemon.url,
    };
  });
}

// Fetch Pokémon details by ID
export async function getPokemonDetails(
  id: number,
): Promise<PokemonDetail> {
  const response = await fetch(
    `${POKE_API_URL}/pokemon/${id}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }

  return response.json();
}