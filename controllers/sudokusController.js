const { getNextSequenceValue } = require('../utils/sequenceUtil');
const Sudoku = require('../models/Sudoku');

const fetchSudoku = async (req, res) => {
    const levelId = req.params.id;
    try {
        const levelData = await Sudoku.findOne({ id: levelId }).lean();
        if (!levelData) {
            return res.status(400).json({ error: 'Level not found' });
        }
        delete levelData._id;
        res.json(levelData);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const saveNewLevel = async (req, res) => {
    try {
        const nextId = await getNextSequenceValue('sudokuId');
        const newLevel = new Sudoku({ 
            id: nextId,
            solution: req.body.solution,
            initialData: req.body.initialData
        });
        await newLevel.save();
        res.status(201).json({ message: 'Level saved successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

module.exports = { fetchSudoku, saveNewLevel};