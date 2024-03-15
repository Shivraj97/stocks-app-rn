import React from "react";
import { Text, View } from "./Themed";
import { StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { MonoText } from "./StyledText";
import { Link } from "expo-router";
import { gql, useMutation } from "@apollo/client";

type Stock = {
  name: string;
  symbol: string;
  close: string;
  percent_change: string;
};
type Props = {
  stock: Stock;
};

const mutation = gql`
  mutation MyMutation($symbol: String!, $user_id: String!) {
    insertFavorites(symbol: $symbol, user_id: $user_id) {
      id
      symbol
      user_id
    }
  }
`;

export default function StockListItem({ stock }: Props) {
  const [runMutation] = useMutation(mutation, {
    variables: { user_id: "Shivraj", symbol: stock.symbol },
  });
  const change = Number.parseFloat(stock?.percent_change);
  const isChangePositive = change > 0;
  const onFavoritesPressed = () => {
    runMutation();
  };
  return (
    <Link href={`/${stock.symbol}`} asChild>
      <Pressable style={styles.container}>
        {/* Left container */}
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={styles.symbol}>
            {stock.symbol}
            <AntDesign
              onPress={onFavoritesPressed}
              name="staro"
              size={18}
              color={"gray"}
            />
          </Text>
          <Text style={styles.name}>{stock.name}</Text>
        </View>
        {/* Right container */}
        <View style={{ alignItems: "flex-end" }}>
          <MonoText style={styles.name}>
            {Number.parseFloat(stock.close).toFixed(1)}
          </MonoText>
          <MonoText style={[isChangePositive ? styles.green : styles.red]}>
            {isChangePositive ? "+" : ""}
            {change.toFixed(1)}%
          </MonoText>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  name: {
    color: "#6b7280",
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
});
