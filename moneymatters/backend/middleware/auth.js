const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req , res , next) => {

    if(req.header('Authorization') == null) {
        console.log("No Auth header found")
        return res.status(401).send("No Auth header found")
    }
    const token = req.header('Authorization').replace('Bearer ','');

    if(!token) {
        return res.status(401).send("No token")
    }
    else {
        console.log("Token Found")
    }
 
   
    try {

        const decoded = jwt.verify(token,'secretKey')
        console.log("decoded" , decoded.user.id)
        // const user = await User.findOne({_id : decoded._id , 'tokens.token' : token})
        // const userDB = await User.findOne({'_id' : decoded.user.id})
        const userDB = await User.findById(decoded.user.id)
        console.log("Found user!", userDB)
        req.user = userDB;
        
        
    }
    catch(e) {
        console.log(e)
        return res.status(401).send("Error in authentication")
    }

    
    console.log('auth middleware')
    next() 
}

module.exports = auth