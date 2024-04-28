const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

router.get('/:userId', notificationsController.getNotifications);

module.exports = router;
