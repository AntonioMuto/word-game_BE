const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, 
    sequence_value: { type: Number, default: 0 } 
}, { versionKey: false });

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
