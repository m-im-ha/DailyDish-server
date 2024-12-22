const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log(`mongoDB is connected successfully`);
  } catch (error) {
    console.log(`error to connect mongoDB`, error.message);
    process.exit(1);
  }
}
module.exports = connectDB;
