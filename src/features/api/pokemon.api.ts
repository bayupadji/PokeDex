import type {
  PokemonDetail,
  PokemonItem,
  PokemonListResponse,
  PokemonPage,
} from '../types/pokemon.types';

const POKE_API_URL =
  process.env.EXPO_PUBLIC_API_URL;

const PAGE_SIZE = 20;

// Fetch a paginated list of Pokémon (with sprites)
export async function getPokemonList(
  offset = 0,
): Promise<PokemonPage> {
  const response = await fetch(
    `${POKE_API_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon');
  }

  const data: PokemonListResponse =
    await response.json();

  const items = await Promise.all(
    data.results.map(async (pokemon) => {
      const id = pokemon.url
        .split('/')
        .filter(Boolean)
        .pop();

      const detailRes = await fetch(
        `${POKE_API_URL}/pokemon/${id}`,
      );

      if (!detailRes.ok) {
        throw new Error(
          `Failed to fetch details for ${pokemon.name}`,
        );
      }

      const detail = await detailRes.json();

      return {
        id: Number(id),
        name: pokemon.name,
        url: pokemon.url,
        sprites: {
          front_default: detail.sprites?.front_default ?? null,
        },
      } as PokemonItem;
    }),
  );

  // nextOffset is null when there's no next page
  const nextOffset = data.next
    ? offset + PAGE_SIZE
    : null;

  return { items, nextOffset };
}


// Fetch Pokémon details
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