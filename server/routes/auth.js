const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

//import user model 
const User = require("../models/User");

//GET ROUTE: get logged in user 
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("SERVER ERROR");
    }
})

//POST ROUTE: authorize user and creates token 
router.post(
    "/",
    [
      check("email", "Please enter a valid email address.").isEmail(),
      check("password", "Password is required.").exists(),
    ],
    async (req, res) => {
      // Errors object that is sent through the backend and sends the user a 400 error if the requirements for the user model are not met.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });   //find one user by email, since they have to be unique 
  
        if (!user) {    //if user doesnt exist, send 400 error
          return res.status(400).json({ message: "Invalid credentials." });
        }
        //if user exist, match inputted password with hashed password stored in db 
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials." });
        }
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: '1h',
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
      }
    }
  );

  module.exports = router;
