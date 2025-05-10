const { getNextSequenceValue } = require('../utils/sequenceUtil');
const Anagram = require('../models/Anagram');

const fetchAnagram = async (req, res) => {
    const levelId = req.params.id;
    try {
        const levelData = await Anagram.findOne({ id: levelId }).lean();
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
        const nextId = await getNextSequenceValue('anagramId');
        const newLevel = new Anagram({ 
            id: nextId,
            anagramList: req.body.anagramList,
            correctWords: req.body.correctWords,
            map: req.body.map
        });
        await newLevel.save();
        res.status(201).json({ message: 'Level saved successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

module.exports = { fetchAnagram, saveNewLevel};