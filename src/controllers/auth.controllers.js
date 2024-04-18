require('dotenv').config()
const jwtHelper = require("../helpers/jwt.helper");

let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET


const login = async (req, res) => {
    try {
        const userFakeData = {
            id: "B21DCCN795",
            name: "Vu",
            email: "hoanganhvu271@gmail.com",
        };

        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);

        // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
        tokenList[refreshToken] = { accessToken, refreshToken };


        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json(error);
    }
}


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
                message: 'Invalid refresh token.',
            });
        }
    } else {

        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

module.exports = {
    login, refreshToken
}