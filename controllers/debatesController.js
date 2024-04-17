const debatesService = require('../services/debatesService');

exports.createDebate = async (req, res) => {
    try {
        const { topic, scoreAward } = req.body;
        const debate = await debatesService.createDebate(topic, scoreAward);
        res.status(201).json(debate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listDebates = async (req, res) => {
    try {
        const debates = await debatesService.listDebates();
        res.json(debates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDebate = async (req, res) => {
    try {
        const { id } = req.params;
        const debate = await debatesService.findDebate(id);
        if (debate) {
            res.json(debate);
        } else {
            res.status(404).json({ message: "Debate not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};