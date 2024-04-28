const express = require('express');
const router = express.Router();
const recommendationsController = require('../controllers/recommendationsController');

// Define the route for fetching recommendations
router.get('/:userId', recommendationsController.getRecommendations);

module.exports = router;
