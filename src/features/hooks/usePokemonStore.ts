import { create } from 'zustand';
import type {
  PokemonStore,
} from '../types/pokemon.store.types';

export const usePokemonStore =
  create<PokemonStore>((set, get) => ({
    favorites: [],

    toggleFavorite: (pokemonId) =>
      set((state) => {
        const isFavorite =
          state.favorites.includes(
            pokemonId,
          );

        return {
          favorites: isFavorite
            ? state.favorites.filter(
              (id) => id !== pokemonId,
            )
            : [
              ...state.favorites,
              pokemonId,
            ],
        };
      }),

    isFavorite: (pokemonId) =>
      get().favorites.includes(
        pokemonId,
      ),
  }));