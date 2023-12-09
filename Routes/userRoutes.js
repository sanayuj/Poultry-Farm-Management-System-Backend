const express=require("express")
const {signup,login, userHeader,addFarm} =require('../Controllers/userController')
const router=express.Router()
const cors = require('cors');
const userAuth=require("../Middleware/userAuth")

//POST
router.post('/signup', signup);
router.post('/login',login)
router.post("/addfarm",addFarm)



//GET 
router.get('/',userAuth,userHeader)

module.exports = router;