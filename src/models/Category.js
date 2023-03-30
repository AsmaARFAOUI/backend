const mongoose = require("mongoose");
const Joi = require("joi");

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Validate Create Category
function ValidateNewCreateCategory(obj) {
  const schema = Joi.object({
    categoryName: Joi.string().required().trim().unique()
  });
  return schema.validate(obj);
}

// Category Model
const Category = mongoose.model("Category", CategorySchema);

module.exports = {
  Category,
  ValidateNewCreateCategory
};
