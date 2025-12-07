const mongoose = require('mongoose')
const DateTime = require('luxon')
const dayModel = require('../models/day')
const actionModel = require('../models/action')
const daysController =  require('../controller/daysController')
class Action {
    name;
    type;
    score;
    numOfTimes;
    constructor(name, type, score, numOfTimes){
        this.name = name;
        this.type = type;
        this.score = score;
        this.numOfTimes = numOfTimes;
    }

   getName() {
        return this.name;
    }

   getType() {
        return this.type;
    }

   getScore() {
        return this.score;
    }

   getNumOfTimes() {
        return this.numOfTimes;
    }

   addAction = async () => {
      try {
         const oldDay = daysController.dayExists(req.body.day);

            if (oldDay) {
               const action = actionExists(req.body.name , day._id)
               if (action) {
                  action.numOfTimes += req.body.numOfTimes;
                  action.score +=  ( req.body.score * req.body.numOfTimes)
                  oldDay.score += action.score; 
                  await actionModel.save();
                  await dayModel.save();
                  
               } else {
                  const newDay = daysController.createDay(req.body.day)
                  const newAction  = await actionModel.create({
                     name :req.body.name,
                     type :req.body.type,
                     numOfTimes :req.body.numOfTimes,
                     score : ( req.body.score * req.body.numOfTimes ) ,
                     dayId :day._id,
                  })
                  newDay.score += req.body.score;
                  await dayModel.save();
               }
            }
            else {
            }
      } catch (error) {
         console.log("Couldn't add the new action\nhere's the error :\n🔴 " , error)

      }
}

actionExists = async (actionName , day) => {
   try {
        const action  = await actionModel.findOne({name : actionName , dayId : day }) 
        if (action) {
          console.log("action is already exists");
          return action;
        } else {
          return false;
        }
    } catch (error) {
        console.log("Couldn't check the user's action 🔴 " , error)
    }
}
}
module.exports = Action;