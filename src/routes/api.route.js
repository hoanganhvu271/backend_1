const express = require("express");
const router = express.Router();

const {
    getTestList,
    getQuestionByTestHandler,
    postTestHandler,
    deleteTestHandler,
    updateTestHandler,
    getTestWithStudent,
    searchTestHandler
} = require("../controllers/test.controllers");
const {
    getStudentHandler,
    getStudentByIdHandler,
    postStudentHandler,
    deleteStudentHandler,
    updateStudentHandler,
    getStudentInresultHandler,
    createNewStudentHandler,
    checkLoginUser
} = require("../controllers/student.controllers");

const {
    getAllResultHandler,
    getDetailTestWithIdStuAndIdTest,
    getAllStaticWithIdDate,
    getAllStaticWithIdResult,
} = require("../controllers/result.controllers");

const { getStatisticsHandler } = require("../controllers/statistic.controllers");
const { isAuth, isAdmin } = require("../middleware/auth.middleware");
//User

//Admin
router.use(isAdmin)
//tests
router.get('/get-test', getTestList)
router.get('/get-test/:id', getQuestionByTestHandler)
router.get('/search-test', searchTestHandler)
router.post('/new-test', postTestHandler)
router.delete('/delete-test/:id', deleteTestHandler)
router.put('/update-test/:id', updateTestHandler)

//students
router.get('/get-student', getStudentHandler)
router.get('/get-student/:id', getStudentByIdHandler)
router.post('/new-student', postStudentHandler)
router.delete('/delete-student/:id', deleteStudentHandler)
router.put('/update-student/:id', updateStudentHandler)

//statistics
router.get('/statistics/:id', getStatisticsHandler)


//quan
router.get("/result/get-all-student", getStudentInresultHandler);
router.get("/result/get-all-student/:id", getStudentByIdHandler);
router.get("/result/detail/:id", getTestWithStudent);
router.get("/result/detail/:id/:idTest", getDetailTestWithIdStuAndIdTest);


//dat
router.post("/loginStudent", checkLoginUser);
router.post("/createNewstudent", createNewStudentHandler);
router.get("/getAllStatic", getAllResultHandler);
router.get("/getAllStaticWithIdResult/:id", getAllStaticWithIdResult);
router.get("/getAllStaticWithDate/:date", getAllStaticWithIdDate);


//loc ket qua theo ki thi va ngay thang
// router.get("/admin/get", getAllStaticHandler);

module.exports = router;
