const express = require('express')
const router = express.Router()
const passport = require('passport')

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
            res.status(403).json({
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
            res.status(403).json({
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
            res.status(401=3).json({
                err: 'Unauthorized'
            })
        }
    })

});

module.exports = router;