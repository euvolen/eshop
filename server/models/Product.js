const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    gross_price:{
        type:Number,
        required: true
    },
    net_price:{
        type:Number,
        required: true
    },
    initial_price:{
        type:Number,
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    img:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('products', ProductSchema);