const express = require('express');
const router = express.Router();
const debatesController = require('../controllers/debatesController');

router.post('/', debatesController.createDebate);
router.get('/', debatesController.listDebates);
router.get('/:id', debatesController.getDebate);

module.exports = router;