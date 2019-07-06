const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');

// @route						GET api/techs
// @desc						Get all techs
// @access					Public
router.get('/', [], async (req, res) => {
  try {
    const techs = await Tech.find();
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ statusText: 'Server Error' });
  }
});

// @route						POST api/techs
// @desc						Add new tech
// @access					Public
router.post(
  '/',
  [
    check('name', 'Name is required').exists(),
    check('surname', 'Last name is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ statusText: errors.array() });
    }
    const { name, surname } = req.body;
    try {
      const newTech = new Tech({
        name,
        surname
      });
      await newTech.save();

      res.json(newTech);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ statusText: 'Server Error' });
    }
  }
);

module.exports = router;
