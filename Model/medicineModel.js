const mongoose = require("mongoose");
const User = require("../Model/userModel");
const Farm = require("../Model/farmModel");

const medicineDetailsSchema = new mongoose.Schema({
  dateOfCreated: { type: Date, default: Date.now },
  date: { type: String, required: true },
  dateOfVaccination: { type: String, required: true },
  medicineName: { type: String, required: true },
  Quantity: { type: Number, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
});

module.exports=mongoose.model("medicineDetails",medicineDetailsSchema)