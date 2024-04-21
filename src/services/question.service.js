
const db = require("../models/index");

const getAllQuestion = async () => {
    try {
        const questions = await db.Question.findAll();
        return questions;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const getQuestionOfTest = async (id) => {
    try {
        const questions = await db.Question.findAll(
            {
                where: {
                    MaBaiThi: id
                },
                raw: true
            }
        );
        const allOptions = await db.Option.findAll();
        for (var question of questions) {
            question.LuaChon = await allOptions.filter(option => option.MaBaiThi === question.MaBaiThi && option.MaCauHoi === question.MaCauHoi);
        }
        return questions;

    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}

const getQuestionOfTestUser = async (id) => {
    try {
        const questions = await db.Question.findAll(
            {
                where: {
                    MaBaiThi: id
                },
                raw: true
            }
        );
        const allOptions = await db.Option.findAll(
            {
                attributes: { exclude: ['Dung'] }
            }
        );
        for (var question of questions) {
            question.LuaChon = await allOptions.filter(option => option.MaBaiThi === question.MaBaiThi && option.MaCauHoi === question.MaCauHoi);
        }
        return questions;

    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return null;
    }
}



module.exports = { getAllQuestion, getQuestionOfTest, getQuestionOfTestUser }