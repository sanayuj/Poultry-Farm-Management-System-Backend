const express=require("express")
const {signup,login, userHeader,addFarm,showUserFarms,addFeed,getFeedDetails} =require('../Controllers/userController')
const router=express.Router()
const cors = require('cors');
const userAuth=require("../Middleware/userAuth")

//POST
router.post('/signup', signup);
router.post('/login',login)
router.post('/addfarm/:userId',addFarm)
router.post('/addfeed/:userId',addFeed)




//GET 
router.get('/',userAuth,userHeader)
router.get('/showuserfarms/:userId',showUserFarms)
router.get('/feedDetails/:userId',getFeedDetails)



module.exports = router;