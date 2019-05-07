const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const jwt = require('jsonwebtoken');

const typeDefs = gql`
  type auth0_profile {
      email: String
      picture: String
    }

    type Query {
      auth0: auth0_profile
    }
`;

const resolvers = {
    Query: {
        auth0: (parent, args, context) => {
          const authHeaders = context.headers.authorization;
          console.log(authHeaders);
          var token = authHeaders.replace('Bearer ', '');
          let issuer;
          try {
            var decoded = jwt.decode(token);
            issuer = decoded.iss;
            return {email: '', picture: decoded.picture};
          } catch(e) {
            console.log(e);
            return "error"
          }
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

