const {ApolloServer, gql} = require('apollo-server');

const footballers = [
  {
    id: '1',
    fullname: 'Robert Lewandowski',
    age: 30,
    club: 'Bayern Munich',
  },
  {
    id: '2',
    fullname: 'Marco Reus',
    age: 29,
    club: 'Borrusia Dortmund',
  },
];

const typeDefs = gql`
  type Footballer {
    id: ID
    fullname: String
    age: Int
    club: String
  }

  type Query {
    getFootballers: [Footballer]
    getFootballer(id: ID!): Footballer
  }
`;

const resolvers = {
  Query: {
    getFootballers: () => footballers,
    getFootballer: (parent, args) =>
      footballers.find(footballer => footballer.id === args.id),
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port: 5000}).then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
