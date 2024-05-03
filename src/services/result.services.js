const { default: Transaction } = require("sequelize/lib/transaction");
const db = require("../models/index");
const { sequelize } = require('../config/connectDB')
const { Op } = require('sequelize')
const { createNewDetail } = require('./detail.services')

const getResultByIdStuAndIdTest = async (idStu, idTest) => {
  const data = {
    status: null,
    data: null,
  };
  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MSV: idStu,
        MaBaiThi: idTest,
      },
    });
    //console.log(res);
    if (res) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
    }
    return data;
  } catch (e) {
    console.log(e);
    data.status = 500;
    return data;
  }
};
const getResultByIdTest = async (idTest) => {
  const data = {
    status: null,
    data: null,
  };
  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MaBaiThi: idTest,
      },
    });
    //console.log(res);
    if (res) {
      data.status = 200;
      data.data = res;
    } else {
      data.status = 404;
    }
    return data;
  } catch (e) {
    console.log(e);
    data.status = 500;
    return data;
  }
};
module.exports = {
  getResultByIdStuAndIdTest,
  getResultByIdTest,
};
