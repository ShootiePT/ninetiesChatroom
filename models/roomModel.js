const redis = require('../config/redisConfig'); // Ensure you have this setup to export your Redis client

class RoomModel {
    constructor() {
        this.redis = redis;
    }

    async getNextRoomId() {
        return await this.redis.incr('nextRoomId');
    }

    async createRoom(maxParticipants) {
        const roomId = await this.getNextRoomId();
        const key = `room:${roomId}`;
        await this.redis.hmset(key, {
            'maxParticipants': maxParticipants,
            'currentCount': 0
        });
        return { roomId, maxParticipants, currentCount: 0 };
    }

    async addParticipant(roomId, userId) {
        const roomExists = await this.redis.exists(`room:${roomId}`);
        if (!roomExists) {
            throw new Error('Room does not exist');
        }

        const key = `room:${roomId}`;
        const maxParticipants = await this.redis.hget(key, 'maxParticipants');
        const currentCount = await this.redis.hget(key, 'currentCount');

        if (parseInt(currentCount) >= parseInt(maxParticipants)) {
            throw new Error('Room is full');
        } else {
            await this.redis.hincrby(key, 'currentCount', 1); // Increment current count first
            await this.redis.sadd(`room:${roomId}:participants`, userId); // Add user to participants
            const participants = await this.redis.smembers(`room:${roomId}:participants`); // Retrieve all participants
            return { roomId, currentCount: parseInt(currentCount) + 1, maxParticipants, participants };
        }

    }

    async getRoomDetails(roomId) {
        const roomExists = await this.redis.exists(`room:${roomId}`);
        if (!roomExists) {
            throw new Error('Room does not exist');
        }

        const key = `room:${roomId}`;
        const roomDetails = await this.redis.hgetall(key);
        const participants = await this.redis.smembers(`room:${roomId}:participants`);
        return { ...roomDetails, participants };
    }

    async deleteRoom(roomId) {
        const key = `room:${roomId}`;
        await this.redis.del(key);
        await this.redis.del(`room:${roomId}:participants`); // Also delete the participants set
    }
}

module.exports = new RoomModel();