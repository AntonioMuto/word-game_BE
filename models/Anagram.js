const mongoose = require('mongoose');

const AnagramSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    anagramList: { type: [String], required: true },
    correctWords: { type: [String], required: false }
}, { versionKey: false });

module.exports = mongoose.model('Anagram', AnagramSchema);
