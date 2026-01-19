const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cafeId: {
    type: Number, // Matches the ID in our cafes.js
    required: true
  },
  text: {
    type: String,
    required: true
  },
  // "Emotional" tag instead of stars (e.g., "Calm", "Excited")
  feeling: {
    type: String,
    default: "Cozy"
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
