const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { fetchFindWord, saveNewLevel } = require('../controllers/findwordsController');

router.get('/level/:id', authenticateToken, fetchFindWord);
router.post('/save-new-level', authenticateToken, saveNewLevel);
// router.post('/complete-level/:id');

module.exports = router;