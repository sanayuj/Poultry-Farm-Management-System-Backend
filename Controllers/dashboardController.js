const { json, response } = require("express");
const user = require("../Model/userModel");
const farm = require("../Model/farmModel");
const feedModel = require("../Model/feedModel");
const medicineModel = require("../Model/medicineModel");
const mortalityModel = require("../Model/mortalityModel");
const userFeedbackModel = require("../Model/userFeedbackModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
require("dotenv").config();

//JWT
const createToken = (id) => {
    return jwt.sign({ id }, "JWT", {
      expiresIn: maxAge,
    });
  };

  module.exports.chartDashboard = async(req,res,next)=>{
    try{
        const userCount=await user.countDocuments({})
        const farmCount=await farm.countDocuments({})
        res.json({message:"details found successfully ",status:true,userCount,farmCount})
    }catch(error){
        console.log(error)
        return res.json({message:"Internal server in dashboard info",status:false})
    }
  }