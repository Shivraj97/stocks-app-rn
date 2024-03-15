import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { Stack } from "expo-router";
import top5 from "@/assets/data/top5.json";
import StockListItem from "../../components/StockListItem";
import { gql, useQuery } from "@apollo/client";

const GET_QUOTES = gql`
  query myQuery($symbol: String) {
    quotes(symbol: $symbol) {
      name
      value {
        close
        name
        percent_change
        symbol
      }
    }
  }
`;
export default function TabOneScreen() {
  const { data, loading, error } = useQuery(GET_QUOTES, {
    variables: { symbol: "AAPL,GE,IBM,MSFT,TSLA,META" },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch stocks data</Text>;
  }

  const stocks = data?.quotes?.map((q: any) => q.value);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Stocks" }} />
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
  title: {
    padding: 16,
  },
});
