const { json, response } = require("express");
const user = require("../Model/userModel");
const farm = require("../Model/farmModel");
const feedModel = require("../Model/feedModel");
const medicineModel = require("../Model/medicineModel");
const mortalityModel = require("../Model/mortalityModel");
const userFeedbackModel = require("../Model/userFeedbackModel");
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
  const userId = req.params.userId;
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
      balancePopulation:poultryPopulation
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
  console.log("showUserFarms CONTROLLER!!!")
  try {
    const userId = req.params.userId;
    const existingFarm = await farm.find({ ownerId: userId });
    if (existingFarm) {
      return res.json({ farms: existingFarm, status: true });
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in show their farms",
      status: false,
    });
  }
};

module.exports.addFeed = async (req, res, next) => {
  const { recived, consumed, farmId } = req.body;
  const userId = req.params.userId;
  const balanceBag=recived - consumed;
  try {
    const newFeed = new feedModel({
      qtyReceived: recived,
      qtyConsumed: consumed,
      balance: balanceBag ,
      ownerId: userId,
      farmId: farmId,
    });

    await newFeed.save();
    res.json({
      message: "Feed Details submitted successfully",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Unable to submit Feed Details",
      status: false,
    });
  }
};

module.exports.getFeedDetails = async (req, res, next) => {
  const userId = req.query.farmId;
  const farmId = req.params.userId;
  try {
    const existUser = await feedModel.findOne({ ownerId: userId });
    if (existUser) {
      const feedDetails = await feedModel.find({
        ownerId: userId,
        farmId: farmId,
      });
      if (feedDetails) {
        return res.json({
          data: feedDetails,
          message: "Feed data fetched!",
          status: true,
        });
      } else {
        return res.json({
          message: "No feed records for the specified farm",
          status: false,
        });
      }
    } else {
      return res.json({ message: "User not found", status: false });
    }
  } catch (error) {
    res.json({
      message: "Internal server error in fetch feed details",
      status: false,
    });
  }
};

module.exports.addMedicine = async (req, res, next) => {
  const userId = req.params.userId;
  const { date, dateOfVaccination, quantity, medicineName, farmId } = req.body;
  try {
    const newMedicine = new medicineModel({
      date: date,
      dateOfVaccination: dateOfVaccination,
      Quantity: quantity,
      medicineName: medicineName,
      ownerId: userId,
      farmId: farmId,
    });
    await newMedicine
      .save()
      .then(() => {
        res.json({
          message: "Medicine details submitted successfully",
          status: true,
        });
      })
      .catch((error) => {
        console.log(error);
        res.json({
          message: "Internal server error in add medicine details",
          status: false,
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in add medicine",
      status: false,
    });
  }
};

module.exports.getMedicineDetails = async (req, res, next) => {
  const farmId = req.query.farmId;
  const userId = req.params.userId;
  try {
    const existingUser = await medicineModel.find({ userId: userId });
    if (existingUser) {
      const medicineDetails = await medicineModel.find({ farmId: farmId });
      if (medicineDetails) {
        return res.json({ data: medicineDetails, status: true });
      } else {
        return res.json({
          message: "Unable to fetch medicine details",
          status: false,
        });
      }
    } else {
      return res.json({ message: "User not found", status: false });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server in get medicine details",
      status: false,
    });
  }
};

module.exports.addMortality = async (req, res, next) => {
  const userId = req.params.userId;
  const { date, noOfMortality, farmId } = req.body;

  try {

    const farmDetails=await farm.findById(farmId)
      const currentBalance=farmDetails.balancePopulation

    const mortalityDetails = new mortalityModel({
      date: date,
      noOfMortality: noOfMortality,
      ownerId: userId,
      farmId: farmId,
      balanceCount:currentBalance
    });
   

    await mortalityDetails
      .save()
      .then(() => {
        return res.json({
          message: "Mortality details submitted successfully",
          status: true,
        });
      })
     

      .catch((error) => {
        return res.json({
          message: "Unable to submit mortality values",
          status: false,
        });
      });
      await farm.findByIdAndUpdate(farmId, { $inc: { balancePopulation: -noOfMortality } })
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in add mortality",
      status: false,
    });
  }
};

module.exports.getMortalityDetails = async (req, res, next) => {
  const farmId = req.query.farmId;
  const userId = req.params.userId;
  try {
    const existingUser = await mortalityModel.find({ userId: userId });
    if (existingUser) {
      const mortalityDetails = await mortalityModel.find({ farmId: farmId });
      if (mortalityDetails) {
        return res.json({ data: mortalityDetails, status: true });
      } else {
        return res.json({
          message: "Unable to fetch medicine details",
          status: false,
        });
      }
    } else {
      return res.json({ message: "User not found", status: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in fetch mortality details",
      status: false,
    });
  }
};

module.exports.addUserIssue = async (req, res, next) => {
  const userId = req.params.userId;
  const { issue, issueDetails } = req.body;
  try {
    const userFeedback = new userFeedbackModel({
      ownerId: userId,
      issue: issue,
      issueInDetail: issueDetails,
    });
    await userFeedback.save().then(()=>{
      res.json({message:"Data submitted successfully",status:true})
    }).catch((error)=>{
      res.json({message:"Unable to submit details",status:false})
    })
  } catch (error) {
    res.json({
      message: "Internal server error in Add user issue",
      status: false,
    });
  }
};
