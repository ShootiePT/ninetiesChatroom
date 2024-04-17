const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the route for user registration
router.post('/register', userController.register);

// Define the route for user login
router.post('/login', userController.login);

// Define the route for user score increment
router.post('/score', userController.incrementScore);

module.exports = router;