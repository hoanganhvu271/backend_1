const express = require("express");
const router = express.Router();

const controllerStudentAccount = require("../../controllers/admin/account.controller");
router.get("/", controllerStudentAccount.student);
module.exports = router;
