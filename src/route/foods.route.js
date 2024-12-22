const express = require("express");
const Food = require("../modules/food/food.model");
const router = express.Router();

// get all foods
router.get("/availablefoods", async (req,res)=>{
    try{
        const foods = await Food.find();
        res.status(200).json(foods);
    }catch(error){
        console.error("Error to get foods.",error.message);
        res.status(500).json({message : "Failed to fetch foods."})
    }
})

// add food
router.post("/addfood", async (req, res) => {
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

module.exports = router;
