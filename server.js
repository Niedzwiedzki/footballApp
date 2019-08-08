const env = process.env.NODE_ENV || 'development'


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const groupManagementRouter = require('./routes/api/groupManagement');
const registerLoginRouter = require('./routes/api/register-login');
const invitedRouter = require('./routes/api/invited');
const deleteRegainRouter = require('./routes/api/delete-regain');
const resultsRouter = require('./routes/api/results');
const getGroups = require('./routes/api/getGroups');
const getPlayers = require('./routes/api/getPlayers');
const getMatches = require('./routes/api/getMatches');
const updateJSONfiles = require('./jsonManagement/updateJSONfiles');
const updateJSONfilesMatchTime = require('./jsonManagement/updateJSONfilesMatchTime');
const cors = require('cors');

//for test
const TestUpdateJSONMatchTime = require('./jsonManagement/TestUpdateJSONMatchTime');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
if(env === 'development') {
  process.env.port = 5000;
  var db = require('./config/keys').MONGODB_URL;
} else if (env === 'test') {
  var db = require('./config/testkeys').MONGODB_URL;
  process.env.port = 5000;
}


// const db = require('./config/keys').MONGODB_URL;
//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport.js')(passport);

//Use Routes
app.use(cors({origin: 'http://localhost:3000'}));
app.use(groupManagementRouter);
app.use(registerLoginRouter);
app.use(invitedRouter);
app.use(deleteRegainRouter);
app.use(resultsRouter);
app.use(getGroups);
app.use(getPlayers);
app.use(getMatches);

// updateJSONfiles();
setInterval(() => {
  updateJSONfiles();
}, 86400000);


setInterval(() => {
  updateJSONfilesMatchTime();
  // console.log(updatedResults)
}, 1800000);

// TestUpdateJSONMatchTime()

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = {app};
