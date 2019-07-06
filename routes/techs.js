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
  [check('tech', 'Tech is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ statusText: errors.array() });
    }
    const { tech } = req.body;
    try {
      const newTech = new Tech({
        tech
      });
      await newTech.save();

      res.json(newTech);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ statusText: 'Server Error' });
    }
  }
);

// @route						DELETE api/techs:id
// @desc						Delete tech
// @access					Public
router.delete('/:id', [], async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech)
      return res.status(404).json({ statusText: "Tech doesn't exist" });

    await tech.remove();
    res.json('Tech deleted successfully');
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ statusText: 'Server Error' });
  }
});

module.exports = router;
