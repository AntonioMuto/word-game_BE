const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { fetchCrossword, saveNewLevel } = require('../controllers/crosswordsController');

router.get('/level/:id', authenticateToken, fetchCrossword);
router.post('/save-new-level', authenticateToken, saveNewLevel);
// router.post('/complete-level/:id');

module.exports = router;