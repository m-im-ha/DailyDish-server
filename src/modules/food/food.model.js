const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true,
    },
    foodImage: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/.test(v);
        },
        message: 'Invalid image URL format!',
      },
    },
    foodQuantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    foodPrice: {
      type: Number,
      required: true,
      min: [1, 'Price must be at least 1'],
    },
    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },
    expiredDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > new Date();
        },
        message: 'Expired date must be in the future!',
      },
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
    donator: {
      image: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/.test(v);
          },
          message: 'Invalid image URL format!',
        },
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: function (v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
          },
          message: 'Invalid email format!',
        },
      },
    },
    foodStatus: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
