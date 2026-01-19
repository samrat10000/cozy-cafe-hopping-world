const Review = require('../models/Review');

// Get Reviews for a Cafe
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ cafeId: req.params.cafeId })
        .populate('user', 'name')
        .sort({ createdAt: -1 }); // Newest first
    res.json(reviews);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add Review
exports.addReview = async (req, res) => {
  try {
    const { userId, cafeId, text, feeling } = req.body;
    
    const newReview = new Review({
        user: userId,
        cafeId,
        text,
        feeling
    });

    const review = await newReview.save();
    res.json(review);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
