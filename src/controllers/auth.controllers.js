require('dotenv').config()
const jwtHelper = require("../helpers/jwt.helper");
const { getStudentById } = require('../services/student.service')
const testServices = require("../services/test.service");
const bcrypt = require('bcrypt');
const saltRounds = 10;

let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

const refreshToken = async (req, res) => {

    const refreshTokenFromClient = req.body.refreshToken;



    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {

            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const userFakeData = decoded.data;

            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);


            return res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json({
                code: 0,
                status: 403,
                message: 'Invalid refresh token.',
            });
        }
    } else {

        return res.status(403).send({
            code: 0,
            status: 403,
            message: 'No token provided.',
        });
    }
};

const checkLoginUser = async (req, res, next) => {

    if (req.params.role === 'user') {
        //check valid user and password
        if (!req.body.msv || !req.body.password) {
            const response = {
                code: 0,
                status: 400,
                message: "Yêu cầu điền thông tin đầy đủ",
            };

            res.status(400).json(response);
        }
        else {
            // check database
            let data = await getStudentById(req.body.msv);
            //status = 200 -> tim thay sinh vien -> check password 
            //status = 404 -> khong tim thay sinh vien -> response failed to login 
            //status = 500 -> lỗi trong quá trình xử lý
            if (data.status === 404) {
                const response = {
                    code: 0,
                    status: 404,
                    message: "Đăng nhập thất bại",
                };
                res.status(404).json(response);
            }
            if (data.status === 500) {
                const response = {
                    code: 0,
                    status: 500,
                    message: "Truy vấn cơ sở dữ liệu thất bại",
                };
                res.status(500).json(response);
            }
            if (data.status === 200) {
                var ok = await bcrypt.compareSync(req.body.password, data.data[0].MatKhau);
                if (ok) {
                    const userData = {
                        id: req.body.msv,
                        role: req.params.role,
                        email: data.data[0].email,
                    };

                    data = await createTokenResponse(userData)

                    const response = {
                        code: 1,
                        status: 200,
                        message: "Đăng nhập thành công",
                        data: data
                    };
                    res.status(200).json(response);
                }
                else {
                    const response = {
                        code: 0,
                        status: 404,
                        message: "Đăng nhập thất bại",
                    };
                    res.status(404).json(response);
                }
            }
        }

    }
    else {
        try {

            var data = await createTokenResponse({
                username: "admin",
                role: "admin",
            })
            res.token = data;
            console.log(data)
            // res.redirect('/admin/result')
            return res.status(200).json({
                token: data
            });


        } catch (error) {
            console.log(error);
    
            // Render trang lỗi khi đăng nhập thất bại
            return res.render('error500'); 
        }
    }

}

const createTokenResponse = async (userData) => {
    // console.log(userData);


    const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);

    // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
    tokenList[refreshToken] = { accessToken, refreshToken };

    return { accessToken, refreshToken }
}

module.exports = {
    refreshToken, checkLoginUser
}