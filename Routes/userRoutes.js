const express=require("express")
const {signup,login, userHeader,addFarm,showUserFarms,addFeed,getFeedDetails,addMedicine,getMedicineDetails,addMortality,getMortalityDetails,addUserIssue} =require('../Controllers/userController')
const router=express.Router()
const cors = require('cors');
const userAuth=require("../Middleware/userAuth")

//POST
router.post('/signup', signup);
router.post('/login',login)
router.post('/addfarm/:userId',userAuth,addFarm)
router.post('/addfeed/:userId',userAuth,addFeed)
router.post('/addmedicine/:userId',userAuth,addMedicine)
router.post('/addmortality/:userId',userAuth,addMortality)
router.post('/helpAndSupport/:userId',userAuth,addUserIssue)




//GET 
router.get('/',userAuth,userHeader)
router.get('/showuserfarms/:userId',userAuth,showUserFarms)
router.get('/feedDetails/:userId',userAuth,getFeedDetails)
router.get('/medicineDetails/:userId',userAuth,getMedicineDetails)
router.get('/mortalityDetails/:userId',userAuth,getMortalityDetails)



module.exports = router;