const viewResultRoutes = require("./viewResult.router");

module.exports = (app) => {
  app.use("/admin/result", viewResultRoutes);
};
