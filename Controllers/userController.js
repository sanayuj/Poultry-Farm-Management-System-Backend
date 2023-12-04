const { json, response } = require("express");
const user = require("../Model/userModel");

module.exports.signup = async (req, res, next) => {
  const { firstname, phoneNumber, email, password, conformPassword } = req.body;
  console.log(firstname,"Name!!!!")

  try {
    const existTrue =await user.findOne({ phoneNumber: phoneNumber });
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
    return res.json({ message: "Account created successfully", status: true });
  } catch (error) {
    console.error(error);
    return res.json({message:"Internal server error",status:false});
  }
};
