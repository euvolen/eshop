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

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public
router.get('/test', (req, res)=> res.json({msg:"Users works"}));


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

// @route    GET api/users/login
// @desc     Login user / Returning JWT token
// @access   Public
router.post('/login', (req,res)=>{
   
    const { errors, isValid} = validateLoginInput(req.body.data);

    // Check Validation    
    if (!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.data.email;
    const password = req.body.data.password

    //find user by email
    User.findOne({email}).then(user=> {
        //  Check for user
        if(!user){
            errors.email='User not found'
            return res.status(404).json(errors)
        }

        //  Check password
        bcrypt.compare(password, user.password).then(IsMatch =>{
            if (IsMatch){
                // User Matched
                if(req.body.cart)
                Transaction.findOne({user:user._id, isCompleted: false}).then(data =>{
                    if(data){
                        console.log(data)
                        data.cart = req.body.cart
                        data.save().then(res => console.log('ok'))
                    }
                    else {
                        const cart = new Transaction({
                            user:user._id,
                            cart:req.body.cart
                        })
                        cart.save().then(() => console.log('ok'))
                    }
                    
                })
                //Create jwt payload
                const payload = { id:user.id, name:user.name, avatar:user.avatar, email:user.email,role:user.role} 
                //Sign Token
                jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    { expiresIn: '1d'},
                    (err, token)=>{
                        res.json({
                            success:true,
                            token: 'Bearer '+ token
                        })
                } );
             
            }else{
                errors.password = 'Password incorrect!'
                return res.status(400).json(errors);
            }
        })
    })
})

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get('/current', passport.authenticate('jwt', {session:false}), 
(req, res)=>{
        res.json({
            id:req.user.id,
            name:req.user.name,
            email:req.user.email,
            role:req.user.role,
            avatar:req.user.avatar,
        });
}
);


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