const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CategorySchema = new Schema({
    name:{
        type:String,
        required: true,
        validate: {
            validator: async name => Category.doesntExist({ name }),
            message: () => `Name has been already taken`
        }
    },
    date:{
        type:Date,
        default: Date.now
    },
});
//Creates static methods for all collection
CategorySchema.statics.doesntExist = async function (opts) {
    return await this.where(opts).countDocuments() === 0
}
module.exports = Category = mongoose.model('categories', CategorySchema);