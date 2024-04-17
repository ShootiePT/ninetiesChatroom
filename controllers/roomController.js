const roomService = require('../services/roomService');

exports.createRoom = async (req, res) => {
    try {
        const { maxParticipants } = req.body;
        const room = await roomService.createRoom(maxParticipants);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.addParticipant = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { userId } = req.body;
        const room = await roomService.addParticipant(roomId, userId);
        res.json(room);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getRoomDetails = async (req, res) => {
    try {
        const { roomId } = req.params;
        const roomDetails = await roomService.getRoomDetails(roomId);
        res.json(roomDetails);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        await roomService.deleteRoom(roomId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
