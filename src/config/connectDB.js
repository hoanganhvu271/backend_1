const { Sequelize } = require("sequelize");

<<<<<<< HEAD
const sequelize = new Sequelize("javasql", "root", "hvxk2003", {
=======
const sequelize = new Sequelize("javasql", "root", "1111", {
>>>>>>> 2ad8557e4de7490c48a3869245157d72c06a5389
  host: "localhost",
  port: "3307",
  dialect: "mysql",
});
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connection, sequelize };
