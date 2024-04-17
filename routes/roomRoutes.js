const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// POST route to create a new room
router.post('/', roomController.createRoom);

// POST route to add a participant to a room
router.post('/:roomId/participants', roomController.addParticipant);

// GET route to retrieve details of a specific room
router.get('/:roomId', roomController.getRoomDetails);

// DELETE route to remove a specific room
router.delete('/:roomId', roomController.deleteRoom);

module.exports = router;