
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
        var mbt = 'BT07'
        await db.Test.create(
            {
                MaBaiThi: mbt,
                TenBaithi: test.examName,
                ThoiGianBatDau: test.examDateTime,
                ThoiGianThi: parseInt(test.examTime),
                SoLuongCau: parseInt(test.numQuestions),
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

const updateTestById = async (id, updateData) => {
    var t
    try {
        const result = sequelize.transaction(async () => {
            var test = await db.Test.findByPk(id)
            metadata = updateData.metadata
            data = updateData.data

            test.TenBaithi = metadata.examName,
                test.ThoiGianBatDau = metadata.examDateTime,
                test.ThoiGianThi = parseInt(metadata.examTime),
                test.SoLuongCau = parseInt(metadata.numQuestions)

            test.save()

            var len = data.length
            for (var i = 1; i <= len; i++) {
                var questionId = 'C' + String(i).padStart(2, '0')
                var question = await db.Question.findOne({
                    where: {
                        MaBaiThi: test.MaBaiThi,
                        MaCauHoi: questionId
                    }
                })
                if (question) {
                    //update
                }
                else {
                    //create
                }
            }
        })
        if (result) {
            return true
        }

    }
    catch (e) {
        return false;
    }
}

module.exports = { getAllTest, getTestById, createNewTest, deleteTestById, updateTestById }