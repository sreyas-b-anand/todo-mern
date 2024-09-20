const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requireAuth = async( req  , res , next)=>{
        //verify auth
        const { authorization} = req.headers

        if(!authorization){
            return res.status(401).json({error : "Authorization required"})
        }
        //split string
        const token = authorization.split(' ')[1]

        try {
           const { _id} =  jwt.verify(token , process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
            next()
        } catch (error) {
            res.status(401).json({error : 'Request is denied'})
        }
}
module.exports = requireAuth