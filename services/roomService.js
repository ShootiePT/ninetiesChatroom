const roomModel = require('../models/roomModel');

class RoomService {
    async createRoom(maxParticipants) {
        return roomModel.createRoom(maxParticipants);
    }

    async addParticipant(roomId, userId) {
        return roomModel.addParticipant(roomId, userId);
    }

    async getRoomDetails(roomId) {
        return roomModel.getRoomDetails(roomId);
    }

    async deleteRoom(roomId) {
        return roomModel.deleteRoom(roomId);
    }
}

module.exports = new RoomService();