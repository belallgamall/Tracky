const { DateTime, Duration } = require('luxon');
const action  = require('../class/ActionService')
const mongoose = require('mongoose');
const daySchema = new mongoose.Schema({

    date: Date,
    score : Number,
    numOfGoods : Number,
    numOfGoodsBads : Number,


})
const dayModel = mongoose.model( "dayModel", daySchema);
module.exports = Day;