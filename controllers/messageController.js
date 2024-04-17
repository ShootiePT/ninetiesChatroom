const messageService = require('../services/messageService');

exports.postMessage = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { userId, messageText } = req.body;
        await messageService.addMessage(roomId, userId, messageText);
        res.status(201).send("Message added successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await messageService.fetchMessages(roomId);
        res.json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        await messageService.deleteMessages(roomId);
        res.send("Messages deleted successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};