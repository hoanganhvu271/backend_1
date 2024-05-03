const express = require("express");
const router = express.Router();

const controllerViewTest = require("../../controllers/admin/test/test.controller");
// router.get("/", controllerViewTest.index);
router.get("/new-test", controllerViewTest.createNewTest);
router.get("/", controllerViewTest.testListPaginate);
router.get("/edit-test/:id", controllerViewTest.EditTest);
module.exports = router;
