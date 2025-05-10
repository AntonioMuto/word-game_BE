const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { fetchAnagram, saveNewLevel } = require('../controllers/anagramsController');

router.get('/level/:id', authenticateToken, fetchAnagram);
router.post('/save-new-level', authenticateToken, saveNewLevel);

module.exports = router;