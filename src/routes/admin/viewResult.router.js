const express = require("express");
const router = express.Router();

const controllerResult = require("../../controllers/admin/result/result.controller");

router.get("/", controllerResult.index);

router.get("/student", controllerResult.student);
router.get("/student/:id", controllerResult.studentWithId);
router.get("/student/:id/:testId", controllerResult.detailStudentAndTest);
router.get("/test", controllerResult.test);
router.get("/test/:id", controllerResult.testWithId);
module.exports = router;
