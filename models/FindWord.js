const mongoose = require('mongoose');

const FindWordSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    solution: { type: [String], required: false }
}, { versionKey: false });

module.exports = mongoose.model('FindWord', FindWordSchema);
