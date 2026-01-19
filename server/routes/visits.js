const router = require('express').Router();
const User = require('../models/User');

// GET /api/visits/:userId
// Get my own visited history
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user.visited || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// POST /api/visits/add
router.post('/add', async (req, res) => {
    try {
        const { userId, cafeId } = req.body;
        const user = await User.findById(userId);
        
        // check if already visited
        const alreadyVisited = user.visited.some(v => v.cafeId === cafeId);
        if (!alreadyVisited) {
            user.visited.push({ cafeId });
            await user.save();
        }
        res.json(user.visited);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// GET /api/visits/friends/:userId
// Get recent visits from friends
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('friends');
        // Aggregate all friend visits
        let activity = [];
        if(user.friends){
            user.friends.forEach(friend => {
                if(friend.visited){
                    friend.visited.forEach(visit => {
                        activity.push({
                            friendName: friend.name,
                            friendAvatar: friend.avatar || 'avatar-akash.png', // Fallback
                            cafeId: visit.cafeId,
                            date: visit.date
                        });
                    });
                }
            });
        }
        // Sort by most recent
        activity.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(activity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
