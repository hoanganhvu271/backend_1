const indexUser = require("./user");
const userListTest = require("./usertestlist.router");
const userResult = require("./viewResult.router");
const profileRoutes = require("./profile.router");

module.exports = (app) => {
  app.use("/", indexUser);
  app.use("/user/practice", userListTest);
  app.use("/user/result", userResult);
  app.use("/user/profile", profileRoutes)
};
