const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const completeLevel = async (req, res) => {
    const { idGame } = req.params;
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { username },
            { $inc: { [`level${idGame}`]: 1 } },
            { new: true }
        ).lean();
        delete updatedUser._id;
        delete updatedUser.password;
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { completeLevel };
