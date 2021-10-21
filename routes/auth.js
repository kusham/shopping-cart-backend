const express = require("express");
const User = require("../models/user");
var CryptoJS = require("crypto-js");

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SEC_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(404).json({ Sucess: false, error: error.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    !user && res.status(404).json("wrong credintials");

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SEC_KEY
    );
    const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(404).json("wrong credintials");

    const { password, ...others } = user._doc;
    res.status(505).json(others);
  } catch (error) {
    res.status(404).json({ Sucess: false, error: error.message });
  }
});

module.exports = router;
