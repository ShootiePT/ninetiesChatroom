const debatesModel = require('../models/debatesModel');

class DebatesService {
    async createDebate(topic, scoreAward) {
        return debatesModel.createDebate(topic, scoreAward);
    }

    async listDebates() {
        return debatesModel.getAllDebates();
    }

    async findDebate(debateId) {
        return debatesModel.getDebateById(debateId);
    }
}

module.exports = new DebatesService();