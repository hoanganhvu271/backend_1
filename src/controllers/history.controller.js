const { getDetectionHistory, insertHistory, saveFeedBack, createNewUser
    , checkEmail, checkAccount
} = require('../services/history.service')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const getHistoryById = async (req, res) => {
    //get access token:
    try {
        const token = req.headers['access-token'];
        console.log(token)
        //decode token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)
        var id = decoded.data.id
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
    catch (e) {
        const response = {
            code: 0,
            status: 403,
            message: "Invalid token"
        }
        res.status(403).json(response);
    }
}

const postHistory = (req, res) => {
    const data = req.body;

    //get access token:
    const token = req.headers['access-token'];
    //decode token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    data.UserId = decoded.data.id;
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

const sendFeedbackHandler = async (req, res) => {
    const text = req.body.text;
    const image = req.file.path;
    const token = req.headers['access-token']
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = data.data.id;

    await saveFeedBack(user, image, text)


    console.log(text, image);

    if (image && text) {
        const response = {
            code: 0,
            status: 200,
            message: "ok"
        }
        res.status(200).json(response);

    }
    else {
        const response = {
            code: 0,
            status: 400,
            message: "Bad Request"
        }
        res.status(400).json(response);
    }


}

const registerHandler = async (req, res) => {
    const user = req.body;

    const check = await checkEmail(user.email)
    if (!check) {
        const response = {
            status: 400,
            message: "Email đã được sử dụng",
        };
        res.status(400).json(response);
        return
    }

    const check2 = await checkAccount(user.username)
    if (!check2) {
        const response = {
            status: 400,
            message: "Tên tài khoản đã được sử dụng",
        };
        res.status(400).json(response);
        return
    }


    const hashPassword = await bcrypt.hash(user.password, 10)
    user.password = hashPassword

    const data = await createNewUser(user);
    if (data != null) {
        const response = {
            status: 200,
            message: "Đăng ký thành công"
        };
        res.status(200).json(response);
    }
    else {
        const response = {
            status: 500,
            message: "Server Error",
        };
        res.status(500).json(response);
    }

}




module.exports = {
    getHistoryById, postHistory, sendFeedbackHandler, registerHandler
}