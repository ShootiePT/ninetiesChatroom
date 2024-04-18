const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserService {
    async registerUser(username, password) {
        return userModel.createUser(username, password);
    }

    async authenticateUser(username, password) {
        const user = await userModel.getUserByUsername(username);
        if (!user) return false;
        const match = await bcrypt.compare(password, user.password);
        return match ? user : false;
    }

    async getUserById(id){
        const user = await userModel.getUserById(id);
        return user || false;
    }

    async incrementUserScore(userId, topicScore) {
        return userModel.incrementUserScore(userId, topicScore);
    }
}

module.exports = new UserService();