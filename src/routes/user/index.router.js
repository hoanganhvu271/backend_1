const indexUser = require("./user");
const userListTest = require("./usertestlist.router");
const userResult = require("./viewResult.router");
module.exports = (app) => {
  app.use("/user", indexUser);
  app.use("/user/practice", userListTest);
  app.use("/user/result", userResult);
};
