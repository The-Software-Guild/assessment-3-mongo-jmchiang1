const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Bug = require("../models/Bug");

//GET route: get all bugs associated with authenticated user id - WORKS
router.get("/", auth, async (req, res) => {
  try {
    const bugs = await Bug.find({ user: req.user.id }).sort({ date: -1 });
    res.json(bugs);
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR: GET ALL BUGS");
  }
});

//GET route: get bug by id - WORKS
    router.get("/", auth, async (req, res) => {
      try {
        const singleBug = await Bug.find({ user: req.user.id }).sort({ date: -1 });
        res.json(singleBug);
      } catch (err) {
        console.log(err);
        res.status(500).send("SERVER ERROR: GET SINGLE BUGS");
      }
    });

//POST route: create new bug for authenticated user - WORKS
router.post("/", [ auth, [check("title", "Title is required.").not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;  //take out title and description 

    try {
      const newBug = new Bug({  //new bug model 
        title,
        description,
        // user: req.user.id,
      });

      const bug = await newBug.save();  //save bug 

      res.json(bug);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR: CREATE NEW BUG");
    }
  }
);

//PUT ROUTE: update existing bug by id - WORKS
router.put("/:id", auth, async (req, res) => {
    const { title, description } = req.body;

    const bugParams = {};
    if (title) bugParams.title = title;
    if (description) bugParams.description = description;

    try {
        let id = req.params.id
        let bug = await Bug.findById(id)
        if (!bug) {
            res.status(400).json({message: "bug not found"});
        }
        // make sure that user id matches the bug id
        if (bug.user.toString() !== req.user.id){
            res.status(401).json({message: 'User not authenticated/valid'})
        }
        //update bug here 
        bug = await Bug.findByIdAndUpdate(id,{ $set: bugParams },{ new: true });
        res.json(bug);
    } catch (err){
        console.log(err);
        res.status(500).send("SERVER ERROR: UPDATE BUG")
    }
})

//DELETE ROUTE: delete single bug by id - WORKS
router.delete("/:id", auth, async (req, res) => {
    try {
        let id = req.params.id
        let bug = await Bug.findById(id)    //find bug by id 
        if (!bug){
            res.status(404).json({ message: "Bug not found." });
        }
        // bug-user id has to match user id 
        if (Bug.user.toString() !== req.user.id){
            return res.status(401).json({ message: "User is not authorized/valid." });
        }
        //delete bug here
        await Bug.findByIdAndDelete(id);
        res.json({message: 'Bug has been removed'})
    } catch (err) {
        console.log(err);
        res.status(500).send('SERVER ERROR: DELETE BUG')
    }
})

module.exports = router;

// {
//     "title" : "BUG1",
//     "description" : "this is a bug"
// }