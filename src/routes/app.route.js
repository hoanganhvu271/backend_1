const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');
const { getHistoryById, postHistory, sendFeedbackHandler, registerHandler } = require('../controllers/history.controller')

const { checkLoginApp } = require("../controllers/auth.controllers");

//app api
router.post("/login-app", checkLoginApp)
router.get("/get-history", getHistoryById)
router.post("/new-history", postHistory)
router.post("/send-feedback", fileUploader.single('image'), sendFeedbackHandler)
router.post("/register", registerHandler)

module.exports = router;