const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.get('/:userId', friendController.getFriends);
router.post('/add', friendController.addFriend);
router.get('/search', friendController.searchFriends); // /api/friends/search?name=Akash

module.exports = router;
