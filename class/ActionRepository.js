// ============================================
// DATA ACCESS LAYER (DAL) - ActionRepository.js
// ============================================

const mongoose = require('mongoose')
const actionModel = require('../models/action');

class ActionRepository {
    async findByDay(dayDate) {
        return await actionModel.find({ dayID: dayDate });
    }
    
    async findOneDateAndName(dayDate , actionName) {
        return await actionModel.findone({ dayID: dayDate , name: actionName  });
    }

    async findOneByName(actionName) {
        return await actionModel.findone({ name: actionName });
    }
    
    async findByName(actionName) {
        return await actionModel.find({ name: actionName });
    }
    
    async findGoodActions(dayDate) {
        return await actionModel.find({ dayID: dayDate, type: "good" });
    }

    async findBadActions(dayDate) {
        return await actionModel.find({ dayID: dayDate, type: "bad" });
    }

    async create(actionData) {
        return await actionModel.create(actionData);
    }

    async countByType(dayDate, type) {
        return await actionModel.countDocuments({ dayID: dayDate, type });
    }
}
module.exports = ActionRepository;