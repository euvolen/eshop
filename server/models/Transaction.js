const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cart: [{
            productId:{
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price:{
                type:Number,
                required:true
            }
        },
    ],
    summ: {
        type: Number,
    },
    conditions: {
        type: String,
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Transaction = mongoose.model('transactions', TransactionSchema);