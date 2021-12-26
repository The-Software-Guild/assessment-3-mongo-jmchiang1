const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
const { check, validationResult } = require("express-validator");

const User = require("../models/usersModel");

router.get("/", async (req, res) => { //works 
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (err) {
    res.status(500).send("GET ALL USERS ERROR");
  }
});

router.get("/:id", async (req, res) => { //works 
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("GET SINGLE USERS ERROR");
  }
});

//create user
router.post(
  "/",
  [
    //check that name isn't empty
    check("name", "Please fill out the name field").not().isEmpty(),
    //check email is valid
    check("email", "Please include a valid email").isEmail(),
    //check password has more than 3 characters
    check(
      "password",
      "Please enter a password with 3 or more characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'validation error' });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); //find user by email
      if (user) {
        return res.status(400).json({ msg: "User already exists" });    //if user exist, throw error
      }

      user = new User({ //create new user with name, email, and password
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);    //salt = random string 

      user.password = await bcrypt.hash(password, salt);    //randomize the salted password 

      await user.save();    //save that into db

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 5000,  //secret key expires in 5000 seconds 
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
