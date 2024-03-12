const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./Config/dbConnection");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require('body-parser');
const userRouters = require("./Routes/userRoutes");
const AdminRoutes=require("./Routes/adminRoutes")

//DATABASE
dbConnection.dbConnect();

//CORS
app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/",userRouters);
 app.use("/admin",AdminRoutes );

app.listen(process.env.PORT, () => {
  console.log(`Sever started at port ${process.env.PORT}`);
});

module.exports = app;
