const mongoose = require('mongoose');

const SudokuSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    solution: { type: [[String]], required: false },
    initialData: { type: [[String]], required: false }
}, { versionKey: false });

module.exports = mongoose.model('Sudoku', SudokuSchema);
