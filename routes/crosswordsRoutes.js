const express = require('express');
const router = express.Router();
const { fetchCrossword, saveNewLevel } = require('../controllers/crosswordsController');

router.get('/level/:id', fetchCrossword);
router.post('/save-new-level', saveNewLevel);
// router.post('/complete-level/:id');

module.exports = router;