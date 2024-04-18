const { raw } = require("mysql2");
const connection = require("../config/database.config");
const db = require("../models/index");
const { sequelize } = require('../config/connectDB')
const { createNewQuestion } = require("./question.service")

const getAllTest = async () => {
    var data = { status: null, data: null };
    try {
        const tests = await db.Test.findAll();

        if (tests.length > 0) {
            data.status = 200
            data.data = tests
        }
        else {
            data.status = 404
        }
        return data
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const getTestById = async (id) => {
    try {
        const tests = await db.Test.findAll(
            { where: { MaBaiThi: id } }
        );
        if (tests.length > 0) {
            data.status = 200
            data.data = tests
        }
        else {
            data.status = 404
        }
        return data
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const createNewTest = async (test, questionList) => {
    try {
        t = await sequelize.transaction();
        var mbt = 'BT07'
        await db.Test.create(
            {
                MaBaiThi: mbt,
                TenBaithi: test.examName,
                ThoiGianBatDau: test.examDateTime,
                ThoiGianThi: parseInt(test.examTime),
                SoLuongCau: parseInt(questionList.length),
                TheLoai: 'Trắc nghiệm',
                TrangThai: 'Đóng'

            },
            { transaction: t }
        )

        for (var i = 0; i < questionList.length; i++) {
            await createNewQuestion(questionList[i], mbt, i + 1, t);
        }
        await t.commit();
        return true
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        await t.rollback();
        return false
    }
}


module.exports = { getAllTest, getTestById, createNewTest }