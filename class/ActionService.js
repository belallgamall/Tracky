const mongoose = require('mongoose')
const  DayRepository = require('./DayRepository');
const  ActionRepository = require('./ActionRepository');

class Action {
    constructor(){
      this.dayRepo = new DayRepository();
      this.actionRepo = new ActionRepository();
    }

   async getName(dayDate) {
    try {
        const action = this.actionRepo.findByDay(dayDate);
        return action.name; 
    } catch (error) {
        console.log("❌ Couldn't get the action name , Error : \n",error);
        throw error;
    }
    }

   async getType(dayDate) {
        return this.type;
    }

   async getScore(dayDate) {
        return this.score;
    }

   async getNumOfTimes() {
        return this.numOfTimes;
    }

    async addAction(dayDate, actionData) {
        try {
            // Check if day exists
            const dayCheck = await this.dayExists(dayDate);
            if (!dayCheck) {
                await this.createDay(dayDate);
            }
            else{
                const actionCheck = this.actionExists(dayDate , actionData.name)
                if(!actionCheck){
                    // Create the action
                    const newAction = await this.actionRepo.create({
                        ...actionData,
                        dayID: dayDate
                    });
        
                    // Update day's score and counts
                    await this.updateDayStats(dayDate , newAction);
        
                    console.log("✅ Action added successfully");
                    return newAction;
                }
                else{
                    const oldAction = actionCheck;
                    // Update day's score and counts only without action creation
                    const totalScore = oldAction.score + actionData.score
                    await this.dayRepo.updateScore(dayDate, totalScore);
        
                    console.log("✅ Action updated successfully");
                    return oldAction;
        
                }
            }
        } catch (error) {
            console.log("❌ Couldn't add action. Error:", error.message);
            throw error;
        }
    }
   async actionExists (dayDate, actionName) {
      try {
         const action  = await this.actionRepo.findOneDateAndName(dayDate, actionName) 
         if (action) {
            console.log("action is already exists");
            return action;
         } else {
            return false;
         }
      } catch (error) {
         console.log("🔴 Couldn't check if action exists" , error.message)
         throw error;
         
      }
   }
    async updateDayStats(dayDate) {
        try {
            const actions = await this.actionRepo.findByDay(dayDate);
            
            // Calculate score
            const totalScore = actions.reduce((sum, action) => sum + (action.score || 0), 0);
            
            // Count goods and bads
            const numOfGoods = actions.filter(a => a.type === 'good').length;
            const numOfBads = actions.filter(a => a.type === 'bad').length;

            // Update day
            await this.dayRepo.updateScore(dayDate, totalScore);
            await this.dayRepo.updateCounts(dayDate, numOfGoods, numOfBads);

            console.log("✅ Day stats updated successfully");
        } catch (error) {
            console.log("❌ Couldn't update day stats. Error:", error.message);
            throw error;
        }
    }
}
module.exports = Action;