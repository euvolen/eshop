const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const User = require('../models/User')
const passport = require('passport')
const validateProductInput = require('../validation/product')


// @route    GET api/products/all
// @desc     Return all products for users
// @access   Public
router.get('/all', (req, res) => {

    Product.find().then(
            data => {
                let publicData = []
                for (const i in data) {
                    publicData.push({
                        _id: data[i]._id,
                        name: data[i].name,
                        description: data[i].description,
                        price: data[i].gross_price,
                        img: data[i].img,
                        quantity: data[i].quantity,
                    })
                }
                res.status(200).json(publicData)
            }
        )
        .catch(
            err => res.status(404).json(err)
        )
});
// @route    GET api/products/:Id
// @desc     Return a products by its ID
// @access   public
router.get('/:id', (req, res) => {

            Product.findById(req.params.id).then(
          
                product => {
                    let publicProduct={}
                    publicProduct._id = product._id,
                    publicProduct.name= product.name,
                    publicProduct.description= product.description,
                    publicProduct.price= product.gross_price,
                    publicProduct.img= product.img,
                    publicProduct.quantity= product.quantity,
                    res.status(200).json(publicProduct)
                }
                    
                
            ).catch(
                err => res.status(404).json({err:`There is no such product with this id`})
            )
       
    })


// @route    GET api/products/all/:adminId
// @desc     Return all products with additional data for admins
// @access   Authorized
router.get('/all/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    User.findById(req.params.id).then(user => {
        if (user.id === req.user.id && user.role === 'admin') {

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

// @route    POST api/products/:adminId
// @desc     Create new Product 
// @access   Authorized
router.post('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateProductInput(req.body);

    // Check Validation    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById(req.params.id).then(user => {
        if (user.id === req.user.id && user.role === 'admin') {
            Product.findOne({
                name: req.body.name
            }).then(product => {
                if (product) {
                    return res.status(400).json({
                        err: `Product with name ${req.body.name} already exists`
                    })
                } else {
                    const newProduct = new Product({
                        name: req.body.name,
                        description: req.body.description,
                        gross_price: req.body.gross_price,
                        net_price: req.body.net_price,
                        initial_price: req.body.initial_price,
                        quantity: req.body.quantity,
                        img: req.body.img
                    })
                    newProduct.save().then(product=>res.json(product))
                    .catch(err=>res.json({err}))
                }

            })


        } else {
            res.status(401).json({
                err: 'Unauthorized'
            })
        }
    })

});


// @route    POST api/products/:adminId/:productId
// @desc     Edit a Product 
// @access   Authorized
router.post('/product/:id/:productId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateProductInput(req.body);

    // Check Validation    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findById(req.params.id).then(user => {
        if (user.id === req.user.id && user.role === 'admin') {
            Product.findById(req.params.productId).then(product => {
                if (!product) {
                    return res.status(404).json({
                        err: `Product with id ${req.params.productId} doesn't exists`
                    })
                } else {
                   const productFields = {}
                        productFields.name= req.body.name,
                        productFields.description= req.body.description,
                        productFields.gross_price= req.body.gross_price,
                        productFields.net_price= req.body.net_price,
                        productFields.initial_price= req.body.initial_price,
                        productFields.quantity= req.body.quantity,
                        productFields.img= req.body.img
                    
                    Product.findByIdAndUpdate({
                        _id:req.params.productId
                    },{
                        $set:productFields
                    },{
                        new:true
                    }).then(product=>res.json(product))
                    .catch(err=>res.json({err}))
                }

            })


        } else {
            res.status(401).json({
                err: 'Unauthorized'
            })
        }
    })

});
// @route    DELETE api/products/:adminId/:productId
// @desc     Delete a Product 
// @access   Authorized
router.delete('/product/:id/:productId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {


    User.findById(req.params.id).then(user => {
        if (user.id === req.user.id && user.role === 'admin') {
            Product.findById(req.params.productId).then(product => {
                if (!product) {
                    return res.status(404).json({
                        err: `Product with id ${req.params.productId} doesn't exists`
                    })
                } else {
                    product.remove().then(product=>res.json(product))
                    .catch(err=>res.json({err}))
                }

            })


        } else {
            res.status(401).json({
                err: 'Unauthorized'
            })
        }
    })

});

module.exports = router