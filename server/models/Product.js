const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
    name:{
        type:String,
        required: true,
        validate: {
            validator: async name => Product.doesntExist({ name }),
            message: () => `Name has been already taken`
        }
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
    category:{
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    quantity:{
        type:Number,
        required:true
    },
    rataing:Number,
    img:String,
 
}, {
    timestamps:true
});
//Creates static methods for all collection
ProductSchema.statics.doesntExist = async function (opts) {
    return await this.where(opts).countDocuments() === 0
}
module.exports = Product = mongoose.model('products', ProductSchema);