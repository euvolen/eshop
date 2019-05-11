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

// @route    POST api/actions/userId
// @desc     Create and update incompleted transaction (cart)
// @access   Crivate
router.post('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.findById(req.params.id).then(user => {
        if (!user) {
            return res.status(403).json({
                err: 'Unauthorised'
            })
        } else {

            Transaction.find({
                user: user.id,
                isCompleted: false
            }).then(data => {
                if (data && data.length === 1) {
                    const cart = {
                        productId: req.body.id,
                        name: req.body.name,
                        quantity: req.body.quantity,
                        price: req.body.price,
                    }
                    Transaction.findById(data[0]._id).then(transaction =>{
                 
                         for(const i in transaction.cart){
                                if(transaction.cart[i].id === cart.productId){
                                  
                                  }
                                } 
                              
                        
                        transaction.cart.push(cart)
                        transaction.save().then(data =>{
                            res.status(200).json(data)
                        })
                    }).catch(err => res.json({err}))

                } else if(data.length> 1){
                    res.status(500).json({msg: 'Sorry, we are fucked'})
                }
                else {
                    const newCart = new Transaction({
                        user: user.id,
                        cart: [{
                            productId: req.body.id,
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
        }
    })
});
module.exports = router