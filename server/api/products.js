const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const User = require('../models/User')
const passport = require('passport')
const validateProductInput = require('../validation/product')
const  multer = require('multer')

const storage = multer.diskStorage({
    destination: './client/public/assets/server/img',
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  });
  
const upload = multer({ storage });

// @route    GET api/products/all
// @desc     Return all products for users
// @access   Public
router.get('/all', (req, res) => {

    Product.find().populate('category').then(
            data => {
                let publicData = []
                for (const i in data) {
                    publicData.push({
                        _id: data[i]._id,
                        name: data[i].name,
                        description: data[i].description,
                        price: data[i].gross_price,
                        category: data[i].category,
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

// @route    GET api/products/category/:id
// @desc     Return all products for users
// @access   Public
router.get('/category/:id', (req, res) => {

    Product.find({category:req.params.id}).populate('category').then(
            data => {
                let publicData = []
                for (const i in data) {
                    publicData.push({
                        _id: data[i]._id,
                        name: data[i].name,
                        description: data[i].description,
                        price: data[i].gross_price,
                        category: data[i].category,
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


// @route    POST api/products/rating/:id
// @desc     Return all products for users
// @access   Public
router.post('/rating/:id', (req, res) => {

    Product.findByIdAndUpdate(req.params.id, {rating:req.body.rating}).then(
            () => {
             
                res.status(200).json({success:true})
            }
        )
        .catch(
            err => res.status(404).json(err)
        )
});

// @route    GET api/products/:Id
// @desc     Return a product (user view) by its ID
// @access   public
router.get('/:id', (req, res) => {

            Product.findById(req.params.id).populate('category').then(
          
                product => {
                    let publicProduct={}
                    publicProduct._id = product._id,
                    publicProduct.name= product.name,
                    publicProduct.description= product.description,
                    publicProduct.price= product.gross_price,
                    publicProduct.img= product.img,
                    publicProduct.category= product.category,
                    publicProduct.quantity= product.quantity,
                    res.status(200).json(publicProduct)
                }
                    
                
            ).catch(
                err => res.status(404).json({err:`There is no such product with this id`})
            )
       
    })


router.post('/product/img', passport.authenticate('jwt', {
    session: false
}), (req, res)=>{
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.status(400).json({success:false, err})
        } else if (err) {
          // An unknown error occurred when uploading.
          res.status(400).json({success:false, err})
        }
       res.json({success:true})
        // Everything went fine.
      })
  
})

// @route    POST api/products/:adminId/:productId
// @desc     Create or Edit a Product 
// @access   Authorized
router.post('/product/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(req.body)
    
    const {
        errors,
        isValid
    } = validateProductInput(req.body);
    // Check Validation    
    if (!isValid) {
        return res.status(400).json(errors);
    }
  
    User.findById(req.user.id).then(user => {res.json(user)
        // if (user.role === 'admin') {
        //     Product.findById(req.params.id).then(product => {
        //         if (!product) {

        //             const newProduct = new Product({
        //                 name: req.body.name,
        //                 description: req.body.description,
        //                 gross_price: req.body.gross_price,
        //                 net_price: req.body.net_price,
        //                 initial_price: req.body.initial_price,
        //                 category:req.body.category,
        //                 quantity: req.body.quantity,
        //                 img: req.body.img
        //             })
        //             newProduct.save().then(product=>res.json(product))
        //             .catch(err=>res.json({err}))
        //         } else {
        //            const productFields = {}
        //                 productFields.name= req.body.name,
        //                 productFields.description= req.body.description,
        //                 productFields.gross_price= req.body.gross_price,
        //                 productFields.net_price= req.body.net_price,
        //                 productFields.initial_price= req.body.initial_price,
        //                 productFields.quantity= req.body.quantity,
        //                 productFields.img= req.body.img
                    
        //             Product.findByIdAndUpdate({
        //                 _id:req.params.productId
        //             },{
        //                 $set:productFields
        //             },{
        //                 new:true
        //             }).then(product=>res.json(product))
        //             .catch(err=>res.json({err}))
        //         }

        //     })


        // } else {
        //     res.status(403).json({
        //         err: 'Unauthorized'
        //     })
        // }
    })

});
// @route    DELETE api/products/:adminId/:productId
// @desc     Delete a Product 
// @access   Authorized
router.delete('/product/:productId', passport.authenticate('jwt', {
    session: false
}), (req, res) => {


    User.findById(req.user.id).then(user => {
        if (user.role === 'admin') {
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
            res.status(403).json({
                err: 'Unauthorized'
            })
        }
    })

});

module.exports = router