const asyncHandler = require("express-async-handler");
const { Category, ValidateNewCategory } = require("../models/Category");
// Create New category
/**
 * @desc Create New Category
 * @route /api/category
 * @method POST
 * @access private (only admin)
 */
module.exports.CreateCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = ValidateNewCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const category = await Category.create({
    categoryName: req.body.categoryName
  });

  res.status(201).json(category);
});
