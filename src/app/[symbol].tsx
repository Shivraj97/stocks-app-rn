import { View, Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import StockListItem from "../components/StockListItem";
import { Stack } from "expo-router";
import Graph from "../components/Graph";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";

const GET_QUOTE = gql`
  query MyQuery($symbol: String) {
    quote(symbol: $symbol) {
      name
      symbol
      close
      percent_change
    }
  }
`;
const stock = () => {
  const { symbol } = useLocalSearchParams();
  const { data, loading, error } = useQuery(GET_QUOTE, {
    variables: { symbol },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch stocks data</Text>;
  }

  const stock = data?.quote;

  return (
    <View style={{ padding: 10 }}>
      <Stack.Screen
        options={{ title: stock.symbol, headerBackTitleVisible: false }}
      />
      <StockListItem stock={stock} />
      <Graph symbol={stock.symbol} />
    </View>
  );
};

export default stock;
