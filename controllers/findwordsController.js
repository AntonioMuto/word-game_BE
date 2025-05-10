const { getNextSequenceValue } = require('../utils/sequenceUtil');
const FindWord = require('../models/FindWord');

const fetchFindWord = async (req, res) => {
    const levelId = req.params.id;
    try {
        const levelData = await FindWord.findOne({ id: levelId }).lean();
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
        const nextId = await getNextSequenceValue('findWordId');
        const newLevel = new FindWord({ 
            id: nextId,
            solution: req.body.solution
        });
        await newLevel.save();
        res.status(201).json({ message: 'Level saved successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

module.exports = { fetchFindWord, saveNewLevel};