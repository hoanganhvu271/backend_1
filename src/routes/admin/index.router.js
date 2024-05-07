const viewResultRoutes = require("./viewResult.router");
const testListRoutes = require("./testList.router");
const accountManageRoutes = require("./account.router");
const profileRoutes = require("./profile.router");
const indexUser = require("../user/user");
const statisticRouter = require("./statistic.router");
const permissionRouter = require("./permission.router");

const { isAdminPermission } = require("../../middleware/auth.middleware");
module.exports = (app) => {
  app.use("/admin/result", isAdminPermission, viewResultRoutes);
  app.use("/admin/test", isAdminPermission, testListRoutes);
  app.use("/admin/account", isAdminPermission, accountManageRoutes);
  app.use("/admin/profile", isAdminPermission, profileRoutes);
  app.use("/admin/statistic", isAdminPermission, statisticRouter);
  app.use("/admin/permission", isAdminPermission, permissionRouter);
};
