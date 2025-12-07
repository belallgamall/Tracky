const mongoose = require('mongoose')
const DateTime = require('luxon')
const dayModel = require('../models/day')
const actionModel = require('../models/action')     
class Day {
    date; 
    score;
    actions = [];
    goods = []; // points on good things from actions
    bads = []; // points on bad things from actions
    numOfGoods;
    numOfBads;
    constructor(date, actionName, actionType, actionScore, happeningTimes) {
        let dayAction = new action(actionName, actionType, actionScore, happeningTimes) 
        this.date = date;
        this.score = 0;
        this.numOfGoods = 0;
        this.numOfBads = 0;
        this.addAction(dayAction);

    }
    async getDay(dayDate){
        try {
            const day = await findOne(dayModel.findOne({dayID :dayDate }));
            if (day) {
                console.log(" from getDay() , mission passed we got the day successfuly 🦾");
                return day;
            } else {
                
                console.log(" from getDay() , mission faild the day doesn't exist ❌")
            }
        } catch (error) {
            console.log(" from getDay() , mission faild because of an error ❌ \nhere's the error: \n", error)
        }
        
    }
    async getActions(dayDate){
        try {
            this.actions = await actionModel.find({dayID :dayDate });
            console.log("The Day's actions fetched successfuly 🟢") 
        } catch (error) {
            console.log("Couldn't fetched the required day's action 🔴\nand here's the Error : \n") 
            
        }
        return this.actions;
    }
    async getScore(dayDate){
        try {
            // i eant not to call get day to save ore eory and instead i just called the score property of the day
            const {dayScore} =  await dayModel.findOne({dayID :dayDate } , {score : 1});
            this.score = dayScore;
            console.log(`Day's score feteched successfuly , This day score = ${this.score}`)
        } catch (error) {
            console.log(`Unfortunately we couldn't get you the day's score , here's the error = ${error}`)
            
        }
        return this.score
    }
    async getGoods(dayDate){
        try {
            this.goods = await actionModel.find({dayID :dayDate , type : "good" });
            console.log("The Day's good actions fetched successfuly 🟢") 
        } catch (error) {
            console.log("Couldn't fetch the required day's good actions 🔴\nand here's the Error : \n") 
            
        }
        return this.goods;
    }
    async getBads(dayDate){
        try {
            this.bads = await actionModel.find({dayID :dayDate , type : "bad" });
            console.log("The Day's bad actions fetched successfuly 🟢") 
        } catch (error) {
            console.log("Couldn't fetched the required day's bad actions 🔴\nand here's the Error : \n") 
            
        }
        return this.bads;
    }
    async getNumOfGoods(dayDate){
        try {
            const {dayGoods} =  await dayModel.findOne({dayID :dayDate } , {numOfGoods : 1});
            this.numOfGoods = dayGoods;
            console.log("The Day's count of good actions fetched successfuly 🟢") 
        } catch (error) {
            console.log("Couldn't fetched the required day's count of good actions 🔴\nand here's the Error : \n") 
            
        }
        return this.numOfGoods
    }
    async getNumOfBads(dayDate){
        try {
            const {dayBads} =  await dayModel.findOne({dayID :dayDate } , {numOfBads : 1});
            this.numOfBads = dayBads;
            console.log("The Day's count of bad actions fetched successfuly 🟢") 
        } catch (error) {
            console.log("Couldn't fetched the required day's count of bad actions 🔴\nand here's the Error : \n") 
            
        }
        return this.numOfBads;
    }

    async dayExists(dayDate){
    try {
        const oldDay  = this.getDay(dayDate); 
        if (day) {
                console.log("Day is already exists");
                return oldDay;
        } 
        else {
            return false;
        }
    } 
    catch (error) {

        console.log("Couldn't check the user's date 🔴 " , error)
    }
    }
    async createDay(dayDate){
        const checkDay = this.dayExists(dayDate);
        if (checkDay) {
            console.log("Couldn't create a new day with this date cause it's already made 🔴")
            return false; 
        } else {
            try {
                await dayModel.create({
                     date : dayDate,
                     score : 0
                })
                const newDay  = this.dayExists(dayDate);
                console.log("A new day created successfuly 👌")
                return newDay;
            } catch (error) {
               console.log("Oops, Can't create a new day 🥲\nHere's the error : \n", error)
            }
        }
      }

    }
    module.exports = Day;


