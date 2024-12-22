const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
connectDB(URI);


app.get("/", (req, res) => {
  res.send(`Food Server is running.`);
});

app.listen(PORT, () => {
  console.log(`Your port is : `, PORT);
});
