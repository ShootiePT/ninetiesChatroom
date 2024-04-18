const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/auth');

router.get('/debateroom.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/debateroom.html'));
});

router.get('/leaderboard.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/leaderboard.html'));
});

module.exports = router;