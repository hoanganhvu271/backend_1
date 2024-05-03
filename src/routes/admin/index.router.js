const viewResultRoutes = require("./viewResult.router");
const testListRoutes = require("./testList.router");
const accountManageRoutes = require("./account.router");

module.exports = (app) => {
  app.use("/admin/result", viewResultRoutes);
  app.use("/admin/test", testListRoutes);
  app.use("/admin/account", accountManageRoutes);
};
