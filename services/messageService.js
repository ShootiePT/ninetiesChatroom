const messageModel = require('../models/messageModel');

class MessageService {
    async addMessage(roomId, userId, messageText) {
        await messageModel.storeMessage(roomId, userId, messageText);
    }

    async fetchMessages(roomId) {
        return messageModel.getMessages(roomId);
    }

    async deleteMessages(roomId) {
        await messageModel.clearMessages(roomId);
    }
}

module.exports = new MessageService();