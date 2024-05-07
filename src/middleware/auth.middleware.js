
const jwtHelper = require("../helpers/jwt.helper");

require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const isAuth = async (req, res, next) => {

    const tokenFromClient = req.cookies.jwt;
    // console.log('token: ',tokenFromClient)
    if (tokenFromClient) {

        try {

            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            req.jwtDecoded = decoded;

            next();
        } catch (error) {
            return res.status(401).json({
                code: 0,
                status: 401,
                message: 'Unauthorized.',
            });
        }
    } else {
        return res.redirect('/')
    }
}

const isAdmin = async (req, res, next) => {
    const tokenFromClient = req.headers["x-access-token"];
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            // console.log(decoded);
            if (decoded.data.role === 'admin') {
                next();
            } else {
                return res.status(401).json({
                    code: 0,
                    status: 401,
                    message: 'Không có quyền admin'
                });
            }
        } catch (error) {
            return res.status(401).json({
                code: 0,
                status: 401,
                message: 'Unauthorized.'
            });
        }
    } else {
        return res.status(403).json({
            code: 0,
            status: 403,
            message: 'No token provided.'
        });

    }
}

module.exports = {
    isAuth,
    isAdmin
};