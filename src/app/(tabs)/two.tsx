import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import StockListItem from "../../components/StockListItem";
import { gql, useQuery } from "@apollo/client";

const GET_FAVORITES = gql`
  query MyQuery($user_id: String!) {
    favoritesByUser_id(user_id: $user_id) {
      id
      quote {
        name
        symbol
        close
        percent_change
      }
    }
  }
`;
export default function TabTwoScreen() {
  const { data, loading, error } = useQuery(GET_FAVORITES, {
    variables: { user_id: "Shivraj" },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch stocks data</Text>;
  }

  const stocks = data.favoritesByUser_id.map((fav: any) => fav.quote);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Favorites" }} />
      <FlatList
        data={stocks}
        renderItem={({ item }) => <StockListItem stock={item} />}
        contentContainerStyle={{ gap: 20, padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
