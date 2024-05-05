const viewResultRoutes = require("./viewResult.router");
const profileRoutes = require("./profile.router");
module.exports = (app) => {
  app.use("/user/result", viewResultRoutes);
  app.use("/user/profile", profileRoutes);
};
