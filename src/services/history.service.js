const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const { default: Transaction } = require("sequelize/lib/transaction");

const getDetectionHistory = async (id) => {
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

module.exports = {
    getDetectionHistory
}