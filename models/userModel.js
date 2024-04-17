const { pool } = require('../config/dbConfig'); // Assume dbConfig setups up and exports your PostgreSQL connection
const bcrypt = require('bcrypt');

class UserModel {
    async createUser(username, password) {
        const hashedPassword = await this.hashPassword(password);
        const result = await pool.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        return result.rows[0];
    }

    async getUserByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE name = $1', [username]);
        return result.rows[0]; // Returns undefined if no user is found
    }

    async incrementUserScore(userId, topicScore){
        const result = await pool.query('UPDATE users SET score = score + $2 WHERE user_id = $1 RETURNING score', [userId, topicScore]);
        if (result.rowCount > 0) {
            return `Update successful, new score: ${result.rows[0].score}`;
        } else {
            return "User not found or score unchanged"; // More specific message
        }
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}

module.exports = new UserModel();
