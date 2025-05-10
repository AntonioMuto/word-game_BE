const { getNextSequenceValue } = require('../utils/sequenceUtil');
const CrossWord = require('../models/Crosswords');

const fetchCrossword = async (req, res) => {
    const levelId = req.params.id;
    try {
        const levelData = await CrossWord.findOne({ id: levelId }).lean();
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
        const nextId = await getNextSequenceValue('crosswordId');
        const newLevel = new CrossWord({ 
            id: nextId,
            sizeMapX: req.body.sizeMapX,
            sizeMapY: req.body.sizeMapY,
            map: req.body.map
        });
        await newLevel.save();
        res.status(201).json({ message: 'Level saved successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

module.exports = { fetchCrossword, saveNewLevel};