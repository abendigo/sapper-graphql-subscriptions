import graphqlHTTP from 'express-graphql';
import { schema } from '../_schema';

export const post = graphqlHTTP({
  schema,
  pretty: true
});
