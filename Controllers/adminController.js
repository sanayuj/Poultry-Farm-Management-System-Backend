const { json, response } = require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const admin=require("../Model/adminModel")
const maxAge = 3 * 24 * 60 * 60;
require('dotenv').config()



const createAdminToken=(id)=>{
    return jwt.sign({id},"adminJWT",{
        expiresIn:maxAge
    })
}

module.exports.adminLogin=async (req,res,next)=>{
    const {email,password}=req.body
    try{
        const adminData=await admin.findOne({email})
        if(adminData){
            const adminAuth=await bcrypt.compare(password,adminData.password)
            if(adminAuth){
                const token=createAdminToken(adminData._id)
                return res.status(200).json({message:"Authentication successfull",status:true,token})
            }else{
                return res.json({message:"Incorrect Password",status:false})
            }
        }else{
            return  res.json({message:"Admin not found",status:false})
        }

    }catch(error){
        console.log(error)
        return res.json({message:"Internal server error"})
    }
}