const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const passport = require('passport')

// @route    GET api/transaction/test
// @desc     Tests transaction route
// @access   Public
router.get('/test', (req, res) => res.json({
    msg: "transaction works"
}));

// @route    GET api/transaction/
// @desc     Get incompleted transaction 
// @access   Private
router.get('/',passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    console.log(req.user);
    
    Transaction.find({user:req.user._id, isCompleted:false}).then(data=>{

        if(data.length>0){
            res.json(data[0])
        }else{       
            res.json({cart:[]})
        }
    })
});

// @route    POST api/actions/userId
// @desc     Create and update incompleted transaction (cart)
// @access   Crivate
router.post('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
            
            
            Transaction.find({
                user: req.user._id,
                isCompleted: false
            }).then(data => {
                if (data && data.length === 1) {
                    const cart = {
                        productId: req.body.productId,
                        name: req.body.name,
                        quantity: req.body.quantity,
                        price: req.body.price,
                    }
                    Transaction.findById(data[0]._id).then(transaction =>{
                 
                            transaction.cart.push(cart)
                            transaction.save().then(data =>{
                                console.log(data);
                                
                                res.status(200).json(data)
                            }) 
                                
                    }).catch(err => res.json({err}))

                } 
                else {
                    const newCart = new Transaction({
                        user: req.user.id,
                        cart: [{
                            productId: req.body.productId,
                            name: req.body.name,
                            quantity: req.body.quantity,
                            price: req.body.price,
                        }],
                        summ: req.body.quantity * req.body.price,
                    })
                    newCart.save().then(cart => {
                        res.status(200).json(cart)
                    })
                }
            })
});
module.exports = router