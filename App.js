const express=require("express")
const app=express()
require('dotenv').config();
const dbConnection=require("./Config/dbConnection")
const cors=require("cors")


//DATABASE
dbConnection.dbConnect()

//CORS
app.use(cors({
    origin:process.env.ORIGIN,
    method:["GET","POST"],
    credentials:true
}))

app.listen(process.env.PORT, () => {
    console.log(`Sever started at port ${process.env.PORT}`);
  });
  