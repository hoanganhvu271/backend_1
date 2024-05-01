const studentController = require("../../student.controllers");
const studentServices = require("../../../services/student.service");
const testServices = require("../../../services/test.service");
const resultServices = require("../../../services/result.services");
const resultController = require("../../result.controllers");
const paginationHelper = require("../../../helpers/paginationHelper");
// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/viewResult/index.pug", {
    titlePage: "Thông tin cá nhân",
  });
};
// [GET] /admin/my-account
module.exports.student = async (req, res) => {
  const find = {};
  const lop = req.query.class;
  if (lop) {
    find.Lop = lop;
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
  console.log(pagination);
  const studentList = await studentServices.getStudentWithFindObject(
    find,
    pagination
  );
  res.render("admin/pages/viewResult/student.pug", {
    titlePage: "Kết quả sinh viên",
    className: lop || "Tất cả",
    studentList: studentList.data,
    pagination: pagination,
  });
};
module.exports.studentWithId = async (req, res) => {
  const studentId = req.params.studentId;
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
    req.params.studentId,
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
  const testId = req.params.testId;
  console.log(testId);
  const test = await testServices.getTestById(testId);
  const resultList = await resultServices.getResultByIdTest(testId);
  const studentList = [];
  for (let i = 0; i < resultList.data.length; i++) {
    const student = await studentServices.getStudentById(
      resultList.data[i].MSV
    );
    studentList.push(student.data[0]);
  }
  res.render("admin/pages/viewResult/testResultStudent.pug", {
    titlePage: "Kết quả bài thi",
    test: test.data[0],
    resultList: resultList.data,
    studentList: studentList,
    pagination: {
      page: 1,
      limit: 5,
      totalPages: 1,
    },
  });
};

// [GET] /admin/my-account
