import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemonList } from '../api/pokemon.api';

export function usePokemonList() {
  const query = useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    initialPageParam: 0,
  });

  // Flatten all pages into a single array
  const data = query.data?.pages.flatMap((page) => page.items) ?? [];

  return { ...query, data };
}