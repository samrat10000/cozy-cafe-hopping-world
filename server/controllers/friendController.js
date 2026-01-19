const User = require('../models/User');

// Get User's Friends
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('friends', 'name email');
    res.json(user.friends);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add Friend
exports.addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) return res.status(404).json({ msg: 'Friend not found' });

    // Check if already friends
    if (user.friends.includes(friendId)) {
        return res.status(400).json({ msg: 'Already friends' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json(user.friends);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Search Friends (by name)
exports.searchFriends = async (req, res) => {
    try {
        const query = req.query.name;
        const users = await User.find({ name: { $regex: query, $options: 'i' } }).select('name email');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
