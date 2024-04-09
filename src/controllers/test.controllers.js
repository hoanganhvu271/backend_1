
const { getAllTest, getTestById, createNewTest } = require('../services/test.service')
const { getQuestionOfTest } = require('../services/question.service')

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

const getQuestionHandler = async (req, res) => {
    const testId = req.params.id;
    var metadata = await getTestById(testId);
    var questions = await getQuestionOfTest(testId)
    // console.log(questions)
    if (questions) {
        const response = {
            code: 1,
            status: 200,
            message: "successfully",
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

module.exports = { getTestList, getQuestionHandler, postTestHandler }