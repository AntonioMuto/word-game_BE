const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { fetchSearchWord, saveNewLevel } = require('../controllers/searchwordsController');

router.get('/level/:id', authenticateToken, fetchSearchWord);
router.post('/save-new-level', authenticateToken, saveNewLevel);
// router.post('/complete-level/:id');

module.exports = router;