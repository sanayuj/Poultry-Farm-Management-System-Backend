const mongoose = require("mongoose");
const User = require("../Model/userModel");
const Farm = require("../Model/farmModel");

const feedDetailSchema = new mongoose.Schema({
    feedDate:{ type: Date, default: Date.now },
  qtyReceived: { type: Number, required: true },
  qtyConsumed: { type: Number, required: true },
  balance:{type: Number, required: true},
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
});



module.exports = mongoose.model("feed", feedDetailSchema);
