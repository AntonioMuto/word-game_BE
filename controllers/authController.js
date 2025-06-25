const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getNextSequenceValue } = require('../utils/sequenceUtil');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                userAlredyTaken: true,
                error: 'Username already taken'
            });
        }
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                emailAlredyTaken: true,
                error: 'Email already taken'
            });
        }

        const nextId = await getNextSequenceValue('userId');
        const hashedPassword = await bcrypt.hash(password, 11);
        const newUser = new User({
            id: nextId,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }
};

// Funzione per gestire il login
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                userNotFound: true,
                error: 'Username non trovato'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                wrongPassword: true,
                error: 'Password errata'
            });
        }

        const accessToken = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
            accessToken, 
            username, 
            coins: user.coins, 
            userId: user.id, 
            levelCrossWord: user.levelCrossWord,
            levelAnagram: user.levelAnagram,
            levelFindWord: user.levelFindWord, 
            levelSearchWord: user.levelSearchWord, 
            levelSudoku: user.levelSudoku 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Something went wrong'
        });
    }
};

module.exports = { signup, login };
