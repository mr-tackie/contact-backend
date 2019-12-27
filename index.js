const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

const typeDefs = gql`
  

type user {
  id: Int
  first_name: String
  last_name: String
  twitter: String
  twitter_url : String
}

type twitter_link{
  link: String
  contact_id: Int
}

    type Query {
      get_twitter: twitter
    }

`;

function getUserInfo(user_id) {
  const headers = {
    Authorization: "Bearer " + process.env.AUTH0_MANAGEMENT_API_TOKEN
  };
  console.log(headers);
  return fetch(
    "https://" + process.env.AUTH0_DOMAIN + "/api/v2/users/" + user_id,
    { headers: headers }
  ).then(response => response.json());
}

const resolvers = {
  Query: {
    get_twitter: (parent, args, context) => {
      
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
