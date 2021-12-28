const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require('../models/User');

// Register route.
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// require User model
const User = require("../models/User");

// POST route with "api/users" endpoint that registers a user. 
router.post(
  "/",
  [
    // Express validators that check for name, valid email, and valid password
    check("name", "Please enter a name.").not().isEmpty(),
    check("email", "Please enter a valid email address.").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Error object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body; //take out name, email, and password from request body

    try {
      // Checks to see if there is a user.
      let user = await User.findOne({ email });
      // Returns an error if the user is already registered.
      if (user) {
        return res.status(400).json({
          msg: "User already exists. Please choose another email address.",
        });
      }
      //create new user with name, email, and password
      user = new User({
        name,
        email,
        password,
      });
      //salt the password
      const salt = await bcrypt.genSalt(10);
      // hash the password.
      user.password = await bcrypt.hash(password, salt);
      // Saves password in db
      await user.save();
      // Creates the payload with user id 
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Signs the token with secret key
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        // Responds with the token.
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error.");    //server error
    }
  }
);

module.exports = router;
