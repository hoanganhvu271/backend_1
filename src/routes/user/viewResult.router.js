const express = require("express");
const router = express.Router();

const controllerResult = require("../../controllers/user/result/result.controller");
const {isAuth} = require("../../middleware/auth.middleware")

router.get("/", isAuth, controllerResult.index);

router.get("/test", isAuth, controllerResult.test);
router.get("/test/:testId", controllerResult.testWithId);
router.get("/test/:testId/:studentId", controllerResult.detailStudentAndTest);
module.exports = router;
