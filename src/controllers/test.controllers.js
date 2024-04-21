
const { getAllTest, getTestById, getTestByText, createNewTest } = require('../services/test.service')
const { getQuestionOfTest, getQuestionOfTestUser } = require('../services/question.service')
const { createNewResult, getResultListofStudent, getResultbyIdStuandIdResult } = require('../services/result.services')
const { getDetailListWithIdResultandIdStu } = require('../services/detail.services')


const getTestList = async (req, res) => {

    var tests = await getAllTest()
    if (tests) {
        const response = {
            code: 1,
            status: 200,
            message: "successfully",
            data: tests
        };

        res.status(200).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 500,
            message: "internal server error",
        };

        res.status(500).json(response);
    }
}

const getSearchTest = async (req, res) => {
  const inputText = req.query.text;
  let tests = await getTestByText(inputText);
  // console.log(questions)
  if (tests) {
      const response = {
          code: 1,
          status: 200,
          message: "da tim thay cac bai thi successfully",
          data: tests
      };

      res.status(200).json(response);
  }
  else {
      const response = {
          code: 0,
          status: 500,
          message: "internal server error",
      };

      res.status(500).json(response);
  }
}

const getQuestionHandler = async (req, res) => {
    const testId = req.params.id;
    var metadata = await getTestById(testId);
    var questions = await getQuestionOfTest(testId)
    // console.log(questions)
    if (questions) {
        const response = {
            code: 1,
            status: 200,
            message: "lay cau hoi successfully",
            metadata: metadata[0],
            data: questions
        };

        res.status(200).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 500,
            message: "internal server error",
        };

        res.status(500).json(response);
    }
}

const getQuestionHandlernoAns = async (req, res) => {
    const testId = req.params.id;
    var metadata = await getTestById(testId);
    var questions = await getQuestionOfTestUser(testId)
    // console.log(questions)
    if (questions) {
        const response = {
            code: 1,
            status: 200,
            message: "lay cau hoi successfully",
            metadata: metadata[0],
            data: questions
        };

        res.status(200).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 500,
            message: "internal server error",
        };

        res.status(500).json(response);
    }
}

const getResultList = async (req, res) => {
    let msv = req.params.msv

    let resultList = await getResultListofStudent(msv)

    if (resultList) {
        const response = {
            code: 1,
            status: 200,
            message: "lay lich su successfully",
            data: resultList
        };

        res.status(200).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 500,
            message: "internal server error",
        };

        res.status(500).json(response);
    }

}

const getDetailList = async (req, res) => {
    let mkq = req.params.mkq
    let msv = req.params.msv

    let detailList = await getDetailListWithIdResultandIdStu(mkq, msv)
    let mabaithi = detailList[0].MaBaiThi
    detailList = detailList.map(detail => {
        const { MaBaiThi, MaCauHoi, MaKetQua, ...rest } = detail;
        return rest;
    });
    let diem = await getResultbyIdStuandIdResult(mkq)

    if (detailList) {
        const response = {
            code: 1,
            status: 200,
            message: "lay chi tiet successfully",
            maketqua: mkq,
            mabaithi: mabaithi,
            diem: diem,
            data: detailList
        };

        res.status(200).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 500,
            message: "internal server error",
        };

        res.status(500).json(response);
    }

}

const postTestHandler = async (req, res) => {
    var reqBody = req.body
    var test = reqBody.metadata
    var questionList = reqBody.data

    // console.log(test)
    // console.log(questionList)
    var status = await createNewTest(test, questionList)
    if (status) {
        res.status(200).json("ok nhe hehe")
    }
    else {
        res.status(500).json("nguuu")
    }
}

const postSubmit = async (req, res) => {
    var reqBody = req.body
    var test = reqBody.metadata
    var questionList = reqBody.data
    console.log(test)
    console.log(questionList)
    // console.log(test)
    // console.log(questionList)
    var status = await createNewResult(test[0], questionList)
    if (status) {
        res.status(200).json("ok nhe hehe")
    }
    else {
        res.status(500).json("nguuu")
    }
}




module.exports = { getTestList, getQuestionHandler, getResultList, getDetailList, getSearchTest, postTestHandler, getQuestionHandlernoAns, postSubmit }