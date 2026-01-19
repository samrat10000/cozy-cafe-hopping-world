const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // Explicit path!
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Explicitly log the URI (masked) to verify it exists
const uri = process.env.MONGO_URI;
console.log("Attempting to connect to:", uri ? "URI Found" : "URI NOT FOUND");

// Database Connection
mongoose.connect(uri || "")
  .then(() => console.log('✅ MongoDB Connected to Cozy World'))
  .catch(err => {
      console.error('❌ Database Connection Error:', err.message);
      // Do not exit, keep server running to report error to client
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/friends', require('./routes/friends'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/visits', require('./routes/visits')); // <-- NEW

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
