const express = require('express');
const router = express.Router();
const { getProblemTitles } = require('../controllers/problemTitlesController');

router.get('/', getProblemTitles);

module.exports = router; 