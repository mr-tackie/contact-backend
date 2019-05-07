const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    profile:  String
  }
`;

const resolvers = {
    Query: {
        hello: (parent, args, context) => {
          console.log(context);
          return "world";
        }
    },
};

const context = ({req}) => {
  return {headers: req.headers};
};

const schema = new ApolloServer({ typeDefs, resolvers, context});

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

