**Which packages should be used to setup a basic GraphQL server for Node.js?**

`npm i apollo-server graphql`

`apollo-server` is an open-source GraphQL server, it works with all the major node.js frameworks, and even with the bare node.js server.

`graphql` is a peer dependency of `apollo-server`.

---

**What's `Query`?**

`Query` are kind of GET equivalent, they serve as a root of all GraphQL queries.

```
type Query {
  books-getter: [Book]
}
```

---

**What are the available types for the queries?**

The basic scalar types are: `Int`(32 bit), `String`, `Boolean`, `Float`, `ID` and `Date` in most implementations. 

Non-scalar ones:
- `enum` 
```
enum Types {
    SUCCESS, PENDING, ERROR 
}
```
- an array `episodes: [Episodes]`

- non-nullable `name: !String`

- types/interfaces
```
type Book {
  title: !String
  year: !Number
}
```

Types in GraphQL are nullable by default.

---

**How to write a basic resolver?**

```
const typeDefs = gql`
  type Footballer {
    fullname: String
    age: Int
    club: String
  }

  type Query {
    footballers: [Footballer]
  }
`;

const resolvers = {
  Query: {
    footballers: () => footballers,
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen();
```

---

**How to set an another port for the server?**

```
server.listen({port: 5000}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

---

**How to setup a GraphQL playground?**

Created by default in the `apollo-server` package.

---
