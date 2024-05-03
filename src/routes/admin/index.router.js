const viewResultRoutes = require("./viewResult.router");
const testListRoutes = require("./testList.router");
const accountManageRoutes = require("./account.router");
const profileRoutes = require("./profile.router");

module.exports = (app) => {
  app.use("/admin/result", viewResultRoutes);
  app.use("/admin/test", testListRoutes);
  app.use("/admin/account", accountManageRoutes);
  app.use("/admin/profile", profileRoutes);
}


