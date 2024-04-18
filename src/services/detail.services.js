const { raw } = require("mysql2");
const db = require("../models/index");
const { where, Op } = require("sequelize");

const getDetailListWithIdResult = async (idResult) => {
  const data = await db.Detail.findAll({
    raw: true,
    where: {
      MaKetQua: idResult,
    },
  });
  return data;
};

getDetailListWithIdResult("KQ01");
module.exports = {
  getDetailListWithIdResult,
};
