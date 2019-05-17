const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const groupManagementRouter = require('./routes/api/groupManagement');
const registerLoginRouter = require('./routes/api/register-login');
const invitedRouter = require('./routes/api/invited');
const deleteRegainRouter = require('./routes/api/delete-regain');
const resultsRouter = require('./routes/api/results');
const updateJSONfiles = require('./jsonManagement/updateJSONfiles');
const { updateResults } = require('./jsonManagement/updateResults');
setInterval(() => {
  updateJSONfiles();
}, 180000);

updateResults();



const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').MONGODB_URL;

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
app.use(groupManagementRouter);
app.use(registerLoginRouter);
app.use(invitedRouter);
app.use(deleteRegainRouter);
app.use(resultsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
