const mongoose = require("mongoose");

const requestedFoodSchema = new mongoose.Schema(
  {
    foodId: {
      type: String,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    foodImage: {
      type: String,
      required: true,
    },
    donatorEmail: {
      type: String,
      required: true,
    },
    donatorName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    requestDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    expiredDate: {
      type: Date,
      required: true,
    },
    additionalNotes: {
      type: String,
      default: "",
    },
    foodStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RequestedFood = mongoose.model("RequestedFood", requestedFoodSchema);

module.exports = RequestedFood;
