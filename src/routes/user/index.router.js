const indexUser = require("./user");
const userListTest = require("./usertestlist.router");
const userResult = require("./viewResult.router");
module.exports = (app) => {
  app.use("/", indexUser);
  app.use("/practice", userListTest);
  app.use("/result", userResult);
};
