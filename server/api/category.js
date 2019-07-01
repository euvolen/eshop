const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const Category = require('../models/Category')
const passport = require('passport')
const validateCategoryInput = require('../validation/category')


// @route    GET api/categories/all
// @desc     Return all categories for users
// @access   Public
router.get('/all', (req, res) => {

    Category.find().then(
            data => {
              res.json(data)
            }
        )
        .catch(
            err => res.status(400).json(err)
        )
});


// @route    GET api/categories/:Id
// @desc     Return a category  by its ID
// @access   public
router.get('/:id', (req, res) => {

            Category.findById(req.params.id).then(
          
                category => {
                    res.status(200).json(category)
                }
            ).catch(
                err => res.status(404).json({err:`There is no such category with this id`})
            )
       
    })

// @route    POST api/categories/product
// @desc     Add /edit category in(to) a Product 
// @access   Authorized
router.post('/product/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {


    User.findById(req.user.id).then(user => {
        if (user.role === 'admin') {

            Product.findByIdAndUpdate(req.body.data.product, {$set:{category:req.body.data.category}}, {new:true}).then(product => {
                if (!product) {
                    return res.status(404).json({
                        err: `Product with id ${req.body.product} doesn't exists`
                    })
                } else {
                   res.json({success:true})
                }

            })


        } else {
            res.status(403).json({
                err: 'Unauthorized'
            })
        }
    })

});

// @route    POST api/categories/add
// @desc     Create new  category
// @access   Authorized
router.post('/add/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {


    User.findById(req.user.id).then(async user => {
        if (user.role === 'admin') {
            const {
                errors,
                isValid
            } = validateCategoryInput(req.body);
            // Check Validation    
            if (!isValid) {
                return res.status(400).json(errors);
            }

            try {
                const category =  await Category.create(req.body)

               res.json(category)
 
            } catch (error) {
                res.json(error)
            }

          

        } else {
            res.status(403).json({
                err: 'Unauthorized'
            })
        }
    })

});


// @route    DELETE api/categories/remove
// @desc     Remove  category
// @access   Authorized
router.delete('/remove/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {


    User.findById(req.user.id).then( user => {
        if (user.role === 'admin') {
                Category.findByIdAndDelete(req.body.categoryId).then(()=>{
                    res.json({success:true})  
                }).catch(er=>res.status(400).json(er))  

        } else {
            res.status(403).json({
                err: 'Unauthorized'
            })
        }
    })

});

module.exports = router