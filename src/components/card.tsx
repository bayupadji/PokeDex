import { typography } from '@/constants/typography';
import { Pressable, StyleSheet, Text } from 'react-native';

type PokemonCardProps = {
  name: string;
  number: number;
  onPress: () => void;
};

export function PokemonCard({
  name,
  number,
  onPress,
}: PokemonCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.number}>
        #{String(number).padStart(3, '0')}
      </Text>

      <Text style={styles.name}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F2F2F2',
  },

  number: {
    ...typography.subtitle2,
    color: '#999',
  },

  name: {
    marginTop: 8,
    ...typography.h5,
    color: '#333',
  },
});