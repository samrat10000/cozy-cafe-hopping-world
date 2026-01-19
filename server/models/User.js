const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // The Friends List
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Avatar selection (defaulting to a generic one if not set)
  avatar: {
    type: String,
    default: "avatar-samrat.png" 
  },
  // The Memory: Where have I been?
  visited: [{
    cafeId: Number,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
