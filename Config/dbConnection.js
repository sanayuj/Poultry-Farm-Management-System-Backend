const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
module.exports = {
  dbConnect: async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/farm").then(() => {
        console.log("Database Connected Successfully");
      });
    } catch (error) {
      console.log(error);
    }
  },
};
