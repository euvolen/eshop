const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        refs: 'users'
    },
    goods: [{
            product: {
                type: Schema.Types.ObjectId,
                refs: 'product'
            },
            quantity: {
                type: Number,
                required: true
            },
        },
    ],
    summ: {
        type: Number,
        required: true
    },
    conditions: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('transactions', TransactionSchema);