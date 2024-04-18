const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/auth');

router.get('/session', isAuthenticated, (req, res) => {
    if (req.session.userId) {
        res.json({ userId: req.session.userId });
    } else {
        res.status(401).json({ error: 'No user logged in' });
    }
});

module.exports = router;