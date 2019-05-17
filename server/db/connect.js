const mongoose = require('mongoose');

// Db config
const db = require('../configs/keys').mongoURI;

// Connect to MongoDB
const connect =()=>{

    return new Promise((resolve, reject)=>{
        mongoose
        .connect(db,{useNewUrlParser:true})
        .then((res)=>{ 
            console.log('MongoDb connected')
            resolve()} )
        .catch(err => reject(err));
    })

}

module.exports={
    connect
}