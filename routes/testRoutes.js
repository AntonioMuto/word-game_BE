const express = require('express');
const { protected } = require('../controllers/testController');  // Assicurati di avere il percorso giusto
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Rotte di autenticazione
router.get('/protected', authenticateToken, protected);

module.exports = router;