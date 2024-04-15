const { raw } = require("mysql2");
const db = require("../models/index");

const getAllStudent = async () => {
    var data = { status: null, data: null };
    try {
        const students = await db.Student.findAll({
            raw: true
        });
        if (students.length > 0) {
            data.status = 200
            data.data = students
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

const getStudentById = async (id) => {
    var data = { status: null, data: null };
    try {
        const students = await db.Student.findAll(
            { where: { MSV: id } }
        );
        if (students.length > 0) {
            data.status = 200
            data.data = students
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

const createNewStudent = async (student) => {
    try {
        studentData = await db.Student.findAll({
            where: { MSV: student.msv }
        })

        if (studentData.length > 0) {
            return -1
        }
        await db.Student.create(
            {
                MSV: student.msv,
                Ten: student.name,
                Lop: student.class,
                Email: student.email,
                TaiKhoan: student.account,
                MatKhau: student.password

            }
        )
        return 1
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return 0
    }
}

const deleteStudentById = async (id) => {
    try {
        await db.Student.destroy({
            where: {
                MSV: id
            }
        })
        return true
    } catch (error) {
        return false
    }
}

module.exports = { getAllStudent, getStudentById, createNewStudent, deleteStudentById }