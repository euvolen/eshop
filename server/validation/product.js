const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProductInput(data){
    
    let errors ={};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.gross_price = !isEmpty(data.gross_price) ? data.gross_price : '';
    data.net_price = !isEmpty(data.net_price) ? data.net_price : '';
    data.initial_price = !isEmpty(data.initial_price) ? data.initial_price : '';
    data.category = !isEmpty(data.category) ? data.category : '';
   

    if (!Validator.isLength(data.name, {min:3, max:30} )){
        errors.name ="Name must be between 3 and 30 characters";
    }

    if (Validator.isEmpty(data.name)){
        errors.name='Name field is required';
    }
    if (!Validator.isLength(data.description, {min:15, max:500} )){
        errors.description ="Description must be between 15 and 500 characters";
    }

    if (Validator.isEmpty(data.description)){
        errors.description='Description field is required';
    }
    if (Validator.isEmpty(data.gross_price)){
        errors.gross_price='Gross price field is required';
    }
    if (Validator.isEmpty(data.net_price)){
        errors.net_price='Net price field is required';
    }
    if (Validator.isEmpty(data.initial_price)){
        errors.initial_price='Initial price field is required';
    }

    if (Validator.isEmpty(data.category)){
        errors.category='Category field is required';
    }
   
    return{
        errors,
        isValid:isEmpty(errors)
    }
}