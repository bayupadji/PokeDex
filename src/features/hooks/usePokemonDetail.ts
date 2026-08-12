import { useQuery } from '@tanstack/react-query';

import { getPokemonDetails } from '../api/pokemon.api';

export function usePokemonDetail(id: number) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonDetails(id),
    enabled: Boolean(id),
  });
}