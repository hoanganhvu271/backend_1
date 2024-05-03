// const studentController = require("../../student.controllers");
const studentServices = require("../../services/student.service");
const paginationHelper = require("../../helpers/paginationHelper");
const { Op } = require("sequelize");

module.exports.student = async (req, res) => {
    const find = {};
    const lop = req.query.class;
    if (lop) {
        find.Lop = lop;
    }
    if (req.query.keyword) {
        const regexExpression = new RegExp(req.query.keyword, "i").source;
        find[Op.or] = [
            { Ten: { [Op.regexp]: regexExpression } },
            { MSV: { [Op.regexp]: regexExpression } },
        ];
    }
    const count = await studentServices.getCountStudentWithFindObject(find);
    const pagination = paginationHelper(
        {
            currentPage: 1,
            limitedItem: 5,
        },
        req.query,
        count.data.length
    );
    const studentList = await studentServices.getStudentWithFindObject(
        find,
        pagination
    );
    res.render("admin/pages/viewAccount/accountList.pug", {
        titlePage: "Kết quả sinh viên",
        className: lop || "Tất cả",
        students: studentList.data,
        pagination: pagination,
        keyword: req.query.keyword || "",
    });
};



