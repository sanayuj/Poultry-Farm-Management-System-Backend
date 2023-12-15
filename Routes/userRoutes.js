const express=require("express")
const {signup,login, userHeader,addFarm,showUserFarms,addFeed,getFeedDetails,addMedicine,getMedicineDetails,addMortality} =require('../Controllers/userController')
const router=express.Router()
const cors = require('cors');
const userAuth=require("../Middleware/userAuth")

//POST
router.post('/signup', signup);
router.post('/login',login)
router.post('/addfarm/:userId',addFarm)
router.post('/addfeed/:userId',addFeed)
router.post('/addmedicine/:userId',addMedicine)
router.post('/addmortality/:userId',addMortality)




//GET 
router.get('/',userAuth,userHeader)
router.get('/showuserfarms/:userId',showUserFarms)
router.get('/feedDetails/:userId',getFeedDetails)
router.get('/medicineDetails/:userId',getMedicineDetails)



module.exports = router;