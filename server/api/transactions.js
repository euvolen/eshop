const express = require('express');
const router = express.Router();


// @route    GET api/transaction/test
// @desc     Tests transaction route
// @access   Public
router.get('/test', (req, res)=> res.json({msg:"transaction works"}));


module.exports = router
