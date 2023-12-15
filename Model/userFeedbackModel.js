const mongoose=require('mongoose')
const User = require("../Model/userModel");

const userFeedbackSchema=new mongoose.Schema({
    dateOfCreated:{ type: Date, default: Date.now },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issue:{type:String,required:true},
    issueInDetail:{type:String,required:true}
})

module.exports=mongoose.model("userFeedback",userFeedbackSchema)