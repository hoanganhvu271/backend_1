const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');
const { getHistoryById, postHistory, sendFeedbackHandler } = require('../controllers/history.controller')

const { checkLoginUser, checkLoginApp } = require("../controllers/auth.controllers");

//app api
router.post("/login-app", checkLoginApp)
router.get("/get-history", getHistoryById)
router.post("/new-history", postHistory)
router.post("/send-feedback", fileUploader.single('image'), sendFeedbackHandler)

module.exports = router;