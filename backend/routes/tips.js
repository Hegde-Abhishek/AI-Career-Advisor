const express = require('express');
const { generatePersonalizedTips } = require('../controllers/tipsController');
const router = express.Router();

// Route to get personalized tips
router.post('/personalized-tips', generatePersonalizedTips);

module.exports = router;

