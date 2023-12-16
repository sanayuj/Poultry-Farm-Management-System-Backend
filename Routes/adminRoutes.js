const express=require("express")
const router=express.Router()
const adminAuth=require('../Middleware/adminAuth')
const {adminLogin,listUser,disableUser}=require("../Controllers/adminController")
const { showUserFarms } = require("../Controllers/userController")

//POST method
router.post("/login",adminLogin)
router.post("/disableuser",adminAuth,disableUser)



//GET method
router.get("/listuser",adminAuth,listUser)
router.get("/getuserFarm/:userId",adminAuth,showUserFarms)

module.exports = router;