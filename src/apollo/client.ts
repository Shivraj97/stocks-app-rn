import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://paulsvalley.stepzen.net/api/waxen-opossum/__graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      "Apikey paulsvalley::stepzen.net+1000::1f35e82fa8f53f9cfee0751d3845629cdf3116c29edaeb16da8f697166e1793f",
  },
});

export default client;
