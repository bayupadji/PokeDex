import { PokemonCard } from "@/components/card";
import { typography } from "@/constants/typography";
import { usePokemonList } from "@/features/hooks/usePokemonList";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreens() {
  // Initialize router for navigation
  const router = useRouter();

  // Fetch Pokémon list using hooks
  const {
    data,
    isLoading,
    isError,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList();

  if (isLoading || isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error fetching Pokémon data.</Text>
      </SafeAreaView>
    );
  }

  // Access favorites and toggleFavorite from the store
  // const favorites = usePokemonStore(
  //   (state) => state.favorites
  // );

  // const toggleFavorite = usePokemonStore(
  //   (state) => state.toggleFavorite
  // );

  // const isFavorite = usePokemonStore(
  //   (state) => state.isFavorite
  // );

  return (
    // Main content
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Pokédex
        </Text>
        <Text style={styles.subtitle}>
          Explore all your favorite Pokémon!
        </Text>
      </View>

      <FlatList style={styles.list}
        data={data}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            number={item.id}
            image={item.sprites.front_default}
            onPress={
              () => {
                console.log(`Navigating to Pokémon ID: ${item.id}`);
                router.push(`/pokemon/${item.id}`)
              }
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage
            ? <ActivityIndicator style={styles.footer} size="small" />
            : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    padding: 16,
    marginBottom: 16,
    gap: 4,
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    ...typography.h1,
    color: "#333",
  },
  subtitle: {
    ...typography.subtitle1,
    color: "#666",
  },
  list: {
    width: "100%",
    paddingHorizontal: 16,
  },
  footer: {
    paddingVertical: 16,
  },
});
