const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const foodRoute = require("./route/foods.route");
const authRoute = require("./route/auth.route");

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dailydish-1f0f4.web.app",
      "https://dailydish-1f0f4.firebaseapp.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
connectDB(URI);

app.use("/auth", authRoute);
app.use("/foods", foodRoute);

app.get("/", (req, res) => {
  res.send(`Food Server is running.`);
});

app.listen(PORT, () => {
  console.log(`Your port is : `, PORT);
});
