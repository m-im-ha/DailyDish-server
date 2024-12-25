const express = require("express");
const Food = require("../modules/food/food.model");
const RequestedFood = require("../modules/requestFood/requestfood.model");
const { verifyToken } = require("../utils/jwt");
const router = express.Router();

// Get all foods
router.get("/availablefoods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error to get foods.", error.message);
    res.status(500).json({ message: "Failed to fetch foods." });
  }
});

// Get specific food details
router.get("/foodDetails/:id", verifyToken, async (req, res) => {
  try {
    // console.log(`req-params :::::::: `,req.params);
    const { id } = req.params;
    console.log("Fetching food details...");
    const food = await Food.findById(id);
    console.log("Food details fetched:", food);
    res.status(200).json(food);
  } catch (error) {
    console.error("Error to get food details : ", error.message);
    res.status(500).json({ message: "Failed to fetch food details." });
  }
});

// Add food
router.post("/addfood", verifyToken, async (req, res) => {
  try {
    const foodData = req.body;
    const newFoodData = new Food(foodData);
    await newFoodData.save();
    res.status(201).json({ message: "Food created successfully!" });
  } catch (error) {
    console.error("Error to add food", error.message);
    res.status(500).json({ message: "Failed to creat food." });
  }
});

// Add food to requested food
router.post("/requestedfoods", verifyToken, async (req, res) => {
  try {
    const foodData = req.body;
    const requestedFood = new RequestedFood(foodData);
    await requestedFood.save();
    console.log(`Food added to requested food.`);
    res.status(201).json({ message: "Food added to requested food." });
  } catch (error) {
    console.error(`Error to add requested food`, error.message);
    res.status(500).json({ message: "Failed to add requested food." });
  }
});

// Get requested foods for logged-in user
router.get("/myrequestedfoods", verifyToken, async (req, res) => {
  try {
    const email = req.user.email; // Logged-in user's email
    const requestedFoods = await RequestedFood.find({ userEmail: email });
    res.status(200).json(requestedFoods);
  } catch (error) {
    console.error("Error fetching requested foods:", error.message);
    res.status(500).json({ message: "Failed to fetch requested foods." });
  }
});

// Get all foods added by the logged-in user
router.get("/managefoods", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const foods = await Food.find({"donator.email" : email});
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching foods",error.message);
    res.status(500).json({message : "Failed to fetch foods."});
  }
});

// Delete specific food when requested
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      res.status(404).json({ message: "Food not found." });
    }
    console.log(`Food deleted successfully.`);
    res.status(200).json({ message: "Food deleted successfully." });
  } catch (error) {
    console.error(`Error to delete food.`, error.message);
    res.status(500).json({ message: "Failed to delete food." });
  }
});

module.exports = router;
