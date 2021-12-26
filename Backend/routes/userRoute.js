// import { getUsers, getUserById, createNewUser, updateUserById, deleteUserByID } from "../controllers/userController.js";
// const Mongoose = require("mongoose");
import express from "express";
import Mongoose from "mongoose";
const router = express.Router();
import User from "../models/usersModel.js";

// GET all users - works
router.get("/", (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send("Invalid GET ALL USERS request");
      next();
    }
    res.json(users);
  });
});

// GET user by id
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Invalid GET BY ID request");
      }
      res.status(200).json(user);
    })
    .catch((err) => next(err));
});

//UPDATE user by id - not working
// router.put("/:id", (req, res, next) => {
//   let id = req.params.id;
//   // let id = {_id: req.params.id}
//   console.log("USER ID:", id);
//   let user = {
//     name: req.body.name,
//     password: req.body.password,
//     email: req.body.email,
//   };
//   // let user = req.body
//   console.log("USER OBJECT", user);
//   User.findByIdAndUpdate(id, user, (err, user) => {
//     if (err) throw err;
//     res.send("Sucessfully Updated User!");
//   });
// });

// POST new user - not working
router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ id });
    if (user) {
      res.status(400).json({ msg: "User already exist" });
    }
    const newUser = new User({
      _id: Mongoose.Types.ObjectId(),
      // _id: req.user.id,
      name,
      email,
      password,
    });
    user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).send("POST request error");
  }
});

// DELTE user by id - works
// router.delete("/:id", (req, res, next) => {
//   let id = req.params.id;
//   User.findByIdAndRemove(id)
//     .exec()
//     .then((user) => {
//       if (!user) {
//         res.status(404).end();
//       }
//       res.status(204).send(`Successfully removed User: ${id}`);
//     })
//     .catch((err) => next(err));
// });

export default router;
