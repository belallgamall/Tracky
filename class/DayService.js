// ============================================
// SERVICE LAYER - DayService.js
// ============================================

const  DayRepository = require('./DayRepository');
const  ActionRepository = require('./ActionRepository');

class DayService {
    constructor() {
        this.dayRepo = new DayRepository();
        this.actionRepo = new ActionRepository();
    }

    async getDay(dayDate) {
        try {
            const day = await this.dayRepo.findByDate(dayDate);
            if (day) {
                console.log("✅ Day retrieved successfully");
                return day;
            } else {
                console.log("❌ Day doesn't exist");
                return null;
            }
        } catch (error) {
            console.log("❌ Error getting day:", error.message);
            throw error;
        }
    }

    async dayExists(dayDate) {
        try {
            const day = await this.getDay(dayDate);
            return day !== null;
        } catch (error) {
            console.log("🔴 Couldn't check if day exists", error.message);
            throw error;
        }
    }

    async createDay(dayDate) {
        try {
            const exists = await this.dayExists(dayDate);
            
            if (exists) {
                console.log("🔴 Day already exists with this date");
                return null;
            }

            const newDay = await this.dayRepo.create({
                date: dayDate,
                score: 0,
                numOfGoods: 0,
                numOfBads: 0
            });

            console.log("👌 New day created successfully");
            return newDay;
        } catch (error) {
            console.log("🥲 Can't create a new day. Error:", error.message);
            throw error;
        }
    }

    async getActions(dayDate) {
        try {
            const actions = await this.actionRepo.findByDay(dayDate);
            console.log("🟢 Day's actions fetched successfully");
            return actions;
        } catch (error) {
            console.log("🔴 Couldn't fetch the day's actions. Error:", error.message);
            throw error;
        }
    }

    async getScore(dayDate) {
        try {
            const day = await this.dayRepo.findByDate(dayDate);
            if (!day) {
                throw new Error("Day not found");
            }
            else 
            console.log(`✅ Day's score fetched successfully. Score = ${day.score}`);
            return day.score;
        } catch (error) {
            console.log(`❌ Couldn't get the day's score. Error: ${error.message}`);
            throw error;
        }
    }

    async getGoods(dayDate) {
        try {
            const goods = await this.actionRepo.findGoodActions(dayDate);
            console.log("🟢 Day's good actions fetched successfully");
            return goods;
        } catch (error) {
            console.log("🔴 Couldn't fetch good actions. Error:", error.message);
            throw error;
        }
    }

    async getBads(dayDate) {
        try {
            const bads = await this.actionRepo.findBadActions(dayDate);
            console.log("🟢 Day's bad actions fetched successfully");
            return bads;
        } catch (error) {
            console.log("🔴 Couldn't fetch bad actions. Error:", error.message);
            throw error;
        }
    }

    async getNumOfGoods(dayDate) {
        try {
            const day = await this.dayRepo.findByDate(dayDate);
            if (!day) {
                throw new Error("Day not found");
            }
            console.log("🟢 Count of good actions fetched successfully");
            return day.numOfGoods;
        } catch (error) {
            console.log("🔴 Couldn't fetch count of good actions. Error:", error.message);
            throw error;
        }
    }

    async getNumOfBads(dayDate) {
        try {
            const day = await this.dayRepo.findByDate(dayDate);
            if (!day) {
                throw new Error("Day not found");
            }
            console.log("🟢 Count of bad actions fetched successfully");
            return day.numOfBads;
        } catch (error) {
            console.log("🔴 Couldn't fetch count of bad actions. Error:", error.message);
            throw error;
        }
    }

}

module.exports = DayService;