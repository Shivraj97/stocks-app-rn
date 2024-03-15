import { LineGraph, GraphPoint } from "react-native-graph";
import { View, Text } from "./Themed";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import timeSeries from "@/assets/data/timeseries.json";
import { MonoText } from "./StyledText";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";

const query = gql`
  query MyQuery($symbol: String!, $interval: String!) {
    time_series(interval: $interval, symbol: $symbol) {
      values {
        datetime
        close
      }
    }
  }
`;
const Graph = ({ symbol }: { symbol: string }) => {
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();
  const { data, loading, error } = useQuery(query, {
    variables: {
      symbol,
      interval: "1day",
    },
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error</Text>;
  }

  // console.log("data", JSON.stringify(data, null, 2));
  const points: GraphPoint[] = data?.time_series?.values?.map((item: any) => ({
    date: new Date(item?.datetime),
    value: Number.parseFloat(item?.close),
  }));

  // useEffect(() => {
  //   setSelectedPoint(points[points.length - 1]);
  // }, [symbol]);

  const onPointSelected = (point: GraphPoint) => {
    setSelectedPoint(point);
  };

  return (
    <View>
      <MonoText style={{ fontSize: 20, fontWeight: "bold", color: "#017560" }}>
        ${selectedPoint?.value.toFixed(1)}
      </MonoText>
      <Text style={{ color: "gray" }}>
        {selectedPoint?.date.toDateString()}
      </Text>
      <LineGraph
        style={{
          width: "100%",
          height: 300,
        }}
        points={points}
        animated={true}
        color="#017560"
        gradientFillColors={["#0175605D", "#7476df00"]}
        enablePanGesture
        onPointSelected={onPointSelected}
        enableIndicator
        indicatorPulsating
        enableFadeInMask
      />
    </View>
  );
};

export default Graph;
