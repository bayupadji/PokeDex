import { PokemonCard } from '@/components/card';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFavoritePokemon } from '../features/hooks/useFavoritePokemon';
import type { PokemonDetail } from '../features/types/pokemon.types';

export default function FavoritesScreen() {
  const router = useRouter();

  const favoriteQueries =
    useFavoritePokemon();

  const data = favoriteQueries
    .map((query) => query.data)
    .filter(Boolean) as PokemonDetail[];

  const isLoading =
    favoriteQueries.some(
      (query) => query.isPending,
    );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data.length) {
    return (
      <View>
        <Text>
          No favorite Pokémon yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={data}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            number={item.id}
            image={item.sprites.front_default}
            onPress={() =>
              router.push(
                `/pokemon/${item.id}`,
              )
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    width: '100%',
  },
});