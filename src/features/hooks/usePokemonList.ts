import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '../api/pokemon.api';

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: () => getPokemonList(20, 0),
  });
}