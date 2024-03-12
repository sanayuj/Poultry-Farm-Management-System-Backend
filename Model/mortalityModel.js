const mongoose = require("mongoose");
const userModel = require("../Model/userModel");
const farmModel = require("../Model/farmModel");

const mortalityDetailsSchema = new mongoose.Schema({
  dateOfCreated: { type: Date, default: Date.now },
  date: { type: String, required: true },
  noOfMortality: { type: Number, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  balanceCount:{ type: Number, required: true },
});

module.exports = mongoose.model("mortalityDetails", mortalityDetailsSchema);
