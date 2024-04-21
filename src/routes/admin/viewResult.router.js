const express = require("express");
const router = express.Router();

const controllerResult = require("../../controllers/admin/result.controller");
router.get("/", controllerResult.index);

module.exports = router;
