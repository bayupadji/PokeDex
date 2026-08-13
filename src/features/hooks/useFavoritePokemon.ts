import { useQueries } from '@tanstack/react-query';
import { getPokemonDetails } from '../api/pokemon.api';
import { usePokemonStore } from '../store/pokemon.store';

export function useFavoritePokemon() {
  const favorites = usePokemonStore(
    (state) => state.favorites,
  );

  return useQueries({
    queries: favorites.map((id) => ({
      queryKey: ['pokemon', 'detail', id],
      queryFn: () =>
        getPokemonDetails(id),
    })),
  });
}