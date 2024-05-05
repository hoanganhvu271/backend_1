const { Sequelize } = require("sequelize");
require('dotenv').config();

<<<<<<< HEAD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
=======
const sequelize = new Sequelize("blzgbosgrt5jimzh2ude", "uhv7bqutywjwtaga", "s9uR0I1udWuGpSWmat3d", {
  host: "blzgbosgrt5jimzh2ude-mysql.services.clever-cloud.com",
>>>>>>> 23b61e437a0055c67a0c41e4a05dfe895f78b736
  port: "3306",
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

