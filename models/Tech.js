const mongoose = require('mongoose');

const TechSchema = mongoose.Schema({
  tech: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tech', TechSchema);
