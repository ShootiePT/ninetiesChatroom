const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body.username, req.body.password);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.authenticateUser(username, password);
        if (user) {
            res.json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.incrementScore = async (req, res) => {
    try {
        const user = await userService.incrementUserScore(req.body.userId, req.body.topicScore);
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};