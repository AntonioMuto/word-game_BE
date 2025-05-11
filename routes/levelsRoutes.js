const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { completeLevel } = require('../controllers/levelsController');

router.post('/complete-level/:userId/:idGame/:idLevel', completeLevel);

module.exports = router;