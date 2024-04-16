
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

const updateTestById = async (testId, updateData) => {
    var t
    try {
        t = await sequelize.transaction()
        var test = await db.Test.findOne({
            where: { MaBaiThi: testId },
            transaction: t
        })
        // console.log(updateData)
        metadata = updateData.metadata
        data = updateData.data
        // console.log(metadata)

        test.TenBaithi = metadata.examName
        test.ThoiGianBatDau = metadata.examDateTime
        test.ThoiGianThi = parseInt(metadata.examTime)
        test.SoLuongCau = parseInt(data.length)

        await test.save({ transaction: t })

        var len = data.length

        for (var i = 0; i < len; i++) {

            var questionId = 'C' + String(i + 1).padStart(2, '0')
            var question = await db.Question.findOne({
                where: {
                    MaBaiThi: testId,
                    MaCauHoi: questionId
                },
                transaction: t

            },)
            if (question) {
                //update
                question.DeBai = data[i].questionContent
                question.SoThuTu = i + 1
                await question.save({ transaction: t })
                for (var j = 1; j <= 4; j++) {
                    var answerProperty = 'answer' + j
                    var answerId = String.fromCharCode('A'.charCodeAt(0) + j - 1)

                    var answer = await db.Option.findOne({
                        where: {
                            MaCauHoi: questionId,
                            MaLuaChon: answerId,
                            MaBaiThi: testId,
                        },
                        transaction: t
                    })

                    // console.log(data[i][answerProperty])

                    answer.NoiDung = data[i][answerProperty]
                    await answer.save({ transaction: t })
                }
            }
            else {
                //create
                await createNewQuestion(data[i], testId, i + 1, t);
            }
        }
        for (var i = len; i < test.SoLuongCau; i++) {
            var questionId = 'C' + String(i + 1).padStart(2, '0')
            var question = await db.Question.destroy({
                where: {
                    MaBaiThi: testId,
                    MaCauHoi: questionId
                },
                transaction: t

            },)


        }
        await t.commit();
        return true;

    }
    catch (e) {
        console.log(e);
        await t.rollback();
        return false;
    }
}

module.exports = { getAllTest, getTestById, createNewTest, deleteTestById, updateTestById }