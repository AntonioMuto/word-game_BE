const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    coins: { type: Number, required: false, default: 0 },
    levelCrossWord: { type: Number, required: false, default: 1 },
    levelAnagram: { type: Number, required: false, default: 1 },
    levelFindWord: { type: Number, required: false, default: 1 },
    levelSearchWord: { type: Number, required: false, default: 1 },
    levelSudoku: { type: Number, required: false, default: 1 }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);
