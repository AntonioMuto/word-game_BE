const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const completeLevel = async (req, res) => {
    const { idGame, userId } = req.params;

    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({
                userAlredyTaken: true,
                message: 'Username non trovato'
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            { $inc: { [`level${idGame}`]: 1 } },
            { new: true }
        ).lean();

        updatedUser.userId = updatedUser.id;

        delete updatedUser._id;
        delete updatedUser.password;
        delete updatedUser.id;
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { completeLevel };
