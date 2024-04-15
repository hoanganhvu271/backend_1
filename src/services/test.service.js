
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
        data.status = 500
        return data
    }
}

const getTestById = async (id) => {
    var data = { status: null, data: null };
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
        data.status = 500
        return data;
    }
}

const createNewTest = async (test, questionList) => {
    let t;
    try {
        t = await sequelize.transaction();
        await db.Test.create(
            {
                MaBaiThi: 'BT10',
                TenBaithi: test.examName,
                ThoiGianBatDau: test.examDateTime,
                ThoiGianThi: parseInt(test.examTime),
                SoLuongCau: parseInt(test.numQuestions),
                TheLoai: 'Trắc nghiệm',
                TrangThai: 'Mở'

            },
            { transaction: t }
        )

        for (var i = 0; i < questionList.length; i++) {
            await createNewQuestion(questionList[i], 'BT10', i + 1, t);
        }
        await t.commit();
        return true
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        await t.rollback();
        return false
    }
}


const deleteTestById = async (testId) => {
    try {
        db.Test.destroy({
            where: {
                MaBaiThi: testId
            }
        })
        return true;
    }
    catch (e) {
        return false;
    }
}

module.exports = { getAllTest, getTestById, createNewTest, deleteTestById }