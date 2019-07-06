const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

// @route						GET api/logs
// @desc						Get all logs
// @access					Public
router.get('/', [], async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ statusText: 'Server Error' });
  }
});

// @route						POST api/logs
// @desc						Add new log
// @access					Public
router.post(
  '/',
  [
    check('message', 'Log message is required').exists(),
    check('tech', 'Please select a tech').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ statusText: errors.array() });
    }
    const { message, tech, attention } = req.body;
    try {
      const newLog = new Log({
        message,
        tech,
        attention
      });
      await newLog.save();

      res.json(newLog);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ statusText: 'Server Error' });
    }
  }
);

// @route						PUT api/logs:id
// @desc						Update a log
// @access					Public
router.put('/:id', [], async (req, res) => {
  const { message, tech, attention } = req.body;

  const logFields = { date: Date.now() };
  if (message) logFields.message = message;
  if (tech) logFields.tech = tech;
  if (attention) logFields.attention = attention;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ statusText: "Log doesn't exist" });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ statusText: 'Server Error' });
  }
});

module.exports = router;
