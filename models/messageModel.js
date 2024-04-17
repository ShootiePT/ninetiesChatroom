const redis = require('../config/redisConfig');

class MessageModel {
    constructor() {
        this.redisClient = redis;
    }

    async storeMessage(roomId, userId, messageText) {
        const key = `room:${roomId}:messages`;
        const message = JSON.stringify({
            userId,
            text: messageText,
            timestamp: new Date().toISOString()  // Adding a timestamp for message ordering and retrieval
        });
        await this.redisClient.rpush(key, message);
    }

    async getMessages(roomId) {
        const key = `room:${roomId}:messages`;
        const messages = await this.redisClient.lrange(key, 0, -1);
        return messages.map(message => JSON.parse(message));
    }

    async clearMessages(roomId) {
        const key = `room:${roomId}:messages`;
        await this.redisClient.del(key);
    }
}

module.exports = new MessageModel();