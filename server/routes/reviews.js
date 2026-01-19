const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:cafeId', reviewController.getReviews);
router.post('/add', reviewController.addReview);

module.exports = router;
