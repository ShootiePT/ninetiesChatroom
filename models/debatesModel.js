const { pool } = require('../config/dbConfig'); // Ensure your DB config file correctly sets up the pool

class DebatesModel {
    async createDebate(topic, scoreAward) {
        const result = await pool.query(
            'INSERT INTO Debates (topic, score_award) VALUES ($1, $2) RETURNING *',
            [topic, scoreAward]
        );
        return result.rows[0];
    }

    async getAllDebates() {
        const result = await pool.query('SELECT * FROM Debates');
        return result.rows;
    }

    async getDebateById(debateId) {
        const result = await pool.query('SELECT * FROM Debates WHERE debate_id = $1', [debateId]);
        return result.rows[0];
    }
}

module.exports = new DebatesModel();