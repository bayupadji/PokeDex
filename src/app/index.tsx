import { PokemonCard } from "@/components/card";
import { typography } from "@/constants/typography";
import { usePokemonList } from "@/features/hooks/usePokemonList";
import { Link, useRouter } from "expo-router";
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



  return (
    // Main content
    <SafeAreaView style={styles.container}>
      <View style={styles.headercollumn}>
        <View style={styles.header}>
          <Text style={styles.title}>Pokédex</Text>
          <Text style={styles.subtitle}>
            Browse and discover Pokémon
          </Text>
        </View>

        <Link href="/favorites" style={styles.Link}>
          <Text style={{ color: 'white' }}>Favorites</Text>
        </Link>
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
    gap: 4,
    alignItems: "flex-start",
  },
  headercollumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
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

  Link: {
    alignSelf: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#333',
  },
});
