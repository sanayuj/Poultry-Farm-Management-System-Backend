const {json,response} = require("express");



module.exports.signup=async(req,res,next)=>{
    const { firstname,phoneNumber, email, password, conformPassword } = req.body;
    try{
       
    }catch(error){
        res.json(error)
    }
}