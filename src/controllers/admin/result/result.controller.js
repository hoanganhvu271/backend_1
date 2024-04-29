const studentController = require("../../student.controllers");
const studentServices = require("../../../services/student.service");
const testServices = require("../../../services/test.service");
const resultServices = require("../../../services/result.services");
const resultController = require("../../result.controllers");
// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/viewResult/index.pug", {
    titlePage: "Thông tin cá nhân",
  });
};
// [GET] /admin/my-account
module.exports.student = async (req, res) => {
  const studentList = await studentController.getAllStudent();
  res.render("admin/pages/viewResult/student.pug", {
    titlePage: "Kết quả sinh viên",
    studentList: studentList.data,
  });
};
module.exports.studentWithId = async (req, res) => {
  const studentId = req.params.id;
  console.log(studentId);

  const student = await studentServices.getStudentById(studentId);
  const testList = await testServices.getTestByStudentId(studentId);
  res.render("admin/pages/viewResult/studentDetail.pug", {
    titlePage: "Kết quả sinh viên",
    student: student.data[0],
    testList: testList.data,
    pagination: {
      page: 1,
      limit: 5,
      totalPages: 1,
    },
  });
};
module.exports.detailStudentAndTest = async (req, res) => {
  const result = await resultController.getDetailTestWithIdStuAndIdTest(
    req.params.id,
    req.params.testId
  );
  res.render("admin/pages/viewResult/studentAndTestDetail.pug", {
    titlePage: "Kết quả sinh viên",
    result: result.result.data[0],
    student: result.student.data[0],
    test: result.test.data[0],
    detail: result.detail,
  });
};
// [GET] /admin/my-account
module.exports.test = async (req, res) => {
  const testList = await testServices.getAllTest();
  console.log(testList);
  res.render("admin/pages/viewResult/test.pug", {
    titlePage: "Kết quả bài thi",
    tests: testList.data,
  });
};
module.exports.testWithId = async (req, res) => {
  const testId = req.params.id;
  const test = await testServices.getTestById(testId);
  res.render("admin/pages/viewResult/testResultStudent.pug", {
    titlePage: "Kết quả bài thi",
    test: test.data[0],
    pagination: {
      page: 1,
      limit: 5,
      totalPages: 1,
    },
  });
};
