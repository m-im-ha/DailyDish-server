const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Food Server is running.`);
});

app.listen(PORT, () => {
  console.log(`Your port is : `, PORT);
});
