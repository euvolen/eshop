const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../configs/keys')
const passport = require('passport')

// Load input validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
//Load User model
const User = require('../models/User')
//Load Transaction model
const Transaction = require('../models/Transaction')
//Load Transaction model
const Product = require('../models/Product')

// @route    GET api/admin/products/
// @desc     Return all products with additional data for admins
// @access   Authorized
router.get('/products/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.findById(req.user.id).then(user => {
        if ( user.role === 'admin') {
            Product.find().then(
                data => {
                    res.status(200).json(data)
                }
            ).catch(
                err => res.status(404).json(err)
            )
        } else {
            res.status(401).json({
                err: 'Unauthorized'
            })
        }
    })

});

// @route    GET api/admin/users/
// @desc     Return all users with additional data for admins
// @access   Authorized
router.get('/users/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.findById(req.user.id).then(user => {
        if ( user.role === 'admin') {
            User.find().then(
                data => {
                    res.status(200).json(data)
                }
            ).catch(
                err => res.status(404).json(err)
            )
        } else {
            res.status(401).json({
                err: 'Unauthorized'
            })
        }
    })

});

// @route    GET api/admin/actions/
// @desc     Return all transactions with additional data for admins
// @access   Authorized
router.get('/actions/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.findById(req.user.id).then(user => {
        if ( user.role === 'admin') {
            Transaction.find({isCompleted:true}).then(
                data => {
                    res.status(200).json(data)
                }
            ).catch(
                err => res.status(404).json(err)
            )
        } else {
            res.status(401).json({
                err: 'Unauthorized'
            })
        }
    })

});

// @route    GET api/users/register
// @desc     Register user
// @access   Public
router.post('/register', (req, res)=>{
    
    const { errors, isValid} = validateRegisterInput(req.body);

    // Check Validation    
    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            errors.email = 'Email aready exists'
            return res.status(400).json(errors);
        }
        else{
            const avatar = gravatar.url(req.body.email,{
                s:'200', //Size
                r:'pg', //Raiting
                d:'mm' //Default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err=> console.log(err));
                })
            })
        }
    })
 
} )





// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete( '/',passport.authenticate('jwt', { session: false }),
    (req, res) => {
        
      Transaction.findOneAndRemove({ user: req.user.id, isCompleted:false }).then(() =>{
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        )

      })
       
    }
  )


module.exports = router;