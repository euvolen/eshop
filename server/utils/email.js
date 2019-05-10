const nodemailer = require('nodemailer')
const keys = require('../configs/keys')

exports.sendEmail = (req,res, recipients, subject, html) =>{
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: 'eugelion2019@gmail.com',
        pass: keys.mail
    }    
})

let options = {
    from: 'Eshop Oy <eugelion2019@gmail.com>',
    to: recipients.join(', '),
    subject,
    html
}

transporter.sendMail(options, (err, info)=>{
    if(err){
      
       res.status(400).send({success:false})
    }
        
    else{
        
        res.status(200).send({success:true})
    }
         
})
}  
