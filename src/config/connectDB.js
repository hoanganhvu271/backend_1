const { Sequelize } = require("sequelize");

<<<<<<< HEAD
const sequelize = new Sequelize("javasql", "root", "hvxk2003", {
  host: "localhost",
  dialect: "mysql",
=======
const sequelize = new Sequelize('javasql', 'root', '1111', {
    host: 'localhost',
    port: '3307',
    dialect: 'mysql'
>>>>>>> bf70bcffc4a8e42c38f762b3a50eeeed2648ea64
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
