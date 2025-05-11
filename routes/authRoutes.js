const express = require('express');
const authenticateToken = require('../middlewares/auth');
const { signup, login, completeLevel } = require('../controllers/authController');  // Assicurati di avere il percorso giusto

const router = express.Router();

// Rotte di autenticazione
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
