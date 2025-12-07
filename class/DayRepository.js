// ============================================
// DATA ACCESS LAYER (DAL) - DayRepository.js
// ============================================

const mongoose = require('mongoose')
const dayModel = require('../models/day');

class DayRepository {
    async findByDate(dayDate) {
        return await dayModel.findOne({ dayID: dayDate });
    }

    async create(dayData) {
        return await dayModel.create(dayData);
    }

    async updateScore(dayDate, newScore) {
        return await dayModel.findOneAndUpdate(
            { dayID: dayDate },
            { score: newScore },
            { new: true }
        );
    }

    async updateCounts(dayDate, numOfGoods, numOfBads) {
        return await dayModel.findOneAndUpdate(
            { dayID: dayDate },
            { numOfGoods, numOfBads },
            { new: true }
        );
    }
}
module.exports = DayRepository;