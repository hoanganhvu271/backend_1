const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const { default: Transaction } = require("sequelize/lib/transaction");

const getDetectionHistory = async (id) => {

    console.log(id);
    try {
        const data = await db.DetectionHistory.findAll({
            raw: true,
            where: {
                UserId: id,
            },

        });

        return data;
    }
    catch (err) {
        console.log(err);
        return null
    }
}

const insertHistory = async (data) => {
    console.log(data);
    try {
        const result = await db.DetectionHistory.create({
            SignId: data.SignId,
            Time: data.Time,
            UserId: data.UserId,
            Longitude: data.Longitude,
            Latitude: data.Latitude
        });
        if (result === null) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }

}

module.exports = {
    getDetectionHistory, insertHistory
}