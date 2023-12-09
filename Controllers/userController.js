const { json, response } = require("express");
const user = require("../Model/userModel");
const farm = require("../Model/farmModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
require("dotenv").config();

//JWT
const createToken = (id) => {
  return jwt.sign({ id }, "JWT", {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res, next) => {
  const { firstname, phoneNumber, email, password, conformPassword } = req.body;
  console.log(firstname, "Name!!!!");

  try {
    const existTrue = await user.findOne({ phoneNumber: phoneNumber });
    if (existTrue) {
      return res.json({
        message: "This phonae number already exist",
        status: false,
      });
    }
    const emailExist = await user.findOne({ email: email });
    if (emailExist) {
      return res.json({
        message: "This email is already exist",
        status: false,
      });
    }

    const newMember = new user({
      userName: firstname,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      verfied: true,
    });
    const userDetails = await newMember.save();
    const token = createToken(user._id);
    return res.json({
      message: "Account created successfully",
      status: true,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Internal server error", status: false });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const customer = await user.findOne({ email });
    if (customer) {
      const auth = await bcrypt.compare(password, customer.password);
      if (auth) {
        const token = createToken(customer._id);
        return res
          .status(200)
          .json({
            user: customer,
            message: "authenticate successfully",
            created: true,
            token,
          });
      } else {
        return res.json({ message: "Incorrect Password", created: false });
      }
    } else {
      return res.json({ message: "User not found", created: false });
    }
  } catch (error) {
    console.error(error);
    return res.json({ error, created: false });
  }
};

module.exports.userHeader = async (req, res, next) => {
  try {
    const userDetails = req.user;
    return res.json({ status: true, user: userDetails });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", status: false });
  }
};

module.exports.addFarm = async (req, res, next) => {
  const {
    farmname,
    licenceId,
    phonenumber,
    address,
    state,
    country,
    post,
    poultryPopulation,
    userId
  } = req.body;

  try {
    const existTrue = await farm.findOne({ licenceID: licenceId });
    if (existTrue) {
      return res.json({
        message: "Farm Details already Exists",
        status: false,
      });
    }
    const newFarm=new farm({
      farmName:farmname,
      licenceID:licenceId,
      phoneNumber:phonenumber,
      address:address,
      state:state,
      country:country,
      post:post,
      poultryPopulation:poultryPopulation,
      userId:userId
    })
    await newFarm.save().then(()=>{
      res.json({message:"Farm details added successfully",status:true})
    }).catch((error)=>{
      res.json({message:"Course added Failed",status:false})
    })
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in add farm",
      status: false,
    });
  }
};
