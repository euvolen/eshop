const express = require('express');
const bodyParser = require('body-parser');
const passport= require('passport');
const users = require('./api/users');
const products = require('./api/products');
const category = require('./api/category');
const admin = require('./api/admin');
const transactions = require('./api/transactions');
const app = express();
const db = require('./db/connect')

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./configs/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/admin', admin);
app.use('/api/products', products);
app.use('/api/actions', transactions);
app.use('/api/categories', category);

const port = process.env.PORT || 5000;
db.connect()
.then(
    ()=>{
        app.listen(port, ()=> console.log(`Server running on port ${port}`));
    }
)

//For tests
module.exports = app