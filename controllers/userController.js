const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body.username, req.body.password);
        req.session.userId = user.id;
        res.json({ message: "Registration successful", user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.authenticateUser(username, password);
        if (user) {
            console.log(req.session);
            req.session.userId = user.user_id;
            console.log(req.session);
            res.json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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

exports.logout = async (req, res) => {
    console.log(req.session);
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
    console.log(req.session);
};