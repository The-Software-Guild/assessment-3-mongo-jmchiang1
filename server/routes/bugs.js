const express = require('express');
const router = express.Router();
const auth = require('./authToken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Bug = require('../models/Bug');

//GET: get single bug
router.get('/', auth, async (req, res) => {
  try {
    const bugs = await Bug.find({ user: req.user.id }); //get bug by user.id associated with it 
    res.json(bugs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST: create new bug
router.post(
  '/',
  [
    auth, //make sure user is authenticated first 
    [     //check that name and description aren't empty 
      check('name', 'Name is required').not().isEmpty(),    
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req); //expres validator 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const newBug = new Bug({  //new bug monogoose model 
        name,
        description,
        user: req.user.id,  //include user id that is signed in 
      });

      const bug = await newBug.save();  //save new bug in mongodb
      res.json(bug);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//PUT: update single bug
router.put('/:id', auth, async (req, res) => {
  const { name, description } = req.body;

  // Build bug object
  const bugFields = {};
  if (name) bugFields.name = name;
  if (description) bugFields.description = description;

  try {
    let bug = await Bug.findById(req.params.id);  //find bug by id 
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    // Make sure user owns bug
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    //find bug by id and upate it's bugFields, created above 
    bug = await Bug.findByIdAndUpdate( req.params.id,{ $set: bugFields }, { new: true });
    res.json(bug);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//DELETE: delete single bug
router.delete('/:id', auth, async (req, res) => {
  try {
    let bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    // Make sure user owns bug
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    //find bug by id and remove it from db 
    await Bug.findByIdAndRemove(req.params.id);
    res.json({ message: 'Bug removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
