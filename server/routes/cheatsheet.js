const express = require('express');
const router = express.Router();
const cheatsheetController = require('../controllers/cheatsheetController');

router.get('/', cheatsheetController.getCheatsheet);

module.exports = router; 