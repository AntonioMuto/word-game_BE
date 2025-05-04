const Counter = require('../models/Counter'); // Importa il modello del contatore

// Funzione per ottenere il prossimo valore sequenziale
const getNextSequenceValue = async (sequenceName) => {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName }, 
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value;
};

module.exports = { getNextSequenceValue };