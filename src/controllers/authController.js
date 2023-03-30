const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, ValidateRegisterUser } = require("../models/User");

/**
 * @desc Register New User
 * @router /api/auth/register
 * @method POST
 * @access public
 */
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = ValidateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }

  const salt = bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.passwod, salt);

  user = new User({
    userName: req.body.userName,
    email: req.body.email,
    passwod: hashedPassword
  });
  user.save();

  res.status(201).json({ message: "You registred successfully" });
});
