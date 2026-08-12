import { typography } from '@/constants/typography';
import { useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { usePokemonDetail } from '../../features/hooks/usePokemonDetail';

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const pokemonId = Number(id);

  const {
    data,
    isPending,
    isError,
  } = usePokemonDetail(pokemonId);

  // Loading state
  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  // Error / not found state
  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Pokémon not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Image
        source={{
          uri:
            data.sprites.front_default ??
            undefined,
        }}
        style={styles.image}
      />


      <Text style={styles.number}>
        #{String(data.id).padStart(3, '0')}
      </Text>

      <Text style={styles.name}>
        {data.name}
      </Text>


      <View style={styles.types}>
        {data.types.map((item) => (
          <View
            key={item.slot}
            style={styles.type}
          >
            <Text style={styles.typeText}>
              {item.type.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>
            Height
          </Text>

          <Text style={styles.infoValue}>
            {data.height}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>
            Weight
          </Text>

          <Text style={styles.infoValue}>
            {data.weight}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Base Stats
      </Text>

      <View style={styles.stats}>
        {data.stats.map((item) => (
          <View
            key={item.stat.name}
            style={styles.statRow}
          >
            <Text style={styles.statName}>
              {item.stat.name}
            </Text>

            <Text style={styles.statValue}>
              {item.base_stat}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    ...typography.h5,
    color: 'red',
  },

  image: {
    width: 240,
    height: 240,
    alignSelf: 'center',
  },

  number: {
    marginTop: 8,
    textAlign: 'center',
    ...typography.subtitle1,
    color: '#666',
  },

  name: {
    marginTop: 4,
    textAlign: 'center',
    ...typography.h3,
    textTransform: 'capitalize',
  },

  types: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },

  type: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#E5E5E5',
  },

  typeText: {
    textTransform: 'capitalize',
  },

  info: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },

  infoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },

  infoLabel: {
    ...typography.subtitle2,
    color: '#666',
  },

  infoValue: {
    marginTop: 4,
    ...typography.h5,
  },

  sectionTitle: {
    marginTop: 32,
    marginBottom: 12,
    ...typography.h4,
  },

  stats: {
    gap: 8,
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  statName: {
    textTransform: 'capitalize',
  },

  statValue: {
    ...typography.body1,
  },
});