const express = require('express');
const router = express.Router();
const DataController = require('../controllers/dataController');

// Endpoint to fetch job listings
router.get('/jobs', DataController.getJobs);

// Endpoint to fetch event listings
router.get('/events', DataController.getEvents);

// Endpoint to fetch visa rules and regulations
router.get('/visa-rules', DataController.getVisaRulesData);

module.exports = router;
