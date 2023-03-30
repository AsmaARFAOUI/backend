const mongoose = require("mongoose");
const Joi = require("joi");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      minlengh: 2,
      maxlengh: 100
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minlengh: 5,
      maxlengh: 100
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlengh: 8
    }
  },
  {
    timestamps: true
  }
);

// Validate New User
function ValidateRegisterUser(obj) {
  const schema = Joi.object({
    userName: Joi.string().required().trim(),
    email: Joi.string().required().trim().unique().email(),
    password: Joi.string().required().trim()
  });
  return schema.validate(obj);
}

// Validate Update User
function ValidateUpdateUser(obj) {
  const schema = Joi.object({
    userName: Joi.string().required().trim(),
    email: Joi.string().required().trim().unique().email()
  });
  return schema.validate(obj);
}

// Category Model
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  ValidateRegisterUser,
  ValidateUpdateUser
};
