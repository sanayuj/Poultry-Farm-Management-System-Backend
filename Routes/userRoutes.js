const express=require("express")
const {signup} =require('../Controllers/userController')

const cors = require('cors');
const router=express.Router()



router.post('/signup', signup);