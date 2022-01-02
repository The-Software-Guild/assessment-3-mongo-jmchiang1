const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("./authToken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//GET ROUTE: get single user
router.get("/", auth, async (req, res) => {
  //pass in auth as a 2nd param to make sure user is authenticated before displaying this data
  try {
    const user = await User.findById(req.user.id); //find user by id
    res.json(user); //send that user data back as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST ROUTE: create new user
router.post(
  "/",
  [
    check("email", "Email address is required").isEmail(), //express validator
    check("password", "Password is required").exists(), //express validator
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //express validator
    }
    const { email, password } = req.body; //take out email and password from request body
    try {
      let user = await User.findOne({ email }); //find user by email 
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);  //match hashed password with plain text password
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = { user: { id: user.id } //payload with user id 
      };
      jwt.sign( payload, config.get("jwtSecret"),{ expiresIn: 3600 }, //sign JWT token with payload and key
        (err, token) => {
          if (err) throw err; //if error, throw err; otherwise return token as JSON
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
