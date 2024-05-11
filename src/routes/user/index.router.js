const indexUser = require("./user");
const userListTest = require("./usertestlist.router");
const userResult = require("./viewResult.router");
const userMessage = require("./message.router");
module.exports = (app) => {
  app.use("/", indexUser);
  app.use("/user/practice", userListTest);
  app.use("/user/result", userResult);
  app.use("/user/message", userMessage);
};
