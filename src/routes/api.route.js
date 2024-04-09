const express = require('express')
const router = express.Router()

const { getTestList, getQuestionHandler, postTestHandler } = require('../controllers/test.controllers')
router.get('/get-test', getTestList)
router.get('/get-test/:id', getQuestionHandler)
router.post('/new-test', postTestHandler)

module.exports = router

