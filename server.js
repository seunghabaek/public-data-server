import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Query {
    seaTurtleMeta: [SeaTurtleMeta]
    seaTurtleLocation(id: String): [SeaTurtleLocation]
  }
  type SeaTurtleMeta {
    pttId: String
    spcKrNm: String
    spcScinmShort: String
    nttyDltAt: String
    nttyGndr: String
    nttyWght: Float
    nttyLt: Float
    nttyWdth: String!
    nttyAcqstDe: String
    nttyAcqstLcNm: String
    dschrgDe: String
    dschrAcqstLcNm: String
    mngInstNm: String
    mngPznInstNm: String
  }
  type SeaTurtleLocation {
    gid: String!
    pttId: String!
    obsrTm: String
    obsrLat: Float
    obsrLon: Float
  }
`;

const resolvers = {
  Query: {
    seaTurtleMeta() {
      const API_KEY = process.env.REACT_APP_SERVICE_KEY;
      return fetch(
        `http://apis.data.go.kr/B553482/SeaTurtleRouteService/getSeaTurtleMeta?serviceKey=Lr3xN%2FDzeWygDDrMxWSKbiIueBSwjtF3LCudF7AMLP%2B9%2BgQWvS%2B6fqAURdOsY4IgkjKKW5SlfLyXRq%2F%2FjQzWcg%3D%3D&resultType=json`
      )
        .then((r) => r.json())
        .then((json) => json.response.body.items.item);
    },
    seaTurtleLocation(_, { pttId }) {
      return fetch(
        `http://apis.data.go.kr/B553482/SeaTurtleRouteService/getSeaTurtleRoute?serviceKey=Lr3xN%2FDzeWygDDrMxWSKbiIueBSwjtF3LCudF7AMLP%2B9%2BgQWvS%2B6fqAURdOsY4IgkjKKW5SlfLyXRq%2F%2FjQzWcg%3D%3D&resultType=json&pttId=${pttId}`
      )
        .then((r) => r.json())
        .then((json) => json.response.body.items.item);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then((url) => console.log(`Running on ${url}`));
