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

---
