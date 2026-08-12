import { Pressable, StyleSheet, Text } from 'react-native';

import { typography } from '@/constants/typography';
import { usePokemonStore } from '@/features/store/pokemon.store';

type Props = {
  pokemonId: number;
};

export function FavoriteButton({
  pokemonId,
}: Props) {
  const favorite = usePokemonStore((state) =>
    state.favorites.includes(pokemonId),
  );

  const toggleFavorite = usePokemonStore(
    (state) => state.toggleFavorite,
  );

  return (
    <Pressable style={styles.Button}
      onPress={() =>
        toggleFavorite(pokemonId)
      }
    >
      <Text style={styles.ButtonText}>
        {favorite
          ? 'Remove Favorite'
          : 'Add Favorite'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Button: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#333',
  },

  ButtonText: {
    color: '#fff',
    ...typography.subtitle1,
  },
});