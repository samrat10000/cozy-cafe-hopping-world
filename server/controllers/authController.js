const User = require('../models/User');

// Register (For Samrat, Akash, Bhavya)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Simple check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    res.json({ msg: 'User Registered!', user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Login (Simplified - returns user ID for now)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ msg: 'User not found' });
    if (user.password !== password) return res.status(400).json({ msg: 'Invalid Password' });

    res.json({ msg: 'Logged In', user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: 'Server Error' });
  }
};
