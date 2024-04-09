const express = require('express')
const router = express.Router()

const { getHomePage } = require('../controllers/home.controllers')
router.get('/', getHomePage)

module.exports = router