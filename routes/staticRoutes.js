const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/auth');

router.get('/debateroom', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/debateroom.html'));
});

router.get('/leaderboard.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/leaderboard.html'));
});

router.get('/index2.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index2.html'));
});

module.exports = router;