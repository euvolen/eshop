const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport= require('passport');
const users = require('./server/api/users');
const products = require('./server/api/products');
const transactions = require('./server/api/transactions');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Db config
const db = require('./server/configs/keys_dev').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db,{useNewUrlParser:true})
    .then(()=> console.log('MongoDb connected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./server/configs/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/actions', transactions);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));
