const {ApolloServer, gql} = require('apollo-server');

const footballers = [
  {
    fullname: 'Robert Lewandowski',
    age: 30,
    club: 'Bayern Munich',
  },
  {
    fullname: 'Marco Reus',
    age: 29,
    club: 'Borrusia Dortmund',
  },
];

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

server.listen({port: 5000}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
