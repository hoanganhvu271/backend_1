const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");
const bcrypt = require("bcrypt")
const saltRounds = 10
const getAllStudent = async () => {
  var data = { status: null, data: null };

  try {
    const students = await db.Student.findAll({
      raw: true,
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};

const getAllStudentPerPage = async (page) => {
  var data = { status: null, data: null };
  try {
    const students = await db.Student.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      raw: true
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {

    data.status = 500;
    return data;
  }

}

const getStudentById = async (id) => {
  var data = { status: null, data: null };
  try {
    const students = await db.Student.findAll({
      raw: true,
      where: { MSV: id },
    });
    if (students.length > 0) {
      data.status = 200;
      data.data = students;
    } else {
      data.status = 404;
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    data.status = 500;
    return data;
  }
};

const createNewStudent = async (student) => {

  try {
    studentData = await db.Student.findAll({
      where: { MSV: student.msv },
    });

    if (studentData.length > 0) {
      return -1;
    }
    var hashpassword = await bcrypt.hash(student.password, saltRounds);
    await db.Student.create({
      MSV: student.msv,
      Ten: student.name,
      Lop: student.class,
      Email: student.email,
      TaiKhoan: student.account,
      MatKhau: hashpassword,
    });
    return 1;
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    return 0;
  }
};

const deleteStudentById = async (id) => {
  try {
    await db.Student.destroy({
      where: {
        MSV: id,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

const updateStudentById = async (id, data) => {
  var student = await db.Student.findByPk(id);
  var existStudent = await db.Student.findByPk(data.msv);
  // console.log(existStudent)
  if (existStudent) {
    return -1;
  }
  try {
    student.Ten = data.name;
    student.Lop = data.class;
    student.Email = data.email;
    student.TaiKhoan = data.account;
    student.MatKhau = data.password;

    console.log(student.MSV);
    student.save();
    console.log(student.MSV);

    return 1;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const getStudentCondition = async (condition, keyword) => {
  const data = { status: null, data: null };
  switch (condition) {
    case "id": {
      try {
        const students = await db.Student.findAll({
          raw: true,
          where: {
            MSV: {
              [Op.like]: `%${keyword}%`,
            },
          },
        });
        if (students.length > 0) {
          data.status = 200;
          data.data = students;
        } else {
          data.status = 404;
        }
        return data;
      } catch (e) {
        console.log(e);
        data.status = 500;
        return data;
      }
      break;
    }
    case "name": {
      console.log("name");
      try {
        const students = await db.Student.findAll({
          raw: true,
          where: {
            Ten: {
              [Op.like]: `%${keyword}%`,
            },
          },
        });
        if (students.length > 0) {
          data.status = 200;
          data.data = students;
          return data;
        } else {
          data.status = 404;
          return data;
        }
      } catch (e) {
        console.log(e);
        data.status = 500;
        return data;
      }
    }
  }
};

module.exports = {
  getAllStudent,
  getStudentById,
  createNewStudent,
  deleteStudentById,
  updateStudentById,
  getStudentCondition,
  getAllStudentPerPage
};
