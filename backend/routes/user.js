const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);
router.put('/:userId', UserController.updateUser);

router.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserController.getUserProfileById(userId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Error fetching user profile' });
    }
});

module.exports = router;
