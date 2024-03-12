const mongoose = require("mongoose");
const User = require("../Model/userModel");


const farmDetailSchema = new mongoose.Schema({
    farmName: { type: String, required: true },
    licenceID: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    post: { type: String, required: true },
    poultryPopulation: { type: Number, required: true },
    balancePopulation: { type: Number, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
module.exports=new mongoose.model("farmDetails",farmDetailSchema)
