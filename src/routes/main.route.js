// const { createNewStudentHandler } = require('../controllers/student.controllers')
const express = require('express')
const router = express.Router()
const { checkLoginUser, refreshToken } = require('../controllers/auth.controllers')
const resultController = require('../controllers/admin/result/result.controller')

const { getHomePage, getLoginAdmin, testapi } = require('../controllers/home.controllers')
router.get('/', getHomePage)
router.get('/login/admin', getLoginAdmin)
router.post('/login/:role', checkLoginUser)

// router.post("/create-newstudent", createNewStudentHandler);

module.exports = router