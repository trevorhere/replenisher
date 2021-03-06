// const express = require('express');
// const models = require('./models');
// const expressGraphQL = require('express-graphql');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const passportConfig = require('./services/auth');
// const MongoStore = require('connect-mongo')(session);
// const schema = require('./schema/schema');


// const bodyParser = require('body-parser');
// const dotenv = require('dotenv').config();


// const app = express();
// const port = process.env.PORT || 4000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// const MONGO_URI = process.env.MONGO_TOKEN;
// mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI);
// mongoose.connection
//     .once('open', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));

// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: 'aaabbbccc',
//   store: new MongoStore({
//     url: MONGO_URI,
//     autoReconnect: true
//   })
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/graphql', expressGraphQL({
//   schema,
//   graphiql: true
// }));


// app.listen(port, () => {
//   console.log('Listening');
// });


/////

const app = require('./server/server');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(4000, () => {
  console.log('Listening on port 4000');
});
