const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const { addCoins, subtractCoins } = require('../controllers/profilesController');

router.post('/add-coins/:userId/:coinsToAdd', addCoins);
router.post('/subtract-coins/:userId/:coinsToRemove', subtractCoins);

module.exports = router;