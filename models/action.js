const luxon = require('luxon');
const mongoose = require('mongoose');
const actionSchema = new mongoose.Schema({
 
    name : { 
        type : String,
        required : true
    },
    type: {
        type : String,
        required : true
    },
    score : {
        type : Number,
        required : false
    },
    numOfTimes : {
        type : Number,
        required : true
    },
    dayId : { 
        type : String
    }
})

const actionModel = mongoose.model("actionModel" , actionSchema);
module.exports = Action;