const express=require("express")
const {signup,login, userHeader} =require('../Controllers/userController')
const router=express.Router()
const cors = require('cors');
const userAuth=require("../Middleware/userAuth")

//POST
router.post('/signup', signup);
router.post('/login',login)



//GET 
router.get('/',userAuth,userHeader)

module.exports = router;