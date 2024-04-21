const express = require('express')
const router = express.Router()

const { getTestList, getQuestionHandler, getQuestionHandlernoAns, getResultList, getDetailList, postTestHandler, postSubmit } = require('../controllers/test.controllers')
router.get('/get-test', getTestList)
router.get('/get-test/:id', getQuestionHandler)
router.get('/thi/:id', getQuestionHandlernoAns)
router.get('/result-list/:msv', getResultList)
router.get('/result-list/:msv/:mkq', getDetailList)

router.post('/new-test', postTestHandler)
router.post('/submit', postSubmit)

module.exports = router

