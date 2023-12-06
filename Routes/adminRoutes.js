const express=require("express")
const router=express.Router()

const {adminLogin,listUser,disableUser}=require("../Controllers/adminController")

//POST method
router.post("/login",adminLogin)
router.post("/disableuser",disableUser)



//GET method
router.get("/listuser",listUser)

module.exports = router;