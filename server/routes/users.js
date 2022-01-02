<<<<<<< HEAD
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
=======
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please fill out the name field').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 7 or more characters'
    ).isLength({ min: 7 }),
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

<<<<<<< HEAD
    const { name, email, password } = req.body; //take out name, email, and password from request body

    try {
      let user = await User.findOne({ email }); //find one user by email 
      if (user) {
        return res.status(400).json({ message: "User already exists" });  //if user exist, error message
      }

      user = new User({ //new user mongoose model 
=======
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      user = new User({
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
        name,
        email,
        password,
      });

<<<<<<< HEAD
      const salt = await bcrypt.genSalt(10);  //salt password

      user.password = await bcrypt.hash(password, salt);  //hash the salted password 

      await user.save();  //save new password in db 
=======
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78

      const payload = {
        user: {
          id: user.id,
        },
      };

<<<<<<< HEAD
      jwt.sign( //sign the JWT token with payload (user.id) and the secret key to access the unique JWT
        payload,
        config.get("jwtSecret"),
=======
      jwt.sign(
        payload,
        config.get('jwtSecret'),
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
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
<<<<<<< HEAD
      res.status(500).send("Server Error");
=======
      res.status(500).send('Server Error');
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
    }
  }
);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
