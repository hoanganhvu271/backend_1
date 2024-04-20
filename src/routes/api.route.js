const express = require('express')
const router = express.Router()

const { getTestList, getQuestionByTestHandler, postTestHandler, deleteTestHandler, updateTestHandler,
    searchTestHandler } = require('../controllers/test.controllers')
const { getStudentHandler, getStudentByIdHandler, postStudentHandler, deleteStudentHandler,
    updateStudentHandler } = require('../controllers/student.controllers')
const { isAuth, isAdmin } = require('../middleware/auth.middleware')
const { getStatisticsHandler } = require('../controllers/statistic.controllers')

router.use(isAuth)

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

module.exports = router

