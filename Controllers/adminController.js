const { json, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const admin = require("../Model/adminModel");
const userFeedbackModel = require("../Model/userFeedbackModel");
const maxAge = 3 * 24 * 60 * 60;
require("dotenv").config();

const createAdminToken = (id) => {
  return jwt.sign({ id }, "adminJWT", {
    expiresIn: maxAge,
  });
};

module.exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const adminData = await admin.findOne({ email });
    if (adminData) {
      const adminAuth = await bcrypt.compare(password, adminData.password);
      if (adminAuth) {
        const token = createAdminToken(adminData._id);
        return res
          .status(200)
          .json({ message: "Authentication successfull", status: true, token ,admin:adminData });
      } else {
        return res.json({ message: "Incorrect Password", status: false });
      }
    } else {
      return res.json({ message: "Admin not found", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
};

module.exports.listUser = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    if (user) {
      return res.json({
        user,
        message: "Successfully fetch user details",
        status: true,
      });
    } else {
      return res.json({
        message: "Failed to fetch user details",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in fetch all user details",
      status: false,
    });
  }
};

module.exports.disableUser = async (req, res, next) => {
  try {
    const {id} = req.body;
    console.log(id, "ID gotted!!!");
    const userDetails = await userModel.findById(id);
    console.log(userDetails,"Student Details!!")
    userDetails.blockStatus = !userDetails.blockStatus;
    await userDetails.save();
    if (userDetails.blockStatus) {
      return res.json({
        message: "User blocked successfully",
        status: userDetails.blockStatus,
      });
    } else {
      return res.json({
        message: "User unblocked successfully",
        status: userDetails.blockStatus,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in disable user ",
      status: false,
    });
  }
};


module.exports.getFeedback=async (req,res,next)=>{
  try {
    const userId = req.params.userId;
    const feedback=await userFeedbackModel.find({ownerId:userId})
    console.log(feedback,"$$$");
    if(feedback){
      res.json({status:true,data:feedback})
    }else{
      res.json({status:false})
    }
    
  } catch (error) {
    console.log(error);
  }
}