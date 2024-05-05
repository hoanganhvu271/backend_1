const express = require("express");
const router = express.Router();
const db = require("../../models/index");

const testController = require("../../controllers/user/result/result.controller");
router.get("/tn", testController.testListForStudent);
router.get("/code", testController.codeListForStudent);
module.exports = router;
