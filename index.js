const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
      get_twitter(username: String): String
    }

`;

const getLinkFromUsername = (username) => {
    return `https://twitter.com/${username}`;
}

const resolvers = {
  Query: {
    get_twitter: (parent, args, context) => {
      if(args.username){
        return getLinkFromUsername(args.username);
      }else{
        return null
      }
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
