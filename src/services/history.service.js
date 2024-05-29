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

const saveFeedBack = async (user, image, text) => {
    try {
        const result = await db.Feedback.create({
            content: text,
            img_url: image,
            user_id: user
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

const createNewUser = (user) => {
    try {
        const newUser = db.Student.create({
            MSV: user.username,
            Ten: user.name,
            Lop: "123",
            Email: user.email,
            TaiKhoan: "123",
            MatKhau: user.password,
            ThoiGian: "2021-06-01",
            Sdt: user.phone
        });
        return newUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const checkEmail = async (email) => {
    const data = await db.Student.findAll({
        where: {
            email: email
        }
    });

    if (data.length > 0) {
        return false
    }
    return true
}

const checkAccount = async (username) => {
    const data = await db.Student.findAll({
        where: {
            MSV: username
        }
    });

    if (data.length > 0) {
        return false
    }
    return true
}

module.exports = {
    getDetectionHistory, insertHistory, saveFeedBack, createNewUser, checkEmail, checkAccount
}