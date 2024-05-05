const viewResultRoutes = require("./viewResult.router");
const profileRoutes = require("./profile.router");
const indexUser = require("./user")
module.exports = (app) => {
  app.use("/", indexUser)
  app.use("/user/result", viewResultRoutes);
  app.use("/user/profile", profileRoutes);
};
