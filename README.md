# auth0-hasura-remote-schema

1. Schema:

```
type auth0_profile {
  email: String
  picture: String
}
type Query {
  auth0: auth0_profile
}
```

2. Click on **Show** *Live* at the top of the Glitch UI to get the URL.

3. Add as Remote Schema in Hasura GraphQL Engine.

4. Go to GraphiQL tab, and try out `query { auth0 { email picture } }` .
