const { default: Transaction } = require("sequelize/lib/transaction");
const db = require("../models/index");

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
    if (res.length > 0) {
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
const getAllResult = async (req, res) => {

  const data = {
    status: null,
    data: null,
  };
  try {
    const res = await db.Result.findAll();
    // console.log(res);
    if (res.length > 0) {
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
}

const getResultWithIdResult = async (idResult) => {
  const data = {
    status: null,
    data: null,
  };


  try {
    const res = await db.Result.findAll({
      raw: true,
      where: {
        MaBaiThi: idResult
      },
    });
    //console.log(res);
    //neu ton tai -> 200
    // khong ton tai -> 400
    //truy van loi -> 500
    if (res.length > 0) {
      data.status = 200;
      data.data = res;
    }
    else {
      data.status = 404;
      data.data = null;
    }

  }
  catch (e) {
    console.log(e);
    data.status = 500;

  }
  return data;
}
const getResultWithDate = async (Date) => {

}
module.exports = {
  getResultByIdStuAndIdTest,
  getAllResult,
  getResultWithIdResult,
  getResultWithDate
};
