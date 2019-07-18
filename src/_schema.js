import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Query {
    random: Float
  }
  type Subscription {
    randoms: Float
  }
`;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const resolvers = {
  Query: {
    random: () => Math.random(),
  },
  Subscription: {
    randoms: {
      subscribe: async function* asyncRandomNumbers() {
        while (true) {
          yield { randoms: Math.random() };
          await sleep(1000);
        }
      }
    }
  }
}

export const schema = makeExecutableSchema({typeDefs, resolvers});
