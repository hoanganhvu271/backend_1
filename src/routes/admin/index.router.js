const viewResultRoutes = require("./viewResult.router");
const testListRoutes = require("./testList.router");
const accountManageRoutes = require("./account.router");
const profileRoutes = require("./profile.router");

const indexAdmin = require("./admin.login.router");
const statisticRouter = require("./statistic.router");
const permissionRouter = require("./permission.router");
const messageRouter = require("./message.router");

const { isAdminPermission } = require("../../middleware/auth.middleware");
module.exports = (app) => {
<<<<<<< HEAD
  app.use("/admin/result", viewResultRoutes);
  app.use("/admin/test", testListRoutes);
  app.use("/admin/account", accountManageRoutes);
  app.use("/admin/profile", profileRoutes);
  app.use("/admin/statistic", statisticRouter);
  app.use("/admin", indexAdmin)
=======
  app.use("/admin/result", isAdminPermission, viewResultRoutes);
  app.use("/admin/test", isAdminPermission, testListRoutes);
  app.use("/admin/account", isAdminPermission, accountManageRoutes);
  app.use("/admin/profile", isAdminPermission, profileRoutes);
  app.use("/admin/statistic", isAdminPermission, statisticRouter);
  app.use("/admin/permission", permissionRouter);
  app.use("/admin/message", messageRouter);
>>>>>>> 7feaf2858fdfc669808eee779987e66d15941638
};
