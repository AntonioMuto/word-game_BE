const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { fetchSudoku, saveNewLevel } = require('../controllers/sudokusController');

router.get('/level/:id', authenticateToken, fetchSudoku);
router.post('/save-new-level', authenticateToken, saveNewLevel);
// router.post('/complete-level/:id');

module.exports = router;