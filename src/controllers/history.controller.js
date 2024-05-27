const { getDetectionHistory, insertHistory } = require('../services/history.service')

const jwt = require('jsonwebtoken');
require('dotenv').config()

const getHistoryById = async (req, res) => {
    const id = req.query.id;
    const data = await getDetectionHistory(id);
    if (data === null) {
        const response = {
            code: 0,
            status: 500,
            message: "Internal Server Error"
        }
        res.status(500).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 200,
            message: "ok",
            data: data
        }
        res.status(200).json(response);
    }
}

const postHistory = (req, res) => {
    const data = req.body;

    //get access token:
    const token = req.headers['access-token'];
    //decode token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    data.UserId = decoded.msv
    console.log(data)
    const result = insertHistory(data);
    if (result === false) {
        const response = {
            code: 0,
            status: 500,
            message: "Internal Server Error"
        }
        res.status(500).json(response);
    }
    else {
        const response = {
            code: 0,
            status: 200,
            message: "ok",
        }
        res.status(200).json(response);
    }

}
module.exports = {
    getHistoryById, postHistory
}