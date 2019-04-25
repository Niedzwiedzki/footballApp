const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const membersRouter = require('./routes/api/members')
const groupsRouter = require('./routes/api/groups')

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB Config
const db = require('./config/keys').MONGODB_URL

//Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() =>console.log('mongoDB connected'))
    .catch(err => console.log(err))

//Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport.js')(passport)

//Use Routes
app.use(membersRouter)
app.use(groupsRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))