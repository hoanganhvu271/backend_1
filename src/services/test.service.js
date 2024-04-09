const { raw } = require("mysql2");
const connection = require("../config/database.config");
const db = require("../models/index");

const getAllTest = async () => {
    try {
        const tests = await db.Test.findAll();
        return tests;
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
        return tests;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const createNewTest = async (test, questionList) => {
    try {
        await db.Test.create(
            {
                MaBaiThi: 'BT06',
                TenBaithi: test.examName,
                ThoiGianBatDau: test.examDateTime,
                ThoiGianThi: parseInt(test.examTime),
                SoLuongCau: parseInt(test.numQuestions),
                TheLoai: 'Trắc nghiệm',
                TrangThai: 'Mở'
            }
        )
        return true
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return false
    }
}


module.exports = { getAllTest, getTestById, createNewTest }