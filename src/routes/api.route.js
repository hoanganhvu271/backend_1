const express = require("express");
const router = express.Router();

const { checkLoginUser } = require("../controllers/auth.controllers");

const {
    getTestList,
    getTestByPage,
    getQuestionByTestHandler,
    postTestHandler,
    deleteTestHandler,
    updateTestHandler,
    getTestWithStudent,
    searchTestHandler, getQuestionHandlernoAns, getResultList, getDetailList, postSubmit, getSearchTest
} = require("../controllers/test.controllers");
const {
    getStudentHandler,
    getStudentByIdHandler,
    postStudentHandler,
    deleteStudentHandler,
    updateStudentHandler,
    getStudentInresultHandler,
    createNewStudentHandler,
    getStudentByPage

} = require("../controllers/student.controllers");

const {
    getAllResultHandler,
    getDetailTestWithIdStuAndIdTest,
    getAllStaticWithIdDate,
    getAllStaticWithIdResult,
} = require("../controllers/result.controllers");

const { getStatisticsHandler } = require("../controllers/statistic.controllers");
const { isAuth, isAdmin } = require("../middleware/auth.middleware");


//Guest

router.post("/login/:role", checkLoginUser);
router.post("/createNewstudent", createNewStudentHandler);

//User

//hiep
router.get('/thi/:id', isAuth, getQuestionHandlernoAns)
router.get('/result-list/:msv', isAuth, getResultList)
router.get('/result-list/:msv/:mkq', isAuth, getDetailList)

router.post('/new-test', isAuth, postTestHandler)
router.post('/submit', isAuth, postSubmit)
router.get('/search-test', isAuth, getSearchTest)

//Admin
//vu1
router.get('/get-test', isAdmin, getTestList)
router.get('/get-test-per-page', isAdmin, getTestByPage)
router.get('/get-test/:id', isAdmin, getQuestionByTestHandler)
router.get('/search-test', isAdmin, searchTestHandler)
router.post('/new-test', isAdmin, postTestHandler)
router.delete('/delete-test/:id', isAdmin, deleteTestHandler)
router.put('/update-test/:id', isAdmin, updateTestHandler)

//vu2
router.get('/get-student', isAdmin, getStudentHandler)
router.get('/get-student/:id', isAdmin, getStudentByIdHandler)
router.get('/get-student-per-page', isAdmin, getStudentByPage)
router.post('/new-student', isAdmin, postStudentHandler)
router.delete('/delete-student/:id', isAdmin, deleteStudentHandler)
router.put('/update-student/:id', isAdmin, updateStudentHandler)

//vu3
router.get('/statistics/:id', isAdmin, getStatisticsHandler)


//quan
router.get("/result/get-all-student", isAdmin, getStudentInresultHandler);
router.get("/result/get-all-student/:id", isAdmin, getStudentByIdHandler);
router.get("/result/detail/:id", isAdmin, getTestWithStudent);
router.get("/result/detail/:id/:idTest", isAdmin, getDetailTestWithIdStuAndIdTest);


//dat
router.get("/getAllStatic", isAdmin, getAllResultHandler);
router.get("/getAllStaticWithIdResult/:id", isAdmin, getAllStaticWithIdResult);
router.get("/getAllStaticWithDate/:date", isAdmin, getAllStaticWithIdDate);


//loc ket qua theo ki thi va ngay thang
// router.get("/admin/get", getAllStaticHandler);

module.exports = router;
