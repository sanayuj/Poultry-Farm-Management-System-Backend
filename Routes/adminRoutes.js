const express=require("express")
const router=express.Router()

const {adminLogin}=require("../Controllers/adminController")


router.post("/login",adminLogin)

module.exports = router;