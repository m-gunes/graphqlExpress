const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphGL - Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');


const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create Schema
const schema = makeExecutableSchema({
   typeDefs,
   resolvers
})
 
// Connects to database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));



// Initialies application
const app = express();

// Create GraphGL application
app.use('/graphiql', graphiqlExpress({endpointURL: 'graphql'}));

// Connect schemas with GraphQL
app.use(
   '/graphql',
   bodyParser.json(),
   graphqlExpress({
      schema,
      context: {
         Recipe,
         User
      }
   })
)

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})