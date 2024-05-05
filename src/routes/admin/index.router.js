const viewResultRoutes = require("./viewResult.router");
const profileRoutes = require("./profile.router");
const indexUser = require("../user/user")
module.exports = (app) => {
  app.use("/admin/result", viewResultRoutes);
  app.use("/admin/profile", profileRoutes);
};
