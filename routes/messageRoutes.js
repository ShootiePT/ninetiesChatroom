const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/rooms/:roomId/messages', messageController.postMessage);
router.get('/rooms/:roomId/messages', messageController.getMessages);
router.delete('/rooms/:roomId/messages', messageController.deleteMessages);

module.exports = router;