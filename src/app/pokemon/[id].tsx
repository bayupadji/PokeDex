import typography from '@/constants/typography';
import { useLocalSearchParams } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Sample Pokémon data
const pokemonData = [
  {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    height: 7,
    weight: 69,
  },
  {
    id: 4,
    name: 'charmander',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['fire'],
    height: 6,
    weight: 85,
  },
  {
    id: 25,
    name: 'pikachu',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
    height: 4,
    weight: 60,
  },
];

export default function PokemonDetailScreen() {
  const pokemon = pokemonData.find(
    (pokemon) => pokemon.id === Number(useLocalSearchParams().id),
  );

  // Handle case when Pokémon is not found
  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text>Pokémon not found.</Text>
      </View>
    );
  }
  const { id } = pokemon;

  return (
    <View style={styles.container}>
      <Text style={styles.number}>
        #{String(id).padStart(3, '0')}
      </Text>

      <Image
        source={{
          uri: pokemon.image,
        }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {pokemon.name}
      </Text>

      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <View
            key={type}
            style={styles.type}
          >
            <Text style={styles.typeText}>
              {type}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.info}>
        <Text>
          Height: {pokemon.height}
        </Text>

        <Text>
          Weight: {pokemon.weight}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },

  number: {
    ...typography.subtitle2,
    color: '#666',
  },

  image: {
    width: 240,
    height: 240,
    marginTop: 16,
  },

  name: {
    marginTop: 16,
    ...typography.h4,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  types: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  type: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#eee',
  },

  typeText: {
    textTransform: 'capitalize',
  },

  info: {
    width: '100%',
    gap: 8,
    marginTop: 24,
  },
});