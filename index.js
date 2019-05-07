const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const typeDefs = gql`
  type auth0_profile {
      email: String
      picture: String
    }

    type Query {
      auth0: auth0_profile
    }
`;

function getProfileInfo(user_id){
    const headers = {'Authorization': 'Bearer '+process.env.AUTH0_TOKEN};
    console.log(headers);
    return fetch('https://graphql-tutorials.auth0.com/api/v2/users/'+user_id,{ headers: headers})
        .then(response => response.json())
}


const resolvers = {
    Query: {
        auth0: (parent, args, context) => {
          const authHeaders = context.headers.authorization;
          const token = authHeaders.replace('Bearer ', '');
          let issuer;
          try {
            const decoded = jwt.decode(token);
            const user_id = decoded.sub;
            // make a rest api call to auth0
            return getProfileInfo(user_id).then( function(resp) {
              console.log(resp);
              if (!resp) {
                return null;
              }
              return {email: resp.email, picture: resp.picture};
            });
          } catch(e) {
            console.log(e);
            return null;
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

