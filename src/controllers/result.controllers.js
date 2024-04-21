const { getResultByIdStuAndIdTest } = require("../services/result.services");
const { getStudentById } = require("../services/student.service");
const { getTestById } = require("../services/test.service");
const { getQuestionOfTest } = require("../services/question.service");
const { getDetailListWithIdResult } = require("../services/detail.services");
const detail = require("../models/detail");
const getResultWithIdStuAndIdTest = async (req, res) => {
  const idStu = req.params.id;
  const idTest = req.params.idTest;
  const data = await getResultByIdStuAndIdTest(idStu, idTest);
  console.log(data);
  return res.json(data);
};
const getDetailTestWithIdStuAndIdTest = async (req, res) => {
  const idStu = req.params.id;
  const idTest = req.params.idTest;
  const dataRes = {
    status: null,
    student: null,
    test: null,
    numberCorrect: null,
    numberTotal: null,
    result: null,
    detail: [],
  };
  const questionList = await getQuestionOfTest(idTest); //thong tin cac cau hoi
  const student = await getStudentById(idStu); //thong tin sinh vien
  const result = await getResultByIdStuAndIdTest(idStu, idTest); //thong tin ket qua

  const test = await getTestById(idTest); //thong tin bai thi

  if (result.data) {
    const detailList = await getDetailListWithIdResult(result.data[0].MaKetQua); //chi tiet tung cau
    dataRes.student = student;
    dataRes.status = 200;
    dataRes.test = test;
    dataRes.result = result;
    dataRes.numberTotal = detailList.length;
    var cntCorrect = 0;
    for (var i = 0; i < detailList.length; i++) {
      const questionInfor = { question: null, _detail: null };
      questionInfor.question = questionList.data[i];
      questionInfor._detail = detailList[i];
      if (detailList[i].Dung === 1) cntCorrect++;
      dataRes.detail.push(questionInfor);
    }
    dataRes.numberCorrect = cntCorrect;
  } else {
    dataRes.status = 404;
  }
  res.json(dataRes);
};
module.exports = {
  getResultWithIdStuAndIdTest,
  getDetailTestWithIdStuAndIdTest,
};
