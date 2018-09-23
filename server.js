const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

// CORS (Cross Origin Resource Sharing) 
// CORS, web uygulamanıza kendi domaininiz haricinde dışardan gelen istekleri yönetmenizi sağlayan bir mekanizma
// cross-domain request

// RESPONSE HEADERS a asagidakileri ekliyor
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Headers: content-type
// Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
// Access-Control-Allow-Origin: http://localhost:3000

const corsOption = { 
   origin: "http://localhost:3000",
   credentials: true
}
app.use(cors(corsOption));


// Set up JWT authentication middleware
app.use(async(req, res, next) => {
   const token = req.headers['authorization'];
   if(token !== "null"){
      try {
         const currentUser = await jwt.verify(token, process.env.SECRET);
         req.currentUser = currentUser;
         console.log('currentUser ', currentUser);
         
      } catch (error) {
         console.log(error);
      }
   }
   next();
});


// Create GraphGL application
app.use('/graphiql', graphiqlExpress({endpointURL: 'graphql'}));

// Connect schemas with GraphQL
app.use(
   '/graphql',
   bodyParser.json(),
   graphqlExpress(({currentUser}) => ({
      schema,
      context: {
         Recipe,
         User,
         currentUser
      }
   }))
)

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})