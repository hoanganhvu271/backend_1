// const { createNewStudentHandler } = require('../controllers/student.controllers')
const express = require('express')
const router = express.Router()
// const { login, refreshToken } = require('../controllers/auth.controllers')

const { getHomePage, testapi } = require('../controllers/home.controllers')
router.get('/', getHomePage)
// router.post('/login/:role', login)

// router.post("/create-newstudent", createNewStudentHandler);

module.exports = router