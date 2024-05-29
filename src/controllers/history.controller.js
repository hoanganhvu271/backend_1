const { getDetectionHistory, insertHistory, saveFeedBack, createNewUser
    , checkEmail, checkAccount
} = require('../services/history.service')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { sendToPhone } = require("../middleware/sendEmail");
const { getOtpWithEmail,
    createOtp,
    deleteOtp, updateOtp } = require("../services/otp.service")

const { getStudentByEmail } = require('../services/student.service');
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
}

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

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    console.log(email)
    let data = await getStudentByEmail(email);
    console.log(data)
    if (data.status != 200) {
        const response = {
            code: 0,
            status: 404,
            message: "Email này chưa được đăng ký tài khoản, hãy đăng ký"
        };

        res.status(404).json(response)
    }
    else {
        const otp = generateOTP();
        await sendToPhone(otp);
        const data = await createOtp(email, new Date(), new Date().setMinutes(new Date().getMinutes() + 5), otp);
        if (data.status != 200) {
            await updateOtp(email, new Date(), new Date().setMinutes(new Date().getMinutes() + 5), otp);

            var response = {
                code: 1,
                status: 200,
                message: "Mã OTP đã được gửi đến SDT của bạn"
            }

            res.status(200).json(response);

        }
        else {
            var response = {
                code: 1,
                status: 200,
                message: "Mã OTP đã được gửi đến SDT của bạn"
            }

            res.status(200).json(response);
        }
    }


}

const verifyOTP = async (req, res) => {
    let newotp = await req.body.otp;
    const email = await req.body.email;
    const data = await getOtpWithEmail(email);
    // console.log(data)
    if (data.status != 200) {
        // console.log('ok')
        const response = {
            code: 0,
            status: 404,
            message: "Mã OTP đã hết hạn, hãy gửi lại yêu cầu mã OTP",
        };

        res.status(404).json(response);
    }

    else {
        const otp = data.data[0].otp_code;
        if (otp.toString() == newotp) {
            // await deleteOtp(email);
            const response = {
                code: 1,
                status: 200,
                message: "OK",
            };
            res.status(200).json(response);
        } else {
            const response = {
                code: 0,
                status: 400,
                message: "OTP không hợp lệ, hãy thử lại",

            };

            res.status(400).json(response);

        }

    }

}
const changePassword = async (req, res) => {
    // nhớ chỉnh email thành khóa chính
    const newPassword = req.body.newPassword;
    const email = req.body.email;
    const confirmPassword = req.body.confirmPassword;
    try {
        // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp nhau không
        if (newPassword != confirmPassword) {

            const response = {
                code: 0,
                status: 400,
                message: "Mật khẩu không trùng khớp, hãy thử lại",
                title: "Thất bại",
            };

            res.status(400).json(response);
        }
        else {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await updatePassword(email, hashedPassword);
            const response = {
                code: 1,
                status: 200,
                message: "Đổi mật khẩu thành công",
            };

            res.status(200).json(response);
        }


    } catch (error) {
        console.error('Lỗi khi thay đổi mật khẩu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi mật khẩu.' });
    }
}



module.exports = {
    getHistoryById, postHistory, sendFeedbackHandler, registerHandler, verifyOTP, forgotPassword, changePassword
}