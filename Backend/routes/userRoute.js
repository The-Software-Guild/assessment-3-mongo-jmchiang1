const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/usersModel.js');

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

router.post(
  '/',
  //check that name isn't empty, email is valid, and password is longer than 3 characters
  [
    check('name', 'Please fill out the name field').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 3 or more characters'
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //find user by email
      let user = await User.findOne({ email });
      //if user already exist in db...
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      //new user object
      user = new User({
        name,
        email,
        password,
      });
      //salt the password
      const salt = await bcrypt.genSalt(10);
      //hash the password
      user.password = await bcrypt.hash(password, salt);
      //save hashed password in db
      await user.save();  

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 5000,  //secret token key expires in 5000 seconds
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;