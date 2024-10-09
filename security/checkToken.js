require('dotenv').config({path:"../db/.env"})
const jwt = require("jwt")
module.exports = function(req,res,next){
    try{
        const token = req.headers.authotization.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"Не авторизован"})
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = 
        next()
    }
    catch(e){
        res.status(401).json({message:"Не авторизован"})
    }
}