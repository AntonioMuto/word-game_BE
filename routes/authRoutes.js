const express = require('express');
const { signup, login } = require('../controllers/authController');  // Assicurati di avere il percorso giusto
const router = express.Router();

// Rotte di autenticazione
router.post('/signup', signup);  // Funzione signup dal controller
router.post('/login', login);    // Funzione login dal controller

module.exports = router;
