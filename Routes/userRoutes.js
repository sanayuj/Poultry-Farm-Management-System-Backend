const express=require("express")
const {signup} =require('../Controllers/userController')
const router=express.Router()
const cors = require('cors');


router.post('/signup', signup);


module.exports = router;