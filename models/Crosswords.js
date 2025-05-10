const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
    type: { type: String, required: true },
    rif: { type: String },               
    questionX: { type: String },         
    questionY: { type: String },         
    answer: { type: String }             
}, { _id: false }); 

const CrosswordsSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    sizeMapX: { type: Number, required: true },
    sizeMapY: { type: Number, required: true },
    map: [[CellSchema]] 
}, { versionKey: false });

module.exports = mongoose.model('Crosswords', CrosswordsSchema);
