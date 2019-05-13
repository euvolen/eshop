const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const passport = require('passport')
const email = require('../utils/email')
// @route    GET api/transaction/test
// @desc     Tests transaction route
// @access   Public
router.get('/test', (req, res) => res.json({
    msg: "transaction works"
}));

// @route    GET api/transaction/
// @desc     Get incompleted transaction 
// @access   Private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Transaction.find({
        user: req.user._id,
        isCompleted: false
    }).then(data => {

        if (data.length > 0) {
            res.json(data[0])
        } else {
            res.json({
                cart: []
            })
        }
    })
});

// @route    DELETE api/transaction/cart/product/:cartId
// @desc     Get incompleted transaction 
// @access   Private
router.post('/cart/product/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
   
    
    Transaction.findById(req.params.id).then(data => {
        console.log(data, req.body)
        if (
            data.cart.filter(
              item => item.productId.toString() === req.body.productId
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ err: 'There is no such product in a cart' });
          }
  
          // Get remove index
          const removeIndex = data.cart
            .map(item => item.productId.toString())
            .indexOf(req.body.productId);
  
          // Splice comment out of array
          data.cart.splice(removeIndex, 1);
  
          data.save().then(cart => res.json(cart));
    })
});
// @route    POST api/transaction/cart/cartId
// @desc     Change quantity of a product
// @access   Private
router.post('/cart/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Transaction.findById(req.params.id).then(data => {

            if(data){
            data.cart.forEach(element => {
                if(element.productId===req.body.productId){
                    if(req.body.operator ==='+'){
                       element.quantity++ 
                    } else{
                        if(element.quantity>1)
                        element.quantity--
                    }
                     
                }
            });

            data.save().then(data => res.json(data))

            }
            else res.status(404).json({err:"notFound"})
          

    })
});

// @route    POST api/transaction/confirm/cartId
// @desc     Confirm transaction
// @access   Private
router.post('/confirm/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Transaction.findById(req.params.id).then(data => {

            if(data){

            data.isCompleted = true
    
            data.save().then(data =>email.sendEmail(req,res,[req.user.email],"Confirmaition", `<p>${JSON.stringify(data)}</p>`))
            }
            else res.status(404).json({err:"notFound"})
          

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
            Transaction.findById(data[0]._id).then(transaction => {

                transaction.cart.push(cart)
                transaction.save().then(data => {
                    console.log(data);

                    res.status(200).json(data)
                })

            }).catch(err => res.json({
                err
            }))

        } else {
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