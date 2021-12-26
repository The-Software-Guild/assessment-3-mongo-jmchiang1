const express = require("express");
const router = express.Router();
const config = require('config');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/usersModel");

//get single user auth
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Auth GET error");
  }
});

//create single user auth
router.post(
  "/",
  [
    check("email", "Please include a valid email address").isEmail(),
    check("password", "A password is required").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ message: "POST user auth error" });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid email" });
      }
      const match = await bcrypt.compare(password, user.password);  //compare password to the hash password
      if (!match) {
        res.status(400).json({ message: "Invalid password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign( //if password matches, then sign user in with secret key 
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 5000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Auth POST error");
    }
  }
);

module.exports = router;
