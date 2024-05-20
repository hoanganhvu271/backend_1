const { getDetectionHistory } = require('../services/history.service')
const getHistoryById = async (req, res) => {
    const id = req.query.id;
    const data = await getDetectionHistory(id);
    if (data === null) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    else {
        res.status(200).json(data);
    }
}

module.exports = {
    getHistoryById
}