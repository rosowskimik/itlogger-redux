const mongoose = require('mongoose');

const TechSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tech', TechSchema);
