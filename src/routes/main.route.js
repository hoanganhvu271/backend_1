const express = require('express')
const router = express.Router()
const { login, refreshToken } = require('../controllers/auth.controllers')

const { getHomePage } = require('../controllers/home.controllers')
router.get('/', getHomePage)
router.post('/login/:role', login)

module.exports = router