const viewResultRoutes = require("./viewResult.router");
const profileRoutes = require("./profile.router");

module.exports = (app) => {
  app.use("/admin/result", viewResultRoutes);
  app.use("/admin/profile", profileRoutes);
};
