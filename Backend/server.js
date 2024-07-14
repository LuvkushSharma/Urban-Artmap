const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/user.model");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  // console.log(con.connections);
  console.log("DB connection successful");
});

// For testing API's on POSTMAN
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server is listening at : http://localhost:${port}`);
});
