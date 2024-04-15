const express = require('express')
const router = express.Router()

const { getTestList, getQuestionByTestHandler, postTestHandler, deleteTestHandler, updateTestHandler } = require('../controllers/test.controllers')
const { getStudentHandler, getStudentByIdHandler, postStudentHandler, deleteStudentHandler,
    updateStudentHandler } = require('../controllers/student.controllers')


//tests
router.get('/get-test', getTestList)
router.get('/get-test/:id', getQuestionByTestHandler)
router.post('/new-test', postTestHandler)
router.delete('/delete-test/:id', deleteTestHandler)
router.put('/update-test/:id', updateTestHandler)

//students
router.get('/get-student', getStudentHandler)
router.get('/get-student/:id', getStudentByIdHandler)
router.post('/new-student', postStudentHandler)
router.delete('/delete-student/:id', deleteStudentHandler)
router.put('/update-student/:id', updateStudentHandler)

module.exports = router

