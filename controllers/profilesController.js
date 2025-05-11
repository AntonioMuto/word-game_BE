const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const addCoins = async (req, res) => {
    const { coinsToAdd, userId } = req.params;

    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            { $inc: { coins: coinsToAdd } },
            { new: true }
        ).lean();
        delete updatedUser._id;
        delete updatedUser.password;
        res.json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const subtractCoins = async (req, res) => {
    const { coinsToRemove, userId } = req.params;

    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            { $inc: { coins: -coinsToRemove } },
            { new: true }
        ).lean();
        delete updatedUser._id;
        delete updatedUser.password;
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { addCoins, subtractCoins };
