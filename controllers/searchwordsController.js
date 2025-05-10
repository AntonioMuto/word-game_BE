const { getNextSequenceValue } = require('../utils/sequenceUtil');
const SearchWords = require('../models/SearchWords');

const fetchSearchWord = async (req, res) => {
    const levelId = req.params.id;
    try {
        const levelData = await SearchWords.findOne({ id: levelId }).lean();
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
        const nextId = await getNextSequenceValue('searchWordId');
        const newLevel = new SearchWords({ 
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

module.exports = { fetchSearchWord, saveNewLevel};