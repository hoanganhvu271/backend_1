const express = require("express");
const router = express.Router();

const controllerResult = require("../../controllers/user/result/result.controller");
const { isAuth } = require("../../middleware/auth.middleware");

router.get("/tn", controllerResult.resultTestOfStudent);
router.get("/code", controllerResult.index);
module.exports = router;
