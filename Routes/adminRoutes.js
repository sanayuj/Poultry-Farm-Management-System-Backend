const express=require("express")
const router=express.Router()
const adminAuth=require('../Middleware/adminAuth')
const {adminLogin,listUser,disableUser, getFeedback}=require("../Controllers/adminController")
const { showUserFarms, getMedicineDetails, getFeedDetails, getMortalityDetails } = require("../Controllers/userController")
const {chartDashboard}=require("../Controllers/dashboardController")
//POST method
router.post("/login",adminLogin)
router.post("/disableuser",adminAuth,disableUser)



//GET method
router.get("/listuser",adminAuth,listUser)
router.get("/getuserFarm/:userId",adminAuth,showUserFarms)
router.get("/getmedicinedetails/:userId",adminAuth,getMedicineDetails)
router.get("/getfeeddetails/:userId",adminAuth,getFeedDetails)
router.get("/getmortalitydetails/:userId",adminAuth,getMortalityDetails)
router.get("/admindashboard",adminAuth,chartDashboard)
router.get("/feedback/:userId",adminAuth,getFeedback)
module.exports = router;