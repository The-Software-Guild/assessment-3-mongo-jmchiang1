const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//CREATE NEW USERS
router.post(
  "/",
  [
    check("name", "Please include a valid name").not().isEmpty(), //express validator
    check("email", "Please include a valid email").isEmail(), //express validator
    check("password", "Please include a valid password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; //take out name, email, and password from request body

    try {
      let user = await User.findOne({ email }); //find one user by email 
      if (user) {
        return res.status(400).json({ message: "User already exists" });  //if user exist, error message
      }

      user = new User({ //new user mongoose model 
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);  //salt password

      user.password = await bcrypt.hash(password, salt);  //hash the salted password 

      await user.save();  //save new password in db 

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign( //sign the JWT token with payload (user.id) and the secret key to access the unique JWT
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
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
