const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
      get_twitter: String
    }

`;

const getLinkFromUsername = (username) => {
    return `https://twitter.com/${username}`;
}

const resolvers = {
  Query: {
    get_twitter: (parent, args, context) => {
      console.log(parent);
      return "Hello from this side";
    }
  }
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context });

schema.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
