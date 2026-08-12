import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import type { PokemonStore } from '../types/pokemon.store.types';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';


export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (pokemonId) =>
        set((state) => {
          const isFavorite =
            state.favorites.includes(pokemonId);

          return {
            favorites: isFavorite
              ? state.favorites.filter(
                (id) => id !== pokemonId,
              )
              : [...state.favorites, pokemonId],
          };
        }),

      isFavorite: (pokemonId) =>
        get().favorites.includes(pokemonId),
    }),
    {
      name: 'pokemon-storage',
      storage: createJSONStorage(
        () => AsyncStorage,
      ),
    },
  ),
);