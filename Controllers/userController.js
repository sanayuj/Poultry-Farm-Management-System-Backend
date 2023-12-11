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
        return res.status(200).json({
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
  console.log("backend Called to add farm!!");
  const userId = req.params.userId;
  console.log(userId, "ADD farm Id");
  const {
    farmname,
    licenceId,
    phonenumber,
    address,
    state,
    country,
    post,
    poultryPopulation,
  } = req.body;

  try {
    const existingFarm = await farm.findOne({ licenceID: licenceId });

    if (existingFarm) {
      return res.json({
        message: "Farm with this licence ID already exists",
        status: false,
      });
    }

    const newFarm = new farm({
      ownerId: userId,
      farmName: farmname,
      licenceID: licenceId,
      phoneNumber: phonenumber,
      address: address,
      state: state,
      country: country,
      post: post,
      poultryPopulation: poultryPopulation,
    });

    await newFarm
      .save()
      .then(() => {
        res.json({
          message: "Farm details submited successfully",
          status: true,
        });
      })
      .catch((error) => {
        res.json({ message: "Unable to submit farm details", status: false });
      });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Internal server error in add farm",
      status: false,
    });
  }
};

module.exports.showUserFarms = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId, "PARAMS ID");
    const existingFarm = await farm.find({ userId: userId });
    if(existingFarm){
    return res.json({farms:existingFarm,status:true})
    }else{
      return res.json({status:false})
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in show their farms",
      status: false,
    });
  }
};
