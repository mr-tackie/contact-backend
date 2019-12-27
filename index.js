const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const graphql = require("graphql");

const typeDefs = gql`

    type Contact {
      id: Int,
      first_name: String
      last_name: String
      twitter: String
      phone_numbers: [PhoneNumber],
      emails: [Email]
    }

    type PhoneNumber{
      id: Int
      contact_id: Int
      phone_number: String
    }

    type Email{
      id: Int
      contact_id: Int
      email: String
    }

    type Query {
      get_contact_with_twitter: Contact
    }

`;

const getLinkFromUsername = (username) => {
    return `https://twitter.com/${username}`;
}

const resolvers = {
  Query: {
    get_contact_with_twitter
  }
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context });

schema.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
