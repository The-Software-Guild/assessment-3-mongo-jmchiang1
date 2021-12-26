// import { getUsers, getUserById, createNewUser, updateUserById, deleteUserByID } from "../controllers/userController.js";
// const Mongoose = require("mongoose");
import express from "express";
import Mongoose from "mongoose";
const router = express.Router();
import Bugs from "../models/bugsModel.js";

// GET all bugs 
router.get("/", (req, res, next) => {
  Bugs.find({}, (err, bugs) => {
    if (err) {
      res.send("Invalid GET ALL BUGS request");
      next();
    }
    res.json(bugs);
  });
});

// GET bug by id
router.get("/:id", (req, res, next) => {
  Bugs.findById(req.params.id)
    .then((bug) => {
      if (!bug) {
        res.status(404).send("Invalid GET BUG BY ID request");
      }
      res.status(200).json(bug);
    })
    .catch((err) => next(err));
});

//UPDATE bug by id
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  console.log("BUG ID:", id);
  let bug = {
    title: req.body.title,
    description: req.body.description,
  };
  // let user = req.body
  console.log("USER OBJECT", bug);
  Bugs.findByIdAndUpdate(id, bug, (err, user) => {
    if (err) throw err;
    res.send("Sucessfully Updated Bug!");
  });
});

// POST new bug
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

// DELTE bug by id
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndRemove(id)
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).end();
      }
      res.status(204).send(`Successfully removed User: ${id}`);
    })
    .catch((err) => next(err));
});

export default router;
