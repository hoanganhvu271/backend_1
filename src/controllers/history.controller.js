const { getDetectionHistory } = require('../services/history.service')
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

module.exports = {
    getHistoryById
}